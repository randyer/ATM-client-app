import React, { useState, useEffect } from 'react';
import './ToggleActive.css'

function ToggleActive({ val, onToggle }) {
  const [isToggled, setIsToggled] = useState(val);

  useEffect(() => {
    setIsToggled(val);
  }, [val]);

  const handleChange = () => {
    setIsToggled(!isToggled);
    onToggle(!isToggled); // Call the callback function with the new value
  };

  return (
    <button onClick={handleChange} className={`toggle-button ${isToggled ? 'active' : 'archived'}`}>
      {isToggled ? 'Active' : 'Archived'}
    </button>
  );
}

export default ToggleActive;
