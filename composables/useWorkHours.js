import {ID, Query } from "appwrite";
import { client, database } from "~/appwrite";

const config = useRuntimeConfig()

const lastClockIn = ref()
const isClockedIn = computed(()=>{
    return lastClockIn.value ? true : false
})

let subscription = null

const allWorkHours = ref()

export const useWorkHours = () =>{
    const checkClockedIn = async()=>{
        const response = await database.listDocuments(
            config.public.appwriteDatabaseId,
            config.public.appwriteCollectionWorkhoursId,
            [Query.equal("isClockedIn", true)]
        )
        lastClockIn.value = response.documents[0]
    }

    const clockIn = async(workHourData)=>{
        await checkClockedIn()
        if(!isClockedIn.value){
            await database.createDocument(
                config.public.appwriteDatabaseId,
                config.public.appwriteCollectionWorkhoursId,
                ID.unique(),
                workHourData
            )
            await checkClockedIn()
        }
    }

    const clockOut = async()=>{
        await database.updateDocument(
            config.public.appwriteDatabaseId,
            config.public.appwriteCollectionWorkhoursId,
            lastClockIn.value["$id"],
            {
                isClockedIn: false,
                clockedOutTime: new Date().toISOString()
            }
        )
        await checkClockedIn()
    }

    const setRealtimeSubscription = ()=>{
        subscription =client.subscribe(`databases.${config.public.appwriteDatabaseId}.collections.${config.public.appwriteCollectionWorkhoursId}.documents`,async ()=>{
            await checkClockedIn();
        })
    } 

    const unsubscribeRealtime = ()=>{
        if (subscription){
            subscription() 
            subscription=null
        }
    }

    const listWorkHours=async()=>{
        const response = await database.listDocuments(
            config.public.appwriteDatabaseId,
            config.public.appwriteCollectionWorkhoursId,
            [
                Query.orderDesc("clockedInTime"),
                Query.equal("isClockedIn", false)
            ]
        )
        allWorkHours.value=response.documents
    }

    return{
        checkClockedIn,
        lastClockIn,
        clockIn,
        clockOut,
        setRealtimeSubscription,
        unsubscribeRealtime,
        listWorkHours,
        allWorkHours
    }
}

export {
    isClockedIn
}
