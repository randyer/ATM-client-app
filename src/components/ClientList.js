import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// svgs
import { ReactComponent as NeedsReview } from '../icons/importantFill.svg';
import { ReactComponent as StarFill } from '../icons/startFill.svg';

const ClientList = ({ clients, getInitials, waitlist, setClients }) => {
  const [waitlistNotes, setWaitlistNotes] = useState({});

  const handleWaitlistNotesChange = (id, value) => {
    setWaitlistNotes({
      ...waitlistNotes,
      [id]: value,
    });
  };

  const saveWaitlistNotes = (id) => {
    setClients((prevClients) => 
      prevClients.map(client => 
        client.id === id ? { ...client, waitlistNotes: waitlistNotes[id] } : client
      )
    );
  };

  return (
    <ul className="client-list">
      {clients.map(client => (
        <li key={client.id} className="client-item">
          {waitlist ? (
            <>
              <div className='client-info-container'>
                <Link to={`/client/${client.id}`} className="client-link">
                  <div className="client-initials">{getInitials(client.firstName, client.lastName)}</div>
                </Link>
                  <div className="client-info">
                    <div className="client-name">{client.firstName} {client.lastName}</div>
                    <textarea 
                      placeholder="Waitlist notes"
                      value={waitlistNotes[client.id] || client.waitlistNotes || ''}
                      onChange={(e) => handleWaitlistNotesChange(client.id, e.target.value)}
                    />
                  </div>
                </div>
                <div className='client-info-container'>
                  <button className="save-button" onClick={() => saveWaitlistNotes(client.id)}>Save</button>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ClientList;
