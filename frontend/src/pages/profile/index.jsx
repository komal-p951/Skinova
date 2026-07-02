import DashboardLayout from '@/layout/DashboardLayout';
import { CalendarDays, ChevronRight, HeadphoneOff, HeadphonesIcon, Heart, MoveRight, Pen, RotateCcw, ShieldCheck, ShoppingBag, ShoppingCart, TruckIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { clientServer } from '@/index';

function Profile() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const stoken = localStorage.getItem("token");
    if(stoken){
      setToken(stoken);
    }
  },[]);
  const [update,setIsupdate] = useState(false);

  const fetchData = async() => {
    try {
      const res = await clientServer.get("/user",{
        headers:{
          Authorization:token
        }
      });

      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {

    fetchData();

  },[token]);

  return (
    <>
      <div className={styles.mainContainer}>
        <div style={{lineHeight:"1.8rem"}}>
          <h1>My Profile</h1>
          <div style={{color:"#0000008f",display:"flex",alignItems:"center"}}>
          <span>Home</span><ChevronRight /><span>profile</span>
          </div>
          <p style={{opacity:"0.6"}}>Manage Your personal information and accout datails</p>
        </div>
        <div className={styles.profile}>
          <div className={styles.profilepicture}>
            <div className={styles.profilepic}>
              <img src="./shinchan.jpeg" alt="" />
            </div>
            <div style={{fontSize:"1.6rem"}}>Ayesha khan</div>
            <div className={styles.joinedon}><CalendarDays /><span>Joined on 22/03/26</span></div>
          </div>
          <div className={styles.profiledata}>

            <div className={styles.inputsproFileInfo}>
              <p>Profile Information</p>

              <label htmlFor="fullname">Full Name</label>
              <input type="text" name="fullname" id="fullname" value={user.fullname}/>

              <label htmlFor="Username">Username</label>
              <input type="text" name="username" id="Username" value={user.username}/>

              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" value={user.email}/>

              <label htmlFor="phone">Phone</label>
              <input type="text" name="phone" id="phone" value={user.phone}/>


            </div>

            <div className={styles.addressInfo}>
              <p>Address</p>
              {user?.address ? 
                <>
                <label htmlFor="street">street</label>
                <input type="text" name='street' id='street' value={user?.address?.street} onChange={(e) => {setIsupdate(true)}}/>

                <label htmlFor="city">City</label>
                <input type="text" name='city' id='city' value={user.address.city}/>

                <label htmlFor="state" >State</label>
                <input type="text" name='state' id='state' value={user.address.state}/>

                <label htmlFor="country">Country</label>
                <input type="text" name='country' id='country' value={user.address.country}/></>
                : 
                <div className={styles.addAddress}>Add Address<Pen height={18} width={18}/></div>
              }

            </div>

          </div>
            {update && <div className={styles.btn}>update</div>}
        </div>
        <div className={styles.userShoppingDetails}>
          <div className={styles.orders}>
            <span className={styles.icon}><ShoppingBag /></span>
            <div style={{display:"flex",flexDirection:"column"}}>
              <p className={styles.count}>12</p>
              <p style={{opacity:'0.8'}}>orders</p>
              <p style={{display:'flex',alignItems:'center',color:'#a5849a',gap:'0.2rem'}}>view all orders <MoveRight /></p>
            </div>
          </div>
          <div className={styles.wishlist}>
            <span className={styles.icon}><Heart/></span>
            <div style={{display:"flex",flexDirection:"column"}}>
              <p className={styles.count}>8</p>
              <p style={{opacity:'0.8'}}>wishlis items</p>
              <p style={{display:'flex',alignItems:'center',color:'#a5849a',gap:'0.2rem'}}>view wishlist<MoveRight /></p>
            </div>
          </div>
          <div className={styles.cart}>
            <span className={styles.icon}><ShoppingCart/></span>
            <div style={{display:"flex",flexDirection:"column"}}>
              <p className={styles.count}>5</p>
              <p style={{opacity:'0.8'}}>items in cart</p>
              <p style={{display:'flex',alignItems:'center',color:'#a5849a',gap:'0.2rem'}}>view cart<MoveRight /></p>
            </div>
          </div>
        </div>
        <div className={styles.benefits}>
          <div className={styles.orderbanefits}>
            <span><TruckIcon color='#a5849a' /></span>
            <div>
              <p style={{fontSize:'1.2rem',fontWeight:'bold', color:'#a5849a'}}>Free Shipping</p>
              <p>on order over 550</p>
            </div>
          </div>
          <div className={styles.orderbanefits}>
            <span><ShieldCheck  color='#a5849a'/></span>
            <div>
              <p style={{fontSize:'1.2rem',fontWeight:'bold' , color:'#a5849a'}}>Secure Payment</p>
              <p>100% secure checkout</p>
            </div>
          </div>
          <div className={styles.orderbanefits}>
            <span><RotateCcw color='#a5849a'/></span>
            <div>
              <p style={{fontSize:'1.2rem',fontWeight:'bold', color:'#a5849a'}}>Easy Returns</p>
              <p>30-day return policy</p>
            </div>
          </div>
          <div className={styles.orderbanefits}>
            <span><HeadphonesIcon color='#a5849a'/></span>
            <div>
              <p style={{fontSize:'1.2rem',fontWeight:'bold', color:'#a5849a'}}>Customer Support</p>
              <p>24/7 support available</p>
            </div>
          </div>       
        </div>
      </div>
      {open && 
      <div className={styles.overlay}>
        <div className={styles.addAddressInfo}>
          <p>Add Address</p>
          <label htmlFor="street">street</label>
          <input type="text" name='street' id='street' placeholder='add street'/>

          <label htmlFor="city">City</label>
          <input type="text" name='city' id='city' placeholder='add city'/>

          <label htmlFor="state" >State</label>
          <input type="text" name='state' id='state' placeholder='add state'/>

          <label htmlFor="country">Country</label>
          <input type="text" name='country' id='country' placeholder='add country'/>
          <button className={styles.save}>Save</button>
        </div>
      </div>}
    </>
  )
}

export default Profile;
