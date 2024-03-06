<template>
  <div class="flex items-center justify-center min-h-screen">
    <UCard>
      <div class="flex">
        <div class="flex items-center justify-center">
          <Icon name="ph:hammer-duotone" class="text-primary" size="40px" />
        </div>
        <h1 class="text-5xl font-semibold ml-5">Workify</h1>
      </div>
      <template #footer>
        <p>Log and Visualize your work hours</p>
      </template>
    </UCard>
  </div>
</template>

<style>
@import url("https://api.fontshare.com/v2/css?f[]=space-grotesk@1,300,700,500,400,600&display=swap");

body {
  font-family: 'Space Grotesk', sans-serif;
}
</style>