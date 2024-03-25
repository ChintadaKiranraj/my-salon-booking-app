import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FcViewDetails } from "react-icons/fc";
import { GrFormView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "./ApplicationsList.css";
import ApplicationPop from "../ApplicationPop/ApplicationPop";
import { getUserDetails } from "../../Utilities/Utilities";
const BarberApplicationData = () => {
  const [barberapplications, setBarberapplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [rowToDelete, setDeletedRow] = useState("");
  const [showViewApplication, setViwApplication] = useState(false);

  const viewAndAccept = (row) => {
    console.log("Edit", row);
    setApplicationId(row.applicationid);
    setViwApplication(true);
  };

  const confirmDelete = (row) => {
    setDeletedRow(row);
    setShowModal(true);
  };

  const handleDelete = async () => {
    setShowModal(false);

    try {
      const request = await fetch(
        `http://localhost:4001/api/delete-barber-application/${rowToDelete.applicationid}`
      );

      const response = await request.json();
      console.log("responseXXXX", response);
      if (response.code === 200 && response.status === true) {
        toast.success("Barber application deleted successfully");
      }
    } catch (error) {
      console.log("Error in fetching users", error);
    }
  };
  useEffect(() => {
    console.log("BarberApplicationData component is mounted");

    const userDetails = getUserDetails();
    const ownerid = userDetails.userid;
    const status = "pending";

    fetch(
      `http://localhost:4001/api/get-barbers-by-shoownerId/${ownerid}/${status}`
    )
      .then((response) => response.json())
      .then((jsonData) => {
        console.log("XXXXXXXXXXXXXXXxxx");
        console.log(jsonData.data);
        setBarberapplications(jsonData.data);
      });
  }, []);
  const columns = [
    {
      name: "Full Name",
      selector: (row) => row.firstname + " " + row.lastname,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phonenumber,
      sortable: true,
    },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Experience", selector: (row) => row.experience, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <GrFormView
            className="icons"
            title="Edit"
            onClick={() => viewAndAccept(row)}
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
  const questionFaceEmoji = "🤔";
  const hideModel = () => {
    setShowModal(false);
    setViwApplication(false);
  };
  return (
    <>
      <DataTable
        paginationPerPage={10}
        columns={columns}
        data={barberapplications}
        pagination
        selectableRows
        responsive={true}
        selectableRowsHighlight
        highlightOnHover
        //   customStyles={tableHeaderstyle}
        fixedHeader={true}
        //   fixedHeaderScrollHeight={"30px"}
      ></DataTable>

      {showModal && (
        <div className="modalss">
          <div className="modal-contents">
            <div className="delete-confirmation-card">
              <h2>Confirmation</h2>
              <p>Are you sure you want to delete this {questionFaceEmoji} ?</p>
              <div className="modal-button-container">
                <button className="modal-button" onClick={handleDelete}>
                  Delete
                </button>
                <button className="modal-button" onClick={hideModel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showViewApplication && (
        <ApplicationPop applicationId={applicationId} hideModel={hideModel} />
      )}
      <ToastContainer />
    </>
  );
};

export default BarberApplicationData;
