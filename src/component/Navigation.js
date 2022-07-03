import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { API_URL } from "../utils/API_URL"

function Navigation({ user, setUser }) {
    const navigate = useNavigate()
    function Logout() {
        const token = {
            token: user.login_tokens
        }
        console.log(token);
        axios.post(API_URL + '/v1/auth/logout', token)
            .then(res => {
                if (res.data.status === "200") {
                    navigate('/login')
                    localStorage.removeItem("user")
                    setUser(null)
                } else {
                    alert(res.data.message)
                }
            })
    }
    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="#">Vaccination Platform</a>
                    <button className="navbar-toggler" type="button"
                        data-toggle="collapse"
                        data-target="#navbarsExampleDefault"
                        aria-controls="navbarsExampleDefault"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        {user ?
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">{user && user.name}</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={Logout}>Logout</a>
                                </li>
                            </ul>
                            :
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation