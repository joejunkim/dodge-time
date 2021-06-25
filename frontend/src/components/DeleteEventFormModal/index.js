import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteEventForm from './DeleteEventForm'

function DeleteEventModal() {
    const [showModal, setShowModal] = useState(false);

    return (
       <>
        <button onClick={() => setShowModal(true)}>Delete Event</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <DeleteEventForm />
          </Modal>
        )}
      </>
    )
}

export default DeleteEventModal;
