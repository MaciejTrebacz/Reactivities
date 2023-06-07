import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Form, Segment} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from "uuid";


export default observer(function ActivityForm() {


    const {activityStore} = useStore()
    const {id} = useParams()
    const navigate = useNavigate();


    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    })

    useEffect(() => {
        if (id) activityStore.loadActivity(id).then(activity=>setActivity(activity!))
    }, [id,activityStore.loadActivity]);


    if (activityStore.loading || !activity) return <LoadingComponent content={'Loading edit FORM'}/>;


    function handleSubmit(){
        if (activity.id){
            activityStore.updateActivity(activity).then(()=>navigate(`/activities/${activity.id}`))
        }
        else {
            activity.id = uuid()
            activityStore.createActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
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
                <Button as={Link} to={'/activities'} floated={'right'}  type={'button'} content={'Cancel'}></Button>
            </Form>
        </Segment>
    )
})