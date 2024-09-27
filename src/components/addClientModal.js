import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddClientModal({ showModal, handleModalClose, handleSubmitClient }) {
  const [newClient, setNewClient] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    dob: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    emergency_contact: "",
    emergency_contact_phone: "",
    heard_about_us: "",
    current_symptoms: "",
    past_symptoms: "",
    past_injuries: "",
    past_surgeries: "",
    form_data: "",
    general_notes: "",
    objective: "",
    assessment: "",
    plan: "",
    favorite: "",
    needs_review: "",
    status: "",
    last_updated: "",
    last_status_change: "",
  });

  const handleInputChange = (e) => {
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = () => {
    handleSubmitClient(newClient);
    handleModalClose();
  };

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={newClient.first_name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={newClient.last_name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={newClient.phone}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newClient.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Birth (YYYY-MM-DD)</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={newClient.dob}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="text"
              name="street"
              value={newClient.street}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="city"
              value={newClient.city}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="state"
              value={newClient.state}
              onChange={handleInputChange}
              maxLength="2"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              name="zip"
              value={newClient.zip}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Emergency Contact</Form.Label>
            <Form.Control
              type="text"
              name="emergency_contact"
              value={newClient.emergency_contact}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Emergency Contact Phone</Form.Label>
            <Form.Control
              type="text"
              name="emergency_contact_phone"
              value={newClient.emergency_contact_phone}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>How did the client hear about us?</Form.Label>
            <Form.Control
              type="text"
              name="heard_about_us"
              value={newClient.heard_about_us}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Current Symptoms</Form.Label>
            <Form.Control
              type="text"
              name="current_symptoms"
              value={newClient.current_symptoms}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Past Symptoms</Form.Label>
            <Form.Control
              type="text"
              name="past_symptoms"
              value={newClient.past_symptoms}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Past Injuries</Form.Label>
            <Form.Control
              type="text"
              name="past_injuries"
              value={newClient.past_injuries}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Past Surgeries</Form.Label>
            <Form.Control
              type="text"
              name="past_surgeries"
              value={newClient.past_surgeries}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModalClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          Add Client
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddClientModal;
