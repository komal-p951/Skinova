import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import DashboardLayout from "@/layout/DashboardLayout";
import { X } from "lucide-react";
export default function addProduct() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return router.push("/login");

    try {

      let data = jwtDecode(token);
      if (data.role !== "author") {
        router.push("/");
      }

    } catch (error) {
      router.push("/");

    }

  }, []);

  
  const [ingredients, setIngredients] = useState([
    "Hyaluronic Acid",
    "Vitamin C",
    "Niacinamide"
  ]);
  const removeIngredient = (item) => {
    setIngredients(ingredients.filter((i) => i !== item));
  };

  const addIngredient = (newIngredient) => {
    setIngredients([...ingredients, newIngredient]);
  }

  const [item,setItem] = useState("");
  
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.links}>
            <span style={{cursor:"pointer"}} onClick={() => router.push("/")}>Home </span> &gt; <span style={{cursor:"pointer"}}> AddProduct</span>
          </div>
          <div className={styles.addproductdetails}>
            <div className={styles.product}>
              <div style={{fontSize:"2rem",fontWeight:"500"}}>Add New Product</div>
              <p style={{opacity:"0.6"}}>Fill in the details below to add a new Product</p>
            </div>
            <div className={styles.addProductContainer}>
              <div className={styles.leftContainer}>
                <div className={styles.product}>
                  <div style={{fontSize:"1.2rem",fontWeight:"450"}}>Product Images</div>
                  <p style={{opacity:"0.6"}}>Upload multiple images of your Product</p>
                </div>
                <div className={styles.uploadImageContainer}></div>
                <div className={styles.uploadedImages}></div>
              </div>
              <div className={styles.rightContainer}>
                <div className={styles.product}>
                  <div style={{fontSize:"1.2rem",fontWeight:"450"}}>Product Information</div>
                </div>
                <div className={styles.productInfoData}>
                  <div className={styles.firstR}>
                    <div className={styles.divInput} style={{flex:"0.6"}}>
                      <label htmlFor="productname">Product Name</label>
                      <input className={styles.input} type="text" id="productname" placeholder="Product Name"/>
                    </div>
                    <div className={styles.divInput} style={{flex:"0.4"}}>
                      <label htmlFor="category">Category</label>
                      <select className={styles.input} id="category">
                        <option value="ax">Skincare</option>
                        <option value="ax">Makeup</option>
                        <option value="nb">Haircare</option>
                        <option value="yt">Fragrance</option>
                        <option value="yt">Bath & Body</option>
                        <option value="">Tools & Accessories</option>
                        <option value="yt">Supplements</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.secondR}>
                    <div className={styles.divInput} style={{flex:"0.6"}}>
                      <label htmlFor="productname">Brand</label>
                      <input className={styles.input} type="text" id="productname" placeholder="Brand"/>
                    </div>
                    <div className={styles.divInput} style={{flex:"0.2"}}>
                      <label htmlFor="productname">Price</label>
                      <input className={styles.input} type="text" id="productname" placeholder="Price"/>
                    </div>
                    <div className={styles.divInput} style={{flex:"0.2"}}>
                      <label htmlFor="productname">Stock Quantity</label>
                      <input className={styles.input} type="text" id="productname" placeholder="quantity"/>
                    </div>
                  </div>
                  <div className={styles.thirdR}>
                    <label htmlFor="description">Description</label>
                    <textarea className={styles.textarea} name="" id="description" rows="6" ></textarea>
                  </div>
                  <div className={styles.fourthR}>
                    <div style={{flex:"0.5"}} className={styles.ingredients}>
                      <p>Ingredients</p>

                      <div className={styles.box}>
                        {ingredients.map((item) => (
                          <div className={styles.tag} key={item}>
                            {item}
                            <span onClick={() => removeIngredient(item)}><X /></span>
                          </div>
                        ))}
                      </div>

                      <div style={{display:"flex",gap:"0.6rem"}}>
                        <input className={styles.input}  placeholder="Add ingredient and press enter" value={item} onChange={(e) => setItem(e.target.value)}/>
                        <button className={styles.addIngredientBtn} onClick={() => {addIngredient(item), setItem("")}}>Add</button>
                      </div>
                    </div>
                    <div style={{flex:"0.5",padding:"0.5rem"}} className={styles.skinTypes}>
                      <p>Skin type<span style={{opacity:"0.7"}}>(optional)</span></p>
                      <div className={styles.skinTypesOptions}>
                        <div className={styles.checkOption}><input type="checkbox" name="Dry" id="dry" /><label htmlFor="dry">Dry</label> </div>
                        <div className={styles.checkOption}><input type="checkbox" name="Oily" id="oily" /><label htmlFor="oily">Oily</label> </div>
                        <div className={styles.checkOption}><input type="checkbox" name="Sensitive" id="sensitive" /><label htmlFor="sensitive">Sensitive</label> </div>
                        <div className={styles.checkOption}><input type="checkbox" name="Combination" id="combination" /><label htmlFor="combination">Combination</label> </div>
                        <div className={styles.checkOption}><input type="checkbox" name="Normal" id="normal" /><label htmlFor="normal">Normal</label> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.addProductInfo}>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
