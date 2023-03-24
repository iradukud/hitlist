//import axios - enables communication with server
import axios from 'axios';
//import page routing w/o sending new server request
import { Link } from 'react-router-dom';
//import bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';


function Missions() {
    return (
        <div>

            <form className="d-flex justify-content-center mt-5">
                <div className="col-3 fields">
                    <div className="field d-flex justify-content-between mb-2">
                        <label htmlFor="mission">Mission name</label>
                        <input type="text" placeholder="Enter mission name" name='mission' required />
                    </div>
                    <div className="field d-flex justify-content-between mb-2">
                        <label htmlFor="date">Mission date</label>
                        <input type="date" name='date' required />
                    </div>
                    <div className="field d-flex justify-content-between mb-2">
                        <label htmlFor="importance">Importance level</label>
                        <select name="importance">
                            <option value="1">High</option>
                            <option value="2">Medium</option>
                            <option value="3">Low</option>
                        </select>
                    </div>
                    <div className="field d-flex justify-content-between align-items-center mb-2">
                        <label htmlFor="missionTasks">Mission tasks</label>
                        <textarea name="missionTasks" placeholder="Enter all mission tasks, with a comma seperating them" rows="4" required></textarea>
                    </div>
                    <div className="text-center">
                    <button type="submit">submit</button>
                </div>
                </div>
            </form>

        </div>
    )
}

export default Missions;