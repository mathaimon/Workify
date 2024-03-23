<script setup>
const workHours = useWorkHours()
const allWorkHours = workHours.allWorkHours

onMounted(() => {
    workHours.listWorkHours()
})
</script>
<template>
    <div class="flex flex-col items-center justify-center pt-5">
        <h1 class="text-3xl font-semibold text-center">Work Hours</h1>
        <div class="flex flex-col mt-10 w-full items-center justify-center gap-5">
            <WorkHourDetailCard v-for="workHour in allWorkHours" :workHour="workHour" />
        </div>
    </div>
</template>