import React, { useEffect, useState } from "react";
import Header from "../Header";
import Cookie from "js-cookie";
import { Snackbar, SnackbarContent, Button } from "@material-ui/core";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
const Approvals = () => {
  const [approvalData, setApprovalData] = useState([]);
  const [error, setError] = useState(null);
  /*fetch the admin access requested users*/
  const getApprovalsData = async () => {
    const token = Cookie.get("jwt_token");
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
    } catch (error) {
      setError("Failed to fetch approval data. Please try again.");
    }
  };

  useEffect(() => {
    getApprovalsData();
  }, []);

  /*gratn admin access to the requested user by  super admin*/
  const updateUserRequest = async (emailId) => {
    debugger;

    const token = Cookie.get("jwt_token");

    let URL = "http://localhost:4001/approved-admin-access";
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          emailId,
          accessLevel: 2,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user request.");
      }

      const jsonData = await response.json();
      console.log("Dataat viw only in table  --> " + jsonData.data);
      if ((response.ok === true) & (jsonData.status !== false)) {
        // alert("Access granted successfully!");
        // window.location.reload();
      } else {
        alert("Failed to grant access. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Error:", error);
      alert("Failed to grant access. Please try again.");
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
                  <CheckRoundedIcon
                    className={`${
                      item.accessLevel >= 2 ? "disabled" : ""
                    } action-icon`}
                    onClick={() => updateUserRequest(item.emailId)}
                  />
                  <ClearRoundedIcon
                    onClick={() => updateUserRequest(item.emailId)}
                  />
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
