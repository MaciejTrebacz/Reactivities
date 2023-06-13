import React, {useEffect} from "react";
import {Grid} from "semantic-ui-react";
import ActivityList from "./ActivityList";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore()

    // using axios
    useEffect(() => {
        if (activityStore.activityRegistry.size <= 1) activityStore.loadActivities()
    }, [activityStore.loadActivities,activityStore.activityRegistry.size]);

    if (activityStore.loading) return <LoadingComponent content={"Loading App"}></LoadingComponent>

    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
   )
})