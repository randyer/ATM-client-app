import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ClientInfo.css';

function ClientInfo({ clients, setClients }) {
  const { id } = useParams();
  const client = clients.find(client => client.id === parseInt(id));
  const navigate = useNavigate();

  const [editableClient, setEditableClient] = useState({ ...client });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableClient(prevState => ({ ...prevState, [name]: value }));
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

  return (
    <div className="client-info-page">
      <header className="client-info-header">
        <Link to="/" className="back-button">←</Link>
        <h1>Profile</h1>
        <button onClick={handleSave} className="save-button">Save</button>
      </header>
      <div className="client-profile">
        <div className="client-avatar">
          <span>{editableClient.firstName[0]}{editableClient.lastName[0]}</span>
        </div>
        <h2>{editableClient.firstName} {editableClient.lastName}</h2>
      </div>
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
    </div>
  );
}

export default ClientInfo;
