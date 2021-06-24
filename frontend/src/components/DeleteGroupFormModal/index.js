import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteGroupForm from './DeleteGroupForm'

function DeleteGroupModal() {
    const [showModal, setShowModal] = useState(false);

    return (
       <>
        <button onClick={() => setShowModal(true)}>Delete Group</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <DeleteGroupForm />
          </Modal>
        )}
      </>
    )
}

export default DeleteGroupModal;
