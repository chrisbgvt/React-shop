import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';

// import { AuthContext } from "../../contexts/AuthContext";
import TextField from "../../Inputs/TextField";

const Search = ({search}) => {
    // const { userLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [flag, setFlag] = useState({text: '', check: false});
    const validate = Yup.object().shape({
        query: Yup.string()
            .min(3, 'type at lest 3 symbols')
    });


    return (
        <Container>
            <Row>
                <Col>
                    <Formik 
                        enableReinitialize={true}
                        initialValues={{query: ''}}
                        validationSchema={validate}
                        onSubmit={(values, { setSubmitting }) => {
                            search(values)
                            setSubmitting(false);
                          }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            values,
                            errors,
                            touched,
                            isValid,
                            isSubmitting,
                            resetForm
                        }) => (
                            <Form>
                                {flag.check && <Alert variant="danger">{flag.text}</Alert>}
                                <TextField name="query" placeholder="Search..." type="text" onChange={handleChange} value={values.query} />

                                <div className={'d-flex justify-content-between'}>
                                    <Button variant="primary" type="submit">Search</Button>
                                    <Button variant="secondary ml-2" type="reset" onClick={resetForm}>Reset</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Col>
            </Row>
        </Container>
    );
}

export default Search;