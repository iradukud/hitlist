import { useState } from 'react';
//bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//axios
import axios from 'axios';
//fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
//context
import { useMissionsContext } from '../hooks/useMissionsContext';

function EditTask({ task, missionId }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useMissionsContext();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.put(`/task/edit/${data.get('missionsId')}`, {
      task: data.get('task'),
      oldTask: data.get('oldTask'),
    }, {
      //headers: { 'Authorization': `Bearer ${user.token}` }
    }).then((response) => {
      console.log('task edited', response.data.mission);
      dispatch({ type: 'EDIT_MISSION', payload: response.data.mission })
      handleClose();
    }).catch((error) => {
      console.log(error.response.data.error);
      setError(error.response.data.error);
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
                defaultValue={task}
              />
            </div>
            <div>
              <input
                type="hidden"
                name='oldTask'
                defaultValue={task}
              />
            </div>
            <div>
              <input
                type="hidden"
                name='missionsId'
                defaultValue={missionId}
              />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" >Submit</Button>
          </Modal.Footer>
          {error && <div className='error'>{error}</div>}
        </form>
      </Modal>
    </>
  );
}

export default EditTask;