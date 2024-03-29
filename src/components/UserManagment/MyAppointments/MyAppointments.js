import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CiEdit } from "react-icons/ci";

import { FcViewDetails } from "react-icons/fc";
import { MdDeleteOutline } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";

import { getUserDetails } from "../../Utilities/Utilities";
import Appointment from "../AppointmentForm/appointment";
import EditUserAppointment from "../EditUserAppointment/EditUserAppointment";
import "./MyAppointments.css";
import { ToastContainer, toast } from "react-toastify";

const MyAppointments = () => {
  useEffect(() => {
    fetchMyAppointments();
  }, []);

  const [userAppointmentsEditData, setUserAppointmentsEditData] = useState({
    editAppointment: false,
    appointment: null,
  });

  const [appointments, setAppointments] = useState([]);

  const fetchMyAppointments = async () => {
    console.log("getUserDetails");
    const userId = getUserDetails().userid;
    try {
      const response = await fetch(
        `http://localhost:4001/api/get-users-appointments/${userId}`
      );
      const responseJson = await response.json();
      console.log("User appointments XXXXX", responseJson);
      setAppointments(responseJson.data);
    } catch (error) {
      console.log("Error in fetching users", error);
    }
  };

  //on click edit appointment we are sending the data to the edit user appointment
  const onClickEditAppointment = (appointment) => {
    setUserAppointmentsEditData({
      ...userAppointmentsEditData,
      isEditAppointmentClicked: true,
      appointment,
    });
    localStorage.setItem("userAppointmentEditMode", true);
  };
  const onClickDelAppointment = async (myAppointment) => {
   
    console.log("Delete");
    try {
      const response = await fetch(
        `http://localhost:4001/api/delete-appointment/${myAppointment.bookingid}`,
        {
          method: "DELETE",
        }
      );
      const responseJson = await response.json();

      if (responseJson.code === 200) {
        toast.success("Appointment deleted successfully");
        fetchMyAppointments();
      }
    } catch (e) {
      toast.error("Error in deleting appointment", e);
    }
  };

  const columns = [
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    { name: "Shopname", selector: (row) => row.shopname, sortable: true },
    {
      name: "Bokingdatetime",
      selector: (row) => row.bookingdatetime,
      sortable: true,
    },

    {
      name: "StatusAppointment",
      selector: (row) => (
        <>
          {row.status}
          <FaCircle className="circular-icon" />
        </>
      ),

      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.status === "pending",
          style: {
            color: "#007bff",
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
          },
        },
        {
          when: (row) => row.status === "accepted",
          style: {
            color: "green",
            fontWeight: "600",
          },
        },
      ],
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <CiEdit
            className="MdDeleteOutline-CiEdit"
            title="Edit"
            onClick={() => onClickEditAppointment(row)}
          />
          <MdDeleteOutline
            className="MdDeleteOutline-CiEdit"
            title="Delete"
            onClick={() => onClickDelAppointment(row)}
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
         
      {userAppointmentsEditData.isEditAppointmentClicked && (
        <EditUserAppointment
          setUserAppointmentsEditData={setUserAppointmentsEditData}
          userAppointmentsEditData={userAppointmentsEditData}
          
        />
      )}
     <ToastContainer/>
    </div>
  );
};

export default MyAppointments;

// export default withRouter(MyAppointments);

// tihs form is about the show to rhe use booking appoint ments
