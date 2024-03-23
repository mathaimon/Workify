<script setup>
const workHours = useWorkHours()
const allWorkHours = workHours.allWorkHours

const router = useRouter()
const openId = () => {
    router.push({ name: 'work-hours-id', params: { id: '44444444' } })
}

onMounted(() => {
    workHours.listWorkHours()
})
</script>
<template>
    <div class="flex flex-col items-center justify-center pt-5">
        <h1 class="text-3xl font-semibold text-center">Work Hours</h1>
        <div class="flex flex-col mt-10 w-full items-center justify-center gap-5">
            <UButton @click="openId">Open Route</UButton>
            <WorkHourDetailCard v-for="workHour in allWorkHours" :workHour="workHour" />
        </div>
    </div>
</template>