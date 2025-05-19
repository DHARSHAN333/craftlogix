// src/pages/WorkerDetailsPage.jsx
import React, { useState } from 'react';
import './WorkerDetailsPage.css';

function WorkerDetailsPage() {
  const [workers, setWorkers] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      contact: '9876543210',
      language: 'English',
      aadhaar: '1234-5678-9012',
      bankAccount: '1234567890',
      joiningDate: '2020-01-01',
      photo: '/path/to/photo.jpg'
    },
    // Add more sample workers here
  ]);

  const [newWorker, setNewWorker] = useState({
    name: '',
    age: '',
    contact: '',
    language: '',
    aadhaar: '',
    bankAccount: '',
    joiningDate: '',
    photo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWorker({ ...newWorker, [name]: value });
  };

  const handleAddWorker = () => {
    const newWorkerData = { ...newWorker, id: workers.length + 1 };
    setWorkers([...workers, newWorkerData]);
    setNewWorker({
      name: '',
      age: '',
      contact: '',
      language: '',
      aadhaar: '',
      bankAccount: '',
      joiningDate: '',
      photo: ''
    });
  };

  const handleDeleteWorker = (id) => {
    setWorkers(workers.filter(worker => worker.id !== id));
  };

  return (
    <div className="worker-details-page">
      <h2>Worker Details</h2>

      {/* Add Worker Form */}
      <div className="worker-form">
        <h3>Add New Worker</h3>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newWorker.name}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={newWorker.age}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={newWorker.contact}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="language"
            placeholder="Language"
            value={newWorker.language}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="aadhaar"
            placeholder="Aadhaar Number"
            value={newWorker.aadhaar}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="bankAccount"
            placeholder="Bank Account"
            value={newWorker.bankAccount}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="joiningDate"
            value={newWorker.joiningDate}
            onChange={handleInputChange}
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleAddWorker}>Add Worker</button>
        </form>
      </div>

      {/* Worker List Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Language</th>
            <th>Aadhaar</th>
            <th>Bank Account</th>
            <th>Joining Date</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {workers.map(worker => (
            <tr key={worker.id}>
              <td>{worker.name}</td>
              <td>{worker.age}</td>
              <td>{worker.contact}</td>
              <td>{worker.language}</td>
              <td>{worker.aadhaar}</td>
              <td>{worker.bankAccount}</td>
              <td>{worker.joiningDate}</td>
              <td><img src={worker.photo} alt="worker" width="50" height="50" /></td>
              <td>
                <button onClick={() => handleDeleteWorker(worker.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkerDetailsPage;
