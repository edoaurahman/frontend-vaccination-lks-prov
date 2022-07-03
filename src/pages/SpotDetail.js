import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { API_URL } from "../utils/API_URL";

function SpotDetail({ user }) {
    const navigate = useNavigate()
    const { id } = useParams()
    const [spot, setSpot] = useState(null)
    const slots = document.querySelectorAll(".slot")

    function getSpot(e) {
        const date = e.target.value
        setDate(date)
        axios.get(API_URL + '/v1/spots/token/' + user.login_tokens + '/date/' + date + '/id/' + id)
            .then(res => {
                setSpot(res.data)
                // refreshSpot()
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        const refreshSpot = () => {
            slots.forEach(slot => {
                slot.classList.remove("bg-primary");
                slot.classList.remove("filled");
                slot.classList.remove("text-white")

            });
            if (spot) {
                for (let i = 0; i < spot.vaccinations_count; i++) {
                    slots[i].classList.add("filled")
                }
                slots[spot.vaccinations_count].classList.add("bg-primary")
                slots[spot.vaccinations_count].classList.add("text-white")
            }
        }
        refreshSpot()
    }, [slots, spot])


    function postRegisterVaccine() {
        const data = {
            date: Date,
            spot_id: id
        }
        axios.post(API_URL + "/v1/vaccinations/" + user.login_tokens, data)
            .then(res => {
                if (res.data.status === "200") {
                    alert(res.data.message)
                    navigate('/dashboard')
                } else {
                    alert(res.data.message)
                    navigate('/dashboard')
                }
            })
    }

    const [Date, setDate] = useState(null)


    return (
        <div>
            <main>
                {/* <!-- S: Header --> */}
                <header className="jumbotron">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div>
                            <h1 className="display-4">Napitupulu Hospital</h1>
                            <span className="text-muted">Jln. HOS. Cjokroaminoto (Pasirkaliki) No. 900, DKI Jakarta</span>
                        </div>
                        <button type="button" onClick={postRegisterVaccine} className="btn btn-primary">Register vaccination</button>
                    </div>
                </header>
                {/* <!-- E: Header --> */}

                <div className="container">

                    <div className="row mb-3">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="vaccination-date">Select vaccination date</label>
                                <input type="date" className="form-control" id="vaccination-date" onChange={getSpot} />
                            </div>
                        </div>
                    </div>

                    <div className="row mb-5">

                        {/* <!-- S: Session 1 --> */}
                        <div className="col-md-4">
                            <div className="card card-default">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <h4>Session 1</h4>
                                        <span className="text-muted">09:00 - 11:00</span>
                                    </div>
                                    <div>
                                        <div className="row">
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #1 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #2 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #3 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #4 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #5 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- E: Session 1 --> */}

                        {/* <!-- S: Session 2 --> */}
                        <div className="col-md-4">
                            <div className="card card-default">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <h4>Session 2</h4>
                                        <span className="text-muted">13:00 - 15:00</span>
                                    </div>
                                    <div>
                                        <div className="row">
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #6 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #7 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #8 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #9 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #10 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- E: Session 2 --> */}

                        {/* <!-- S: Session 3 --> */}
                        <div className="col-md-4">
                            <div className="card card-default">
                                <div className="card-body">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <h4>Session 3</h4>
                                        <span className="text-muted">15:00 - 17:00</span>
                                    </div>
                                    <div>
                                        <div className="row">
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #11 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #12 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #13 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #14 </div>
                                            </div>
                                            <div className="col-4 mb-4">
                                                <div className="slot"> #15 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- E: Session 3 --> */}

                    </div>

                </div>

            </main>
        </div>
    )
}

export default SpotDetail