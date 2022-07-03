import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react/cjs/react.development"
import { API_URL } from "../utils/API_URL"

function Consultation({ user }) {
    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault()
        const data = {
            disease_history: e.target.disease_history.value,
            current_symptoms: e.target.current_symptoms.value
        }
        postSubmit(data)
    }
    console.log(user);
    function postSubmit(data) {
        axios.post(API_URL + '/v1/consultations/' + user.login_tokens, data)
            .then(res => {
                console.log(res.data);
                if (res.data.status === "200") {
                    alert(res.data.message)
                    navigate('/dashboard')
                } else {
                    alert(res.data.message)
                }
            })
            .catch(err => console.log(err))
    }

    function disableForm(e) {
        if (e.target.value === "yes") {
            setDisable1(false)
        } else {
            setDisable1(true)

        }
    }

    function disableForm1(e) {
        if (e.target.value === "yes") {
            setDisable(false)
        } else {
            setDisable(true)

        }
    }

    const [disable, setDisable] = useState(true)
    const [disable1, setDisable1] = useState(true)
    return (
        <div>
            <main>
                {/* <!-- S: Header --> */}
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Request Consultation</h1>
                    </div>
                </header>
                {/* <!-- E: Header --> */}

                <div className="container">

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label htmlFor="disease-history"
                                            className="mr-3 mb-0">Do you have disease history ?</label>
                                        <select className="form-control-sm" onChange={disableForm}>
                                            <option value="no">No</option>
                                            <option value="yes">Yes, I have</option>
                                        </select>
                                    </div>
                                    <textarea disabled={disable1} hidden={disable1}
                                        id="disease-history" className="form-control"
                                        cols="30" rows="10" placeholder="Describe your disease history"
                                        name="disease_history"></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <div className="d-flex align-items-center mb-3">
                                        <label htmlFor="current-symptoms"
                                            className="mr-3 mb-0">Do you have symptoms now ?</label>
                                        <select className="form-control-sm" onChange={disableForm1}>
                                            <option value="no">No</option>
                                            <option value="yes">Yes, I have</option>
                                        </select>
                                    </div>
                                    <textarea disabled={disable} hidden={disable}
                                        id="current-symptoms" className="form-control"
                                        cols="30" rows="10" placeholder="Describe your current symptoms"
                                        name="current_symptoms"></textarea>
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary">Send Request</button>
                    </form>

                </div>

            </main>
        </div>
    )
}
export default Consultation