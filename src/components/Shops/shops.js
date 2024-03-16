import React, { useEffect, useState } from "react";
import "./Shops.css";
import image1 from "../../assets/images/beautyImages.jpg";

const Shops = () => {
    const [searchQuery, setSearchQuery] = useState('');
  
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState(shops);
  useEffect(() => {
    const fetchShops = async () => {
      const response = await fetch("http://localhost:4001/api/get-all-shops");
      const shopsFromServer = await response.json();
      setShops(shopsFromServer.shops);
      setFilteredShops(shopsFromServer.shops)
      console.log(shopsFromServer.shops);
    };
    fetchShops();
  }, []);

    const [selectedShop, setSelectedShop] = useState(null);
const handleCardDoubleClick = (shopId) => {
    const clickedShop = shops.find(shop => shop.shopid === shopId);
    setSelectedShop(clickedShop);
};

const handleClosePopup = () => {
    setSelectedShop(null);
};
  const EachShop = (props) => {
    const { shop } = props;
    const {
      shopid,
      shopname,
      location,
    
      phonenumber,
      userid,
      firstname,
      lastname,
      email,
    } = shop;
    return (
        <li className="salon-item-card" onDoubleClick={() => handleCardDoubleClick(shopid)} >
        <div className="shop-profile-container">
          <h2 className="shop-title">{shopname}</h2>
          <img src={image1} className="shop-img-size"/> {/* Placeholder for the profile image */}
        </div>
        <div className="details">
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Owner Name:</strong> {firstname+" "+lastname}</p>
          <p><strong>Owner Email:</strong> {email}</p>
          <p><strong>Shop Phone Number:</strong> {phonenumber}</p>
        </div>
      </li>
    );
  };
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = shops.filter(shop => 
      shop.shopname.toLowerCase().includes(query) || 
      shop.location.toLowerCase().includes(query) ||
      shop.firstname.toLowerCase().includes(query)||
      shop.lastname.toLowerCase().includes(query)||
      shop.phonenumber.toLowerCase().includes(query)
    );
    setFilteredShops(filtered);
  };
  return (
    <div>
         <input
        type="text"
        placeholder="Search shops..."
        value={searchQuery}
        onChange={handleSearch}
      />
     <ul className="shops-component-ul">
      {filteredShops.map((shop) => (
        <EachShop key={shop.shopid} shop={shop} />
      ))}
    </ul>
    {selectedShop && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>{selectedShop.shopname}</h2>
                        <p><strong>Location:</strong> {selectedShop.location}</p>
                        <p><strong>Owner Name:</strong> {selectedShop.ownername}</p>
                        <p><strong>Owner Email:</strong> {selectedShop.email}</p>
                        <p><strong>Shop Phone Number:</strong> {selectedShop.phonenumber}</p>
                        <button onClick={handleClosePopup}>Close</button>
                    </div>
                </div>
            )}
    </div>
   
  );
};

export default Shops;
