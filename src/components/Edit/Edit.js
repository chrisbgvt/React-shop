import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form } from 'formik';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';

import * as productService from "../../services/productService";
import TextField from "../Inputs/TextField";

const Edit = ({updateHandler}) => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [flag, setFlag] = useState({text: '', check: false});
    const [product , setProduct] = useState([]);
    const initialValues = {
        title: product?.title ?? "", 
        image: product?.image ?? "", 
        price: product?.price ?? "", 
        quantity: product?.quantity ?? "", 
        description: product?.description ?? ""
    }
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

    useEffect(() => {
        productService.getOne(productId)
            .then(result => {
                setProduct(result);
            })
            .catch(err => {
                setFlag(state => ({
                    ...state,
                    text: err.error, 
                    check: true
                }));
            });
    }, [productId])


    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1>Edit Product</h1>
                    <Formik 
                        enableReinitialize={true}
                        initialValues={initialValues}
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
                                const updatedProduct = await productService.edit(product, productId)
                                setSubmitting(false);
                                updateHandler(updatedProduct)
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

                                <Button variant="primary" type="submit">Edit</Button>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}

export default Edit;