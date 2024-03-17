import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./index.css";
import Cookie from "js-cookie";

const UserBookings = () => {
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilteredRecords] = useState([]);

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.status === "Pending",
          style: {
            color: "blue",
            fontWeight: "600",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.status === "Rejected",
          style: {
            color: "red",
            fontWeight: "600",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.status === "Approved",
          style: {
            color: "green",
            fontWeight: "600",
            "&:hover": {
              cursor: "not-allowed",
            },
          },
        },
      ],
    },
    { name: "Date&Time", selector: (row) => row.time, sortable: true },
  ];

  const fetchAppointments = async () => {
    const token = Cookie.get("jwt_token");
    const loginUser = Cookie.get("email_id");
    const accessLevele = parseInt(Cookie.get("access_level"));

    let URL = "http://localhost:4001/fetch-booking-details";
    try {
      const response = await fetch(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      console.log("Dataat viw only  --> " + jsonData.data);
      let filteredData = [];
      if (accessLevele === 0 || accessLevele === 1 || accessLevele === 2) {
        filteredData = jsonData.data.filter((item) => {
          return item.regEmialId === loginUser;
        });
      }
      if (accessLevele === 3) {
        filteredData = jsonData.data;
      }
      console.log(filteredData);
      setRecords(filteredData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
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
        fontWeight: "500",
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
        paginationPerPage={10}
        columns={columns}
        data={records}
        pagination
        // selectableRows
        responsive={true}
        selectableRowsHighlight
        highlightOnHover
        customStyles={tableHeaderstyle}
        fixedHeader={true}
        fixedHeaderScrollHeight={"310px"}
      ></DataTable>
    </div>
  );
};

export default UserBookings;
