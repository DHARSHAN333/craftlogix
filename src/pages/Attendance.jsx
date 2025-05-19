import React, { useState, useEffect } from 'react';
import './AttendancePage.css';

function AttendancePage() {
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Company 1', workers: [{ id: 1, name: 'Worker 1', attendance: {} }] },
  ]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    if (selectedMonth) {
      const [year, month] = selectedMonth.split('-').map(Number);
      const days = new Date(year, month, 0).getDate();
      setDaysInMonth(Array.from({ length: days }, (_, i) => i + 1));
    }
  }, [selectedMonth]);

  const addCompany = () => {
    const newCompany = {
      id: Date.now(),
      name: `Company ${companies.length + 1}`,
      workers: [{ id: 1, name: 'Worker 1', attendance: {} }],
    };
    setCompanies([...companies, newCompany]);
  };

  const addWorker = () => {
    if (!selectedCompanyId) return;
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === selectedCompanyId
          ? {
              ...company,
              workers: [
                ...company.workers,
                {
                  id: Date.now(),
                  name: `Worker ${company.workers.length + 1}`,
                  attendance: {},
                },
              ],
            }
          : company
      )
    );
  };

  const updateWorkerName = (companyId, workerId, newName) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId
          ? {
              ...company,
              workers: company.workers.map((worker) =>
                worker.id === workerId ? { ...worker, name: newName } : worker
              ),
            }
          : company
      )
    );
  };

  const toggleAttendance = (companyId, workerId, day) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company.id === companyId
          ? {
              ...company,
              workers: company.workers.map((worker) =>
                worker.id === workerId
                  ? {
                      ...worker,
                      attendance: {
                        ...worker.attendance,
                        [day]: worker.attendance[day] === '✓' ? '' : '✓',
                      },
                    }
                  : worker
              ),
            }
          : company
      )
    );
  };

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  return (
    <div className="attendance-page">
      <h2>Attendance Sheet</h2>

      <div className="top-bar">
        <label>Select Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      <div className="company-list">
        {companies.map((company) => (
          <div
            key={company.id}
            className={`company-tab ${selectedCompanyId === company.id ? 'active' : ''}`}
            onClick={() => setSelectedCompanyId(company.id)}
          >
            {company.name}
          </div>
        ))}
        <div className="add-company" onClick={addCompany}>
          + Add Company
        </div>
      </div>

      {selectedCompanyId && (
        <div className="controls">
          <button onClick={addWorker}>+ Add Worker</button>
        </div>
      )}

      {selectedCompany && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                {daysInMonth.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {selectedCompany.workers.map((worker) => (
                <tr key={worker.id}>
                  <td>
                    <input
                      className="name-input"
                      value={worker.name}
                      onChange={(e) =>
                        updateWorkerName(selectedCompany.id, worker.id, e.target.value)
                      }
                    />
                  </td>
                  {daysInMonth.map((day) => (
                    <td
                      key={day}
                      className="attendance-cell"
                      onClick={() =>
                        toggleAttendance(selectedCompany.id, worker.id, day)
                      }
                    >
                      {worker.attendance[day] || ''}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AttendancePage;
