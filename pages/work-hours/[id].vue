<script setup>
const route = useRoute()
const workHours = useWorkHours()
const workHourDetails = workHours.workHourDetails
const showLoading = workHours.isLoading

const isClockedIn = ref()
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

const clockedInTime = useDateFormat(clockedInTimeRaw, "D MMM YYYY, h:mm A")
const clockedOutTime = useDateFormat(clockedOutTimeRaw, "D MMM YYYY, h:mm A")

onMounted(() => {
    workHours.getWorkHourDetails(route.params.id)
})

watchEffect(() => {
    if (!workHours.isLoading.value) {
        isClockedIn.value = workHourDetails.value.isClockedIn
        workType.value = workHourDetails.value.workType
        clockedInTimeRaw.value = workHourDetails.value.clockedInTime
        clockedOutTimeRaw.value = workHourDetails.value.clockedOutTime
    }
})
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
                    <div class="text-primary">{{ clockedInTime }}</div>
                </div>
                <UDivider />
                <div class="flex flex-col gap-2">
                    <div class="font-semibold opacity-70">Clocked Out Time</div>
                    <div class="text-primary">{{ clockedOutTime }}</div>
                </div>
            </div>
        </UCard>
    </div>
</template>