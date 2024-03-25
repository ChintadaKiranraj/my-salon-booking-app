import React, { useEffect, useState } from "react";
import "./ShopsList.css";
import { TiTick } from "react-icons/ti";
import { FaShop } from "react-icons/fa6";

import ShopRegistrationForm from "../ShopRegistrationForm/shopregistrationform";
import { toast, ToastContainer } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import EditShopsData from "../EditShops/EditShopsData";
import { getUserDetails, ImageDecoder, PopUPModel } from "../../Utilities/Utilities";
import UserProfilePick from "../../UserManagment/UserAccount/UserProfilePick/UserProfilePick";

const Shops = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState(shops);
  const [delConfModelPopup, setDelConfModelPopup] = useState(false);
  const [shopId, setShopId] = useState(null);
  useEffect(() => {
    const fetchShops = async () => {
      const ownerId = getUserDetails().userid;
      const response = await fetch(
        `http://localhost:4001/api/get-all-shops/${ownerId}`
      );
      const shopsFromServer = await response.json();
      setShops(shopsFromServer.shops);
      setFilteredShops(shopsFromServer.shops);
      console.log(shopsFromServer.shops);
    };
    fetchShops();
  }, [showForm, isDeleted]);
  const cancleUpdate = () => {
    setIsEditClicked({ isEditClicked: false, shopId: null });
  };
  const registerFoprNewShop = () => {
    setShowForm(!showForm);
  };
  const [isHovered, setIsHovered] = useState(true);
  const [selectedCardId, setSelectedCardId] = useState(-1);
  const [onEditIsSelected, setIsEditClicked] = useState({
    isEditClicked: false,
    shopId: null,
  });
  const handleMouseEnter = (shopid) => {
    setSelectedCardId(shopid);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // openPopup();
    setIsHovered(false);
  };

  const onEditShopData = (shopId) => {
    console.log("shopId", "onedit shop id");
    setIsEditClicked({ isEditClicked: true, shopId: shopId });
  };
  const EachShop = (props) => {
    const { shop } = props;
    const {
      shopid,
      shopname,
      location,
      profilephoto,
      phonenumber,
      // userid,
      firstname,
      lastname,
      email,
    } = shop;

    let decodedImag;
    if (profilephoto != null) {
      const { data } = profilephoto;
      decodedImag = ImageDecoder(data);
    }

    const onClickDelShop = async (shopId) => {
      setDelConfModelPopup(true);
      setShopId(shopId);
    };
    return (
      <li
        className="salon-item-card"
        onMouseEnter={() => {
          handleMouseEnter(shopid);
        }}
        onMouseLeave={handleMouseLeave}
      >
        <div className="shop-profile-container">
          <h2 className="shop-title">{shopname}</h2>
          <img src={decodedImag} className="shop-img-size" alt="avatar" />
        </div>
        <div className="details">
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Owner Name:</strong> {firstname + " " + lastname}
          </p>
          <p>
            <strong>Owner Email:</strong> {email}
          </p>
          <p>
            <strong>Shop Phone Number:</strong> {phonenumber}
          </p>
        </div>
        {isHovered && shopid === selectedCardId && (
          <div className="edit-delete-options">
            <>
              <FaEdit
                className="edit-icon-style"
                onClick={() => {
                  onEditShopData(shopid);
                }}
              />
            </>
            <>
              <MdDeleteOutline
                className="edit-icon-style"
                onClick={() => {
                  onClickDelShop(shopid);
                }}
              />
            </>
          </div>
        )}
      </li>
    );
  };
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = shops.filter(
      (shop) =>
        shop.shopname.toLowerCase().includes(query) ||
        shop.location.toLowerCase().includes(query) ||
        shop.firstname.toLowerCase().includes(query) ||
        shop.lastname.toLowerCase().includes(query) ||
        shop.phonenumber.toLowerCase().includes(query)
    );
    setFilteredShops(filtered);
  };
  const onDeleteShop = async () => {
    try {
      const response = await fetch(
        `http://localhost:4001/api/delete-shop/${shopId}`,
        {
          method: "DELETE",
        }
      );

      const jsonData = await response.json();
      if (jsonData.code === 200) {
        setDelConfModelPopup(false);
        setIsDeleted(!isDeleted);
        console.log(response);
        toast.success("Shop deleted successfully", shopId);
      } else {
        toast.error(jsonData.message);
      }
    } catch (error) {
      console.log("Error in deleting shop", error);
      toast.error("Error in deleting shop" + error);
    }
  };
  return (
    <>
      <div className="shops-outer-container">
        <div className="input-add-new-shop">
          
          <input
            type="text"
            placeholder="Search shops..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <div
            className="add-new-shop-icons-container"
            onClick={registerFoprNewShop}
          >
            <FaShop className="shop-icon" />
            <p className="add-shop-icon">+</p>
          </div>
        </div>
        {showForm && <ShopRegistrationForm />}
        <ul className="shops-component-ul">
          {filteredShops.map((shop) => (
            <EachShop key={shop.shopid} shop={shop} />
          ))}
        </ul>
      </div>
      {onEditIsSelected.isEditClicked && (
        <EditShopsData
          cancleUpdate={cancleUpdate}
          shopData={filteredShops.find(
            (shop) => shop.shopid === onEditIsSelected.shopId
          )}
        />
      )}
      {delConfModelPopup && (
       <PopUPModel>
       <div className="delete-shop-model-popup-container">
         <h2>Delete Shop</h2>
         <p>Are you sure you want to delete the shop?</p>
         <div>
           <button onClick={onDeleteShop} className="conf-delete-btn">Yes <TiTick /></button>
           <button onClick={() => setDelConfModelPopup(false)} className="cancle-delete-btn">No</button>
         </div>
       </div>
     </PopUPModel>
      )}

      <ToastContainer />
    </>
  );
};

export default Shops;
