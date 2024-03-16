import { Query } from "appwrite";
import { database } from "~/appwrite";

const config = useRuntimeConfig()

const lastClockIn = ref()
const isClockedIn = computed(()=>{
    return lastClockIn.value ? true : false
})

export const useWorkHours = () =>{
    const checkClockedIn = async()=>{
        const response = await database.listDocuments(
            config.public.appwriteDatabaseId,
            config.public.appwriteCollectionWorkhoursId,
            [Query.equal("isClockedIn", true)]
        )
        lastClockIn.value = response.documents[0]
    }

    return{
        checkClockedIn,
        lastClockIn,
    }
}

export {
    isClockedIn
}
