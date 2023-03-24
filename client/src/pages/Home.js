import { Link } from 'react-router-dom';
import heroImage from '../assets/7050554.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    return (
        <div className="px-4 py-5 my-5 text-center">
            <img className="d-block mx-auto mb-4" src={heroImage} alt="checklist" width="72" height="57" />
            <h1 className="display-5 fw-bold">Hitlist</h1>
            <div className="col-lg-6 mx-auto">
                <p className="lead mb-4">
                    App that let user easiy keep track of daily task and goals
                </p>

                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    {/* link to signin page */}
                    <Link to="/signin">
                        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">SignIn</button>
                    </Link>

                    {/* link to signup page */}
                    <Link to="/signup">
                        <button type="button" className="btn btn-outline-secondary btn-lg px-4">SignUp</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;