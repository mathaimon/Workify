<script setup>
const workHours = useWorkHours()
const showLoading = workHours.isLoading
</script>
<template>
    <div v-if="showLoading"
        class="absolute bg-white dark:bg-opacity-60 dark:bg-gray-900 bg-opacity-50 p-4 z-50 size-full flex items-center justify-center">
        <div class="flex items-center justify-center gap-3">
            <Icon name="ph:circle-notch-duotone" class="text-primary animate-spin" />
            <div>Fetching Data</div>
        </div>
    </div>
</template>