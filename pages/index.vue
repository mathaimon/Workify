<script setup>
const workTypes = ["In-Office", "Work-from-Home", "Other"]
const workType = ref("In-Office")

const startTime = ref(new Date('2024-03-09T21:00:00'));
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
let interval = null;

const updateTime = () => {
    const now = new Date();
    const elapsedTime = now - startTime.value;
    hours.value = Math.floor(elapsedTime / (1000 * 60 * 60));
    minutes.value = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    seconds.value = Math.floor((elapsedTime % (1000 * 60)) / 1000).toString().padStart(2, '0');
};

onMounted(() => {
    updateTime();
    interval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
    clearInterval(interval);
});


</script>

<template>
    <div class="flex flex-col items-center justify-center pt-5">
        <h1 class="text-3xl font-semibold text-center">Work Hour Tracker</h1>
        <UCard class="w-full max-w-md mt-10">
            <div class="flex flex-col gap-4">
                <div class="block">
                    <div class="text-5xl font-semibold text-center text-primary-700"><span v-show="hours > 0">{{ hours
                            }}:</span>{{ minutes }}:{{
                        seconds }}
                    </div>
                    <div class="mt-0 font-semibold text-center opacity-70">Since Clocked-in</div>
                </div>
                <USelect placeholder="Work Type" :options="workTypes" v-model="workType" color="primary"
                    variant="outline" size="xl" class="mt-4" />
                <UButton variant="solid" size="xl" class="flex justify-center">Clock In</UButton>
                <UButton variant="solid" size="xl" class="flex justify-center">Clock Out</UButton>
            </div>
        </UCard>
    </div>
</template>