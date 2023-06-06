import {makeAutoObservable, runInAction} from "mobx";
import {Activity} from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from "uuid";

export default class ActivityStore{
    activityRegistry = new Map<string, Activity>()
    selectedActivity: Activity | undefined  = undefined
    editMode = false
    loading = true
    submitting = false
    target = ""

    constructor() {
        makeAutoObservable(this)
    }

    get activities(){
        return Array.from(this.activityRegistry.values())
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=>
        Date.parse(a.date) - Date.parse(b.date)
        )
    }

    loadActivities = async () => {
        try {
            const responseActivities = await agent.Activities.list()
            responseActivities.forEach(activity=> {
                activity.date = activity.date.substring(0,10)
                this.activityRegistry.set(activity.id,activity)
            })
            this.setLoading(false)
        } catch (error){
            console.log(error)
            this.setLoading(false)
        }
    }

    setLoading=(state:boolean)=>{
        this.loading = state
    }

    selectActivity=(id:string)=>{
        this.selectedActivity = this.activityRegistry.get(id)
    }

    cancelSelectedActivity= ()=>{
        this.selectedActivity = undefined
    }

    openForm= (id?: string) =>{
        id ? this.selectActivity(id) : this.cancelSelectedActivity()
        this.editMode = true
    }

    closeForm = () =>{
        this.editMode = false
    }

    createActivity =async (activity: Activity)=>{
        this.submitting = true
        activity.id = uuid()
        try {
            await agent.Activities.create(activity)
            runInAction(()=>{
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity
                this.editMode = false
                this.submitting = false
            })
        } catch (e) {
            console.log(e)
            runInAction(()=>{
                this.submitting = false
            })
        }
    }

    updateActivity =async (activity: Activity)=>{
        this.submitting = true
        try {
            await agent.Activities.update(activity)
            runInAction(()=>{
                // we can do it also by filtering first and then pushing
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity
                this.editMode = false
                this.submitting = false
            })
        }
        catch (e) {
            console.log(e)
            runInAction(()=>{
                this.submitting = false
            })

        }
    }

    deleteActivity = async (id:string)=>{
        this.submitting = true
        try {
            await agent.Activities.delete(id)
            runInAction(()=>{
                this.activityRegistry.delete(id)
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity()
                this.submitting = false
            })
        }
        catch (e) {
            console.log(e)
            runInAction(()=>{
                this.submitting = false
            })
        }
    }
}