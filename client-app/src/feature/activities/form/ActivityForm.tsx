import React, {ChangeEvent, useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";


export default observer(function ActivityForm() {

    const {activityStore} = useStore()
    const initialState = activityStore.selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }
    const [activity, setActivity] =
        useState(initialState)


    function handleSubmit(){
        if (activity.id){
            activityStore.updateActivity(activity)
        }
        else {
            activityStore.createActivity(activity)
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {value,name} = event.target
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder={'Title'} value={activity.title} name='title' onChange={handleInputChange}/>
                <Form.TextArea placeholder={'Description'} value={activity.description} name='description' onChange={handleInputChange}/>
                <Form.Input placeholder={'Category'} value={activity.category} name='category' onChange={handleInputChange}/>
                <Form.Input type='date' placeholder={'Date'} value={activity.date} name='date' onChange={handleInputChange}/>
                <Form.Input placeholder={'City'} value={activity.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder={'Venue'} value={activity.venue} name='venue' onChange={handleInputChange}/>

                <Button loading={activityStore.submitting} floated={'right'} positive type={'submit'} content={'submit'}></Button>
                <Button onClick={activityStore.closeForm} floated={'right'}  type={'button'} content={'Cancel'}></Button>
            </Form>
        </Segment>
    )
})