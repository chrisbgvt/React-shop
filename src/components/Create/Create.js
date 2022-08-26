import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import * as productService from "../../services/productService";
import TextField from "../Inputs/TextField";

const Create = ({createHandler}) => {
    const navigate = useNavigate();
    const [flag, setFlag] = useState({text: '', check: false});
    const validate = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Title must be at least 2 carecters long')
            .required('Required'),
        image: Yup.string()
            .matches(
                /http(.*)$/,
                'Image need to be a link'
            )
            .required('Required'),
        price: Yup.number()
            .min(1, 'Price must be a positive number')
            .positive()
            .required('Required'),
        quantity: Yup.number()
            .min(1, 'Quantity must be a positive number')
            .positive()
            .required('Required'),
        description: Yup.string()
            .min(10, 'Description must be at least 10 characters')
            .required('Required'),
    });

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1>Create Product</h1>
                    <Formik 
                        initialValues={{ title: '', image: '', price: '', quantity: '', description: '' }}
                        validationSchema={validate}
                        onSubmit={async (values, { setSubmitting }) => {
                            const product = {
                                title: values.title,
                                image: values.image,
                                price: values.price,
                                quantity: values.quantity,
                                description: values.description
                            }
                            
                            try {
                                const createdProduct = await productService.create(product)
                                setSubmitting(false);
                                createHandler(createdProduct)
                                navigate('/catalog');
                            } catch (err) {
                                setFlag(state => ({
                                    ...state,
                                    text: err.message, 
                                    check: true
                                }));
                            }
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
                                <TextField label="Title" name="title" type="text" onChange={handleChange} value={values.title} />
                                <TextField label="Image" name="image" type="text" onChange={handleChange} value={values.image} />
                                <TextField label="Price" name="price" type="number" onChange={handleChange} value={values.price} />
                                <TextField label="Quantity" name="quantity" type="number" onChange={handleChange} value={values.quantity} />
                                <TextField label="Description" name="description" type="textarea" onChange={handleChange}>{values.description}</TextField>

                                <Button variant="primary" type="submit">Create</Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}

export default Create;