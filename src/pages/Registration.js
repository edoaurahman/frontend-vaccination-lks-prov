import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development"
import { API_URL } from "../utils/API_URL"

function Registration({user}) {
    const navigate = useNavigate()

    const Detail = (e) => {
        navigate("/spot/" + e)
    }
    useEffect(() => {
        axios.get(API_URL + '/v1/spots/' + user.login_tokens)
        .then(res => {
            setSpot(res.data.spots)
        })

        axios.get(API_URL + '/v1/region/' + user.regional_id)
        .then(res => {
            setRegional(res.data.region);
        })
    }, [])
    const [spot,setSpot] = useState(null)
    const [regional, setRegional] = useState(null)
    console.log(spot);
    return (
        <div>
            <main>
                {/* <!-- S: Header --> */}
                <header className="jumbotron">
                    <div className="container">
                        <h1 className="display-4">First Vaccination</h1>
                    </div>
                </header>
                {/* <!-- E: Header --> */}

                <div className="container mb-5">

                    <div className="section-header mb-4">
                        <h4 className="section-title text-muted font-weight-normal">List Vaccination Spots in {regional && regional.district}</h4>
                    </div>

                    <div className="section-body">
                    {spot ? spot.map(item => (

                        <article className="spot" key={item.id}>
                            <div className="row">
                                <div className="col-5">
                                    <span></span>
                                    <h5 className="text-primary" onClick={() =>Detail(item.id)}>{item.name}</h5>
                                    <span className="text-muted">{item.address}</span>
                                </div>
                                <div className="col-4">
                                    <h5>Available vaccines</h5>
                                    <span className="text-muted">
                                        {item.available_vaccines.AstraZeneca === "true" ? "AstraZeneca" : null},
                                        {item.available_vaccines.Moderna === "true" ? "Moderna" : null},
                                        {item.available_vaccines.Pfizer === "true" ? "Pfizer" : null},
                                        {item.available_vaccines.Sinnopharm === "true" ? "Sinnopharm" : null},
                                        {item.available_vaccines.Sinovac === "true" ? "Sinovac" : null},
                                        </span>
                                </div>
                                <div className="col-3">
                                    <h5>Serve</h5>
                                    <span className="text-muted">
                                    {item.serve === 1 ? "Only first vaccination" : item.serve === 2 ? "Only Second vaccination" : "Both Vaccinations"}
                                </span>
                                </div>
                            </div>
                        </article>                        
                    ))
                :
                null}

                    </div>

                </div>

            </main>
        </div>
    )
}

export default Registration