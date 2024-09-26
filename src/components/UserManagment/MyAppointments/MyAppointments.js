import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import { getUserDetails } from "../../Utilities/Utilities";
import EditUserAppointment from "../EditUserAppointment/EditUserAppointment";
import "./MyAppointments.css";
import { ToastContainer, toast } from "react-toastify";
import { tableHeaderstyle } from "../../Bookings";
const questionFaceEmoji = "🤔";
const COMPLETED = "completed";
const PENDING = "pending";
const CANCELLED = "cancelled";
const MyAppointments = () => {
  const [userAppointmentsEditData, setUserAppointmentsEditData] = useState({
    isEditAppointmentClicked: false,
    appointment: null,
  });
  const [deleteUserAppointment, setDeleteUserAppointment] = useState(false);
  useEffect(() => {
    fetchMyAppointments();
  }, [userAppointmentsEditData]);

  const [appointments, setAppointments] = useState([]);
  const [appointmentId, setAppointmentId] = useState(null);
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
  };

  const deleteAppointment = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/delete-appointment/${appointmentId}`,
        {
          method: "DELETE",
        }
      );
      const responseJson = await response.json();

      if (responseJson.code === 200) {
        toast.success("Appointment deleted successfully");
        setDeleteUserAppointment(false);
        fetchMyAppointments();
      }
    } catch (e) {
      toast.error("Error in deleting appointment", e);
    }
  };

  const onClickDelAppointment = (row) => {
    setAppointmentId(row.bookingid);
    setDeleteUserAppointment(true);
  };

  const columns = [
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
    },
    { name: "Shopname", selector: (row) => row.shopname, sortable: true },
    {
      name: "Salon Service",
      selector: (row) => row.saloon_service,
      sortable: true,
    },
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
          when: (row) => row.status === PENDING,
          style: {
            color: "#007bff",
            fontWeight: "600",
            "&:hover": {
              cursor: "pointer",
            },
          },
        },
        {
          when: (row) => row.status === CANCELLED,
          style: {
            color: "red",
            fontWeight: "600",
          },
        },
        {
          when: (row) => row.status === COMPLETED,
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
            className={`MdDeleteOutline-CiEdit ${
              row.status === COMPLETED ? "completed" : ""
            }`}
            title={row.status === COMPLETED ? "not-allowed" : "Edit"}
            onClick={() => {
              if (row.status !== COMPLETED) {
                onClickEditAppointment(row);
              }
            }}
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
        customStyles={tableHeaderstyle}
        fixedHeader={true}
        //fixedHeaderScrollHeight={"30px"}
      ></DataTable>

      {userAppointmentsEditData.isEditAppointmentClicked && (
        <EditUserAppointment
          setUserAppointmentsEditData={setUserAppointmentsEditData}
          userAppointmentsEditData={userAppointmentsEditData}
        />
      )}

      {/* delete user appointment conformation popup */}
      {deleteUserAppointment && (
        <div className="modalss">
          <div className="modal-contents">
            <div className="delete-confirmation-card">
              <h2>Confirmation</h2>
              <p>Are you sure you want to delete this {questionFaceEmoji} ?</p>
              <div className="modal-button-container">
                <button
                  className="modal-button"
                  onClick={() => setDeleteUserAppointment(false)}
                >
                  NO
                </button>
                <button
                  className="modal-button"
                  onClick={() => deleteAppointment()}
                >
                  YES
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyAppointments;
