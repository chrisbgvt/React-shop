import { Formik, Form } from 'formik';
import { Container, Row, Col, Button } from 'react-bootstrap';
import * as Yup from 'yup';

import TextField from "../../Inputs/TextField";

const Search = ({search}) => {
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