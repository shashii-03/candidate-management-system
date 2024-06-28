import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom'
import axios from 'axios'

import { Link } from 'react-router-dom';


const Candidate = () => {
    const [candidate, setCandidate] = useState([]);
    const [id, setId] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("https://60d5a2c2943aa60017768b01.mockapi.io/candidate").then(result => {
            setCandidate(result.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])


    const candidateAdding = () => {
        navigate("/candidate/new")
    }


    return (
        <div className="container-fluid vh-100">
            <div className="row h-100 flex-nowrap">
                <div className="col-lg-6 vh-100 bg-light">
                    <div className="d-flex p-4 flex-column align-items-center align-items-sm-start col-lg-6 vh-100">
                        <h2>Candidate List</h2>
                        <div className="container mt-4">
                            <button className="btn btn-primary mb-3" onClick={candidateAdding}>Add Candidate</button>
                            <ul className="list-group">
                                {candidate.map(candi => (
                                    <li key={candi.id} className="list-group-item">
                                        <Link to={`/candidate/${candi.id}`} className="text-decoration-none">{candi.name === '' ? "no name" : candi.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <div className="p-4 d-flex justify-content-center">
                        <h2>Candidate Details</h2>
                    </div>
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Candidate



