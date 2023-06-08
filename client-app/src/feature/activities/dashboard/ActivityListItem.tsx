import React, {SyntheticEvent} from 'react';
import {Button, Item, Label} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Activity} from "../../../app/models/activity";
import {useStore} from "../../../app/stores/store";

interface Props {
    activity: Activity
}
function ActivityListItem({activity}: Props) {

    const {activityStore}= useStore()
    const {deleteActivity,loadActivity,submitting,} = activityStore

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string ) {
        activityStore.target = e.currentTarget.name
        deleteActivity(id);
    }

    return (
        <Item key={activity.id}>
            <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.city},  {activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button
                        as={Link}
                        onClick={()=> loadActivity(activity.id)}
                        to={`/activities/${activity.id}`}
                        floated={"right"}
                        content={"View"}
                        color={"green"}/>
                    <Button
                        name={activity.id}
                        onClick={(e)=>handleDeleteActivity(e,activity.id)}
                        floated={"right"}
                        content={"Delete"}
                        loading={submitting && activityStore.target === activity.id}
                        color={"red"}/>
                    <Label basic content={activity.category}/>
                </Item.Extra>
            </Item.Content>
        </Item>
    );
}

export default ActivityListItem;