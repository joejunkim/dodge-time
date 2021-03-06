import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditGroupForm from './EditGroupForm';

function EditGroupModalsdfsd() {
    const [showModal, setShowModal] = useState(false);

    return (
       <>
        <button onClick={() => setShowModal(true)}>Edit Group</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditGroupForm />
          </Modal>
        )}
      </>
    )
}

export default EditGroupModalsdfsd;
