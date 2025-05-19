import React, { useState } from 'react';
import './SalaryCalculationPage.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SalaryCalculation = () => {
  const [workData, setWorkData] = useState([]);
  const [individualSummary, setIndividualSummary] = useState({});
  const [contractorSummary, setContractorSummary] = useState({});
  const [contractorSalary, setContractorSalary] = useState(0);

  const [workersInput, setWorkersInput] = useState([
    { name: '', worktype: '', rate: '', bundleNumber: '', pieces: '' },
  ]);

  const handleInputChange = (index, field, value) => {
    const updated = [...workersInput];
    updated[index][field] = value;
    setWorkersInput(updated);
  };

  const addWorkerInput = () => {
    setWorkersInput([
      ...workersInput,
      { name: '', worktype: '', rate: '', bundleNumber: '', pieces: '' },
    ]);
  };

  const handleAddBundle = () => {
    let allValid = true;
    const newWorkData = [...workData];
    const updatedIndividualSummary = { ...individualSummary };
    const updatedContractorSummary = { ...contractorSummary };

    workersInput.forEach((worker) => {
      const { name, worktype, rate, bundleNumber, pieces } = worker;
      if (!name || !worktype || !rate || !bundleNumber || !pieces) {
        allValid = false;
        return;
      }

      const totalPayment = parseFloat(rate) * parseInt(pieces);
      newWorkData.push({ ...worker, pieces: parseInt(pieces), rate: parseFloat(rate), totalPayment });

      if (!updatedIndividualSummary[name]) updatedIndividualSummary[name] = {};
      if (!updatedIndividualSummary[name][worktype]) updatedIndividualSummary[name][worktype] = { pieces: 0, totalPayment: 0 };
      updatedIndividualSummary[name][worktype].pieces += parseInt(pieces);
      updatedIndividualSummary[name][worktype].totalPayment += totalPayment;

      if (!updatedContractorSummary[worktype]) updatedContractorSummary[worktype] = { totalPieces: 0, totalPayment: 0 };
      updatedContractorSummary[worktype].totalPieces += parseInt(pieces);
      updatedContractorSummary[worktype].totalPayment += totalPayment;
    });

    if (!allValid) {
      alert("Please enter all fields for all workers.");
      return;
    }

    setWorkData(newWorkData);
    setIndividualSummary(updatedIndividualSummary);
    setContractorSummary(updatedContractorSummary);

    const totalContractorSalary = Object.values(updatedContractorSummary).reduce(
      (total, summary) => total + summary.totalPayment, 0
    );
    const contractorSalaryWithBonus = totalContractorSalary * 1.2;
    setContractorSalary(contractorSalaryWithBonus);

    setWorkersInput([
      { name: '', worktype: '', rate: '', bundleNumber: '', pieces: '' },
    ]);
  };

  const updateWorkDataTable = () => {
    return workData.map((entry, index) => (
      <tr key={index}>
        <td>{entry.name}</td>
        <td>{entry.worktype}</td>
        <td>{entry.bundleNumber}</td>
        <td>{entry.pieces}</td>
        <td>{entry.rate}</td>
        <td>{entry.totalPayment.toFixed(2)}</td>
      </tr>
    ));
  };

  const updateIndividualSummaryTable = () => {
    const rows = [];
    for (let name in individualSummary) {
      let totalSalary = 0;
      for (let worktype in individualSummary[name]) {
        const summary = individualSummary[name][worktype];
        totalSalary += summary.totalPayment;
        rows.push(
          <tr key={`${name}-${worktype}`}>
            <td>{name}</td>
            <td>{worktype}</td>
            <td>{summary.pieces}</td>
            <td>{summary.totalPayment.toFixed(2)}</td>
          </tr>
        );
      }
      rows.push(
        <tr key={`${name}-total`} style={{ fontWeight: 'bold' }}>
          <td>{name}</td>
          <td>Total</td>
          <td></td>
          <td>{totalSalary.toFixed(2)}</td>
        </tr>
      );
    }
    return rows;
  };

  const updateContractorSummaryTable = () => {
    return Object.keys(contractorSummary).map((worktype) => {
      const summary = contractorSummary[worktype];
      return (
        <tr key={worktype}>
          <td>{worktype}</td>
          <td>{summary.totalPieces}</td>
          <td>{summary.totalPayment.toFixed(2)}</td>
        </tr>
      );
    });
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(workData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Work Data");
    XLSX.writeFile(workbook, "SalaryData.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Salary Work Data", 14, 10);
    const tableData = workData.map((entry) => [
      entry.name,
      entry.worktype,
      entry.bundleNumber,
      entry.pieces,
      entry.rate,
      entry.totalPayment.toFixed(2),
    ]);
    doc.autoTable({
      head: [["Name", "Work Type", "Bundle No.", "Pieces", "Rate", "Total Payment"]],
      body: tableData,
      startY: 20,
    });
    doc.save("SalaryData.pdf");
  };

  return (
    <div className="salary-calculation">
      <h2>Salary Calculation</h2>

      <div>
        <h3>Add Workers</h3>
        {workersInput.map((worker, index) => (
          <div key={index} className="worker-input">
            <label>Name:</label>
            <input type="text" value={worker.name} onChange={(e) => handleInputChange(index, 'name', e.target.value)} />

            <label>Work Type:</label>
            <input type="text" value={worker.worktype} onChange={(e) => handleInputChange(index, 'worktype', e.target.value)} />

            <label>Rate:</label>
            <input type="number" value={worker.rate} onChange={(e) => handleInputChange(index, 'rate', e.target.value)} />

            <label>Bundle Number:</label>
            <input type="number" value={worker.bundleNumber} onChange={(e) => handleInputChange(index, 'bundleNumber', e.target.value)} />

            <label>Pieces:</label>
            <input type="number" value={worker.pieces} onChange={(e) => handleInputChange(index, 'pieces', e.target.value)} />
          </div>
        ))}

        <button onClick={addWorkerInput} style={{ marginRight: '10px' }}>➕ Add Worker</button>
        <button onClick={handleAddBundle}>✅ Add Bundle(s)</button>
      </div>

      <div>
        <h3>Work Data</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Work Type</th>
              <th>Bundle Number</th>
              <th>Pieces</th>
              <th>Rate</th>
              <th>Total Payment</th>
            </tr>
          </thead>
          <tbody>
            {updateWorkDataTable()}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Individual Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Work Type</th>
              <th>Pieces</th>
              <th>Total Payment</th>
            </tr>
          </thead>
          <tbody>
            {updateIndividualSummaryTable()}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Contractor Summary</h3>
        <table>
          <thead>
            <tr>
              <th>Work Type</th>
              <th>Total Pieces</th>
              <th>Total Payment</th>
            </tr>
          </thead>
          <tbody>
            {updateContractorSummaryTable()}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Contractor Base Salary: ₹{(contractorSalary / 1.2).toFixed(2)}</h3>
        <h3>Contractor Final Salary (with 20%): ₹{contractorSalary.toFixed(2)}</h3>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button onClick={exportToExcel}>Export to Excel</button>
        <button onClick={exportToPDF} style={{ marginLeft: '10px' }}>Export to PDF</button>
      </div>
    </div>
  );
};

export default SalaryCalculation;
