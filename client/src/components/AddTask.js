import { useState } from 'react';
//bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//axios
import axios from 'axios';
//fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
//context
import { useMissionsContext } from '../hooks/useMissionsContext';
import { useAuthContext } from '../hooks/useAuthContext';

function AddTask({ missionId }) {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  
  const { dispatch } = useMissionsContext();
  const { user } = useAuthContext();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    if (!user) {
      setError('You must be logged in')
      return
    }

    axios.put(`/task/add/${data.get('missionsId')}`, {
      task: data.get('task'),
    }, {
      headers: { 'Authorization': `Bearer ${user.token}` }
    }).then((response) => {
      console.log('task added', response.data.mission);
      dispatch({ type: 'EDIT_MISSION', payload: response.data.mission })
      handleClose();
    }).catch((error) => {
      console.log(error.response.data.error);
      setError(error.response.data.error);
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
                defaultValue={missionId}
              />
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit">Submit</Button>
          </Modal.Footer>
          {error && <div className='error'>{error}</div>}
        </form>
      </Modal>
    </>
  );
}

export default AddTask;