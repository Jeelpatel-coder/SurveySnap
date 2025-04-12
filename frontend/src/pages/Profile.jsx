import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setEditedUser(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch user profile');
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5001/api/users/profile', editedUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(editedUser);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading your profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="error-message">Failed to load profile</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-icon">
            <FaUser size={50} />
          </div>
          <div className="profile-title">
            <h2 style={{paddingLeft: "5vw", paddingTop: "5vh"}}>Username:- {user.username}</h2>
            {/* <p>Member since {new Date(user.createdAt).toLocaleDateString()}</p> */}
          </div>
        </div>
        
        <div className="profile-table-container">
          <table className="profile-table"  cellPadding={25} cellSpacing={20}>
            <tbody>
              <tr>
                <th><FaEnvelope /> Email</th>
                <td>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      className="edit-input"
                    />
                  ) : (
                    user.email
                  )}
                </td>
              </tr>
              <tr>
                <th><FaPhone /> Phone Number</th>
                <td>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editedUser.phoneNumber}
                      onChange={(e) => setEditedUser({ ...editedUser, phoneNumber: e.target.value })}
                      className="edit-input"
                    />
                  ) : (
                    user.phoneNumber
                  )}
                </td>
              </tr>
              <tr>
                <th><FaCalendarAlt /> Member Since</th>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="save-btn" onClick={handleSave} style={{marginLeft: "2vw", backgroundColor: "blueviolet", color: "white"}}>Save Changes</button>
              <button className="cancel-btn" onClick={handleCancel} style={{marginLeft: "2vw", backgroundColor: "blueviolet", color: "white"}}>Cancel</button>
            </>
          ) : (
            <button className="edit-btn" onClick={handleEdit} style={{marginLeft: "9vw"}}>
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile; 