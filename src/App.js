import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientInfo from "./ClientInfo";
import { post } from "aws-amplify/api";
import { fetchClients } from "./helper/ClientApi";

// components
import ClientList from "./components/ClientList";
import ScrollToTop from "./components/ScrollToTop";
import AddClientModal from "./components/addClientModal";

// css
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./css/variables.css";
import "./css/App.css";

// svgs
import { ReactComponent as AddButton } from "./icons/add.svg";
import { ReactComponent as SignOut } from "./icons/logout.svg";
import { ReactComponent as Refresh } from "./icons/refresh.svg";
import { ReactComponent as SortAlpha } from "./icons/sortAlpha.svg";
import { ReactComponent as Upcoming } from "./icons/upcoming.svg";
import { ReactComponent as Modified } from "./icons/history.svg";

import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Button, Dropdown } from "react-bootstrap";

function App() {
  let clientTesting = require("./helper/clientList.json");
  const [clients, setClients] = useState(clientTesting);
  const [newClient, setNewClient] = useState({});
  const [refreshClicked, setRefreshClicked] = useState(false);
  const [sortMethod, setSortMethod] = useState("alphabetical");
  const [showModal, setShowModal] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleDisclaimerClose = () => {
    setShowDisclaimer(false);
  };

  useEffect(() => {
    // fetchClients(setClients);
    console.log("clients: ", clients);
  }, []);

  useEffect(() => {
    console.log("Clients state updated:", clients);
  }, [clients]);

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("today");

  const addClient = async (newClient) => {
    // Ensure any empty string fields in newClient are converted to null
    const sanitizedClient = Object.fromEntries(
      Object.entries(newClient).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ])
    );

    console.log("Sanitized client:", sanitizedClient);
    if (
      sanitizedClient.first_name &&
      sanitizedClient.last_name &&
      sanitizedClient.phone
    ) {
      try {
        // First, post the new client to the database
        const restOperation = await post({
          apiName: "apiclient",
          path: "/clients",
          options: {
            body: { ...sanitizedClient },
          },
        });
        const { body } = await restOperation.response;
        const response = await body.json();
        if (response) {
          console.log("Response from adding client:", response);
          fetchClients(setClients);
        }
      } catch (error) {
        console.error("Error adding or fetching clients:", error);
        alert("Error adding client. Please try again.");
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
    <div className="App flex flex-col">
      {/* <Authenticator hideSignUp={true}> */}
      {/* {({ signOut }) => ( */}
      <Router basename="">
        <ScrollToTop />

        <Routes>
          <Route
            path="/"
            element={
              <>
                {showDisclaimer && (
                  <div className="disclaimer-popup">
                    <div className="disclaimer-popup-content">
                      <h1>Disclaimer</h1>
                      <p>
                        This is a demo. Please note that all of the data
                        presented here is dummy data for demonstration purposes
                        only.
                      </p>
                      <p>
                        This web app is designed for mobile devices. Its primary
                        purpose is to help massage therapists and businesses
                        manage their clients effectively. The app includes four
                        main tabs:
                      </p>
                      <ul>
                        <li>
                          <strong>Active:</strong> Clients currently being seen.
                        </li>
                        <li>
                          <strong>Waitlist:</strong> Clients waiting to be seen.
                        </li>
                        <li>
                          <strong>Re-book:</strong> Clients who need to be
                          re-booked for future appointments.
                        </li>
                        <li>
                          <strong>Archive:</strong> Clients whose profiles are
                          archived.
                        </li>
                      </ul>
                      <p>By clicking on a client, you can:</p>
                      <ul>
                        <li>Favorite the client.</li>
                        <li>
                          Toggle that there are important notes about the
                          client.
                        </li>
                        <li>
                          Change the client's status between the four tabs.
                        </li>
                        <li>
                          Keep track of general notes and appointment-specific
                          notes like symptoms, assessment, and plan.
                        </li>
                      </ul>
                      <p>Adding a client puts them in the waitlist tab.</p>
                      <p>
                        To reset the client list, click the refresh button on
                        the home screen in the top left.
                      </p>

                      <button onClick={handleDisclaimerClose}>
                        I Understand
                      </button>
                    </div>
                  </div>
                )}
                <div className="sticky">
                  {/* <div> */}
                  <header className="App-header">
                    <button
                      onClick={() => {
                        setRefreshClicked(true);
                        setClients(clientTesting);
                        setTimeout(() => setRefreshClicked(false), 300); // Reset after 300ms
                      }}
                      className={refreshClicked ? "button-clicked" : ""}
                    >
                      <h1 className="flex items-center">
                        Clients <Refresh className="svg-icon" />
                      </h1>
                    </button>

                    <AddButton
                      onClick={handleModalShow}
                      className="svg-icon"
                    ></AddButton>
                    <AddClientModal
                      showModal={showModal}
                      handleModalClose={handleModalClose}
                      handleSubmitClient={addClient} // Pass addClient as a prop to submit the new client
                    />
                    <SignOut
                      // onClick={signOut}
                      className="svg-icon"
                    ></SignOut>
                  </header>
                  <div className="tabs">
                    <button
                      className={`tab ${activeTab === "today" ? "active" : ""}`}
                      onClick={() => setActiveTab("today")}
                    >
                      Today
                    </button>
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
                      Book
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
                        id="dropdown-basic"
                        className="dropdown-button flex flex-row"
                      >
                        {sortMethod === "alphabetical" && (
                          <SortAlpha className="svg-icon" />
                        )}
                        {sortMethod === "queue" && (
                          <Upcoming className="svg-icon" />
                        )}
                        {sortMethod === "recentlyModified" && (
                          <Modified className="svg-icon" />
                        )}
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => setSortMethod("alphabetical")}
                          className={
                            sortMethod === "alphabetical" ? "selected" : ""
                          }
                        >
                          By Name
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setSortMethod("queue")}
                          className={sortMethod === "queue" ? "selected" : ""}
                        >
                          Queue
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setSortMethod("recentlyModified")}
                          className={
                            sortMethod === "recentlyModified" ? "selected" : ""
                          }
                        >
                          Recently modified
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
                  setSortMethod={setSortMethod}
                />
              </>
            }
          />
          <Route
            path="/client/:id"
            element={<ClientInfo clients={clients} setClients={setClients} />}
          />
        </Routes>
      </Router>
      {/* )} */}
      {/* </Authenticator> */}
    </div>
  );
}

// export default withAuthenticator(App);
export default App;
