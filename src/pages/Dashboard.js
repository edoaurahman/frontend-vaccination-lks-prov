import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development"
import { API_URL } from "../utils/API_URL"

function Dashboard({ user }) {

    useEffect(() => {
        function getConsultation() {
            axios.get(API_URL + '/v1/consultations/' + user.login_tokens)
                .then(res => {
                    if (res.data.status === "200") {
                        setConsultation(res.data.consultation)
                        axios.get(API_URL + '/v1/medical/' + res.data.consultation[0].doctor_id)
                            .then(res => [
                                setDoctor(res.data.data)
                            ])
                    }else{
                        alert("Logout")
                    }
                })
        }
        getConsultation()

        function getAllVaccinations() {
            axios.get(API_URL + '/v1/vaccinations/' + user.login_tokens)
                .then(res => {
                    setVaccinations(res.data);
                    if (res.data.totalVaccine >= 1) {
                        document.getElementById("firstVaccination").classList.add("d-none")
                    }
                })
        }
        getAllVaccinations()
    }, [user.login_tokens])

    const [consultation, setConsultation] = useState(null)
    const [doctor, setDoctor] = useState(null)
    const [vaccinations, setVaccinations] = useState(null)
    console.log(vaccinations);

    return (
        <div>
            <main>
                {/* <!-- S: Header --> */}
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">Dashboard</h1>
                    </div>
                </header>
                {/* <!-- E: Header --> */}

                <div className="container">

                    {/* <!-- S: Consultation Section --> */}
                    <div>
                        <section className="consultation-section mb-5">
                            <div className="section-header mb-3">
                                <h4 className="section-title text-muted">My Consultation</h4>
                            </div>
                            <div className="row">

                                <div className="col-md-4">
                                    <div className="card card-default">
                                        <div className="card-header">
                                            <h5 className="mb-0">Consultation</h5>
                                        </div>
                                        <div className="card-body">
                                            <Link to="/consultation">+ Request consultation</Link>
                                        </div>
                                    </div>
                                </div>

                                {consultation ? consultation.map(item => (

                                    <div className="col-md-4" key={item.id}>
                                        <div className="card card-default">
                                            <div className="card-header border-0">
                                                <h5 className="mb-0">Consultation</h5>
                                            </div>
                                            <div className="card-body p-0">
                                                <table className="table table-striped mb-0">
                                                    <tbody>
                                                        <tr>
                                                            <th>Status</th>
                                                            <td><span className="badge badge-info">{item.status}</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Disease History</th>
                                                            <td className="text-muted">{item.disease_history}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Current Symptoms</th>
                                                            <td className="text-muted">{item.current_symptoms}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Doctor Name</th>
                                                            <td className="text-muted">{doctor && doctor.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Doctor Notes</th>
                                                            <td className="text-muted">{item.doctor_notes}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                ))
                                    :
                                    null}
                            </div>
                        </section>
                    </div>
                    {/* <!-- E: Consultation Section --> */}

                    {/* <!-- S: List Vaccination Section --> */}
                    <section className="consultation-section mb-5">
                        <div className="section-header mb-3">
                            <h4 className="section-title text-muted">My Vaccinations</h4>
                        </div>
                        <div className="section-body">
                            <div className="row mb-4">

                                {/* <!-- S: First Vaccination info --> */}
                                {consultation && consultation.map((item) => (
                                    item.status === "accepted" ? "" :
                                        <div className="col-md-12">
                                            <div className="alert alert-warning">
                                                Your consultation must be approved by doctor to get the vaccine.
                                            </div>
                                        </div>
                                ))}

                                {consultation && consultation.map((item) => (
                                    item.status === "accepted" ?
                                        <div id="firstVaccination" className="col-md-4" key={item.id}>
                                            <div className="card card-default">
                                                <div className="card-header border-0">
                                                    <h5 className="mb-0">First Vaccination</h5>
                                                </div>
                                                <div className="card-body">
                                                    <Link to="/registration">+ Register vaccination</Link>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        ""
                                ))}
                                {/* <!-- E: Link to Register First Vaccination --> */}

                                {/* <!-- S: First Vaccination Box (Registered) --> */}
                                {vaccinations && vaccinations.totalVaccine === 0 ? "" :
                                    <div className="col-md-4">
                                        <div className="card card-default">
                                            <div className="card-header border-0">
                                                <h5 className="mb-0">First Vaccination</h5>
                                            </div>
                                            <div className="card-body p-0">
                                                <table className="table table-striped mb-0">
                                                    <tbody>

                                                        <tr>
                                                            <th>Status</th>
                                                            <td className="text-muted"><span className="badge badge-info">{vaccinations && vaccinations.first.status}</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Date</th>
                                                            <td className="text-muted">{vaccinations && vaccinations.first.date}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Spot</th>
                                                            <td className="text-muted">{vaccinations && vaccinations.first.spot.name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Vaccine</th>
                                                            <td className="text-muted">{vaccinations && vaccinations.first.vaccine ? vaccinations.first.vaccine.name : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Vaccinator</th>
                                                            <td className="text-muted">{vaccinations && vaccinations.first.vaccinator ? vaccinations.first.vaccinator.name : "-"}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {/* <!-- S: First Vaccination Box (Registered) --> */}

                                {/* <!-- S: First Vaccination Box (Done) --> */}

                                {/* <!-- S: First Vaccination Box (Done) --> */}

                            </div>

                            <div className="row">


                                {/* <!-- S: Link to Register Second Vaccination --> */}

                                {vaccinations && vaccinations.totalVaccine === 1 && vaccinations.first.status !== "pending" ?
                                    <div className="col-md-4">
                                        <div className="card card-default">
                                            <div className="card-header border-0">
                                                <h5 className="mb-0">Second Vaccination</h5>
                                            </div>
                                            <div className="card-body">
                                                <Link to="/registration">+ Register vaccination</Link>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    ""
                                }
                                {/* <!-- E: Link to Register First Vaccination --> */}

                                {/* <!-- S: First Vaccination Box (Registered) --> */}
                                {vaccinations && vaccinations.totalVaccine === 2 ?
                                    <div className="col-md-4">
                                        <div className="card card-default">
                                            <div className="card-header border-0">
                                                <h5 className="mb-0">Second Vaccination</h5>
                                            </div>
                                            <div className="card-body p-0">
                                                <table className="table table-striped mb-0">
                                                    <tbody>

                                                        <tr>
                                                            <th>Status</th>
                                                            <td className="text-muted"><span className="badge badge-info">{vaccinations && vaccinations.totalVaccine !== 0 ? vaccinations.second.status : null}</span></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Date</th>
                                                            <td className="text-muted">{vaccinations && vaccinations.totalVaccine !== 0 ? vaccinations.second.date : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Spot</th>
                                                            <td className="text-muted">{vaccinations && vaccinations.totalVaccine !== 0 ? vaccinations.second.spot.name : null}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Vaccine</th>
                                                            <td className="text-muted">{vaccinations && vaccinations.second.vaccine ? vaccinations.second.vaccine.name : "-"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Vaccinator</th>
                                                            <td className="text-muted">{vaccinations && vaccinations.second.vaccinator ? vaccinations.second.vaccinator.name : "-"}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    ""
                                }
                                {/* <!-- S: Second Vaccination Box (Registered) --> */}

                                {/* <!-- S: Second Vaccination Box (Done) --> */}
                                {/* <!-- S: Second Vaccination Box (Done) --> */}

                            </div>

                        </div>
                    </section>
                    {/* <!-- E: List Vaccination Section --> */}

                </div>

            </main>
        </div>
    )
}
export default Dashboard