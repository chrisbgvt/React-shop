import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import * as authService from "../../services/authService";
import TextField from "../Inputs/TextField";
import SelectField from "../Inputs/SelectField";

const Register = () => {
    const navigate = useNavigate();
    const [flag, setFlag] = useState({text: '', check: false});
    const validate = Yup.object().shape({
        username: Yup.string()
            .min(4, 'Username must be more than 3 characters')
            .required('Required'),
        password: Yup.string()
            .min(4, 'Password must be more than 3 characters')
            .required('Required'),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Repeat password must match password')
            .required('Repeat password is required'),
        role: Yup.string()
            .required('Role is required'),
    });

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Register</h1>
                    <Formik 
                        initialValues={{ username: '', password: '', repeatPassword: '', role: 'user' }}
                        validationSchema={validate}
                        onSubmit={(values, { setSubmitting }) => {
                            authService.register(values.username, values.password, values.repeatPassword, values.role)
                                .then(authData => {
                                    setSubmitting(false);
                                    navigate('/login');
                                })
                                .catch(err => {
                                    setFlag(state => ({
                                        ...state,
                                        text: err.error, 
                                        check: true
                                    }));
                                });
                          }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            touched,
                            isValid,
                            isSubmitting
                        }) => (
                            <Form>
                                {flag.check && <Alert variant="danger">{flag.text}</Alert>}
                                <TextField label="Username" name="username" type="text" />
                                <TextField label="Password" name="password" type="password" />
                                <TextField label="Repeat password" name="repeatPassword" type="password" />
                                <SelectField label="Role" name="role" />

                                <Button variant="primary" type="submit">Register</Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;