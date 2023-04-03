import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function EditTask(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.put('http://localhost:2121/task/edit', {
      id: data.get('missionsId'),
      task: data.get('task'),
      oldTask: data.get('oldTask'),
    }).then(() => {
      console.log('Task edited');
    }).catch(() => {
      console.log('Task edit unsuccessful');
    });

  }

  return (
    <>
      <FontAwesomeIcon icon={faPenToSquare} onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Mission</Modal.Title>
        </Modal.Header>
        <form onSubmit={submit} >
          <Modal.Body>

            <div className="mb-2">
              <label htmlFor="task">Task</label>
              <input
                type="text"
                placeholder="Enter mission name"
                name='task'
                defaultValue={props.task}
              />
            </div>
            <div>
              <input
                type="hidden"
                name='oldTask'
                defaultValue={props.task}
              />
            </div>
            <div>
              <input
                type="hidden"
                name='missionsId'
                defaultValue={props.missionId}
              />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" onClick={handleClose}>Submit</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default EditTask;