<script setup>
const colorMode = useColorMode()
const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})

// Toggle darkmode with keyboard shortcut
const ctrlPressed = ref(false);

const keydownHandler = (event) => {
    if (event.key === 'Control') {
        ctrlPressed.value = true;
    }
    if (ctrlPressed.value && event.key === '/') {
        event.preventDefault(); // Prevent the browser's default save action
        isDark.value = !isDark.value
    }
};

const keyupHandler = (event) => {
    if (event.key === 'Control') {
        ctrlPressed.value = false;
    }
};

onMounted(() => {
    window.addEventListener('keydown', keydownHandler);
    window.addEventListener('keyup', keyupHandler);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', keydownHandler);
    window.removeEventListener('keyup', keyupHandler);
});
</script>

<template>
    <nav
        class="sticky top-0 z-50 px-4 py-3 -mb-px border-b border-gray-200 bg-background/75 backdrop-blur dark:border-gray-800 sm:px-6">
        <div class="flex items-center justify-between h-12 gap-3">
            <NuxtLink to="/" class="flex items-center justify-center">
                <Icon name="ph:hammer-duotone" class="text-primary" />
                <h1 class="ml-3 text-2xl font-semibold">Workify</h1>
            </NuxtLink>
            <ClientOnly>
                <UButton variant="soft" aria-label="Theme" @click="isDark = !isDark">
                    <UIcon :name="isDark ? 'material-symbols:dark-mode' : 'material-symbols:light-mode'" size="22px"
                        dynamic />
                </UButton>
            </ClientOnly>
        </div>
    </nav>
</template>