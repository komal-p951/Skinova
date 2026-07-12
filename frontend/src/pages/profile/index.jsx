import DashboardLayout from '@/layout/DashboardLayout';
import { CalendarDays, ChevronRight, HeadphoneOff, HeadphonesIcon, Heart, MoveRight, Pen, Pencil, RotateCcw, ShieldCheck, ShoppingBag, ShoppingCart, SquarePen, TruckIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useRouter } from 'next/router';
import { clientServer } from '@/index';

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);

  const[updateData,setUpadateData] = useState({
    username: "",
    fullname:"",
    email:"",
    phone: "",
    address:{
      city:"",
      country:"",
      state:"",
      street:"",
    }
  });
  const [isupdate,setIsupdate] = useState(false);

  


  useEffect(() => {
    const stoken = localStorage.getItem("token");
    if(stoken){
      setToken(stoken);
    }else{
      router.push("/login");
    }
  },[]);

  const fetchData = async() => {
    try {
      const res = await clientServer.get("/user",{
        headers:{
          Authorization:token
        }
      });

      console.log("user = ",res.data);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    fetchData();
  },[token]);

  useEffect(() => {
    setUpadateData(
      {
      username:user?.username || "",
      fullname:user?.fullname || "",
      email:user?.email || "",
      phone:user?.phone || "",
      address:{
        city:user?.address?.city,
        country:user?.address?.country,
        state:user?.address?.state,
        street:user?.address?.street,
      }
    });
  },[user]);


  const handleUpdate = async() => {
    try {
      const res = await clientServer.patch("/user/update",
        updateData ,{
        headers:{
          Authorization:token
        }
      });
      console.log(res.data.message,res.data);
      setUser(res.data.user);
      setOpen(false);
      setIsupdate(false)
    } catch (error) {
      console.log(error.message);
    }
}

const addressFields = ["street", "city", "state", "country"];

const handleChange = (e) => {
    const { name, value } = e.target;
    setIsupdate(true);

    if (addressFields.includes(name)) {
    setUpadateData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  } else {
    setUpadateData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};

// console.log("My UpdateData is => >> >> >" , updateData)

  return (
    <>
      <div className={styles.mainContainer}>
        <div style={{lineHeight:"1.8rem"}}>
          <h1>My Profile</h1>
          <div style={{color:"#0000008f",display:"flex",alignItems:"center"}}>
          <span onClick={() => router.push("/")} style={{cursor :"pointer"}}>Home</span><ChevronRight /><span>profile</span>
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

              <label htmlFor="fullname" className={styles.label}>Full Name</label>
              <input type="text" name="fullname" id="fullname" defaultValue={user?.fullname} onChange={handleChange} className={styles.input}/>

              <label htmlFor="Username" className={styles.label}>Username</label>
              <input type="text" name="username" id="Username" defaultValue={user?.username} onChange={handleChange} className={styles.input}/>

              <label htmlFor="email" className={styles.label}>Email</label>
              <input type="text" name="email" id="email" defaultValue={user?.email} onChange={handleChange} className={styles.input}/>

              <label htmlFor="phone" className={styles.label}>Phone</label>
              <input type="text" name="phone" id="phone" defaultValue={user?.phone} onChange={handleChange} className={styles.input}/>


            </div>

            <div className={styles.addressInfo}>
              <p>Address</p>
              {user?.address ? 
                <>
                  <div className={styles.inputdiv}>
                    <label htmlFor="street" className={styles.label}>street</label>
                    <input type="text" name='street' id='street' defaultValue={user?.address?.street} className={styles.input} onChange={handleChange}/>
                    {/* <Pencil style={{ position: 'absolute', right: '0.2rem', top: '78%', transform: 'translateY(-50%)', opacity: 0.6, cursor: 'pointer' }} height={15} width={15}/> */}
                  </div>

                <div className={styles.inputdiv}>
                  <label htmlFor="city" className={styles.label}>City</label>
                  <input type="text" name="city" id='city' defaultValue={user.address.city} className={styles.input} onChange={handleChange}/>
                  {/* <Pencil style={{ position: 'absolute', right: '0.2rem', top: '78%', transform: 'translateY(-50%)', opacity: 0.6, cursor: 'pointer' }} height={15} width={15} /> */}
                </div>


                <div className={styles.inputdiv}>
                  <label htmlFor="state" className={styles.label} >State</label>
                  <input type="text" name='state' id='state' defaultValue={user.address.state} className={styles.input} onChange={handleChange}/>
                  {/* <Pencil style={{ position: 'absolute', right: '0.2rem', top: '78%', transform: 'translateY(-50%)', opacity: 0.6, cursor: 'pointer' }} height={15} width={15} /> */}
                </div>

                <div className={styles.inputdiv}>
                  <label htmlFor="country" className={styles.label}>Country</label>
                  <input type="text" name='country' id='country' defaultValue={user.address.country} className={styles.input} onChange={handleChange}/>
                  {/* {!update ? <Pencil style={{ position: 'absolute',right: '0.2rem', top: '78%', transform: 'translateY(-50%)', opacity: 0.6, cursor: 'pointer' }} height={15} width={15}/> : <button style={{ position: 'absolute',right: '0.2rem', top: '78%', transform: 'translateY(-50%)', opacity: 0.6, cursor: 'pointer' }} onClick={handleEdit}>Edit</button>} */}
                </div>
                
                </>
                : 
                <div onClick={() => setOpen(true)} className={styles.addAddress}>Add Address<Pen height={18} width={18}/></div>
              }

              {isupdate &&  <button onClick={handleUpdate} className={styles.updateContentBtn}> Update </button>}

            </div>

          </div>


        </div>
        <div className={styles.userShoppingDetails}>
          <div onClick={() => router.push("/myorders")} style={{cursor:'pointer'}}>
            <span className={styles.icon}><ShoppingBag /></span>
            <div style={{display:"flex",flexDirection:"column"}}>
              <p className={styles.count}>12</p>
              <p style={{opacity:'0.8'}}>orders</p>
              <p style={{display:'flex',alignItems:'center',color:'#a5849a',gap:'0.2rem'}}>view all orders <MoveRight /></p>
            </div>
          </div>
          <div onClick={() => router.push("/wishlist")} style={{cursor:'pointer'}}>
            <span className={styles.icon}><Heart/></span>
            <div style={{display:"flex",flexDirection:"column"}}>
              <p className={styles.count}>8</p>
              <p style={{opacity:'0.8'}}>wishlis items</p>
              <p style={{display:'flex',alignItems:'center',color:'#a5849a',gap:'0.2rem'}}>view wishlist<MoveRight /></p>
            </div>
          </div>
          <div onClick={() => router.push("/cart")} style={{cursor:'pointer'}}>
            <span className={styles.icon}><ShoppingCart/></span>
            <div style={{display:"flex",flexDirection:"column"}}>
              <p className={styles.count}>5</p>
              <p style={{opacity:'0.8'}}>items in cart</p>
              <p  style={{cursor:'pointer',display:'flex',alignItems:'center',color:'#a5849a',gap:'0.2rem'}}>view cart<MoveRight /></p>
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
      <div className={styles.overlay}  onClick={() => setOpen(false)}>
        <div className={styles.addAddressInfo} onClick={(e) => e.stopPropagation()}>
          <p>Add Address</p>
          <label htmlFor="street" className={styles.label}>street</label>
          <input type="text" name='street' id='street' placeholder='add street' onChange={handleChange} className={styles.input}/>

          <label htmlFor="city" className={styles.label}>City</label>
          <input type="text" name='city' id='city' placeholder='add city' onChange={handleChange} className={styles.input}/>

          <label htmlFor="state"  className={styles.label}>State</label>
          <input type="text" name='state' id='state' placeholder='add state' onChange={handleChange} className={styles.input}/>

          <label htmlFor="country" className={styles.label}>Country</label>
          <input type="text" name='country' id='country' placeholder='add country' onChange={handleChange} className={styles.input}/>
          <button className={styles.save} onClick={handleUpdate}>Save</button>
        </div>
      </div>}
    </>
  )
}

export default Profile;


