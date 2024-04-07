<script setup>
const workHours = useWorkHours()
const allWorkHours = workHours.allWorkHours

const showSkeletonLoader = workHours.isLoading

onMounted(() => {
    workHours.listWorkHours()
})
</script>
<template>
    <div class="flex flex-col items-center justify-center pt-5">
        <h1 class="text-3xl font-semibold text-center">Work Hours</h1>
        <div v-auto-animate class="flex flex-col mt-10 w-full items-center justify-center gap-5">
            <UCard class="w-full max-w-md" v-if="showSkeletonLoader">
                <div class="flex justify-between items-center px-3 animate-pulse">
                    <div class="flex flex-col items-start gap-2">
                        <div class="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                        <div class="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    </div>
                    <div class="w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-md">
                    </div>
                </div>
            </UCard>
            <WorkHourDetailCard v-else v-for="workHour in allWorkHours" :workHour="workHour" />
        </div>
    </div>
</template>