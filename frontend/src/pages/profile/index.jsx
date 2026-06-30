import DashboardLayout from '@/layout/DashboardLayout';
import { CalendarDays, ChevronRight } from 'lucide-react';
import React, { useState } from 'react'
import styles from './styles.module.css'

function Profile() {
  const [update,setIsupdate] = useState(false);
  return (
    <DashboardLayout>
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
              <input type="text" name="fullname" id="fullname" />

              <label htmlFor="Username">Username</label>
              <input type="text" name="username" id="Username" />

              <label htmlFor="email">Email</label>
              <input type="text" name="email" id="email" />

              <label htmlFor="phone">Phone</label>
              <input type="text" name="phone" id="phone" />


            </div>

            <div className={styles.addressInfo}>
              <p>Address</p>

              <label htmlFor="street">street</label>
              <input type="text" name='street' id='street' onChange={(e) => {
                setIsupdate(true);

              }}/>

              <label htmlFor="city">City</label>
              <input type="text" name='city' id='city'/>

              <label htmlFor="state" >State</label>
              <input type="text" name='state' id='state'/>

              <label htmlFor="country">Country</label>
              <input type="text" name='country' id='country'/>

            </div>

          </div>
            {update && <div className={styles.btn}>update</div>}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Profile;
