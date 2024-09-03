import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientInfo from "./ClientInfo";
import { post } from "aws-amplify/api";
import { fetchClients } from "./helper/ClientApi";

// components
import ClientList from "./components/ClientList";
import ScrollToTop from "./components/ScrollToTop";

// css
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./css/variables.css";
import "./css/App.css";

// svgs
import { ReactComponent as AddButton } from "./icons/add.svg";
import { ReactComponent as SignOut } from "./icons/logout.svg";
import { ReactComponent as Refresh } from "./icons/refresh.svg";
import { ReactComponent as Sort } from "./icons/sort.svg";

import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Button, Dropdown } from "react-bootstrap";

function App() {
  const [clients, setClients] = useState([]);
  const [refreshClicked, setRefreshClicked] = useState(false);
  const [sortMethod, setSortMethod] = useState("lastUpdated");

  useEffect(() => {
    fetchClients(setClients);
  }, []);

  useEffect(() => {
    console.log("Clients state updated:", clients);
  }, [clients]);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  const addClient = async () => {
    const newFirstName = prompt("Enter client first name:");
    const newLastName = prompt("Enter client last name:");
    const newPhone = prompt("Enter client phone number:");
    const newEmail = prompt("Enter client email:");
    const newDob = prompt("Enter client date of birth (YYYY-MM-DD):");
    const newStreet = prompt("Enter client street address:");
    const newCity = prompt("Enter client city:");
    const newState = prompt("Enter client state:");
    const newZip = prompt("Enter client zip code:");
    const newEmergencyContact = prompt("Enter emergency contact name:");
    const newEmergencyContactPhone = prompt(
      "Enter emergency contact phone number:"
    );
    const newHeardAboutUs = prompt("How did the client hear about us?");
    const newCurrentSymptoms = prompt("Enter current symptoms:");
    const newPastSymptoms = prompt("Enter past symptoms:");
    const newPastInjuries = prompt("Enter past injuries:");
    const newPastSurgeries = prompt("Enter past surgeries:");
    const newGeneralNotes = prompt("Enter general notes:");
    const newObjective = prompt("Enter objective:");
    const newAssessment = prompt("Enter assessment:");
    const newPlan = prompt("Enter plan:");
    const newWaitlistNotes = prompt("Enter waitlist notes:");

    if (newFirstName && newLastName && newPhone) {
      const newClient = {
        first_name: newFirstName || null,
        last_name: newLastName || null,
        phone: newPhone || null,
        email: newEmail || null,
        dob: newDob || null,
        street: newStreet || null,
        city: newCity || null,
        state: newState || null,
        zip: newZip || null,
        emergency_contact: newEmergencyContact || null,
        emergency_contact_phone: newEmergencyContactPhone || null,
        heard_about_us: newHeardAboutUs || null,
        current_symptoms: newCurrentSymptoms || null,
        past_symptoms: newPastSymptoms || null,
        past_injuries: newPastInjuries || null,
        past_surgeries: newPastSurgeries || null,
        general_notes: newGeneralNotes || null,
        objective: newObjective || null,
        assessment: newAssessment || null,
        plan: newPlan || null,
        waitlist_notes: newWaitlistNotes || null,
        active: true,
        favorite: false,
        needs_review: false,
        waitlisted: false,
      };

      try {
        // First, post the new client to the database
        const restOperation = await post({
          apiName: "apiclient",
          path: "/clients",
          options: {
            body: { ...newClient },
          },
        });

        const { body } = await restOperation.response;
        const response = await body.json();

        if (response) {
          fetchClients(setClients);
        }
      } catch (error) {
        console.error("Error adding or fetching clients:", error);
      }
    }
  };

  const getInitials = (firstName, lastName) => {
    return (firstName[0] + lastName[0]).toUpperCase();
  };

  const filteredClients = clients.filter(
    (client) =>
      (client.first_name + " " + client.last_name)
        .toLowerCase()
        .includes(search.toLowerCase()) && client.status === activeTab
  );

  // let clientTesting = [
  //   {
  //     id: 1,
  //     firstName: "Anna",
  //     lastName: "Haro",
  //     phone: "555-522-8243",
  //     email: "anna-haro@mac.com",
  //     dob: "1980-01-01",
  //     address: {
  //       street: "123 Apple St",
  //       city: "Cupertino",
  //       state: "CA",
  //       zip: "95014",
  //     },
  //     emergencyContact: "John Haro",
  //     emergencyContactPhone: "555-123-4567",
  //     heardAboutUs: "Google",
  //     currentSymptoms: "Headache",
  //     pastSymptoms: "Back pain",
  //     pastInjuries: "Broken leg",
  //     pastSurgeries: "Appendectomy",
  //     formData:
  //       "Current Symptoms: Headache\nPast Symptoms: Back pain\nPast Injuries: Broken leg\nPast Surgeries: Appendectomy",
  //     active: true,
  //     favorite: true,
  //     needsReview: false,
  //     waitlisted: false,
  //   },
  //   {
  //     id: 2,
  //     firstName: "Daniel",
  //     lastName: "Higgins Jr.",
  //     phone: "555-478-7672",
  //     email: "d-higgins@mac.com",
  //     dob: "1985-02-15",
  //     address: {
  //       street: "456 Banana Blvd",
  //       city: "Cupertino",
  //       state: "CA",
  //       zip: "95014",
  //     },
  //     emergencyContact: "Jane Higgins",
  //     emergencyContactPhone: "555-234-5678",
  //     heardAboutUs: "Facebook",
  //     currentSymptoms: "Neck pain",
  //     pastSymptoms: "Shoulder pain",
  //     pastInjuries: "Sprained ankle",
  //     pastSurgeries: "Knee surgery",
  //     formData:
  //       "Current Symptoms: Neck pain\nPast Symptoms: Shoulder pain\nPast Injuries: Sprained ankle\nPast Surgeries: Knee surgery",
  //     active: true,
  //     favorite: false,
  //     needsReview: false,
  //     waitlisted: false,
  //   },
  // ];

  return (
    <div className="App">
      <Authenticator hideSignUp={true}>
        {({ signOut }) => (
          <main>
            <Router basename="">
              <ScrollToTop />
              <div className="App">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <div className="sticky">
                          {/* <div> */}
                          <header className="App-header">
                            <button
                              onClick={() => {
                                setRefreshClicked(true);
                                fetchClients(setClients);
                                setTimeout(() => setRefreshClicked(false), 300); // Reset after 300ms
                              }}
                              className={refreshClicked ? "button-clicked" : ""}
                            >
                              <h1>
                                Clients <Refresh className="svg-icon" />
                              </h1>
                            </button>

                            <AddButton
                              onClick={addClient}
                              className="svg-icon"
                            ></AddButton>
                            <SignOut
                              onClick={signOut}
                              className="svg-icon"
                            ></SignOut>
                          </header>
                          <div className="tabs">
                            <button
                              className={`tab ${
                                activeTab === "active" ? "active" : ""
                              }`}
                              onClick={() => setActiveTab("active")}
                            >
                              Active
                            </button>
                            <button
                              className={`tab ${
                                activeTab === "waitlist" ? "active" : ""
                              }`}
                              onClick={() => setActiveTab("waitlist")}
                            >
                              Waitlist
                            </button>
                            <button
                              className={`tab ${
                                activeTab === "re-book" ? "active" : ""
                              }`}
                              onClick={() => setActiveTab("re-book")}
                            >
                              Re-book
                            </button>
                            <button
                              className={`tab ${
                                activeTab === "archive" ? "active" : ""
                              }`}
                              onClick={() => setActiveTab("archive")}
                            >
                              Archive
                            </button>
                          </div>
                          <div className="search-and-sort">
                            <input
                              type="text"
                              placeholder="Search"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              className="search-bar"
                            />
                            <Dropdown>
                              <Dropdown.Toggle
                                // variant="success"
                                id="dropdown-basic"
                                className="dropdown-button"
                              >
                                <Sort className="svg-icon" />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() => setSortMethod("lastUpdated")}
                                >
                                  Last Updated
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => setSortMethod("firstUpdated")}
                                >
                                  First Updated
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() => setSortMethod("alphabetical")}
                                >
                                  By Name
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <ClientList
                          clients={filteredClients}
                          getInitials={getInitials}
                          waitlist={activeTab === "waitlist"}
                          setClients={setClients}
                          sortMethod={sortMethod}
                        />
                      </>
                    }
                  />
                  <Route
                    path="/client/:id"
                    element={
                      <ClientInfo clients={clients} setClients={setClients} />
                    }
                  />
                </Routes>
              </div>
            </Router>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

export default withAuthenticator(App);
