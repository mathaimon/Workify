<script setup>
const props = defineProps({
    workHour: Object
})

const hours = ref(0)
const minutes = ref(0)

onMounted(() => {
    const elapsedTime = new Date(props.workHour.clockedOutTime) - new Date(props.workHour.clockedInTime)
    hours.value = Math.floor(elapsedTime / (1000 * 60 * 60));
    minutes.value = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
})

const formatedDate = useDateFormat(new Date(props.workHour.clockedInTime), "D MMM")
const formatedWeekday = useDateFormat(new Date(props.workHour.clockedInTime), "dddd")
</script>
<template>
    <UCard class="w-full max-w-md">
        <div class="flex justify-between items-center px-3">
            <div class="flex flex-col items-start">
                <div class="text-xl font-semibold">{{ formatedDate }}</div>
                <div>{{ formatedWeekday }}</div>
            </div>
            <div class="text-3xl font-semibold text-primary-700">
                {{ hours }}:{{ minutes }} <span class="text-base font-normal">Hrs</span>
            </div>
        </div>
    </UCard>
</template>