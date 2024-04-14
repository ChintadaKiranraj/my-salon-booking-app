import React, { useState } from 'react';

const ChangePasswordForm = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Perform validation of input values
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password must match.');
      return;
    }
    
    // Send a request to update the password
    // You can use Axios, Fetch, or a library like Axios to make an API call here
    
    // Reset the form fields
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }
  
  return (
    <div className="form-container">
      <h2>Change Password</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="currentPassword">Current Password</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default ChangePasswordForm;