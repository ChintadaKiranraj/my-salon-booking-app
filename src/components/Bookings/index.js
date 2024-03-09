import React from "react";
import Admin from "../Admin";



import { useState, useEffect } from "react";
const Bookings = () => {

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch("http://localhost:4001/api/get-all-bookings");
      const bookingsFromServer = await response.json();
      setBookings(bookingsFromServer.bookings);
      console.log(bookingsFromServer.bookings)
    };
    fetchBookings();
  }, []);

const EachBooking = (props) => {
  const {booking}=props;
  const {barberid,bookingdate,bookingid,bookingtime,email,firstname,lastname,status,userid,username} = booking;
  return(
    <li>
      <p>bookingid: {bookingid}</p>
      <p>barberid: {barberid}</p>
      <p>bookingdate: {bookingdate}</p>
      <p>bookingtime: {bookingtime}</p>
      <p>email: {email}</p>
      <p>firstname: {firstname}</p>
      <p>lastname: {lastname}</p>
      <p>status: {status}</p>
      <p>userid: {userid}</p>
      <p>username: {username}</p>
    </li>
  )
}
  return (
    <div>
      <p>
        we display here the no of booking the shop the shop admin can see the
        how many of the booking was happen and how many was pending and he can
        reject approvala and delete the bookings
      </p>
      <p>i need to display the booking details table here</p>

      {/* <Admin /> */}

      <ul>
        {bookings.map((booking) => (
         
         <EachBooking  key={booking.bookingid} booking={booking}/>
        ))}
      </ul>
    </div>
  );
};

export default Bookings;
