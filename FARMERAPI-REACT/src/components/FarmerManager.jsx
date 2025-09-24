import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import config from './config.js';

const FarmerManager = () => {
  const [farmers, setFarmers] = useState([]);
  const [farmer, setFarmer] = useState({
    id: '',
    name: '',
    gender: '',
    farmType: '',
    location: '',
    landSize: '',
    animalsCount: '',
    email: '',
    contact: ''
  });
  const [idToFetch, setIdToFetch] = useState('');
  const [fetchedFarmer, setFetchedFarmer] = useState(null);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  const baseUrl = config.baseUrl;

  useEffect(() => {
    fetchAllFarmers();
  }, []);

  const fetchAllFarmers = async () => {
    try {
      const res = await axios.get(`${baseUrl}/all`);
      setFarmers(res.data);
    } catch (error) {
      setMessage('Failed to fetch farmers.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    for (let key in farmer) {
      if (!farmer[key] || farmer[key].toString().trim() === '') {
        setMessage(`Please fill out the ${key} field.`);
        return false;
      }
    }
    return true;
  };

  const formatFarmerData = () => {
    return {
      ...farmer,
      id: parseInt(farmer.id),
      landSize: parseFloat(farmer.landSize),
      animalsCount: parseInt(farmer.animalsCount)
    };
  };

  const addFarmer = async () => {
    if (!validateForm()) return;
    try {
      await axios.post(`${baseUrl}/add`, formatFarmerData());
      setMessage('Farmer added successfully.');
      fetchAllFarmers();
      resetForm();
    } catch (error) {
      setMessage('Error adding farmer.');
    }
  };

  const updateFarmer = async () => {
    if (!validateForm()) return;
    try {
      await axios.put(`${baseUrl}/update`, formatFarmerData());
      setMessage('Farmer updated successfully.');
      fetchAllFarmers();
      resetForm();
    } catch (error) {
      setMessage('Error updating farmer.');
    }
  };

  const deleteFarmer = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      setMessage(res.data);
      fetchAllFarmers();
    } catch (error) {
      setMessage('Error deleting farmer.');
    }
  };

  const getFarmerById = async () => {
    try {
      const res = await axios.get(`${baseUrl}/get/${idToFetch}`);
      setFetchedFarmer(res.data);
      setMessage('');
    } catch (error) {
      setFetchedFarmer(null);
      setMessage('Farmer not found.');
    }
  };

  const handleEdit = (f) => {
    setFarmer({
      ...f,
      landSize: f.landSize.toString(),
      animalsCount: f.animalsCount.toString()
    });
    setEditMode(true);
    setMessage(`Editing farmer with ID ${f.id}`);
  };

  const resetForm = () => {
    setFarmer({
      id: '',
      name: '',
      gender: '',
      farmType: '',
      location: '',
      landSize: '',
      animalsCount: '',
      email: '',
      contact: ''
    });
    setEditMode(false);
  };

  return (
    <div className="farmer-container">

      {message && (
        <div className={`message-banner ${message.toLowerCase().includes('error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <h2>Farmer Management System</h2>

      <div>
        <h3>{editMode ? 'Edit Farmer' : 'Add Farmer'}</h3>
        <div className="form-grid">
          <input type="number" name="id" placeholder="ID" value={farmer.id} onChange={handleChange} />
          <input type="text" name="name" placeholder="Name" value={farmer.name} onChange={handleChange} />
          <select name="gender" value={farmer.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
          <select name="farmType" value={farmer.farmType} onChange={handleChange}>
            <option value="">Select Farm Type</option>
            <option value="Dairy">Dairy</option>
            <option value="Crop">Crop</option>
            <option value="Poultry">Poultry</option>
          </select>
          <input type="text" name="location" placeholder="Location" value={farmer.location} onChange={handleChange} />
          <input type="number" name="landSize" placeholder="Land Size (acres)" value={farmer.landSize} onChange={handleChange} />
          <input type="number" name="animalsCount" placeholder="Animals Count" value={farmer.animalsCount} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={farmer.email} onChange={handleChange} />
          <input type="text" name="contact" placeholder="Contact" value={farmer.contact} onChange={handleChange} />
        </div>

        <div className="btn-group">
          {!editMode ? (
            <button className="btn-blue" onClick={addFarmer}>Add Farmer</button>
          ) : (
            <>
              <button className="btn-green" onClick={updateFarmer}>Update Farmer</button>
              <button className="btn-gray" onClick={resetForm}>Cancel</button>
            </>
          )}
        </div>
      </div>

      <div>
        <h3>Get Farmer By ID</h3>
        <input
          type="number"
          value={idToFetch}
          onChange={(e) => setIdToFetch(e.target.value)}
          placeholder="Enter ID"
        />
        <button className="btn-blue" onClick={getFarmerById}>Fetch</button>

        {fetchedFarmer && (
          <div>
            <h4>Farmer Found:</h4>
            <pre>{JSON.stringify(fetchedFarmer, null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h3>All Farmers</h3>
        {farmers.length === 0 ? (
          <p>No farmers found.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {Object.keys(farmer).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map((f) => (
                  <tr key={f.id}>
                    {Object.keys(farmer).map((key) => (
                      <td key={key}>{f[key]}</td>
                    ))}
                    <td>
                      <div className="action-buttons">
                        <button className="btn-green" onClick={() => handleEdit(f)}>Edit</button>
                        <button className="btn-red" onClick={() => deleteFarmer(f.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default FarmerManager;