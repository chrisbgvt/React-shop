import { Button, Modal } from 'react-bootstrap';

const DeleteModal = ({ close, show, del, product }) => {
    return (
        <Modal show={show} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body className={'text-center'}>Are you sure you want to delete {product.title}!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={close}>
                    No
                </Button>
                <Button variant="primary" onClick={() => del(product._id)}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;