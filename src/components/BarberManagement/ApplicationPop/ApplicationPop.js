import React, { useEffect } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import BarberItem from "../BarberItem/BarberItem";
import { useState } from "react";

import { toast } from "react-toastify";
import { Loader, User, getUserDetails } from "../../Utilities/Utilities";

import "./ApplicationPop.css";
import "../../Utilities/Utilities.css";
const ACCEPTED = "accepted";
const REJECTED = "rejected";

const ApplicationViwePop = (props) => {
  const { applicationId, hideModel } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [barbersData, setBarbersData] = useState({});
  useEffect(() => {
    console.log("ApplicationPop component is mounted in Application pop up");
    fetchData();
  }, []);

  const fetchData = async () => {
    const userDetails = getUserDetails();
    const ownerid = userDetails.userid;
    const status = "pending";
    let user_type = userDetails.usertype;
    if (userDetails.usertype === "Shop Owner") {
      user_type = "shopowner";
    }

    try {
      const response = await fetch(
        `http://localhost:4001/api/get-barbers-by-shoownerId/${ownerid}/${status}/${applicationId}/${user_type}`
      );
      const jsonData = await response.json();
      console.log("fetch data by applicationn id", jsonData);
      setBarbersData(jsonData.data[0]);
      if (jsonData.code === 200) {
        setIsLoading(false);
      }
      console.log("fetch data---> ", jsonData.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const hidePopupModel = () => {
    console.log("hidePopupModel is clicked");
    hideModel();
  };
  const updateStatus = async (barbersData, status) => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/update-barber-application-status/${barbersData.applicationid}/${status}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();

      if (jsonData.code === 200 && jsonData.status === true) {
        toast.success("Barber application status updated successfully");
      }
    } catch (error) {
      toast.error("Error in fetching users", error);
    }
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
            <h2>Application Details</h2>

            <div className="modal-button-container">
              <BarberItem barber={barbersData} isViewMode={true} />

              {getUserDetails().usertype === "Shop Owner" && (
                <>
                  <button
                    className="modal-button-accept-btn"
                    onClick={() => {
                      updateStatus(barbersData, ACCEPTED);
                    }}
                  >
                    Accept <TiTick />
                  </button>
                  <button
                    onClick={() => {
                      updateStatus(barbersData, REJECTED);
                    }}
                    className="modal-button-reject-btn"
                  >
                    Reject <IoCloseCircleOutline />
                  </button>
                </>
              )}

              <button className="modal-button" onClick={hidePopupModel}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationViwePop;
