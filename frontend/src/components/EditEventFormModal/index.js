import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditEventForm from './EditEventForm';

function EditEventModal() {
    const [showModal, setShowModal] = useState(false);

    return (
       <>
        <button onClick={() => setShowModal(true)}>Edit Event</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditEventForm />
          </Modal>
        )}
      </>
    )
}

export default EditEventModal;
