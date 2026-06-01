import styles from './styles.module.css';
import { useEffect, useState } from "react";
import { clientServer } from '@/index';
import { useRouter } from 'next/router';

export default function LoginRegister() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const[formData,setFormData] = useState({
    fullname:"",
    username:"",
    email:"",
    phone:"",
    password:""
  });
  const [message,setMessage] = useState("");

  const handleInputChange = (e) => {
    const {name ,value} = e.target;
    setFormData({...formData,[name]: value});
  }

  const handleRegister = async(e) => {
    e.preventDefault();
    try {
      let res = await clientServer.post("/auth",formData);
      setMessage(res.data.message);
      
      setFormData({
        fullname:"",
        username:"",
        email:"",
        phone:"",
        password:""
      });
      setIsLogin(true);
      
      router.push("/login");
    } catch (error) {
      return error.response?.data?.message || "something went wrong!";
    }
  }

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      let res = await clientServer.post("/login",formData);
      
      setFormData({
        email:"",
        password:""
      });
      router.push("/");
    } catch (error) {
      return error.response?.data?.message || "something went wrong!";
    }
  }

 

  return (
    <div className={styles.auth_container}>

      <div className={styles.message}>{message}</div>

      <div className={styles.auth_card}>


        {/* Left Side */}
        <div className={styles.left_panel}>
          <div className={styles.logo}>
            <div className={styles.logo_circle}>S</div>
            <h1>SKINOVA</h1>
            <p>Reveal Your Radiance</p>
          </div>

          <div className={styles.left_content}>
            <h2>Welcome to Skinova</h2>
            <p>
              Your journey to healthy and glowing skin starts here.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className={styles.right_panel}>

          <div className={styles.tabs}>
            <button
              className={isLogin ? styles.active : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={!isLogin ? styles.active : ""}
            >
              Register
            </button>
          </div>

          


          {isLogin ? (
            <>
              <h2>Welcome Back</h2>

              <form className={styles.form} onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  name="password"
                  onChange={handleInputChange}
                />

                <button className={styles.main_btn} type='submit'>
                  Login
                </button>
              </form>

              <div className={styles.divider}>
                <span>or continue with</span>
              </div>

          

              <p className={styles.switch_text}>
                New here?
                <span onClick={() => setIsLogin(false)}>
                  Create Account
                </span>
              </p>
            </>
          ) : (
            <>
              <h2>Create Account</h2>

              <form className={styles.form} onSubmit={handleRegister}>

                <input
                  type="text"
                  placeholder="Full Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                />

                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />

                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />

                <input
                  type="number"
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />

                <button type='submit' className={styles.main_btn}>
                  Register
                </button>
              </form>

              <p className={styles.switch_text}>
                Already have an account?
                <span onClick={() => setIsLogin(true)}>
                  Login
                </span>
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  );
}