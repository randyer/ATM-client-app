import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientInfo from './ClientInfo';
import './App.css';

function App() {
  const [clients, setClients] = useState([
    {
      id: 1,
      firstName: 'Anna',
      lastName: 'Haro',
      phone: '555-522-8243',
      email: 'anna-haro@mac.com',
      dob: '1980-01-01',
      address: '123 Apple St, Cupertino, CA',
      emergencyContact: 'John Haro',
      emergencyContactPhone: '555-123-4567',
      heardAboutUs: 'Google',
      currentSymptoms: 'Headache',
      pastSymptoms: 'Back pain',
      pastInjuries: 'Broken leg',
      pastSurgeries: 'Appendectomy',
      active: true
    },
    {
      id: 2,
      firstName: 'Daniel',
      lastName: 'Higgins Jr.',
      phone: '555-478-7672',
      email: 'd-higgins@mac.com',
      dob: '1985-02-15',
      address: '456 Banana Blvd, Cupertino, CA',
      emergencyContact: 'Jane Higgins',
      emergencyContactPhone: '555-234-5678',
      heardAboutUs: 'Facebook',
      currentSymptoms: 'Neck pain',
      pastSymptoms: 'Shoulder pain',
      pastInjuries: 'Sprained ankle',
      pastSurgeries: 'Knee surgery',
      active: true
    },
    // Add more clients as needed
  ]);

  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('active');

  const addClient = () => {
    const newFirstName = prompt('Enter client first name:');
    const newLastName = prompt('Enter client last name:');
    const newPhone = prompt('Enter client phone number:');
    const newEmail = prompt('Enter client email:');
    const newDob = prompt('Enter client date of birth (YYYY-MM-DD):');
    const newAddress = prompt('Enter client street address:');
    const newEmergencyContact = prompt('Enter emergency contact name:');
    const newEmergencyContactPhone = prompt('Enter emergency contact phone number:');
    const newHeardAboutUs = prompt('How did the client hear about us?');
    const newCurrentSymptoms = prompt('Enter current symptoms:');
    const newPastSymptoms = prompt('Enter past symptoms:');
    const newPastInjuries = prompt('Enter past injuries:');
    const newPastSurgeries = prompt('Enter past surgeries:');
    if (newFirstName && newLastName && newPhone) {
      setClients([
        ...clients,
        {
          id: clients.length + 1,
          firstName: newFirstName,
          lastName: newLastName,
          phone: newPhone,
          email: newEmail,
          dob: newDob,
          address: newAddress,
          emergencyContact: newEmergencyContact,
          emergencyContactPhone: newEmergencyContactPhone,
          heardAboutUs: newHeardAboutUs,
          currentSymptoms: newCurrentSymptoms,
          pastSymptoms: newPastSymptoms,
          pastInjuries: newPastInjuries,
          pastSurgeries: newPastSurgeries,
          active: true
        }
      ]);
    }
  };

  const getInitials = (firstName, lastName) => {
    return (firstName[0] + lastName[0]).toUpperCase();
  };

  const filteredClients = clients.filter(client =>
    (client.firstName + ' ' + client.lastName).toLowerCase().includes(search.toLowerCase()) &&
    ((activeTab === 'active' && client.active) || (activeTab === 'archive' && !client.active))
  );

  return (
    <Router basename='/ATM-client-app'>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <header className="App-header">
                  <h1>Clients</h1>
                  <button onClick={addClient} className="add-client-button">+</button>
                </header>
                <div className="tabs">
                  <button className={`tab ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>
                    Active Clients
                  </button>
                  <button className={`tab ${activeTab === 'archive' ? 'active' : ''}`} onClick={() => setActiveTab('archive')}>
                    Archive
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-bar"
                />
                <ul className="client-list">
                  {filteredClients.map(client => (
                    <li key={client.id} className="client-item">
                      <Link to={`/client/${client.id}`} className="client-link">
                        <div className="client-initials">{getInitials(client.firstName, client.lastName)}</div>
                        <div className="client-info">
                          <div className="client-name">{client.firstName} {client.lastName}</div>
                          <div className="client-phone">{client.phone}</div>
                          {client.email && <div className="client-email">{client.email}</div>}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            }
          />
          <Route path="/client/:id" element={<ClientInfo clients={clients} setClients={setClients} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
