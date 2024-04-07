import {ID, Query } from "appwrite";
import { client, database } from "~/appwrite";

const config = useRuntimeConfig()

const isLoading = ref(true)
const lastClockIn = ref()
const isClockedIn = computed(()=>{
    return lastClockIn.value ? true : false
})

let subscription = null

const allWorkHours = ref()
const workHourDetails = ref()

export const useWorkHours = () =>{
    const checkClockedIn = async()=>{
        isLoading.value = true
        const response = await database.listDocuments(
            config.public.appwriteDatabaseId,
            config.public.appwriteCollectionWorkhoursId,
            [Query.equal("isClockedIn", true)]
        )
        lastClockIn.value = response.documents[0]
        isLoading.value = false
    }

    const clockIn = async(workHourData)=>{
        isLoading.value = true
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
        isLoading.value = false
    }

    const clockOut = async()=>{
        isLoading.value = true
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
        isLoading.value = false
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

    const listWorkHours = async()=>{
        isLoading.value = true
        const response = await database.listDocuments(
            config.public.appwriteDatabaseId,
            config.public.appwriteCollectionWorkhoursId,
            [
                Query.orderDesc("clockedInTime"),
                Query.equal("isClockedIn", false)
            ]
        )
        allWorkHours.value=response.documents
        isLoading.value = false
    }

    const getWorkHourDetails = async(workHourId)=>{
        isLoading.value = true
        const response = await database.listDocuments(
            config.public.appwriteDatabaseId,
            config.public.appwriteCollectionWorkhoursId,
            [
                Query.equal("$id", workHourId)
            ]
        )
        workHourDetails.value = response.documents[0]
        isLoading.value = false
    }

    const deleteWorkHour = async(workHourId)=>{
        isLoading.value = true
        const response = await database.deleteDocument(
            config.public.appwriteDatabaseId,
            config.public.appwriteCollectionWorkhoursId,
            workHourId
        )
        await listWorkHours()
        isLoading.value = false
    }

    const updateWorkHour = async(workHourId, workHourData)=>{
        isLoading.value = true
        const response = await database.updateDocument(
            config.public.appwriteDatabaseId,
            config.public.appwriteCollectionWorkhoursId,
            workHourId,
            workHourData
        )
        await getWorkHourDetails()
        isLoading.value = false
    }

    return{
        checkClockedIn,
        lastClockIn,
        clockIn,
        clockOut,
        setRealtimeSubscription,
        unsubscribeRealtime,
        listWorkHours,
        allWorkHours,
        isLoading,
        getWorkHourDetails,
        workHourDetails,
        deleteWorkHour,
        updateWorkHour
    }
}

export {
    isClockedIn
}
