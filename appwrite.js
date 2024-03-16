import { Client, Databases } from "appwrite";

const config = useRuntimeConfig()
const client = new Client()

client.setEndpoint(config.public.appwriteApiEndpoint).setProject(config.public.appwriteProjectId)

export const database = new Databases(client)
