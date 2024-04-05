<script setup>
import { format } from 'date-fns'
const route = useRoute()
const router = useRouter()
const toast = useToast()
const workHours = useWorkHours()
const workHourDetails = workHours.workHourDetails
const showLoading = workHours.isLoading

const isClockedIn = ref(false)
const workType = ref()
const workTypes = [
    {
        label: "In Office",
        value: "in-office"
    }, {
        label: "Work From Home",
        value: "work-from-home"
    }, {
        label: "Other",
        value: "other"
    }
]

// Accessing date this way to prevent "Write operation failed: computed value is readonly" error
const clockedInTimeRaw = ref(new Date())
const clockedOutTimeRaw = ref(new Date())

onMounted(() => {
    workHours.getWorkHourDetails(route.params.id)
})

watchEffect(() => {
    if (!workHours.isLoading.value && workHourDetails.value) {
        isClockedIn.value = workHourDetails.value.isClockedIn
        workType.value = workHourDetails.value.workType
        clockedInTimeRaw.value = new Date(workHourDetails.value.clockedInTime)
        clockedOutTimeRaw.value = new Date(workHourDetails.value.clockedOutTime)
    }
})

const hours = ref(0)
const minutes = ref(0)

watchEffect(() => {
    const elapsedTime = new Date(clockedOutTimeRaw.value) - new Date(clockedInTimeRaw.value)
    hours.value = Math.floor(elapsedTime / (1000 * 60 * 60));
    minutes.value = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
})

const isOpenDeleteModal = ref(false)

const deleteWorkHour = () => {
    isOpenDeleteModal.value = false
    toast.add({
        description: 'Deleting Work Hour',
        icon: 'i-ph-info-duotone',
        timeout: 3000
    })
    workHours.deleteWorkHour(route.params.id)
    router.push({ name: 'work-hours' })
}
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <h1 class="text-3xl font-semibold text-center">Work Hour Details</h1>
        <UCard class="w-full max-w-md mt-10">
            <div class="relative flex flex-col gap-5">
                <div v-if="showLoading"
                    class="absolute bg-white dark:bg-opacity-60 dark:bg-gray-900 bg-opacity-50 p-4 z-50 size-full flex items-center justify-center">
                    <div class="flex items-center justify-center gap-3">
                        <Icon name="ph:circle-notch-duotone" class="text-primary animate-spin" />
                        <div>Fetching Data</div>
                    </div>
                </div>
                <div class="flex gap-5">
                    <div class="font-semibold opacity-70">Clocked In</div>
                    <UToggle disabled size="lg" v-model="isClockedIn" />
                </div>
                <UDivider />
                <div class="flex flex-col gap-2">
                    <div class="font-semibold opacity-70">Work Type</div>
                    <USelect disabled placeholder="Work Type" :options="workTypes" v-model="workType" color="primary"
                        variant="outline" size="xl" />
                </div>
                <UDivider />
                <div class="flex flex-col gap-2">
                    <div class="font-semibold opacity-70">Clocked In Time</div>
                    <UPopover disabled overlay :popper="{ placement: 'bottom-start' }">
                        <UButton variant="link" size="xl"
                            :ui="{ base: 'disabled:opacity-95', padding: 'p-0', variant: { link: 'hover:no-underline' } }"
                            :label="format(clockedInTimeRaw, 'd MMM yyy, hh:mm a')" />

                        <template #panel>
                            <DatePicker v-model="clockedInTimeRaw" />
                        </template>
                    </UPopover>
                </div>
                <UDivider />
                <div class="flex flex-col gap-2">
                    <div class="font-semibold opacity-70">Clocked Out Time</div>
                    <UPopover disabled overlay :popper="{ placement: 'bottom-start' }">
                        <UButton variant="link" size="xl"
                            :ui="{ base: 'disabled:opacity-95', padding: 'p-0', variant: { link: 'hover:no-underline' } }"
                            :label="format(clockedOutTimeRaw, 'd MMM yyy, hh:mm a')" />

                        <template #panel>
                            <DatePicker v-model="clockedOutTimeRaw" />
                        </template>
                    </UPopover>
                </div>
                <UDivider />
                <div class="flex flex-col gap-2">
                    <div class="font-semibold opacity-70">Total Work Hours</div>
                    <div class="text-primary">{{ hours }}:{{ minutes }} <span>Hrs</span></div>
                </div>
            </div>
        </UCard>
        <div class="flex mt-5 gap-3">
            <UButton color="pink" icon="i-ph-trash-duotone" size="xl" @click="isOpenDeleteModal = true"
                label="Delete" />
            <!-- <UButton icon="i-ph-pencil-duotone" size="xl">Edit</UButton> -->
            <!-- <UButton color="blue" icon="i-ph-floppy-disk-duotone" size="xl">Save</UButton> -->
        </div>
        <UModal v-model="isOpenDeleteModal" :ui="{ container: 'items-center' }">
            <div class="flex flex-col px-5 py-10 items-center gap-5">
                <div class="text-center">Are you sure you want to delete Work Hour</div>
                <div class="flex gap-5">
                    <UButton color="pink" icon="i-ph-check-circle-duotone" size="xl" label="Yes"
                        @click="deleteWorkHour" />
                    <UButton icon="i-ph-x-circle-duotone" size="xl" label="No" @click="isOpenDeleteModal = false" />
                </div>
            </div>
        </UModal>
    </div>
</template>