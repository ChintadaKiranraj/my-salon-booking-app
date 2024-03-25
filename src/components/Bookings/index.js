import React from "react";
import Admin from "../Admin";

import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { toast, ToastContainer } from "react-toastify";
import  "./Bookings.css";
export const tableHeaderstyle = {
  headCells: {
    style: {
      fontWeight: "500",
      fontSize: "15px",
      backgroundColor: "#00246b",
      color: "white",
      overflow: "auto",
    },
  },
};
const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("Bookings component is mounted");
    const ownerId = 24;
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/api/users-with-bookings/${ownerId}`
        );
        const bookings = await response.json();
        setBookings(bookings.data);
        setFilteredBookings(bookings.data);
        if (bookings.success === true) {
          setLoading(false);
        }

        console.log(bookings.data);
      } catch (error) {
        console.log("Error in fetching bookings11", error); 
        toast.error("Error in fetching bookings"+ error);
      }
    };
    fetchBookings();
  }, []);
  const columns = [
    {
      name: "FullName",
      selector: (row) => row.firstname + " " + row.lastname,
      sortable: true,
    },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phonenumber", selector: (row) => row.phonenumber, sortable: true },
    { name: "Location", selector: (row) => row.location, sortable: true },
    { name: "Shopname", selector: (row) => row.shopname, sortable: true },

    {
      name: "Bookingdatetime",
      selector: (row) => row.bookingdatetime,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.status === "pending",
          style: {
            color: "blue",
            fontWeight: "600",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.status === "cancelled",
          style: {
            color: "red",
            fontWeight: "600",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.status === "completed",
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
  ];

  const handleFilter = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = bookings.filter(
      (bookingItem) =>
        bookingItem.status.toLowerCase().includes(query) ||
        bookingItem.location.toLowerCase().includes(query) ||
        bookingItem.lastname.toLowerCase().includes(query) ||
        bookingItem.firstname.toLowerCase().includes(query) ||
        bookingItem.phonenumber.toLowerCase().includes(query) ||
        bookingItem.bookingdatetime.toLowerCase().includes(query)
    );
    setFilteredBookings(filtered);
  };
  return (
    <div className="dataTables">
       <div className="table-header">
       <h2>Pending Appointments</h2>
       </div>
       

      <input
        type="search"
        onChange={handleFilter}
        value={searchQuery}
        className="w-25 search pl-5 p-20"
        placeholder="Search by Status"
      />
      {loading ? (
        <div
          className="spinner-border text-primary d-flex justify-content-center align-items-center mt-5 mb-5"
          role="status"
        ></div>
      ) : (
      
   
        <DataTable
          paginationPerPage={10}
          columns={columns}
          data={filteredBookings}
          pagination
          selectableRows
          responsive={true}
          selectableRowsHighlight
          highlightOnHover
          customStyles={tableHeaderstyle}
          fixedHeader={true}
          fixedHeaderScrollHeight={"310px"}
        ></DataTable>
        
      )}
      <ToastContainer/>
    </div>
  );
};

export default Bookings;
