import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import { RiAccountCircleLine } from "react-icons/ri";

import { RiDeleteBin6Fill } from "react-icons/ri";

import { VscPassFilled } from "react-icons/vsc";

const BookedAppointments = (props) => {
  const {
    appointment,
    deleteUserVar,
    approveUserVar,
    rejectUserVar,
    accessLevele,
  } = props;
  const { id } = appointment;

  const handleDeleteClick = () => {
    console.log("delete user clicked" + id);
    deleteUserVar(id);
  };
  const handleApproveClick = () => {
    console.log("approved user clicked");
    approveUserVar(id);
  };

  const hadleRejectUser = () => {
    console.log("reject user clicked");
    rejectUserVar(id);
  };

  const storedAppointments = () => {
    let color = "yellow";
    if (appointment.status === "Pending") {
      color = "yellow";
    } else if (appointment.status === "Approved") {
      color = "green";
    } else if (appointment.status === "Rejected") {
      color = "Red";
    }

    return (
      <tr>
        <td>{appointment.name}</td>
        <td>{appointment.time}</td>
        <td>
          {appointment.status}

          {<VscPassFilled color={`${color}`} />}
        </td>
        {accessLevele > 0 ? (
          <td className="actionbtn">
            <RiDeleteBin6Fill
              color={`"red" ${color}`}
              onClick={handleDeleteClick}
            />
            <RiAccountCircleLine color="green" onClick={handleApproveClick} />
            <RiAccountCircleLine color="red" onClick={hadleRejectUser} />
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
