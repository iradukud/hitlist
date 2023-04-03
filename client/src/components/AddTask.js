import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function AddTask(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.put('http://localhost:2121/task/add', {
      id: data.get('missionsId'),
      task: data.get('task'),
    }).then(() => {
      console.log('Task added');
    }).catch(() => {
      console.log('Task addition unsuccessful');
    });

  }

  return (
    <>
      <FontAwesomeIcon icon={faPlus} onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <form onSubmit={submit} >
          <Modal.Body>

            <div className="mb-2">
              <label htmlFor="task">Task</label>
              <input
                type="text"
                placeholder="Task"
                name='task'
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

export default AddTask;