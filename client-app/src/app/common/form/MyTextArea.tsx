import React from 'react';
import {useField} from "formik";
import {Form, Label} from 'semantic-ui-react';

interface Props {
    name: string,
    rows: number,
    placeholder: string,
    label?: string
}



function MyTextArea(props: Props) {
    const [field,meta] = useField(props)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.name}</label>
            <textarea {...field} {...props}/>
            {meta.touched && meta.error ? (
                <Label basic color={"red"}>{meta.error}</Label>
            ): null}
        </Form.Field>
    )
}

export default MyTextArea;