import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientInfo from './ClientInfo';
import { get, post } from 'aws-amplify/api';

//components
import ClientList from './components/ClientList';
import ScrollToTop from './components/ScrollToTop';
//css
import './css/App.css';
import './css/variables.css';
// svgs
import { ReactComponent as AddButton } from './icons/add.svg';

const myAPI = "apia10d7b33";
const path = "/customers"

function App() {

  async function getCustomer(e) {
    let customerPhone = e.input
    const restOperation = get({apiName: myAPI, path: path + "/" + customerPhone})
    const { body } = await restOperation.response;
    const response = await body.json();
    console.log(response)
    let newCustomers = [...customers]
    newCustomers.push(response)
    setCustomers(newCustomers)
    console.log(customers)
  }

  const [input, setInput] = useState("")
  const [customers, setCustomers] = useState([])
  
  const [clients, setClients] = useState([
    {
      id: 1,
      firstName: 'Anna',
      lastName: 'Haro',
      phone: '555-522-8243',
      email: 'anna-haro@mac.com',
      dob: '1980-01-01',
      address: {
        street: '123 Apple St',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'John Haro',
      emergencyContactPhone: '555-123-4567',
      heardAboutUs: 'Google',
      currentSymptoms: 'Headache',
      pastSymptoms: 'Back pain',
      pastInjuries: 'Broken leg',
      pastSurgeries: 'Appendectomy',
      formData: 'Current Symptoms: Headache\nPast Symptoms: Back pain\nPast Injuries: Broken leg\nPast Surgeries: Appendectomy',
      active: true,
      favorite: true,
      needsReview: false,
      waitlisted: false
    },
    {
      id: 2,
      firstName: 'Daniel',
      lastName: 'Higgins Jr.',
      phone: '555-478-7672',
      email: 'd-higgins@mac.com',
      dob: '1985-02-15',
      address: {
        street: '456 Banana Blvd',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'Jane Higgins',
      emergencyContactPhone: '555-234-5678',
      heardAboutUs: 'Facebook',
      currentSymptoms: 'Neck pain',
      pastSymptoms: 'Shoulder pain',
      pastInjuries: 'Sprained ankle',
      pastSurgeries: 'Knee surgery',
      formData: 'Current Symptoms: Neck pain\nPast Symptoms: Shoulder pain\nPast Injuries: Sprained ankle\nPast Surgeries: Knee surgery',
      active: true,
      favorite: false,
      needsReview: false,
      waitlisted: false
    },
    {
      id: 3,
      firstName: 'Jane',
      lastName: 'Doe',
      phone: '555-123-4567',
      email: 'jane.doe@example.com',
      dob: '1990-03-12',
      address: {
        street: '789 Cherry Ln',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'John Doe',
      emergencyContactPhone: '555-345-6789',
      heardAboutUs: 'Instagram',
      currentSymptoms: 'Lower back pain',
      pastSymptoms: 'Migraine',
      pastInjuries: 'Wrist fracture',
      pastSurgeries: 'Gallbladder removal',
      formData: 'Current Symptoms: Lower back pain\nPast Symptoms: Migraine\nPast Injuries: Wrist fracture\nPast Surgeries: Gallbladder removal',
      active: true,
      favorite: true,
      needsReview: true,
      waitlisted: false
    },
    {
      id: 4,
      firstName: 'John',
      lastName: 'Smith',
      phone: '555-678-1234',
      email: 'john.smith@example.com',
      dob: '1975-04-22',
      address: {
        street: '101 Pine St',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'Jane Smith',
      emergencyContactPhone: '555-456-7890',
      heardAboutUs: 'Referral',
      currentSymptoms: 'Knee pain',
      pastSymptoms: 'Tennis elbow',
      pastInjuries: 'Dislocated shoulder',
      pastSurgeries: 'Hernia repair',
      formData: 'Current Symptoms: Knee pain\nPast Symptoms: Tennis elbow\nPast Injuries: Dislocated shoulder\nPast Surgeries: Hernia repair',
      active: true,
      favorite: false,
      needsReview: false,
      waitlisted: false
    },
    {
      id: 5,
      firstName: 'Emily',
      lastName: 'Johnson',
      phone: '555-789-1234',
      email: 'emily.johnson@example.com',
      dob: '1988-05-15',
      address: {
        street: '202 Maple Ave',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'Robert Johnson',
      emergencyContactPhone: '555-567-8901',
      heardAboutUs: 'Yelp',
      currentSymptoms: 'Shoulder pain',
      pastSymptoms: 'Carpal tunnel',
      pastInjuries: 'Ankle sprain',
      pastSurgeries: 'C-section',
      formData: 'Current Symptoms: Shoulder pain\nPast Symptoms: Carpal tunnel\nPast Injuries: Ankle sprain\nPast Surgeries: C-section',
      active: true,
      favorite: true,
      needsReview: false,
      waitlisted: false
    },
    {
      id: 6,
      firstName: 'Michael',
      lastName: 'Brown',
      phone: '555-890-1234',
      email: 'michael.brown@example.com',
      dob: '1965-06-30',
      address: {
        street: '303 Birch Rd',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'Laura Brown',
      emergencyContactPhone: '555-678-9012',
      heardAboutUs: 'Twitter',
      currentSymptoms: 'Hip pain',
      pastSymptoms: 'Sciatica',
      pastInjuries: 'ACL tear',
      pastSurgeries: 'Hip replacement',
      formData: 'Current Symptoms: Hip pain\nPast Symptoms: Sciatica\nPast Injuries: ACL tear\nPast Surgeries: Hip replacement',
      active: true,
      favorite: false,
      needsReview: true,
      waitlisted: false
    },
    {
      id: 7,
      firstName: 'Lisa',
      lastName: 'Taylor',
      phone: '555-901-2345',
      email: 'lisa.taylor@example.com',
      dob: '1992-07-08',
      address: {
        street: '404 Oak Dr',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'David Taylor',
      emergencyContactPhone: '555-789-0123',
      heardAboutUs: 'LinkedIn',
      currentSymptoms: 'Wrist pain',
      pastSymptoms: 'Fibromyalgia',
      pastInjuries: 'Concussion',
      pastSurgeries: 'Thyroidectomy',
      formData: 'Current Symptoms: Wrist pain\nPast Symptoms: Fibromyalgia\nPast Injuries: Concussion\nPast Surgeries: Thyroidectomy',
      active: true,
      favorite: true,
      needsReview: false,
      waitlisted: false
    },
    {
      id: 8,
      firstName: 'James',
      lastName: 'Williams',
      phone: '555-012-3456',
      email: 'james.williams@example.com',
      dob: '1970-08-20',
      address: {
        street: '505 Cedar St',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'Sara Williams',
      emergencyContactPhone: '555-890-1234',
      heardAboutUs: 'Flyer',
      currentSymptoms: 'Elbow pain',
      pastSymptoms: 'Gout',
      pastInjuries: 'Rib fracture',
      pastSurgeries: 'Rotator cuff repair',
      formData: 'Current Symptoms: Elbow pain\nPast Symptoms: Gout\nPast Injuries: Rib fracture\nPast Surgeries: Rotator cuff repair',
      active: true,
      favorite: false,
      needsReview: true,
      waitlisted: false
    },
    {
      id: 9,
      firstName: 'Karen',
      lastName: 'Martinez',
      phone: '555-123-6789',
      email: 'karen.martinez@example.com',
      dob: '1982-09-10',
      address: {
        street: '606 Elm St',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'Carlos Martinez',
      emergencyContactPhone: '555-234-5678',
      heardAboutUs: 'Radio',
      currentSymptoms: 'Ankle pain',
      pastSymptoms: 'Plantar fasciitis',
      pastInjuries: 'Toe fracture',
      pastSurgeries: 'Bunionectomy',
      formData: 'Current Symptoms: Ankle pain\nPast Symptoms: Plantar fasciitis\nPast Injuries: Toe fracture\nPast Surgeries: Bunionectomy',
      active: true,
      favorite: false,
      needsReview: false,
      waitlisted: false
    },
    {
      id: 10,
      firstName: 'Robert',
      lastName: 'Anderson',
      phone: '555-234-7890',
      email: 'robert.anderson@example.com',
      dob: '1985-10-25',
      address: {
        street: '707 Pine Ln',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'Laura Anderson',
      emergencyContactPhone: '555-345-6789',
      heardAboutUs: 'TV ad',
      currentSymptoms: 'Neck pain',
      pastSymptoms: 'TMJ',
      pastInjuries: 'Collarbone fracture',
      pastSurgeries: 'Nasal surgery',
      formData: 'Current Symptoms: Neck pain\nPast Symptoms: TMJ\nPast Injuries: Collarbone fracture\nPast Surgeries: Nasal surgery',
      active: false,
      favorite: true,
      needsReview: true,
      waitlisted: false
    },
    {
      id: 11,
      firstName: 'Patricia',
      lastName: 'Clark',
      phone: '555-345-8901',
      email: 'patricia.clark@example.com',
      dob: '1991-11-05',
      address: {
        street: '808 Willow St',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'Thomas Clark',
      emergencyContactPhone: '555-456-7890',
      heardAboutUs: 'Newspaper',
      currentSymptoms: 'Jaw pain',
      pastSymptoms: 'Arthritis',
      pastInjuries: 'Knee sprain',
      pastSurgeries: 'Spinal fusion',
      formData: 'Current Symptoms: Jaw pain\n\nPast Symptoms: Arthritis\n\nPast Injuries: Knee sprain, Knee sprain, Knee sprain, Knee sprain\n\nPast Surgeries: Spinal fusion',
      active: true,
      favorite: false,
      needsReview: false,
      waitlisted: false
    },
    {
      id: 12,
      firstName: 'Christopher',
      lastName: 'Lee',
      phone: '555-456-9012',
      email: 'christopher.lee@example.com',
      dob: '1987-12-12',
      address: {
        street: '909 Spruce Rd',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014'
      },
      emergencyContact: 'Michelle Lee',
      emergencyContactPhone: '555-567-8901',
      heardAboutUs: 'Billboard',
      currentSymptoms: 'Shoulder pain',
      pastSymptoms: 'Asthma',
      pastInjuries: 'Forearm fracture',
      pastSurgeries: 'Appendectomy',
      formData: 'Current Symptoms: Shoulder pain\nPast Symptoms: Asthma\nPast Injuries: Forearm fracture\nPast Surgeries: Appendectomy',
      active: true,
      favorite: true,
      needsReview: true,
      waitlisted: true
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
          favorite: false,
          needsReview: false,
          waitlisted: false
        }
      ]);
    }
  };

  const getInitials = (firstName, lastName) => {
    return (firstName[0] + lastName[0]).toUpperCase();
  };

  const filteredClients = clients.filter(client =>
    (client.firstName + ' ' + client.lastName).toLowerCase().includes(search.toLowerCase()) &&
    ((activeTab === 'active' && client.active && !client.waitlisted) || 
      (activeTab === 'waitlist' && client.waitlisted) || 
      (activeTab === 'archive' && !client.active))
  );

  return (
    <div className="App">
    <h1>Super Simple React App</h1>
    <div>
        <input placeholder="customer id" type="text" value={input} onChange={(e) => setInput(e.target.value)}/>      
    </div>
    <br/>
    <button onClick={() => getCustomer({input})}>Get Customer From Backend</button>

    <h2 style={{visibility: customers.length > 0 ? 'visible' : 'hidden' }}>Response</h2>
    {
       customers.map((thisCustomer, index) => {
         return (
        <div key={thisCustomer.customerId}>
          <span><b>CustomerPhone:</b> {thisCustomer.customerPhone} - <b>CustomerName</b>: {thisCustomer.customerName}</span>
        </div>)
       })
      }
  </div>

    // <Router basename=''>
    // <ScrollToTop/>
    //   <div className="App">
    //     <Routes>
    //       <Route
    //         path="/"
    //         element={
    //           <>
    //            <div className='fixed'> 
    //             <header className="App-header">
    //               <h1>Clients</h1>
    //               <AddButton onClick={addClient} className='svg-icon'></AddButton>
    //             </header>
    //             <div className="tabs">
    //               <button className={`tab ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>
    //                 Active
    //               </button>
    //               <button className={`tab ${activeTab === 'waitlist' ? 'active' : ''}`} onClick={() => setActiveTab('waitlist')}>
    //                 Waitlist
    //               </button>
    //               <button className={`tab ${activeTab === 'archive' ? 'active' : ''}`} onClick={() => setActiveTab('archive')}>
    //                 Archive
    //               </button>
    //             </div>
    //             <input
    //               type="text"
    //               placeholder="Search"
    //               value={search}
    //               onChange={(e) => setSearch(e.target.value)}
    //               className="search-bar"
    //             />
    //           </div>
    //           <ClientList clients={filteredClients} getInitials={getInitials} waitlist={activeTab === 'waitlist'} setClients={setClients} />
    //           </>
    //         }
    //       />
    //       <Route path="/client/:id" element={<ClientInfo clients={clients} setClients={setClients} />} />
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
