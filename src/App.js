import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ClientInfo from './ClientInfo';
import './css/App.css';
import './css/variables.css';

// svgs
import { ReactComponent as NeedsReview } from './icons/importantFill.svg';
import { ReactComponent as AddButton } from './icons/add.svg';
import { ReactComponent as StarFill } from './icons/startFill.svg';

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
      active: true,
      favorite: true,
      needsReview: false
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
      active: true,
      favorite: false,
      needsReview: false
    },
    {
      id: 3,
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '555-123-4567',
      email: 'jane.doe@example.com',
      dob: '1990-03-12',
      address: '789 Cherry Ln, Cupertino, CA',
      emergencyContact: 'John Doe',
      emergencyContactPhone: '555-345-6789',
      heardAboutUs: 'Instagram',
      currentSymptoms: 'Lower back pain',
      pastSymptoms: 'Migraine',
      pastInjuries: 'Wrist fracture',
      pastSurgeries: 'Gallbladder removal',
      active: true,
      favorite: true,
      needsReview: true
    },
    {
      id: 4,
      firstName: 'John',
      lastName: 'Smith',
      phone: '555-678-1234',
      email: 'john.smith@example.com',
      dob: '1975-04-22',
      address: '101 Pine St, Cupertino, CA',
      emergencyContact: 'Jane Smith',
      emergencyContactPhone: '555-456-7890',
      heardAboutUs: 'Referral',
      currentSymptoms: 'Knee pain',
      pastSymptoms: 'Tennis elbow',
      pastInjuries: 'Dislocated shoulder',
      pastSurgeries: 'Hernia repair',
      active: true,
      favorite: false,
      needsReview: false
    },
    {
      id: 5,
      firstName: 'Emily',
      lastName: 'Johnson',
      phone: '555-789-1234',
      email: 'emily.johnson@example.com',
      dob: '1988-05-15',
      address: '202 Maple Ave, Cupertino, CA',
      emergencyContact: 'Robert Johnson',
      emergencyContactPhone: '555-567-8901',
      heardAboutUs: 'Yelp',
      currentSymptoms: 'Shoulder pain',
      pastSymptoms: 'Carpal tunnel',
      pastInjuries: 'Ankle sprain',
      pastSurgeries: 'C-section',
      active: true,
      favorite: true,
      needsReview: false
    },
    {
      id: 6,
      firstName: 'Michael',
      lastName: 'Brown',
      phone: '555-890-1234',
      email: 'michael.brown@example.com',
      dob: '1965-06-30',
      address: '303 Birch Rd, Cupertino, CA',
      emergencyContact: 'Laura Brown',
      emergencyContactPhone: '555-678-9012',
      heardAboutUs: 'Twitter',
      currentSymptoms: 'Hip pain',
      pastSymptoms: 'Sciatica',
      pastInjuries: 'ACL tear',
      pastSurgeries: 'Hip replacement',
      active: true,
      favorite: false,
      needsReview: true
    },
    {
      id: 7,
      firstName: 'Lisa',
      lastName: 'Taylor',
      phone: '555-901-2345',
      email: 'lisa.taylor@example.com',
      dob: '1992-07-08',
      address: '404 Oak Dr, Cupertino, CA',
      emergencyContact: 'David Taylor',
      emergencyContactPhone: '555-789-0123',
      heardAboutUs: 'LinkedIn',
      currentSymptoms: 'Wrist pain',
      pastSymptoms: 'Fibromyalgia',
      pastInjuries: 'Concussion',
      pastSurgeries: 'Thyroidectomy',
      active: true,
      favorite: true,
      needsReview: false
    },
    {
      id: 8,
      firstName: 'James',
      lastName: 'Williams',
      phone: '555-012-3456',
      email: 'james.williams@example.com',
      dob: '1970-08-20',
      address: '505 Cedar St, Cupertino, CA',
      emergencyContact: 'Sara Williams',
      emergencyContactPhone: '555-890-1234',
      heardAboutUs: 'Flyer',
      currentSymptoms: 'Elbow pain',
      pastSymptoms: 'Gout',
      pastInjuries: 'Rib fracture',
      pastSurgeries: 'Rotator cuff repair',
      active: true,
      favorite: false,
      needsReview: true
    },
    {
      id: 9,
      firstName: 'Karen',
      lastName: 'Martinez',
      phone: '555-123-6789',
      email: 'karen.martinez@example.com',
      dob: '1982-09-10',
      address: '606 Elm St, Cupertino, CA',
      emergencyContact: 'Carlos Martinez',
      emergencyContactPhone: '555-234-5678',
      heardAboutUs: 'Radio',
      currentSymptoms: 'Ankle pain',
      pastSymptoms: 'Plantar fasciitis',
      pastInjuries: 'Toe fracture',
      pastSurgeries: 'Bunionectomy',
      active: true,
      favorite: false,
      needsReview: false
    },
    {
      id: 10,
      firstName: 'Robert',
      lastName: 'Anderson',
      phone: '555-234-7890',
      email: 'robert.anderson@example.com',
      dob: '1985-10-25',
      address: '707 Pine Ln, Cupertino, CA',
      emergencyContact: 'Laura Anderson',
      emergencyContactPhone: '555-345-6789',
      heardAboutUs: 'TV ad',
      currentSymptoms: 'Neck pain',
      pastSymptoms: 'TMJ',
      pastInjuries: 'Collarbone fracture',
      pastSurgeries: 'Nasal surgery',
      active: false,
      favorite: true,
      needsReview: true
    },
    {
      id: 11,
      firstName: 'Patricia',
      lastName: 'Clark',
      phone: '555-345-8901',
      email: 'patricia.clark@example.com',
      dob: '1991-11-05',
      address: '808 Willow St, Cupertino, CA',
      emergencyContact: 'Thomas Clark',
      emergencyContactPhone: '555-456-7890',
      heardAboutUs: 'Newspaper',
      currentSymptoms: 'Jaw pain',
      pastSymptoms: 'Arthritis',
      pastInjuries: 'Knee sprain',
      pastSurgeries: 'Spinal fusion',
      active: true,
      favorite: false,
      needsReview: false
    },
    {
      id: 12,
      firstName: 'Christopher',
      lastName: 'Lee',
      phone: '555-456-9012',
      email: 'christopher.lee@example.com',
      dob: '1987-12-12',
      address: '909 Spruce Rd, Cupertino, CA',
      emergencyContact: 'Michelle Lee',
      emergencyContactPhone: '555-567-8901',
      heardAboutUs: 'Billboard',
      currentSymptoms: 'Shoulder pain',
      pastSymptoms: 'Asthma',
      pastInjuries: 'Forearm fracture',
      pastSurgeries: 'Appendectomy',
      active: true,
      favorite: true,
      needsReview: true
    }
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
          active: true,
          favorite: false
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
              {/*className='fixed'*/}
               <div className='fixed'> 
                <header className="App-header">
                  <h1>Clients</h1>
                  <AddButton onClick={addClient} className='svg-icon'></AddButton>
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

              </div>
                <ul className="client-list">
                  {filteredClients.map(client => (
                    <li key={client.id} className="client-item">
                      <Link to={`/client/${client.id}`} className="client-link">
                      <div className='client-info-container'>
                        <div className="client-initials">{getInitials(client.firstName, client.lastName)}</div>
                        <div className="client-info">
                          <div className="client-name">{client.firstName} {client.lastName} </div>
                          <div className="client-phone">{client.phone}</div>
                          {client.email && <div className="client-email">{client.email}</div>}
                        </div>
                      </div>
                      <div className='client-info-container'>
                        {client.needsReview ? <NeedsReview className='svg-icon'></NeedsReview> : <NeedsReview className='svg-icon-hidden'></NeedsReview>}
                        {client.favorite ? <StarFill className='svg-icon'></StarFill>: <StarFill className='svg-icon-hidden'></StarFill>}
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
