import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./css/ClientInfo.css";
import "./css/variables.css";
import "./css/App.css";
import { Dropdown } from "react-bootstrap";
import Toggle from "./components/ToggleButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { del, put } from "aws-amplify/api";
import { Autosave, useAutosave } from "react-autosave";

// icons
import { ReactComponent as Star } from "./icons/star.svg";
import { ReactComponent as StarFill } from "./icons/startFill.svg";
import { ReactComponent as NoReview } from "./icons/important.svg";
import { ReactComponent as NeedsReview } from "./icons/importantFill.svg";
import { ReactComponent as Back } from "./icons/backArrow.svg";
import { ReactComponent as Profile } from "./icons/person.svg";
import { ReactComponent as ProfileFill } from "./icons/personFill.svg";
import { ReactComponent as Soap } from "./icons/cognition.svg";
import { ReactComponent as SoapFill } from "./icons/cognitionFill.svg";
import { ReactComponent as Notes } from "./icons/note.svg";
import { ReactComponent as NotesFill } from "./icons/noteFill.svg";
import { ReactComponent as Appointment } from "./icons/calendar.svg";
import { ReactComponent as AppointmentFill } from "./icons/calendarFill.svg";
import { ReactComponent as Copy } from "./icons/contentCopy.svg";

function ClientInfo({ clients, setClients }) {
  const { id } = useParams();
  const client = clients.find((client) => client.id === id);
  const navigate = useNavigate();

  const [editableClient, setEditableClient] = useState({ ...client });
  const [activeTab, setActiveTab] = useState("notes");
  useAutosave({
    data: editableClient,
    onSave: updateClient,
    interval: 10000,
  });

  useEffect(() => {
    console.log("Clients state updated from client info page:", editableClient);
  }, [editableClient]);

  async function deleteClient(clientId) {
    try {
      const restOperation = await del({
        apiName: "apiclient",
        path: `/client/${clientId}`,
      });

      const { body } = await restOperation.response;
      const response = await body.json();
      console.log("Delete response: ", response);

      if (response && response.success) {
        console.log("Client successfully deleted.");
      } else {
        console.log("Failed to delete the client:", response);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
    // Update the state to remove the deleted client from the list
    setClients((prevClients) =>
      prevClients.filter((client) => client.id !== clientId)
    );

    // Navigate back to the client list after deletion
    navigate("/");
  }

  async function updateClient(editableClient) {
    try {
      const restOperation = await put({
        apiName: "apiclient",
        path: `/client/${editableClient.id}`,
        options: {
          body: { ...editableClient },
        },
      });
      console.log("UPDATED CLIENT", { ...editableClient });
      const { body } = await restOperation.response;
      const response = await body.json();
      console.log("Update response: ", response);

      if (response && response.success) {
        console.log("Client successfully updated.");
      } else {
        console.log("Failed to update the client:", response);
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
    setClients((prevClients) =>
      prevClients.map((c) => (c.id === editableClient.id ? editableClient : c))
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableClient((prevState) => ({
      ...prevState,
      [name]: value,
      last_updated: new Date().toISOString(),
    }));
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    const newLastStatusChange = new Date().toISOString();
    setEditableClient((prevState) => ({
      ...prevState,
      status: newStatus,
      last_status_change: newLastStatusChange,
    }));
  };

  const handleToggleFavorite = (newFavoriteValue) => {
    setEditableClient((prevState) => ({
      ...prevState,
      favorite: newFavoriteValue,
    }));
  };

  const handleToggleNeedsReview = (newNeedsReviewValue) => {
    setEditableClient((prevState) => ({
      ...prevState,
      needs_review: newNeedsReviewValue,
    }));
  };

  if (!client) {
    return <div>Client not found</div>;
  }

  const renderProfileTab = () => (
    <div className="client-details">
      <p>
        <strong>First Name:</strong>
        <input
          type="text"
          name="first_name"
          value={editableClient.first_name}
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Last Name:</strong>
        <input
          type="text"
          name="last_name"
          value={editableClient.last_name}
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Phone:</strong>
        <input
          type="text"
          name="phone"
          value={editableClient.phone}
          onChange={handleChange}
        />
        <CopyToClipboard text={editableClient.phone}>
          <button className="copy">
            <Copy />
          </button>
        </CopyToClipboard>
      </p>

      <p>
        <strong>Email:</strong>
        <input
          type="text"
          name="email"
          value={editableClient.email}
          onChange={handleChange}
        />
        <CopyToClipboard text={editableClient.email}>
          <button className="copy">
            <Copy />
          </button>
        </CopyToClipboard>
      </p>

      <p>
        <strong>Date of Birth:</strong>
        <input
          type="date"
          name="dob"
          value={editableClient.dob}
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Street Address:</strong>
        <input
          type="text"
          name="street"
          value={editableClient.street}
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>City:</strong>
        <input
          type="text"
          name="city"
          value={editableClient.city}
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>State:</strong>
        <input
          type="text"
          name="state"
          value={editableClient.state}
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Zip Code:</strong>
        <input
          type="text"
          name="zip"
          value={editableClient.zip}
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Emergency Contact:</strong>
        <input
          type="text"
          name="emergency_contact"
          value={editableClient.emergency_contact}
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Emergency Contact Phone:</strong>
        <input
          type="text"
          name="emergency_contact_phone"
          value={editableClient.emergency_contact_phone}
          onChange={handleChange}
        />
        <CopyToClipboard text={editableClient.emergency_contact_phone}>
          <button className="copy">
            <Copy />
          </button>
        </CopyToClipboard>
      </p>
      <p>
        <strong>How did you hear about us:</strong>
        <input
          type="text"
          name="heard_about_us"
          value={editableClient.heard_about_us}
          onChange={handleChange}
        />
      </p>
      <button
        onClick={() => deleteClient(editableClient.id)}
        className="button"
        style={{ margin: "1rem" }}
      >
        DELETE CLIENT
      </button>
    </div>
  );

  const renderSoapTab = () => (
    <div className="soap-notes">
      <p>
        <strong>Overview: </strong>
        <textarea
          name="form_data"
          value={editableClient.form_data || ""}
          onChange={handleChange}
        ></textarea>
      </p>
      <p>
        <strong>Objective: </strong> (Visual/Palpable)
        <textarea
          name="objective"
          value={editableClient.objective || ""}
          onChange={handleChange}
        ></textarea>
      </p>
      <p>
        <strong>Assessment: </strong> (Long/Short Term Goals)
        <textarea
          name="assessment"
          value={editableClient.assessment || ""}
          onChange={handleChange}
        ></textarea>
      </p>
      <p>
        <strong>Plan:</strong> (Future Treatment)
        <textarea
          name="plan"
          value={editableClient.plan || ""}
          onChange={handleChange}
        ></textarea>
      </p>
    </div>
  );

  const renderAppointmentsTab = () => (
    <div className="appointments">
      <h3>Appointments</h3>
      <ul>
        {editableClient.appointments ? (
          editableClient.appointments.map((appointment, index) => (
            <li key={index}>
              {appointment.date} - {appointment.notes}
            </li>
          ))
        ) : (
          <li>No appointments found</li>
        )}
      </ul>
    </div>
  );

  const renderNotesTab = () => (
    <div className="general-notes">
      <p>
        <strong>General Notes:</strong>
        <textarea
          name="general_notes"
          value={editableClient.general_notes || ""}
          onChange={handleChange}
          style={{ width: "100%", height: "200px" }}
        ></textarea>
      </p>
    </div>
  );

  return (
    <div className="client-info-page">
      <header className="client-info-header">
        <Link
          onClick={() => updateClient(editableClient)}
          to="/"
          className="back-button"
        >
          <Back></Back>
        </Link>
        <div className="toggle-container">
          <Toggle
            val={editableClient.favorite}
            onToggle={handleToggleFavorite}
            isTrue={<StarFill></StarFill>}
            isFalse={<Star></Star>}
          ></Toggle>
          <Toggle
            val={editableClient.needs_review}
            onToggle={handleToggleNeedsReview}
            isTrue={<NeedsReview></NeedsReview>}
            isFalse={<NoReview></NoReview>}
          ></Toggle>

          <Dropdown>
            <Dropdown.Toggle id="dropdown-status" className="dropdown-button">
              {editableClient.status.charAt(0).toUpperCase() +
                editableClient.status.slice(1)}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  handleStatusChange({
                    target: { name: "status", value: "active" },
                  })
                }
                className={editableClient.status === "active" ? "selected" : ""}
              >
                Active
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  handleStatusChange({
                    target: { name: "status", value: "waitlist" },
                  })
                }
                className={
                  editableClient.status === "waitlist" ? "selected" : ""
                }
              >
                Waitlist
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  handleStatusChange({
                    target: { name: "status", value: "re-book" },
                  })
                }
                className={
                  editableClient.status === "re-book" ? "selected" : ""
                }
              >
                Re-book
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  handleStatusChange({
                    target: { name: "status", value: "archive" },
                  })
                }
                className={
                  editableClient.status === "archive" ? "selected" : ""
                }
              >
                Archive
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <div className="client-profile">
        <div className="client-avatar">
          <span>
            {editableClient.first_name[0]}
            {editableClient.last_name[0]}
          </span>
        </div>
        <h2>
          {editableClient.first_name} {editableClient.last_name}
        </h2>
      </div>

      <div className="tab-bar">
        <div
          className={`tab-button ${activeTab === "notes" ? "active" : ""}`}
          onClick={() => setActiveTab("notes")}
        >
          {activeTab === "notes" ? <NotesFill /> : <Notes />}
        </div>
        <div
          className={`tab-button ${activeTab === "soap" ? "active" : ""}`}
          onClick={() => setActiveTab("soap")}
        >
          {activeTab === "soap" ? <SoapFill /> : <Soap />}
        </div>
        <div
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          {activeTab === "profile" ? <ProfileFill /> : <Profile />}
        </div>
        <div
          className={`tab-button ${
            activeTab === "appointments" ? "active" : ""
          }`}
          onClick={() => setActiveTab("appointments")}
        >
          {activeTab === "appointments" ? <AppointmentFill /> : <Appointment />}
        </div>
      </div>
      {activeTab === "profile" && renderProfileTab()}
      {activeTab === "soap" && renderSoapTab()}
      {activeTab === "notes" && renderNotesTab()}
      {activeTab === "appointments" && renderAppointmentsTab()}
    </div>
  );
}

export default ClientInfo;
