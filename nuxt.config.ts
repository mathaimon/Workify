// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // for Appwrite to work properly
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui', 
    '@vueuse/nuxt'
  ],
  runtimeConfig:{
    public:{
      appwriteProjectId: "",
      appwriteApiEndpoint:"",
      appwriteRealtimeEndpoint:"",
      appwriteDatabaseId:"",
      appwriteCollectionWorkhoursId:"",
    }
  },
  app:{
    head:{
        title : "Workify",
        meta : [
          {name: 'description', content: "Log, Visualize and Analyze Work Hours"},
          {name: 'og:image', content:'/og-image.png'}
        ],
        link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }]
    }
  }
})
