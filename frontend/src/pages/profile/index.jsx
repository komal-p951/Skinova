import {
  CalendarDays,
  ChevronRight,
  Heart,
  HeadphonesIcon,
  MoveRight,
  Pen,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  TruckIcon,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { clientServer } from "@/index";
import toast from "react-hot-toast";

const BENEFITS = [
  { icon: TruckIcon, title: "Free Shipping", desc: "on orders over 550" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
  { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
  {
    icon: HeadphonesIcon,
    title: "Customer Support",
    desc: "24/7 support available",
  },
];

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [open, setOpen] = useState(false);
  const [order,setOrder] = useState([]);

  const [updateData, setUpadateData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    address: {
      city: "",
      country: "",
      state: "",
      street: "",
    },
  });
  const [isupdate, setIsupdate] = useState(false);

  useEffect(() => {
    const stoken = localStorage.getItem("token");
    if (stoken) {
      setToken(stoken);
    } else {
      router.push("/login");
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await clientServer.get("/user", {
        headers: {
          Authorization: token,
        },
      });

      
      setUser(res.data.user);
      setOrder(res.data.order);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if(token) fetchData();
  }, [token]);

  useEffect(() => {
    setUpadateData({
      username: user?.username || "",
      fullname: user?.fullname || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: {
        city: user?.address?.city,
        country: user?.address?.country,
        state: user?.address?.state,
        street: user?.address?.street,
      },
    });
  }, [user]);

  const handleUpdate = async () => {
    try {
      const res = await clientServer.patch("/user/update", updateData, {
        headers: {
          Authorization: token,
        },
      });

      toast.success(res.data?.message || "user updated !");
      setUser(res.data.user);
      setOpen(false);
      setIsupdate(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const addressFields = ["street", "city", "state", "country"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIsupdate(true);

    if (addressFields.includes(name)) {
      setUpadateData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setUpadateData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1>My Profile</h1>
          <div className={styles.breadcrumb}>
            <span onClick={() => router.push("/")}>Home</span>
            <ChevronRight />
            <span className={styles.current}>profile</span>
          </div>
          <p className={styles.subtext}>
            Manage your personal information and account details
          </p>
        </div>

        <div className={styles.profile}>
          <div className={styles.profilepicture}>
            <div>
              <div className={styles.avatarRing}>
                <div className={styles.profilepic}>
                  <img src="./shinchan.jpeg" alt="Profile avatar" />
                </div>
              </div>
              <div className={styles.name}>
                {user?.fullname || "Ayesha khan"}
              </div>
              <div className={styles.joinedon}>
                <CalendarDays />
                <span>Joined on 22/03/26</span>
              </div>
            </div>
            {isupdate && (
              <button
                onClick={handleUpdate}
                className={styles.updateContentBtn}
              >
                Save changes
              </button>
            )}
          </div>

          <div className={styles.profiledata}>
            <div className={styles.inputsproFileInfo}>
              <p className={styles.sectionTitle}>Profile Information</p>

              <label htmlFor="fullname" className={styles.label}>
                Full Name
              </label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                defaultValue={user?.fullname}
                onChange={handleChange}
                className={styles.input}
              />

              <label htmlFor="Username" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                name="username"
                id="Username"
                defaultValue={user?.username}
                onChange={handleChange}
                className={styles.input}
              />

              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={user?.email}
                onChange={handleChange}
                className={styles.input}
              />

              <label htmlFor="phone" className={styles.label}>
                Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                defaultValue={user?.phone}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.addressInfo}>
              <p className={styles.sectionTitle}>Address</p>
              {user?.address ? (
                <>
                  <div className={styles.inputdiv}>
                    <label htmlFor="street" className={styles.label}>
                      Street
                    </label>
                    <input
                      type="text"
                      name="street"
                      id="street"
                      defaultValue={user?.address?.street}
                      className={styles.input}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.inputdiv}>
                    <label htmlFor="city" className={styles.label}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="city"
                      defaultValue={user.address.city}
                      className={styles.input}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.inputdiv}>
                    <label htmlFor="state" className={styles.label}>
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="state"
                      defaultValue={user.address.state}
                      className={styles.input}
                      onChange={handleChange}
                    />
                  </div>

                  <div className={styles.inputdiv}>
                    <label htmlFor="country" className={styles.label}>
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      id="country"
                      defaultValue={user.address.country}
                      className={styles.input}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <div
                  onClick={() => setOpen(true)}
                  className={styles.addAddress}
                >
                  Add Address <Pen height={16} width={16} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.userShoppingDetails}>
          <div>
          <div onClick={() => router.push("/myorders")}>
            <span className={styles.icon}>
              <ShoppingBag />
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className={styles.count}>{order.length}</p>
              <p className={styles.statLabel}>my orders</p>
              <p className={styles.viewLink}>view all orders<MoveRight />
              </p>
            </div>
          </div>
        </div>

        <div >
        <div onClick={() => router.push("/wishlist")}>
          <span className={styles.icon}>
            <Heart />
          </span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p className={styles.count}>{user.wishlist?.length}</p>
            <p className={styles.statLabel}>Wishlist items</p>
            <p className={styles.viewLink}>view wishlist<MoveRight />
            </p>
          </div>
        </div>
        </div>

          <div >
          <div onClick={() => router.push("/cart")}>
            <span className={styles.icon}>
              <ShoppingCart />
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p className={styles.count}>{user.cart?.length}</p>
              <p className={styles.statLabel}>items in cart</p>
              <p className={styles.viewLink}>view cart<MoveRight />
              </p>
            </div>
          </div>
          </div>
        </div>
        

        <div className={styles.benefits}>
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div className={styles.orderbanefits} key={title}>
              <span>
                <Icon color="#9f7f96" />
              </span>
              <div>
                <p className={styles.benefitTitle}>{title}</p>
                <p className={styles.benefitDesc}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
          </div>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div
            className={styles.addAddressInfo}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <p>Add Address</p>

            <label htmlFor="street" className={styles.label}>
              Street
            </label>
            <input
              type="text"
              name="street"
              id="street"
              placeholder="Add street"
              onChange={handleChange}
              className={styles.input}
            />

            <label htmlFor="city" className={styles.label}>
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="Add city"
              onChange={handleChange}
              className={styles.input}
            />

            <label htmlFor="state" className={styles.label}>
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              placeholder="Add state"
              onChange={handleChange}
              className={styles.input}
            />

            <label htmlFor="country" className={styles.label}>
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Add country"
              onChange={handleChange}
              className={styles.input}
            />

            <button className={styles.save} onClick={handleUpdate}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
