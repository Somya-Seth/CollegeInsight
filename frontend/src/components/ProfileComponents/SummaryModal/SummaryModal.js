import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import axios from 'axios'
export default function Example(props) {
  const [show, setShow] = useState(props.showModal2);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const submit = async () => {
    console.log(props.UserData)
    const userId = {id:props.UserData._id}
    const res = await axios.post("http://localhost:8000/postsummary",{
      body: summary,
			userId: userId
    })
  }
  const [summary, setSummary] = useState({
    summary: "",
    })
    const handleChange = e => {
        const { name, value } = e.target
        setSummary({
          ...summary,
          [name]: value
        })
      }

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="10"
        onChange={handleChange}
        name="summary"
        value = {summary.summary}
        placeholder='Write something about yourself...'
        />
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