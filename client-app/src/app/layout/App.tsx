import React, {Fragment, useEffect, useState} from 'react';
import axios from "axios";
import {Container} from "semantic-ui-react";
import {Activity} from "../models/activity";
import NavBar from "./NavBar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import {v4 as uuid} from 'uuid';

function App() {

  const [activities , setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] =
      useState<Activity | undefined>(undefined);
  const [editMode, SetEditMode] = useState(false)
  
  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities')
        .then(response => {
          setActivities(response.data);
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
        SetEditMode(true)
    }

    function handleFormClose() {
        SetEditMode(false)
    }

    function handleEditOrCreate(activity: Activity){
      activity.id
          ? setActivities([...activities.filter(a=>a.id !==activity.id),activity])
          : setActivities([...activities, {...activity, id: uuid()}]);
      SetEditMode(false);
      setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string){
        setActivities([...activities.filter(a=>a.id!== id)])
    }

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
              />
        </Container>
    </Fragment>
  );
}

export default App;
