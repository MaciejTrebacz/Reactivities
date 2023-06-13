import React, {SyntheticEvent} from 'react';
import {Button, Icon, Item,Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {Activity} from "../../../app/models/activity";
import {useStore} from "../../../app/stores/store";
import logo from "../../../images/user.png"

interface Props {
    activity: Activity
}
function ActivityListItem({activity}: Props) {

    const {activityStore}= useStore()


    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size={'tiny'} circular src={logo}/>
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name={'clock'}></Icon> {activity.date  }
                      <Icon name={'marker'}></Icon> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button as={Link}
                        to={`/activities/${activity.id}`}
                        color={"teal"}
                        floated={"right"}
                        content={"View"}
                ></Button>
            </Segment>
        </Segment.Group>
    );
}

export default ActivityListItem;