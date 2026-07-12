import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import DashboardLayout from "@/layout/DashboardLayout";
import { CloudUpload, X } from "lucide-react";
import { clientServer } from "@/index";

export default function addProduct() {

  const [item,setItem] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const [data,setData] = useState({
    name:"",
    description:"",
    category:"",
    brand:"",
    price:0,
    images:[],
    quantity:1,
    SkinType:"",
    ingredients:[]
  });
  
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

  const handleImage = (e) => {
      const newFiles = Array.from(e.target.files); 
      const oldFiles = Array.from(data.images);    
      const mergedFiles = [...oldFiles, ...newFiles]; 

      if(mergedFiles.length > 4){
        alert("you can upload at max 4 images");
        return;
      }
      setData({...data, images: mergedFiles});

  }

  const handlesubmitProduct = async(e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formdata = new FormData();
      formdata.append("name",data.name)
      formdata.append("description",data.description)
      formdata.append("category",data.category)
      formdata.append("brand",data.brand)
      formdata.append("price",data.price)
      formdata.append("quantity",data.quantity)
      formdata.append("SkinType",data.SkinType)
      formdata.append("ingredients",JSON.stringify(data.ingredients))

      for(let i = 0;i < data.images.length;i++){
        formdata.append("images",data.images[i]);
      }
      const res = await clientServer.post("/addproduct",
        formdata,
        {
        headers:{
          Authorization:token,
          "Content-Type":"multipart/form-data"
        }
      });

      console.log(res.data)
      setMessage(res?.data?.message);
      setData({
        name:"",
        description:"",
        category:"",
        brand:"",
        price:0,
        images:[],
        quantity:0,
        SkinType:"",
        ingredients:[]
      });
      router.push("/");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
    }
  }

 useEffect(() => {
  if (message || errormessage) {
    const timer = setTimeout(() => {
      setMessage("");
      setErrorMessage("");
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [message, errormessage]);

  const removeIngredient = (item) => {
    setData({...data,ingredients:[...data.ingredients.filter((i) => i !== item)]});
  };

  const addIngredient = (newIngredient) => {
    if(newIngredient !== ""){
      setData({...data,ingredients:[...data.ingredients, newIngredient]});
    }
  }


  
  return (
    <DashboardLayout>
      <div className={styles.container}>
        {message.length > 0 ? <p style={{background:"#b3fdb0",border: "1px solid #337433"}} className={styles.message}>{message}</p> : <></>}
        {errormessage.length > 0 ? <p className={styles.message} style={{background:"#ffbaba",border: "1px solid #f72b2b"}}>{errormessage} </p> : <></> }
        <div className={styles.mainContainer}>

          <div style={{marginInline:"2rem",color:"#714f65"}} className={styles.links}>
            <span style={{cursor:"pointer"}} onClick={() => router.push("/")}>Home </span> &nbsp;&nbsp;&gt;&nbsp;&nbsp; <span style={{cursor:"pointer"}}> AddProduct</span>
          </div>

          <div className={styles.addproductdetails}>

            <div style={{marginInline:"2rem"}} className={styles.product}>
              <div style={{fontSize:"2rem",fontWeight:"500"}}>Add New Product</div>
              <p style={{opacity:"0.6"}}>Fill in the details below to add a new Product</p>
            </div>

            <div className={styles.addProductContainer}>

              <div className={styles.leftContainer}>

                <div className={styles.product}>
                  <div style={{fontSize:"1.2rem",fontWeight:"450"}}>Product Images</div>
                  <p style={{opacity:"0.6"}}>Upload multiple images of your Product</p>
                </div>

                <div className={styles.uploadImageContainer}>
                  <div className={styles.uploadsvg}><CloudUpload /></div>
                  <div style={{fontWeight:"450",fontSize:"1.2rem"}}>Drag & Drop images here</div><div>or</div>
                  <div>
                    <label htmlFor="productimage" className={styles.browsfilesbtn}>Browse Files</label>
                    <input type="file" id="productimage" style={{display:"none"}} name="images" multiple formEncType="multipart/form-data" onChange={handleImage}/>
                  </div>
                  <p style={{opacity:"0.6"}}>You can upload up to 4 images</p>
                </div>

                <div className={styles.uploadedImages}>
                  {data.images.map((file,idx) => (
                    <div className={styles.singleImage}>
                      <img
                          src={URL.createObjectURL(file)}  
                          alt={file.name}
                          key={idx}
                        />
                    </div>
                  )) }
                </div>

              </div>

              <div className={styles.rightContainer}>

                <div className={styles.product}>

                  <div style={{fontSize:"1.2rem",fontWeight:"450"}}>Product Information</div>

                </div>

                <div className={styles.productInfoData}>

                  <div className={styles.firstR}>

                    <div className={styles.divInput} style={{flex:"0.6"}}>
                      <label htmlFor="productname">Product Name</label>

                      <input className={styles.input} type="text" id="productname" placeholder="Product Name"
                      onChange={(e) => setData({...data, name:e.target.value})} value={data.name}/>

                    </div>

                    <div className={styles.divInput} style={{flex:"0.4"}}>

                      <label htmlFor="category">Category</label>

                      <select className={styles.input} id="category" value={data.category} onChange={(e) => setData({...data, category:e.target.value})}>

                        <option value="Select">--- Select ---</option>
                        <option value="Skincare">Skincare</option>
                        <option value="Makeup">Makeup</option>
                        <option value="Haircare">Haircare</option>
                        <option value="Fragrance">Fragrance</option>
                        <option value="Bath & Body">Bath & Body</option>
                        <option value="Tools & Accessories">Tools & Accessories</option>
                        <option value="Supplements">Supplements</option>
                      </select>

                    </div>
                  </div>

                  <div className={styles.secondR}>

                    <div className={styles.divInput} style={{flex:"0.6"}}>
                      <label htmlFor="productname">Brand</label>
                      <input className={styles.input} type="text" id="productname" placeholder="Brand" onChange={(e) => setData({...data,brand:e.target.value})} value={data.brand}/>
                    </div>

                    <div className={styles.divInput} style={{flex:"0.2"}}>
                      <label htmlFor="productname">Price</label>
                      <input className={styles.input} type="number" id="productname" placeholder="Price" onChange={(e) => setData({...data,price: e.target.value})} value={data.price}/>
                    </div>

                    <div className={styles.divInput} style={{flex:"0.2"}}>
                      <label htmlFor="productname">Stock Quantity</label>
                      <input className={styles.input} type="number" id="productname" placeholder="quantity" onChange={(e) => setData({...data,quantity: e.target.value})} value={data.quantity}/>

                    </div>

                  </div>

                  <div className={styles.thirdR}>
                    
                    <label htmlFor="description">Description</label>
                    <textarea className={styles.textarea} name="" id="description" rows="6" onChange={(e) => setData({...data,description: e.target.value})} value={data.description} ></textarea>

                  </div>

                  <div className={styles.fourthR}>

                    <div style={{flex:"0.5"}} className={styles.ingredients}>
                      <p>Ingredients</p>

                      <div className={styles.box}>
                        {data?.ingredients?.map((item) => (
                          <div className={styles.tag} key={item}>
                            {item}
                            <span onClick={() => removeIngredient(item)}><X /></span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.ingredientsInputs}>

                        <input className={styles.input}  placeholder="Add ingredient and press enter" value={item} onChange={(e) => e.target.value  && setItem(e.target.value)}/>
                        <button className={styles.addIngredientBtn} onClick={() => {addIngredient(item), setItem("")}}>Add</button>
                      </div>

                    </div>

                    <div style={{flex:"0.5",padding:"0.5rem"}} className={styles.skinTypes}>

                      <p>Skin type<span style={{opacity:"0.7"}}>(optional)</span></p>

                      <div className={styles.skinTypesOptions}>

                        <div className={styles.checkOption}><input type="radio" name="SkinType" id="dry" value="Dry" onChange={(e) => setData({...data,SkinType: e.target.value})}/><label htmlFor="dry">Dry</label> </div>

                        <div className={styles.checkOption}><input type="radio" name="SkinType" id="oily"  value="Oily" onChange={(e) => setData({...data,SkinType: e.target.value})}/><label htmlFor="oily" >Oily</label> </div>

                        <div className={styles.checkOption}><input type="radio" name="SkinType" id="sensitive" value="Sensitive" onChange={(e) => setData({...data,SkinType: e.target.value})}/><label htmlFor="sensitive">Sensitive</label> </div>

                        <div className={styles.checkOption}><input type="radio" name="SkinType" id="combination" value="Combination" onChange={(e) => setData({...data,SkinType: e.target.value})}/><label htmlFor="combination">Combination</label> </div>

                        <div className={styles.checkOption}><input type="radio" name="SkinType" id="normal" value="Normal" onChange={(e) => setData({...data,SkinType: e.target.value})}/><label htmlFor="normal">Normal</label> </div>
                      </div>

                    </div>

                  </div>

                </div>

                <div className={styles.addProductInfo}>

                </div>

              </div>

            </div>

          </div>
          <div className={styles.btns}>

            <div className={styles.btn} onClick={() => router.push("/")}>cancel</div>

            <div className={styles.btn} onClick={handlesubmitProduct}>Add Product</div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
