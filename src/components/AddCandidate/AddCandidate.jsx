
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCandidate = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleArrayChange = (e, index, field, section) => {
        const newData = [...formData[section]];
        newData[index][field] = e.target.value;
        setFormData({ ...formData, [section]: newData });
    };

    const handleAddEntry = (section) => {
        if (formData[section].length < 10) {
            const newEntry = section === 'education'
                ? { institute: '', year_of_graduation: '' }
                : section === 'skills'
                    ? { name: '', experience: '' }
                    : { company: '', project: '', role: '', duration_from: '', duration_to: '' };
            setFormData({ ...formData, [section]: [...formData[section], newEntry] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://60d5a2c2943aa60017768b01.mockapi.io/candidate/", formData);
            // alert("submitted Successful")
            // navigate("/candidate/new");
        } catch (err) {
            console.log("Error occurred: ", err);
        }
    };

    const renderStep1 = () => (
        <div>
            <h3>Personal Details</h3>
            <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                <input type="text" className="form-control" name="profile_picture" value={formData.profile_picture} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Gender</label>
                <select className="form-control" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Hobbies</label>
                <input type="text" className="form-control" name="hobbies" value={formData.hobbies.join(',')} onChange={(e) => setFormData({ ...formData, hobbies: e.target.value.split(',') })} />
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div>
            <h3>Education</h3>
            {formData.education.map((edu, index) => (
                <div key={index} className="mb-3">
                    <label className="form-label">Institute</label>
                    <input type="text" className="form-control" value={edu.institute} onChange={(e) => handleArrayChange(e, index, 'institute', 'education')} />
                    <label className="form-label">Year of Graduation</label>
                    <input type="text" className="form-control" value={edu.year_of_graduation} onChange={(e) => handleArrayChange(e, index, 'year_of_graduation', 'education')} />
                </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={() => handleAddEntry('education')}>Add Education</button>
        </div>
    );

    const renderStep3 = () => (
        <div>
            <h3>Skills</h3>
            {formData.skills.map((skill, index) => (
                <div key={index} className="mb-3">
                    <label className="form-label">Name of Skill</label>
                    <input type="text" className="form-control" value={skill.name} onChange={(e) => handleArrayChange(e, index, 'name', 'skills')} />
                    <label className="form-label">Experience in months</label>
                    <input type="text" className="form-control" value={skill.experience} onChange={(e) => handleArrayChange(e, index, 'experience', 'skills')} />
                </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={() => handleAddEntry('skills')}>Add Skill</button>
        </div>
    );

    const renderStep4 = () => (
        <div>
            <h3>Experience</h3>
            {formData.experience.map((exp, index) => (
                <div key={index} className="mb-3">
                    <label className="form-label">Name of the Company</label>
                    <input type="text" className="form-control" value={exp.company} onChange={(e) => handleArrayChange(e, index, 'company', 'experience')} />
                    <label className="form-label">Name of the Project</label>
                    <input type="text" className="form-control" value={exp.project} onChange={(e) => handleArrayChange(e, index, 'project', 'experience')} />
                    <label className="form-label">Role</label>
                    <input type="text" className="form-control" value={exp.role} onChange={(e) => handleArrayChange(e, index, 'role', 'experience')} />
                    <label className="form-label">Duration From</label>
                    <input type="text" className="form-control" value={exp.duration_from} onChange={(e) => handleArrayChange(e, index, 'duration_from', 'experience')} />
                    <label className="form-label">Duration To</label>
                    <input type="text" className="form-control" value={exp.duration_to} onChange={(e) => handleArrayChange(e, index, 'duration_to', 'experience')} />
                </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={() => handleAddEntry('experience')}>Add Experience</button>
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

    return (
        <div className="container">
            <h2>Add Candidate</h2>
            <form onSubmit={handleSubmit}>
                {renderStep()}
                <div className="mt-3">
                    {step > 1 && <button type="button" className="btn btn-secondary me-2" onClick={handlePreviousStep}>Previous</button>}
                    {step < 4 ? (
                        <button type="button" className="btn btn-primary" onClick={handleNextStep}>Next</button>
                    ) : (
                        <button type="submit" onClick={() => {
                            alert("submitted Successfull")
                            navigate("/candidate")
                        }} className="btn btn-success">Submit</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AddCandidate;
