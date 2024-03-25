import React, { useState, useEffect } from "react";
import Header from "../../Header/header";
import BarberItem from "../BarberItem/BarberItem";
import "./Barber.css";
import { Hourglass } from "react-loader-spinner";
import { getUserDetails } from "../../Utilities/Utilities";
const Barber = () => {
  const [barbersData, setBarbersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
  const userDetails=  getUserDetails()
    const ownerid = userDetails.userid
    const status = "accepted";
    try {
    
      const response = await fetch(
        `http://localhost:4001/api/get-barbers-by-shoownerId/${ownerid}/${status}`
      );
      const jsonData = await response.json();
      setBarbersData(jsonData.data);
      setLoading(false);
      console.log("jsonData", jsonData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h3>Discover Our Team of Barbers</h3>
      <hr/>
      <div className="content">
        {loading ? (
          <div className="loading-spinner">
            <Hourglass
              visible={true}
              height="35"
              width="35"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
            <p>Loading...</p>
          </div>
        ) : barbersData.length === 0 ? (
          <div className="barbars-component">
            No data yet to display......!!!
          </div>
        ) : (
         
            <ul className="barbars-component-ul">
              {barbersData.map((barber) => (
                <BarberItem key={barber.id} barber={barber} />
              ))}
            </ul>
        
        )}
      </div>
    </div>
  );
};

export default Barber;
