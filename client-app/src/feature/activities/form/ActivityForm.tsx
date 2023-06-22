import React, {useEffect, useState} from "react";
import {Button, Header, Segment} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from "uuid";
import {Formik, Form} from "formik";
import * as Yup from 'yup'
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MyDateInput from "./MyDateInput";
import {Activity} from "../../../app/models/activity";


export default observer(function ActivityForm() {


    const {activityStore} = useStore()
    const {id} = useParams()
    const navigate = useNavigate();


    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    })

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required(),
        date: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
    })


    useEffect(() => {
        if (id) activityStore.loadActivity(id).then(activity=>setActivity(activity!))
    }, [id,activityStore.loadActivity]);


    if (activityStore.loading || !activity) return <LoadingComponent content={'Loading edit FORM'}/>;


    function handleFormSubmit(activity: Activity){
        if (activity.id){
            activityStore.updateActivity(activity).then(()=>navigate(`/activities/${activity.id}`))
        }
        else {
            activity.id = uuid()
            activityStore.createActivity(activity).then(()=> navigate(`/activities/${activity.id}`))
        }
    }
    //
    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const {value,name} = event.target
    //     setActivity({...activity, [name]: value})
    // }

    return (
        <Segment clearing>
            <Header content={'Activity Details'} sub color={'teal'}/>
                <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
            {({handleSubmit, isValid,isSubmitting,dirty})=>(
                <Form className={'ui form'}   onSubmit={handleSubmit} autoComplete='off'>
                    <MyTextInput placeholder={'Title'} name={'title'}/>
                    <MyTextArea rows={3} placeholder={'Description'} name='description'/>
                    <MyTextInput placeholder={'Category'}  name='category' />
                    <MyDateInput
                        placeholderText={'Date'}
                        name={'date'}
                        showTimeSelect
                        timeCaption={'time'}
                        dateFormat={'MMMM d, yyyy h:mm aa'}
                    />

                    <Header content={'Location Details'} sub color={'teal'}/>

                    <MyTextInput placeholder={'City'} name='city' />
                    <MyTextInput placeholder={'Venue'}  name='venue' />

                    <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={activityStore.submitting} floated={'right'} positive type={'submit'} content={'submit'}></Button>
                    <Button as={Link} to={'/activities'} floated={'right'}  type={'button'} content={'Cancel'}></Button>
                </Form>)}
            </Formik>
        </Segment>
    )
})