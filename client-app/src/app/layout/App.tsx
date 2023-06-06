import React, {Fragment, useEffect} from 'react';
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import {useStore} from "../stores/store";
import {observer} from "mobx-react-lite";

function App() {
    const {activityStore} = useStore();

    // using axios
    useEffect(() => {
        activityStore.loadActivities();
    }, [activityStore]);


    if (activityStore.loading) return <LoadingComponent content={"Loading App"}></LoadingComponent>

    return (
    <Fragment>
        <NavBar/>
        <Container style={{marginTop: '7em'}}>
            <ActivityDashboard/>
        </Container>
    </Fragment>
  );
}

export default observer(App);
