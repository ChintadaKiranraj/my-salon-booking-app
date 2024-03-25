
import React,{useEffect,useState} from 'react'


const ShopOwners=()=>{

    const [shopOwners,setShopOwners]=useState([])
    useEffect(()=>{
        const fetchShopOwners=async()=>{
            const response=await fetch("http://localhost:4001/api/get-all-shop-owners")
            const shopOwnersFromServer=await response.json()
            setShopOwners(shopOwnersFromServer.shopOwners)
            console.log(shopOwnersFromServer.shopOwners)
        }
        fetchShopOwners()
    },[])


    const EachShopOwner=(props)=>{
        const {shopOwner}=props
        // const {username,shopname,location,email}=shopOwner
        const {userid,usertype,firstname,lastname,email,phonenumber,profilephoto}=shopOwner

        return(
            <li>
                <p>shopowner_id: {userid}</p>
                <p>ownerName: {firstname+" "+lastname}</p>
                <p>shopowner_email: {email}</p>
                <p>usertype: {usertype}</p>
                {/* <p>location: {location}</p> */}
                <p>phonenumber: {phonenumber}</p>
                <p>profilephoto: {profilephoto}</p>
               
            </li>
        )
    
    }
return(
    <div>
        <p>Shop owners  list appears here</p>
        <ul>
            {shopOwners.map((shopOwner)=>(
                <EachShopOwner key={shopOwner.shopownerid} shopOwner={shopOwner}/>
            ))}
        </ul>
    </div>
)
}

export default ShopOwners;