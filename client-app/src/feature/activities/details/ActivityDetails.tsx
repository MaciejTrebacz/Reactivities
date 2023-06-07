import React, {useEffect} from "react";
import {Button, Card,Image} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {Link, useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";


export default observer(function  ActivityDetails() {

    const {activityStore} = useStore()

    const {selectedActivity: activity} = activityStore
    const {id} = useParams();

    useEffect(() => {
        if (id) activityStore.loadActivity(id)
    }, [id,activityStore.loadActivity]);


    if (activityStore.loading || !activity) return <LoadingComponent/>;

    return(
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>
                    {activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={'2'}>
                    <Button as={Link}
                            to={`/manage/${activity.id}`}
                            onClick={()=> activityStore.loadActivity(activity.id)}
                            basic color={'blue'} content={'Edit'}/>
                    <Button
                            as={Link}
                            to={"/activities"}
                        basic color={'grey'} content={'Cancel'}/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
})