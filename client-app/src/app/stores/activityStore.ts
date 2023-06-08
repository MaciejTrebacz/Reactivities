import {makeAutoObservable, runInAction} from "mobx";
import {Activity} from "../models/activity";
import agent from "../api/agent";
import {v4 as uuid} from "uuid";

export default class ActivityStore{
    activityRegistry = new Map<string, Activity>()
    selectedActivity: Activity | undefined  = undefined
    editMode = false
    loading = false
    submitting = false
    target = ""

    constructor() {
        makeAutoObservable(this)
    }

    setEditMode=(state: boolean)=>{
        this.editMode = state
    }

    get activities(){
        return Array.from(this.activityRegistry.values())
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=>
        Date.parse(a.date) - Date.parse(b.date)
        )
    }

    get groupedActivities(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity)=> {
                const date = activity.date
                activities[date] = activities[date] ? [...activities[date], activity] : [activity]
                return activities
            }, {} as {[key:string]: Activity[]} )
        )
    }


    loadActivities = async () => {
        this.setLoading(true)
        try {
            const responseActivities = await agent.Activities.list()
            responseActivities.forEach(activity=> {
                this.setActivity(activity)
            })
            this.setLoading(false)
        } catch (error){
            console.log(error)
            this.setLoading(false)
        }
    }


    loadActivity = async (id:string)=>{
        let activity = this.getActivity(id)
        if (activity) {
            this.selectedActivity = activity
            return activity
        }
        else {
            this.setLoading(true)
            try {
                activity = await agent.Activities.details(id)
                this.setActivity(activity)
                runInAction(()=> this.selectedActivity = activity)
                this.setLoading(false)
                return activity
            }
            catch (e) {
                console.log(e)
                this.setLoading(false)
            }
        }
    }

    private setActivity = (activity: Activity) =>{
        activity.date = activity.date.substring(0,10)
        this.activityRegistry.set(activity.id,activity)
    }


    private getActivity = (id: string)=>{
        return this.activityRegistry.get(id)
    }

    setLoading=(state:boolean)=>{
        this.loading = state
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