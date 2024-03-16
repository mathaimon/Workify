// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false, // for Appwrite to work properly
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  runtimeConfig:{
    public:{
      appwriteProjectId: "",
      appwriteApiEndpoint:"",
      appwriteDatabaseId:"",
      appwriteCollectionWorkhoursId:""
    }
  }
})
