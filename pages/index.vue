<script setup>
const workHours = useWorkHours()

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
const workType = ref("in-office")
const disableClockIn = ref(false)

const startTime = ref();
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
let interval = null;

const updateTime = () => {
    const now = new Date();
    const elapsedTime = now - startTime.value
    hours.value = Math.floor(elapsedTime / (1000 * 60 * 60));
    minutes.value = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    seconds.value = Math.floor((elapsedTime % (1000 * 60)) / 1000).toString().padStart(2, '0');
};

onMounted(() => {
    workHours.checkClockedIn()
    workHours.setRealtimeSubscription()
});

onUnmounted(() => {
    if (interval) clearInterval(interval)
    workHours.unsubscribeRealtime()
});

watchEffect(() => {
    if (isClockedIn.value) {
        startTime.value = new Date(workHours.lastClockIn.value["clockedInTime"])
        updateTime()
        interval = setInterval(updateTime, 1000);
        workType.value = workHours.lastClockIn.value["workType"]
        disableClockIn.value = false
    }
})

const clockIn = () => {
    disableClockIn.value = true
    workHours.clockIn({
        isClockedIn: true,
        clockedInTime: new Date().toISOString(),
        workType: workType.value
    })
}

const clockOut = () => {
    workHours.clockOut()
}
</script>

<template>
    <div class="flex flex-col items-center justify-center pt-5">
        <h1 class="text-3xl font-semibold text-center">Work Hour Tracker</h1>
        <UCard class="w-full max-w-md mt-10">
            <div class="flex flex-col gap-4">
                <div v-if="isClockedIn" class="block">
                    <div class="text-5xl font-semibold text-center text-primary-700"><span v-show="hours > 0">{{ hours
                            }}:</span>{{ minutes }}:{{
                    seconds }}
                    </div>
                    <div class="mt-0 font-semibold text-center opacity-70">Since Clocked-in</div>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="font-semibold opacity-70">Work Type</div>
                    <USelect :disabled="isClockedIn" placeholder="Work Type" :options="workTypes" v-model="workType"
                        color="primary" variant="outline" size="xl" />
                </div>
                <UButton v-if="!isClockedIn" @click="clockIn" :disabled="disableClockIn" variant="solid" size="xl"
                    class="flex justify-center">
                    Clock In
                </UButton>
                <UButton v-if="isClockedIn" @click="clockOut" variant="solid" size="xl" class="flex justify-center">
                    Clock Out
                </UButton>
            </div>
        </UCard>
    </div>
</template>