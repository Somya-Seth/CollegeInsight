import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
export default function Example({UserData, showModal2, closeSummaryModal}) {
  const [show, setShow] = useState(showModal2);
  const handleClose = () => {
    setShow(false);
    showModal2 = false
  }
  const handleShow = () => setShow(true);
  const submit = async () => {
    try{
      const userId = UserData._id
      const res = await axios.post("http://localhost:8000/postsummary",{
        body: summary,
        userId: userId
      })
      setShow(false)
      // props.getUser()
      closeSummaryModal(UserData.summary)
    }catch(e){
      console.log(e)
    }
  }
  const [summary, setSummary] = useState('')
    const handleChange = e => {
        const value  = e.target.value
        setSummary(value)
        UserData.summary = value
    }

  useEffect(() => {
    setSummary(UserData.summary)
  }, [])

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
        value = {summary}
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