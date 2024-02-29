// import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./index.css";

const ViewOnly = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilteredRecords] = useState([]);
  const columns = [
  
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Date&Time", selector: (row) => row.time, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.status === "Pending",
          style: {
            color: "blue",
            fontWeight: "1000",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.status === "Rejected",
          style: {
            color: "red",
            fontWeight: "1000",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.status === "Approved",
          style: {
            color: "green",
            fontWeight: "1000",
            "&:hover": {
              cursor: "not-allowed",
            },
          },
        },
      ],
    },
  ];

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
    <div className="dataTables">
      <input
        type="search"
        onChange={handleFilter}
        className="form-control w-25 search pl-5 p-20"
        placeholder="Search by Status"
      />
      <DataTable
        paginationPerPage={5}
        columns={columns}
        data={records}
        pagination
        selectableRows
        responsive={true}
        selectableRowsHighlight
        highlightOnHover
        customStyles={tableHeaderstyle}
    
      ></DataTable>
      ;
    </div>
  );
};

export default ViewOnly;
