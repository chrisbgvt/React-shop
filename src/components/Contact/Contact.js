import { useState } from "react";
import { Formik, Form } from 'formik';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import * as contactService from '../../services/contactService';

import TextField from "../Inputs/TextField";

const Contact = () => {
    const [flag, setFlag] = useState({text: '', check: false});
    const validate = Yup.object().shape({
        email: Yup.string()
            .email('Email must be valid')
            .required('Required'),
        subject: Yup.string()
            .min(4, 'Subject must be more than 3 characters')
            .required('Required'),
        text: Yup.string()
            .min(10, 'Text must be at least 10 characters')
            .required('Required'),
    });

    return (
        <>
            <Container className="my-5">
                <Row>
                    <Col>
                        <h1>Contact</h1>
                        <Formik 
                            initialValues={{ email: '', subject: '', text: '' }}
                            validationSchema={validate}
                            onSubmit={(values, { setSubmitting }) => {
                                contactService.sendContactForm(values)
                                    .then(result => {
                                        setFlag(state => ({
                                            ...state,
                                            text: result.message, 
                                            check: true
                                        }));
                                        setSubmitting(false);
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
                                    <TextField label="Email" name="email" type="email" onChange={handleChange} value={values.email} />
                                    <TextField label="Subject" name="subject" type="text" onChange={handleChange} value={values.subject} />
                                    <TextField label="Text" name="text" type="textarea" onChange={handleChange}>{values.text}</TextField>

                                    <Button variant="primary" type="submit">Send</Button>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="mt-5 px-0">
                <Row>
                    <Col>
                        <iframe title="map" 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2914.142765948469!2d25.630260799999995!3d43.080493800000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a9261070ce92d9%3A0x6ee741acaa9f5e49!2z0LHRg9C7LiDigJ7QktCw0YHQuNC7INCb0LXQstGB0LrQuOKAnCwgNTAwMCDQktC10LvQuNC60L4g0KLRitGA0L3QvtCy0L4g0KbQtdC90YLRitGALCDQktC10LvQuNC60L4g0KLRitGA0L3QvtCy0L4!5e0!3m2!1sbg!2sbg!4v1661462213442!5m2!1sbg!2sbg" 
                            width="100%" 
                            height="450" 
                            style={{border: 0, display: 'block'}} 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Contact;