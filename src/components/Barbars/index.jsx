import React, { useState, useEffect } from "react";
import Header from "../Header";
import BarberItem from "../BarbarItem";
import "./index.css";
import { Hourglass } from "react-loader-spinner";
const Barber = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/users");
      const jsonData = await response.json();
      setData(jsonData.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Header />
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
        ) : data.length === 0 ? (
          <div className="barbars-component">
            No data yet to display......!!!
          </div>
        ) : (
          <ul className="barbars-component-ul">
            {data.map((barber) => (
              <BarberItem key={barber.id} barber={barber} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Barber;
