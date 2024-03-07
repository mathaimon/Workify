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
</script>

<template>
    <nav
        class="bg-background/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 px-4 sm:px-6 py-3">
        <div class="flex items-center justify-between gap-3 h-12">
            <NuxtLink to="/" class="flex items-center justify-center">
                <Icon name="ph:hammer-duotone" class="text-primary" />
                <h1 class="text-2xl font-semibold ml-3">Workify</h1>
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