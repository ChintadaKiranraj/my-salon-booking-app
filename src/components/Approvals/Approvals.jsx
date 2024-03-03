import React, { useEffect, useState } from "react";
import Header from "../Header";
import Cookie from "js-cookie";
import { Snackbar, SnackbarContent, Button } from "@material-ui/core";

const Approvals = () => {
  const [approvalData, setApprovalData] = useState([]);
  const [error, setError] = useState(null);
  // const [nodata, setNodata] = useState(true);

  const getApprovalsData = async () => {
    const token = Cookie.get("jwt_token");
    // const emailId = Cookie.get("email_id");
    const URL = "http://localhost:4001/fetch-registaction-details";
    try {
      const response = await fetch(URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const jsonData = await response.json();
      if (response.ok === true) {
        console.log("Data at approval  --> " + jsonData.data);
      }

      setApprovalData(jsonData.data.length === 0 ? [] : jsonData.data);
      // setNodata(jsonData.data.length === 0);
    } catch (error) {
      setError("Failed to fetch approval data. Please try again.");
    }
  };

  useEffect(() => {
    getApprovalsData();
  }, []);

  const updateUserRequest = async (emailId) => {
    const token = Cookie.get("jwt_token");

    let URL = "http://localhost:4001/approved-admin-access";
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          emailId,
          accessLevel: 2,
        }),
      });
      const jsonData = await response.json();
      console.log("Dataat viw only in table  --> " + jsonData.data);
      if (response.ok === true) {
        alert("Access granted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
  };
  return (
    <div className="main-container">
      <Header />
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {approvalData.map((item, index) => (
              <tr key={item.id}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.emailId}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => updateUserRequest(item.emailId)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={!!error}
        onClose={handleCloseSnackbar}
        autoHideDuration={6000}
      >
        <SnackbarContent
          message={error}
          action={
            <Button
              color="secondary"
              size="small"
              onClick={handleCloseSnackbar}
            >
              Close
            </Button>
          }
        />
      </Snackbar>
    </div>
  );
};

export default Approvals;
