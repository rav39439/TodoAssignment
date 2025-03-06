import React, { useState } from 'react'
import useInput from '../customHook/useInput'

function CustomForm() {
    const [name, bindName, resetName] = useInput("");
    const [email, bindEmail, resetEmail] = useInput("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Name:", name);
      console.log("Email:", email);
      resetName();
      resetEmail();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" {...bindName} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" {...bindEmail} />
        </div>
        <button type="submit">Submit</button>
      </form>
    );
}

export default CustomForm