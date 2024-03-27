import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaCircle } from "react-icons/fa6";
import { FcViewDetails } from "react-icons/fc";
import { GrFormView } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { FiSave } from "react-icons/fi";
import { Loader, User, getUserDetails } from "../../Utilities/Utilities";

import "../../Utilities/Utilities.css";

const EditUserAppointment = (props) => {
  const { setUserAppointmentEditMode } = props;
  const [isLoading, setLoading] = useState(false);

  const viewAppointments = () => {
    setUserAppointmentEditMode(false);
  };

  return (
    <div>
      <div className="modalss">
        {isLoading ? (
          <div className="loader-modal-contents">
            <Loader />
          </div>
        ) : (
          <div className="modal-contents large-content">
            <h2>Edit user application Details</h2>
            <form>
              <div className="row">
                <div className="col-6">
                  <label>location</label>
                  <select name="location" id="location">
                <option value="location1">Location 1</option>
                <option value="location2">Location 2</option>
                <option value="location3">Location 3</option>
             
            </select>
                </div>
                <div className="col-6">
                  <label>shopname</label>
                  <select name="shopname" id="shopname">
                <option value="shop1">Shop 1</option>
                <option value="shop2">Shop 2</option>
                <option value="shop3">Shop 3</option>
              
            </select>     
                       </div>

               
              </div>

              <div className="row">
                <div className="col-6">
                  <label>booking date time</label>
                  <input
                    type="datetime-local"
                    name="bookingdatetime"
                    id="bookingdatetime"
                    value={"2024-03-23T09:38:00.000Z"}
                  />
                </div>

                <div className="col-6">
                <label>Service</label>
                <select name="service" id="service">
                <option value="shop1">service1</option>
                <option value="shop2">servic2</option>
                <option value="shop3">Service3</option>
              
            </select>                  
                </div>
              </div>
            </form>
            <div className="modal-button-container">
              <>
                <button className="appontment-update-btn">
                  Update <FiSave />
                </button>
              </>

              <button className="to-appontment" onClick={viewAppointments}>
                Cancel
                <IoCloseCircleOutline />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditUserAppointment;
