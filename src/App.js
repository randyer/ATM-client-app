import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
import { ReactComponent as Chat } from "./icons/chat.svg";
import { ReactComponent as SignOut } from "./icons/logout.svg";
import { ReactComponent as Refresh } from "./icons/refresh.svg";
import { ReactComponent as SortAlpha } from "./icons/sortAlpha.svg";
import { ReactComponent as Upcoming } from "./icons/upcoming.svg";
import { ReactComponent as Modified } from "./icons/history.svg";
import { ReactComponent as Sort } from "./icons/sort.svg";

import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Button, Dropdown } from "react-bootstrap";

function App() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({});
  const [refreshClicked, setRefreshClicked] = useState(false);
  const [sortMethod, setSortMethod] = useState("alphabetical");
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleUpdateListOrder = useCallback((updatedSubset) => {
    setClients((prev) =>
      prev.map((client) => {
        const updated = updatedSubset.find((c) => c.id === client.id);
        return updated
          ? { ...client, list_position: updated.list_position }
          : client;
      })
    );
    console.log("calling handleupdate");
  }, []);

  useEffect(() => {
    fetchClients(setClients);
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

  return (
    <div className="App flex flex-col">
      <Authenticator hideSignUp={true}>
        {({ signOut }) => (
          <Router basename="">
            <ScrollToTop />

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
                          <h1 className="flex items-center">
                            Clients <Refresh className="svg-icon" />
                          </h1>
                        </button>
                        <Dropdown>
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            className="dropdown-button flex flex-row"
                          >
                            <Chat></Chat>
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {clients
                              .filter(
                                (client) =>
                                  client.first_name === "Pamela" ||
                                  client.first_name === "Elaine"
                              )
                              .map((client) => (
                                <Dropdown.Item
                                  as={Link}
                                  key={client.id}
                                  to={`/client/${client.id}`}
                                >
                                  Notes for {client.first_name}
                                </Dropdown.Item>
                              ))}
                          </Dropdown.Menu>
                        </Dropdown>

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
                          onClick={signOut}
                          className="svg-icon"
                        ></SignOut>
                      </header>
                      <div className="tabs">
                        <button
                          className={`tab ${
                            activeTab === "today" ? "active" : ""
                          }`}
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
                            {sortMethod === "custom" && (
                              <Sort className="svg-icon" />
                            )}{" "}
                            {/* optional custom icon */}
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
                              className={
                                sortMethod === "queue" ? "selected" : ""
                              }
                            >
                              Queue
                            </Dropdown.Item>

                            <Dropdown.Item
                              onClick={() => setSortMethod("recentlyModified")}
                              className={
                                sortMethod === "recentlyModified"
                                  ? "selected"
                                  : ""
                              }
                            >
                              Recently modified
                            </Dropdown.Item>

                            <Dropdown.Item
                              onClick={() => setSortMethod("custom")}
                              className={
                                sortMethod === "custom" ? "selected" : ""
                              }
                            >
                              Custom
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                    <ClientList
                      clients={filteredClients.filter(
                        (client) =>
                          !(
                            client.first_name === "Pamela" &&
                            client.last_name === "Bothwick"
                          ) &&
                          !(
                            client.first_name === "Elaine" &&
                            client.last_name === "Jimenez"
                          )
                      )}
                      getInitials={getInitials}
                      waitlist={activeTab === "waitlist"}
                      setClients={setClients}
                      sortMethod={sortMethod}
                      onUpdateListOrder={handleUpdateListOrder} // ← pass here
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
          </Router>
        )}
      </Authenticator>
    </div>
  );
}

export default withAuthenticator(App);
