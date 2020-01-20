import React from 'react';
import PropTypes from 'prop-types';
import Button from "../Button/Button";
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const ModalAreYouSure = props => {
    const {user, isOpen, isConfirm, description} = props;
    return (
        <div>
            <Modal isOpen={isOpen} centered={true}>
                <ModalHeader>Are you sure?</ModalHeader>
                <ModalBody>
                    {`${description} ${user.lastName} ${user.firstName}?`}
                </ModalBody>
                <ModalFooter>
                    <Button variant='danger' onClick={() => isConfirm(true)}>Delete</Button>
                    <Button variant='primary' onClick={() => isConfirm(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
};

ModalAreYouSure.propTypes = {
    user: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    isConfirm: PropTypes.func.isRequired
};

export default ModalAreYouSure;
