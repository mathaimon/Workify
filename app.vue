<template>
  <div>
    <NavBar />
    <NuxtPage class="p-3" />
    <UNotifications :ui="{ container: 'items-center' }" />
  </div>
</template>

<style>
@import url("https://api.fontshare.com/v2/css?f[]=space-grotesk@1,300,700,500,400,600&display=swap");

body {
  font-family: 'Space Grotesk', sans-serif;
}
</style>