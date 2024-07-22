import React, { useState, useEffect } from 'react';
import './ToggleButton.css'

function ToggleActive({ val, onToggle, isTrue, isFalse }) {
  const [isToggled, setIsToggled] = useState(val);

  useEffect(() => {
    setIsToggled(val);
  }, [val]);

  const handleChange = () => {
    setIsToggled(!isToggled);
    if (typeof onToggle === 'function') {
      onToggle(!isToggled); // Call the callback function with the new value
    }
  };

  return (
    <button onClick={handleChange} className={`toggle-button ${isToggled ? 'true' : 'false'}`}>
      {isToggled ? isTrue : isFalse}
    </button>
  );
}

export default ToggleActive;
