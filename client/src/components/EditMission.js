import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function EditMission(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.put('http://localhost:2121/mission/editMission', {
      missionsName: data.get('missionsName'),
      id: data.get('missionsId'),
      date: data.get('date'),
      importance: data.get('importance'),
    }).then(() => {
      console.log('Mission edit successful');
    }).catch(() => {
      console.log('Internal server error');
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
              <label htmlFor="missionsName">Mission name</label>
              <input
                type="text"
                placeholder="Enter mission name"
                name='missionsName'
                defaultValue={props.name}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="date">date</label>
              <input
                type="date"
                name='date'
                defaultValue={props.date}
              />
            </div>

            <div>
              <label htmlFor="importance">Importance level</label>
              <select name="importance" select={props.importance}>
                <option value="1" >Low</option>
                <option value="2">Medium</option>
                <option value="3">High</option>
              </select>
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

export default EditMission;