import React from 'react';
import { ErrorMessage, useField } from 'formik';
import { Form } from 'react-bootstrap';

const SelectField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="mb-2">
            <label htmlFor={field.name}>{label}</label>
            <Form.Select 
                className={`form-control ${meta.touched && meta.error && 'is-invalid'}`} 
                {...field} {...props}
                aria-label="Default select example"
            >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </Form.Select>
            <ErrorMessage component="div" name={field.name} className="text-danger" />
        </div>
    )
}

export default SelectField;