import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";
import TextField from "../Inputs/TextField";

const Login = () => {
    const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [flag, setFlag] = useState({text: '', check: false});
    const validate = Yup.object().shape({
        username: Yup.string()
            .min(4, 'Username must be more than 3 characters')
            .required('Required'),
        password: Yup.string()
            .min(4, 'Password must be more than 3 characters')
            .required('Required'),
    });

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Login</h1>
                    <Formik 
                        initialValues={{ username: '', password: '' }}
                        validationSchema={validate}
                        onSubmit={(values, { setSubmitting }) => {
                            authService.login(values.username, values.password)
                                .then(authData => {
                                    userLogin(authData);
                                    setSubmitting(false);
                                    navigate('/');
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
                                <TextField label="Username" name="username" type="text" onChange={handleChange} value={values.username} />
                                <TextField label="Password" name="password" type="password" onChange={handleChange} value={values.password} />

                                <Button variant="primary" type="submit">Login</Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;