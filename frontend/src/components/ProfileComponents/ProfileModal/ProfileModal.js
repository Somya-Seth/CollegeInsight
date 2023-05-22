import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';




export default function Example({getUser, userData, showModal, closeProfileModal}) {
    const [show, setShow] = useState(true);
    const [info, showUserInfo] = useState(userData)
    console.log("userData", userData);

    const [profile, setProfile] = useState({
        name: info.name,
        course: info.course,
        branch: info.branch,
        year: info.year,
        email: info.email,
        linkedin: info.linkedin,
        github: info.github,
        phone: info.phone,
        languages: info.languages,
        preferredGenderPronounce: info.preferredGenderPronounce,
        profilePicture: info.profilePicture
    })
    const handleChange = e => {
        const { name, value } = e.target
        setProfile({
            ...profile,
            [name]: value
        })
        console.log("profile", profile)
    }
    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const [file, setFile] = useState(null);
    const submit = async () => {
        try {
            handleClose()
            closeProfileModal(profile, file)
            setProfile({ ...profile, profilePicture: file })
            const formData = new FormData();
            formData.append('userId', userData._id)
            formData.append('profilePicture', file)
            formData.append('name', profile.name)
            formData.append('course', profile.course)
            formData.append('branch', profile.branch)
            formData.append('year', profile.year)
            formData.append('email', profile.email)
            formData.append('linkedin', profile.linkedin)
            formData.append('github', profile.github)
            formData.append('languages', profile.languages)
            formData.append('phone', profile.phone)
            formData.append('preferredGenderPronounce', profile.preferredGenderPronounce)

            const res = await axios.post("http://localhost:8000/postprofile", formData,
                {
                    Headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
        }
        catch (err) {
            console.log("error occured while updating profile", err);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title >Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form encType="multipart/form-data">
                        <Form.Group className="mb-3">
                            <Form.Label >Upload Profile Picture</Form.Label>
                            <Form.Control name="profilePicture" type="file" onChange={(e) => { setFile(e.target.files[0]) }} placeholder="No file choosen" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label >FullName</Form.Label>
                            <Form.Control value={profile.name} name="name" type="text" onChange={handleChange} placeholder="Enter name..." />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Course</Form.Label>
                            <Form.Select value={profile.course} onChange={handleChange} name="course">
                                <option >Select Course</option>
                                <option value="B.Tech">B.Tech</option>
                                <option value="BBA">BBA</option>
                                <option value="MBA">MBA</option>
                                <option value="M.Tech">M.Tech</option>
                                <option value="BCA">BCA</option>
                                <option value="MCA">MCA</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Branch</Form.Label>
                            <Form.Select value={profile.branch} onChange={handleChange} name="branch">
                                <option>Select Branch</option>
                                <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                                <option value="Electrical engineering">Electrical engineering</option>
                                <option value="Mechanical engineering">Mechanical engineering</option>
                                <option value="Artificial Intelligence">Artificial Intelligence</option>
                                <option value="Chemical Engineering">Chemical Engineering</option>
                                <option value="Information Technology">Information Technology</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Year</Form.Label>
                            <Form.Select onChange={handleChange} value={profile.year} name="year">
                                <option>Select Branch</option>
                                <option value="1st year">1st year</option>
                                <option value="2nd year">2nd year</option>
                                <option value="3rd year">3rd year</option>
                                <option value="4th year">4th year</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control onChange={handleChange} type="email" value={profile.email} name="email" placeholder="Enter email..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Linkedin</Form.Label>
                            <Form.Control onChange={handleChange} type="text" name="linkedin" value={profile.linkedin} placeholder="Enter linkedin..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Github</Form.Label>
                            <Form.Control onChange={handleChange} type="text" name="github" value={profile.github} placeholder="Enter github account..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control onChange={handleChange} type="number" name="phone" value={profile.phone} placeholder="Enter phone number..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Languages</Form.Label>
                            <Form.Control onChange={handleChange} type="text" name="languages" value={profile.languages} placeholder="Enter phone number..." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Preferred Gender Pronounce</Form.Label>
                            <Form.Select onChange={handleChange} value={profile.preferredGenderPronounce} name="preferredGenderPronounce">
                                <option>Select options</option>
                                <option value="He/Him">He/Him</option>
                                <option value="She/Her">She/Her</option>
                                <option value="They/Them">They/Them</option>
                                <option value="Custom">Custom</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// const formData = new FormData();

// formData.append('name', name)
// formData.append('price', price)
// formData.append('description', description)
// formData.append('quantity', quantity)

// const cookie = await axios.get("http://localhost:8000/cookie")
// console.log("token", cookie)

// const res = await axios.post("http://localhost:8000/product", formData, {
//     Headers: {
//         "Content-Type": "multipart/form-data",
//         "Authorization": `Bearer ${cookie}`
    //}
//},)