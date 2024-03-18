import { eventListeners } from '@popperjs/core';
import React,{useEffect,useState} from 'react'
import "./shopTwo.css"
import { ToastContainer, toast } from "react-toastify";
export const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};


const ShpoRegistraction = () => {

    const [profilr ,setProfile] = useState(null);
    const [shopModel,setShopModel]= useState({
        // shopOwnerId:null,
        userId:"1",
        shopName:null,
        location:null,
        profile:"",
    });
    const saveShopRegistaction = async (data)=>{
        data.preventDefault();
        console.log("sample test"+shopModel);

        try{

        }catch(error){
            console.error("Error saving shop registraction data",error);
            toast.error("Error saving shop registraction data",error);
        }
        const response = await fetch("http://localhost:4002/save-shope-owner",{
            method:"post",
            headers:{
                "Content-Type": "application/json",
                "authorization": "",//localStorage
            },
            body:JSON.stringify(shopModel)
        });
        const shpoResponse = await response.json();
        console.log("shpoResponse  ->",shpoResponse);
        if(shpoResponse.code ===200){
            toast.success("success fully stored the data");
            };
      
    };

      const handleInputChange = async (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            const file = e.target.files[0]; 
            if (file) {

                try{
                    
                  
                    const base64String = await toBase64(file);
                    // const base64String = await toBase64(file);
                    setShopModel({
                        ...shopModel,
                        [name]: base64String 
                    });
                }catch(error){
                    console.error('Error converting image to base64:', error.message);
                    toast.error('Error converting image to base64:', error.message);


                }
               
            }
        } else{
        console.log(name +""+value);
        setShopModel({
            ...shopModel,
            [name]: value
        });
    }
    };

    // const toBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onload = () => resolve(reader.result);
    //         reader.onerror = (error) => reject(error);
    //     });
    // };

    const fetchShopeById = async (data)=>{
        const response = await fetch("http://localhost:4002/fetch-by-shopeid/2",{
            method:"get",
            headers:{
                "Content-Type": "application/json",
                "authorization": "",//localStorage
            },
        });

        const jsonData=await response.json();   
        // const json = JSON.stringify(response);
       console.log("json",jsonData);
        console.log("jsomdatya",jsonData.data.profile);
        setProfile(jsonData.data.profile);
        // console.log(response);
    }

      return(
        <div>
            <h1 className='class1'>Shope Registraction</h1>
         <img src={profilr} alt="profile" />
            <form onSubmit={saveShopRegistaction} className='class1'>
                <label>Shope Name</label>
                <input type='text' name = 'shopName' value = {shopModel.shopName} onChange={handleInputChange}/>
                <label>Location</label>
                <input type='text' name='location' value={shopModel.location} onChange={handleInputChange}/>
                <label>Photo</label>
                <input type='file' name='profile' onChange={handleInputChange}/>
                
                <button type='submit' className='submitBtn'>submit</button>
            </form>
            <button type='buttion' onClick={fetchShopeById} >edit</button>
            <ToastContainer />  
        </div>

      );


};



export default ShpoRegistraction;