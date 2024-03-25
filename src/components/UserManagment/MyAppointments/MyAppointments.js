import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { FcViewDetails } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import BookingFormTwo from "../Appointment/appointment";
import { getUserDetails } from "../../Utilities/Utilities";
const btnContent = "UPDATE APPOINTMENT DATA";
const MyAppointments = () => {
    useEffect(() => {
        fetchMyAppointments();
      }, []);

const [isEditMode ,setEditMode] = useState(false);
const [appointments, setAppointments] = useState([]);

  const fetchMyAppointments = async() => {
    console.log("getUserDetails");
    const userId = getUserDetails().userid;
    try {
      const response =  await fetch(`http://localhost:4001/api/get-users-appointments/${userId}`);
      const responseJson = await response.json();
      console.log("usersFromServer", responseJson );
        setAppointments(responseJson.data);
    }
    catch (error) {
      console.log("Error in fetching users", error);
    }

  };

const handleEdit=()=>{
  setEditMode(true) 
 
}
const confirmDelete=()=>{
    console.log("Delete");
}

  const columns = [
    {
      name: "Location",
      selector: (row) => row.location + " " + row.lastname,
      sortable: true,
    },
    { name: "Shopname", selector: (row) => row.shopname, sortable: true },
    { name: "Bokingdatetime", selector: (row) => row.bookingdatetime, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
        name: "Action",
        cell: (row) => (
          <div>
            <FcViewDetails
              className="icons"
              title="Edit"
              onClick={() => handleEdit(row)}
            />
            <MdDeleteOutline
              className="icons"
              title="Delete"
              onClick={() => confirmDelete(row)}
            />
          </div>
        ),
      },
  ];
  return (
    <div>
      <DataTable
        paginationPerPage={10}
        columns={columns}
        data={appointments}
        pagination
        selectableRows
        responsive={true}
        selectableRowsHighlight
        highlightOnHover
        //   customStyles={tableHeaderstyle}
        fixedHeader={true}
        //   fixedHeaderScrollHeight={"30px"}
      ></DataTable>
      {/* {isEditMode  &&  <BookingFormTwo  buttonContent={btnContent} isEditMode={true} userId={getUserDetails().userid}/>} */}
     
    </div>
  );
};

// export default MyAppointments;
export default withRouter(MyAppointments);
