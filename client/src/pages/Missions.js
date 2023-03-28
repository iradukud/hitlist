import React from 'react';
//import axios - enables communication with server
import axios from 'axios';
//import bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
//import signout component
import SignoutBtn from '../components/SignoutBtn'

class Missions extends React.Component {
    state = {
        missionsName: '',
        //new Date().toISOString().substring(0, 10)
        date: '',
        importance: 0,
        //Enter all mission tasks, with a comma seperating them
        tasks: '',
        missions: [],
    };

    componentDidMount = () => {
        this.getMissions();
    };

    getMissions = () => {
        axios.get('http://localhost:2121/mission/missions')
            .then((response) => {
                console.log(response)
                const data = response.data.missions;
                console.log(data)
                this.setState({ missions: data });
                console.log('Data has been received!!');
            })
            .catch(() => {
                alert('Error retrieving data!!!');
            });
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };


    submit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:2121/mission/create', {
            missionsName: this.state.missionsName,
            date: this.state.date,
            importance: this.state.importance,
            tasks: this.state.tasks,
        }).then(() => {
            console.log('Data has been sent to the server');
            this.resetUserInputs();
            this.getMissions();
        }).catch(() => {
            console.log('Internal server error');
        });
    };

    resetUserInputs = () => {
        this.setState({
            missionsName: '',
            date: '',
            importance: 0,
            tasks: '',
        });
    };

    displayMissions = (missions) => {
        if (!missions.length) return null;


        return missions.map((mission) => (
            <section key={mission['_id']}>
                <h3 id={mission['_id']}>{'Mission: '}
                    <span className={missions.importance === 1 ? "high" : missions.importance === 2 ? 'medium' : 'low'}>{mission['mission']}</span>
                    <i className="editMission far fa-edit"></i>
                    <i className='delMission fas fa-trash-alt'></i>
                </h3>
                <ul>
                    {mission.tasks.map((task, index) => {
                        return <li className='task' >
                            <span className={task.task.completed === true ? ' completed' : 'not'}>{task.task}</span>
                            <i className="editTask far fa-edit"></i>
                            <i className='deltask far fa-trash-alt'></i>
                        </li>
                    })}
                </ul>
            </section>
        ));
    };

    render() {

        return (
            <div>
                <SignoutBtn />

                <form onSubmit={this.submit} className="d-flex justify-content-center mt-5">
                    <div className="col-3 fields">
                        <div className="field d-flex justify-content-between mb-2">
                            <label htmlFor="missionsName">Mission name</label>
                            <input
                                type="text"
                                placeholder="Enter mission name"
                                name='missionsName'
                                value={this.state.missionsName}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="field d-flex justify-content-between mb-2">
                            <label htmlFor="date">Mission date</label>
                            <input
                                type="date"
                                name='date'
                                value={this.state.date}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="field d-flex justify-content-between mb-2">
                            <label htmlFor="importance">Importance level</label>
                            <select
                                name="importance"
                                value={this.state.importance}
                                onChange={this.handleChange}
                            >
                                <option disabled defaultValue value="0">-- select an option --</option>
                                <option value="1">High</option>
                                <option value="2">Medium</option>
                                <option value="3">Low</option>
                            </select>
                        </div>
                        <div className="field d-flex justify-content-between align-items-center mb-2">
                            <label htmlFor="missionTasks">Mission tasks</label>
                            <textarea
                                name="tasks"
                                placeholder="Enter all mission tasks, with a comma seperating them"
                                rows="4"
                                value={this.state.tasks}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </form>

                <div className='mt-5'>
                    {this.displayMissions(this.state.missions)}
                </div>



            </div>
        )
    }
}

export default Missions;