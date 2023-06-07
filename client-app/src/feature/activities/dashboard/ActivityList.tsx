import React, {SyntheticEvent} from "react";
import {Button, Item, Label, Segment} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";



export default observer(function ActivityList() {

    const {activityStore} = useStore()

    function handleDeleteActivity(e: SyntheticEvent<HTMLButtonElement>, id: string ) {
        activityStore.target = e.currentTarget.name
        activityStore.deleteActivity(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {activityStore.activitiesByDate.map(activity=> (
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
                                    onClick={()=> activityStore.loadActivity(activity.id)}
                                    to={`/activities/${activity.id}`}
                                    floated={"right"}
                                    content={"View"}
                                    color={"green"}/>
                                <Button
                                    name={activity.id}
                                    onClick={(e)=>handleDeleteActivity(e,activity.id)}
                                    floated={"right"}
                                    content={"Delete"}
                                    loading={activityStore.submitting && activityStore.target === activity.id}
                                    color={"red"}/>
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})