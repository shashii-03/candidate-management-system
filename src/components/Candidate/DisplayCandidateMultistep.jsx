import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DisplayCandidateMultistep = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        profile_picture: '',
        name: '',
        email: '',
        gender: '',
        hobbies: [],
        education: [{ institute: '', year_of_graduation: '' }],
        skills: [{ name: '', experience: '' }],
        experience: [{ company: '', project: '', role: '', duration_from: '', duration_to: '' }]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, index, field, arrayName) => {
        const newArray = [...formData[arrayName]];
        newArray[index][field] = e.target.value;
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const handleAddField = (arrayName) => {
        const newArray = [...formData[arrayName], {}];
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const handleRemoveField = (index, arrayName) => {
        const newArray = [...formData[arrayName]];
        newArray.splice(index, 1);
        setFormData({ ...formData, [arrayName]: newArray });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`, formData);
            navigate("/candidate");
        } catch (error) {
            console.error("Error updating candidate: ", error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`);
            navigate("/candidate");
        } catch (error) {
            console.error("Error deleting candidate: ", error);
        }
    };

    const renderStep1 = () => (
        <div>
            <h3>Personal Details</h3>
            <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                {editMode ? (
                    <input
                        type="text"
                        className="form-control"
                        name="profile_picture"
                        value={formData.profile_picture}
                        onChange={handleChange}
                    />
                ) : (
                    <>
                        <p>{formData.profile_picture}</p>

                        <img src={formData.profile_picture} alt="Profile" className="img-fluid img-thumbnail mt-2" style={{ width: '150px', height: '150px' }} />

                    </>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Name</label>
                {editMode ? (
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{formData.name}</p>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                {editMode ? (
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{formData.email}</p>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Gender</label>
                {editMode ? (
                    <select
                        className="form-control"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                ) : (
                    <p>{formData.gender}</p>
                )}
            </div>
            <div className="mb-3">
                <label className="form-label">Hobbies</label>
                {editMode ? (
                    <input
                        type="text"
                        className="form-control"
                        name="hobbies"
                        value={formData.hobbies.join(', ')}
                        onChange={(e) => setFormData({ ...formData, hobbies: e.target.value.split(', ') })}
                    />
                ) : (
                    <p>{formData.hobbies.join(', ')}</p>
                )}
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div>
            <h3>Education</h3>
            {formData.education.map((edu, index) => (
                <div key={index} className="mb-3">
                    <label className="form-label">Institute</label>
                    {editMode ? (
                        <input
                            type="text"
                            className="form-control"
                            value={edu.institute}
                            onChange={(e) => handleArrayChange(e, index, 'institute', 'education')}
                        />
                    ) : (
                        <p>{edu.institute}</p>
                    )}
                    <label className="form-label">Year of Graduation</label>
                    {editMode ? (
                        <input
                            type="text"
                            className="form-control"
                            value={edu.year_of_graduation}
                            onChange={(e) => handleArrayChange(e, index, 'year_of_graduation', 'education')}
                        />
                    ) : (
                        <p>{edu.year_of_graduation}</p>
                    )}
                    {editMode && (
                        <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveField(index, 'education')}>Remove</button>
                    )}
                </div>
            ))}
            {editMode && (
                <button type="button" className="btn btn-secondary" onClick={() => handleAddField('education')}>Add Education</button>
            )}
        </div>
    );

    const renderStep3 = () => (
        <div>
            <h3>Skills</h3>
            {formData.skills.map((skill, index) => (
                <div key={index} className="mb-3">
                    <label className="form-label">Name of Skill</label>
                    {editMode ? (
                        <input
                            type="text"
                            className="form-control"
                            value={skill.name}
                            onChange={(e) => handleArrayChange(e, index, 'name', 'skills')}
                        />
                    ) : (
                        <p>{skill.name}</p>
                    )}
                    <label className="form-label">Experience in months</label>
                    {editMode ? (
                        <input
                            type="text"
                            className="form-control"
                            value={skill.experience}
                            onChange={(e) => handleArrayChange(e, index, 'experience', 'skills')}
                        />
                    ) : (
                        <p>{skill.experience}</p>
                    )}
                    {editMode && (
                        <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveField(index, 'skills')}>Remove</button>
                    )}
                </div>
            ))}
            {editMode && (
                <button type="button" className="btn btn-secondary" onClick={() => handleAddField('skills')}>Add Skill</button>
            )}
        </div>
    );

    const renderStep4 = () => (
        <div>
            <h3>Experience</h3>
            {formData.experience.map((exp, index) => (
                <div key={index} className="mb-3">
                    <label className="form-label">Name of the Company</label>
                    {editMode ? (
                        <input
                            type="text"
                            className="form-control"
                            value={exp.company}
                            onChange={(e) => handleArrayChange(e, index, 'company', 'experience')}
                        />
                    ) : (
                        <p>{exp.company}</p>
                    )}
                    <label className="form-label">Name of the Project</label>
                    {editMode ? (
                        <input
                            type="text"
                            className="form-control"
                            value={exp.project}
                            onChange={(e) => handleArrayChange(e, index, 'project', 'experience')}
                        />
                    ) : (
                        <p>{exp.project}</p>
                    )}
                    <label className="form-label">Role</label>
                    {editMode ? (
                        <input
                            type="text"
                            className="form-control"
                            value={exp.role}
                            onChange={(e) => handleArrayChange(e, index, 'role', 'experience')}
                        />
                    ) : (
                        <p>{exp.role}</p>
                    )}
                    <label className="form-label">Duration From</label>
                    {editMode ? (
                        <input
                            type="text"
                            className="form-control"
                            value={exp.duration_from}
                            onChange={(e) => handleArrayChange(e, index, 'duration_from', 'experience')}
                        />
                    ) : (
                        <p>{exp.duration_from}</p>
                    )}
                    <label className="form-label">Duration To</label>
                    {editMode ? (
                        <input
                            type="text"
                            className="form-control"
                            value={exp.duration_to}
                            onChange={(e) => handleArrayChange(e, index, 'duration_to', 'experience')}
                        />
                    ) : (
                        <p>{exp.duration_to}</p>
                    )}
                    {editMode && (
                        <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveField(index, 'experience')}>Remove</button>
                    )}
                </div>
            ))}
            {editMode && (
                <button type="button" className="btn btn-secondary" onClick={() => handleAddField('experience')}>Add Experience</button>
            )}
        </div>
    );

    const renderStep = () => {
        switch (step) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            case 4:
                return renderStep4();
            default:
                return renderStep1();
        }
    };

    const handleNextStep = () => {
        if (step < 4) setStep(step + 1);
    };

    const handlePreviousStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    return (
        <div className="container">
            <h2>Edit Candidate Details</h2>
            <button className="btn btn-primary mb-3" onClick={handleEditToggle}>
                {editMode ? 'Cancel Edit' : 'Edit'}
            </button>
            <button className="btn btn-danger mb-3 ms-2" onClick={handleDelete}>Delete</button>
            <form onSubmit={handleSubmit}>
                {renderStep()}
                <div className="mt-3">
                    <button type="button" className="btn btn-secondary me-2" onClick={handlePreviousStep} disabled={step === 1}>Previous</button>
                    <button type="button" className="btn btn-secondary me-2" onClick={handleNextStep} disabled={step === 4}>Next</button>
                    {editMode && step === 4 && <button type="submit" className="btn btn-primary">Submit</button>}
                </div>
            </form>
        </div>
    );
};

export default DisplayCandidateMultistep;
