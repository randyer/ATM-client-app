import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './css/ClientInfo.css';
import './css/variables.css';
import Toggle from './components/ToggleButton';

function ClientInfo({ clients, setClients }) {
  const { id } = useParams();
  const client = clients.find(client => client.id === parseInt(id));
  const navigate = useNavigate();

  const [editableClient, setEditableClient] = useState({ ...client });
  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableClient(prevState => ({ ...prevState, [name]: value }));
  };

  const handleToggleActive = (newActiveValue) => {
    setEditableClient(prevState => ({ ...prevState, active: newActiveValue }));
  };

  const handleToggleFavorite = (newFavoriteValue) => {
    setEditableClient(prevState => ({ ...prevState, favorite: newFavoriteValue }));
  };

  const handleToggleNeedsReview = (newNeedsReviewValue) => {
    setEditableClient(prevState => ({ ...prevState, needsReview: newNeedsReviewValue }));
  };

  const handleSave = () => {
    setClients(prevClients => 
      prevClients.map(c => (c.id === editableClient.id ? editableClient : c))
    );
    navigate('/');
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
          name="firstName" 
          value={editableClient.firstName} 
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Last Name:</strong> 
        <input 
          type="text" 
          name="lastName" 
          value={editableClient.lastName} 
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
      </p>
      {editableClient.email && (
        <p>
          <strong>Email:</strong> 
          <input 
            type="text" 
            name="email" 
            value={editableClient.email} 
            onChange={handleChange}
          />
        </p>
      )}
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
        <strong>Address:</strong> 
        <input 
          type="text" 
          name="address" 
          value={editableClient.address} 
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Emergency Contact:</strong> 
        <input 
          type="text" 
          name="emergencyContact" 
          value={editableClient.emergencyContact} 
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Emergency Contact Phone:</strong> 
        <input 
          type="text" 
          name="emergencyContactPhone" 
          value={editableClient.emergencyContactPhone} 
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>How did you hear about us:</strong> 
        <input 
          type="text" 
          name="heardAboutUs" 
          value={editableClient.heardAboutUs} 
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Current Symptoms:</strong> 
        <input 
          type="text" 
          name="currentSymptoms" 
          value={editableClient.currentSymptoms} 
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Past Symptoms:</strong> 
        <input 
          type="text" 
          name="pastSymptoms" 
          value={editableClient.pastSymptoms} 
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Past Injuries:</strong> 
        <input 
          type="text" 
          name="pastInjuries" 
          value={editableClient.pastInjuries} 
          onChange={handleChange}
        />
      </p>
      <p>
        <strong>Past Surgeries:</strong> 
        <input 
          type="text" 
          name="pastSurgeries" 
          value={editableClient.pastSurgeries} 
          onChange={handleChange}
        />
      </p>
    </div>
  );

  const renderSoapTab = () => (
    <div className="soap-notes">
      <p>
        <strong>Subjective: </strong> (Onset/Location/Intensity/Frequency)
        <textarea name="subjective" value={editableClient.subjective || ''} onChange={handleChange}></textarea>
      </p>
      <p>
        <strong>Objective: </strong> (Visual/Palpable)
        <textarea name="objective" value={editableClient.objective || ''} onChange={handleChange}></textarea>
      </p>
      <p>
        <strong>Assessment: </strong> (Long/Short Term Goals)
        <textarea name="assessment" value={editableClient.assessment || ''} onChange={handleChange}></textarea>
      </p>
      <p>
        <strong>Plan:</strong> (Future Treatment)
        <textarea name="plan" value={editableClient.plan || ''} onChange={handleChange}></textarea>
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
          name="generalNotes" 
          value={editableClient.generalNotes || ''} 
          onChange={handleChange}
          style={{ width: '100%', height: '200px' }}
        ></textarea>
      </p>
    </div>
  );

  return (
    <div className="client-info-page">
      <header className="client-info-header">
        <Link to="/" className="back-button">←</Link>
        <h1>Profile</h1>
        <Toggle val={editableClient.active} onToggle={handleToggleActive} isTrue={'Active'} isFalse={'Archived'}></Toggle>
        <Toggle val={editableClient.favorite} onToggle={handleToggleFavorite} isTrue={'fav'} isFalse={'notfav'}></Toggle>
        <Toggle val={editableClient.needsReview} onToggle={handleToggleNeedsReview} isTrue={'review'} isFalse={'notreview'}></Toggle>
        <button onClick={handleSave} className="save-button">Save</button>
      </header>
      <div className="client-profile">
        <div className="client-avatar">
          <span>{editableClient.firstName[0]}{editableClient.lastName[0]}</span>
        </div>
        <h2>{editableClient.firstName} {editableClient.lastName}</h2>
      </div>
        
      <div className="tab-bar">
        <button 
          className={`tab-button ${activeTab === 'profile' ? 'active' : ''}`} 
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`tab-button ${activeTab === 'soap' ? 'active' : ''}`} 
          onClick={() => setActiveTab('soap')}
        >
          SOAP
        </button>
        <button 
          className={`tab-button ${activeTab === 'notes' ? 'active' : ''}`} 
          onClick={() => setActiveTab('notes')}
        >
          General
        </button>
        <button 
          className={`tab-button ${activeTab === 'appointments' ? 'active' : ''}`} 
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
      </div>
      {activeTab === 'profile' && renderProfileTab()}
      {activeTab === 'soap' && renderSoapTab()}
      {activeTab === 'notes' && renderNotesTab()}
      {activeTab === 'appointments' && renderAppointmentsTab()}
    </div>
  );
}

export default ClientInfo;
