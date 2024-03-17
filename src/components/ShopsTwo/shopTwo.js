import { eventListeners } from '@popperjs/core';
import React,{useEffect,useState} from 'react'
import "./shopTwo.css"
const ShpoRegistraction = () => {
    const [shopModel,setShopModel]= useState({
        shopOwnerId:null,
        userId:"2",
        shopName:null,
        location:null,
        profile:"",
    });
    const saveShopRegistaction = async (data)=>{
        data.preventDefault();
        console.log("sample test"+shopModel);
        const response = await fetch("http://localhost:4002/save-shope-owner",{
            method:"post",
            headers:{
                "Content-Type": "application/json",
                "authorization": "",//localStorage
            },
            body:JSON.stringify(shopModel)
        });
        const shpoResponse = await response.json();
    };

      const handleInputChange = async (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const file = e.target.files[0]; 
            if (file) {
                const base64String = await toBase64(file);
                setShopModel({
                    ...shopModel,
                    [name]: base64String 
                });
            }
        } else{
        console.log(name +""+value);
        setShopModel({
            ...shopModel,
            [name]: value
        });
    }
    };

    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const fetchShopeById = async (data)=>{
        const response = await fetch("http://localhost:4002/fetch-by-shopeid/2",{
            method:"get",
            headers:{
                "Content-Type": "application/json",
                "authorization": "",//localStorage
            },
        });
        const json = JSON.stringify(response);
        console.log(json.data)
        console.log(response);
    }

      return(
        <div>
            <h1 className='class1'>Shope Registraction</h1>
            <form onSubmit={saveShopRegistaction} className='class1'>
                <label>Shope Name</label>
                <input type='text' name = 'shopName' value = {shopModel.shopName} onChange={handleInputChange}/>
                <label>Location</label>
                <input type='text' name='location' value={shopModel.location} onChange={handleInputChange}/>
                <label>Photo</label>
                <input type='file' name='profile' onChange={handleInputChange}/>
                <button type='submit'>submit</button>
            </form>
            <button type='buttion' onClick={fetchShopeById}>edit</button>
        </div>

      );


};



export default ShpoRegistraction;