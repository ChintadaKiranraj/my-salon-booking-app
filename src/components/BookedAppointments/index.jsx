import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { RiAccountCircleLine } from "react-icons/ri";

import { RiDeleteBin6Fill } from "react-icons/ri";

import { VscPassFilled } from "react-icons/vsc";

const BookedAppointments = (props) => {
  const status = {
    PENDING: "Pending",
    REJECTED: "Rejected",
    APPROVED: "Approved",
  };

  const {
    appointment,
    deleteUserVar,
    approveUserVar,
    rejectUserVar,
    accessLevele,
  } = props;
  const { id } = appointment;

  const handleDeleteClick = () => {
    deleteUserVar(id);
  };
  const handleApproveClick = () => {
    approveUserVar(id);
  };

  const hadleRejectUser = () => {
    rejectUserVar(id);
  };

  const storedAppointments = () => {
    let color = "yellow";
    if (appointment.status === status.PENDING) {
      color = "yellow";
    } else if (appointment.status === status.APPROVED) {
      color = "green";
    } else if (appointment.status === status.REJECTED) {
      color = "Red";
    }

    const convertDate = (dateString) => {
      var date = new Date(dateString);
      const options = {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formattedDate = date.toLocaleString("en-US", options);
      return formattedDate;
    };

    return (
      <tr>
        <td>{appointment.name}</td>
        <td>{convertDate(appointment.time)}</td>
        <td>
          {appointment.status}

          {<VscPassFilled color={`${color}`} />}
        </td>
        {accessLevele > 0 ? (
          <td className="actionbtn">
            <RiDeleteBin6Fill
              color={`"red" ${color}`}
              onClick={handleDeleteClick}
              className="icon"
            />
            <RiAccountCircleLine
              color="green"
              onClick={handleApproveClick}
              className="icon"
            />
            <RiAccountCircleLine
              color="red"
              onClick={hadleRejectUser}
              className="icon"
            />
          </td>
        ) : (
          ""
        )}
      </tr>
    );
  };

  return <>{storedAppointments()}</>;
};

export default BookedAppointments;
