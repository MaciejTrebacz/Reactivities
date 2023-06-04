import React, {Fragment, useEffect, useState} from 'react';
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {

    const [activities , setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting]= useState(false);


    // using axios
    useEffect(()=>{
        agent.Activities.list()
            .then(response => {
                response.forEach(x=>x.date = x.date.substring(0,10))
                setActivities(response);
                setLoading(false);
            })
    }, [])


    function handleSelectActivity(id: string) {
        setSelectedActivity(activities.find(a=>a.id===id))
    }

    function cancelSelectActivity(){
      setSelectedActivity(undefined)
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : cancelSelectActivity();
        setEditMode(true)
    }

    function handleFormClose() {
        setEditMode(false)
    }

    function handleEditOrCreate(activity: Activity){
        setSubmitting(true)
        if (activity.id){
            agent.Activities.update(activity).then(()=>{
                setActivities([...activities.filter(x=>x.id !== activity.id),activity])
                setSelectedActivity(activity)
                setEditMode(false)
                setSubmitting(false)
            })
        } else {
            activity.id = uuid()
            agent.Activities.create(activity).then(()=>{
                setActivities([...activities,activity])
                setSelectedActivity(activity)
                setEditMode(false)
                setSubmitting(false)
            })

        }
    }

    function handleDeleteActivity(id: string){
        setSubmitting(true)
        agent.Activities.delete(id).then(()=>{
            if (selectedActivity && selectedActivity.id === id){
                setActivities([...activities.filter(a=>a.id!== id)])
                setSelectedActivity(undefined)
                setEditMode(false)
                setSubmitting(false)
            }
            else {
                setActivities([...activities.filter(a=>a.id!== id)])
                setSubmitting(false)
            }
        })

    }
    if (loading) return <LoadingComponent content={"Loading App"}></LoadingComponent>

    return (
    <Fragment>
        <NavBar openForm={handleFormOpen}/>
        <Container style={{marginTop: '7em'}}>
            <ActivityDashboard
                activities={activities}
                selectedActivity = {selectedActivity}
                selectActivity = {handleSelectActivity}
                cancelActivity = {cancelSelectActivity}
                editMode = {editMode}
                openForm = {handleFormOpen}
                closeForm = {handleFormClose}
                createOrEdit = {handleEditOrCreate}
                deleteActivity = {handleDeleteActivity}
                submitting={submitting}
              />
        </Container>
    </Fragment>
  );
}

export default App;
