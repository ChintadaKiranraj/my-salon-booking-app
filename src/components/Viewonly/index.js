// import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./index.css";
const ViewOnly = () => {
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Date&Time", selector: (row) => row.time, sortable: true },
    { name: "Statue", selector: (row) => row.status, sortable: true },
  ];
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:4001/fetch-booking-details"
        );
        const jsonData = await response.json();
        console.log("Data  --> " + jsonData);
        const decodedString = atob(jsonData.data);
        console.log(decodedString);
        setRecords(JSON.parse(decodedString));
        setFilteredRecords(JSON.parse(decodedString));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleFilter = (event) => {
    let newData = filterRecords.filter((row) =>
      row.status.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRecords(newData);
  };
  const tableHeaderstyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        backgroundColor: "#2874A6",
        color: "white",
        overflow: "auto",
      },
    },
  };
  return (
    <div className="dataTable">
      <input
        type="search"
        onChange={handleFilter}
        className="form-controls w-25"
        placeholder="Search by Status"
      />
      <DataTable
        className="custom-data-table"
        title="Bookings Details"
        columns={columns}
        data={records}
        pagination
        selectableRows
        fixedHeader
        selectableRowsHighlight
        highlightOnHover
        customStyles={tableHeaderstyle}
        initialSortBy={{ prop: "ID", order: "descending" }}
      ></DataTable>
      ;
    </div>
  );
};

export default ViewOnly;
