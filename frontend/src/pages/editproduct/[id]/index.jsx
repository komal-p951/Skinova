import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import DashboardLayout from "@/layout/DashboardLayout";
import { CloudUpload, X } from "lucide-react";
import { clientServer } from "@/index";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";

export default function editproduct() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    price: 0,
    images: [],
    quantity: 1,
    SkinType: "",
    ingredients: [],
  });
  
  const [loading, setLoading] = useState(true);

  let fetchdata = async () => {
    if (!id) return;
    try {
      let response = await clientServer.get(`/${id}`);
      setData(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    if(id) fetchdata();
  }, [id]);

  const handleUpdateProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await clientServer.patch(`/${id}`, data, {
        headers: {
          Authorization: token,
        },
      });
      toast.success(res?.data?.message);
      router.push(`/product/${id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const removeIngredient = (item) => {
    setData({
      ...data,
      ingredients: [...data.ingredients.filter((i) => i !== item)],
    });
  };

  const addIngredient = (newIngredient) => {
    const trimmed = newIngredient.trim();
    if (!trimmed) return;
    setData({ ...data, ingredients: [...data.ingredients, trimmed] });
  };

  const removeImage = (idx) => {
    setData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = data.images.length + files.length;
    if (totalImages > 4) {
      toast.error("You can upload at max 4 images");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev) => ({
          ...prev,
          images: [...prev.images, { url: reader.result, filename: file.name }],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Loader />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        
        <div className={styles.mainContainer}>
          <div className={styles.addproductdetails}>
            <div className={styles.pageHeading}>
              <div className={styles.pageTitle}>Edit Product</div>
              <p className={styles.pageSubtitle}>Update your product details</p>
            </div>

            <div className={styles.addProductContainer}>
              <div className={styles.leftContainer}>
                <div className={styles.product}>
                  <div className={styles.sectionTitle}>Product Images</div>
                  <p className={styles.sectionSubtitle}>
                    Upload multiple images of your product
                  </p>
                </div>

                <div className={styles.uploadImageContainer}>
                  <div className={styles.uploadsvg}>
                    <CloudUpload />
                  </div>
                  <div className={styles.uploadTitle}>Drag & Drop images here</div>
                  <div className={styles.uploadOr}>or</div>
                  <div>
                    <label htmlFor="productimage" className={styles.browsfilesbtn}>
                      Browse Files
                    </label>
                    <input type="file" id="productimage" style={{ display: "none" }} multiple onChange={handleImage} />
                  </div>
                  <p className={styles.uploadHint}>You can upload up to 4 images</p>
                </div>

                <div className={styles.uploadedImages}>
                  {data.images.length > 0 ? (
                    data.images.map((file, idx) => (
                      <div className={styles.singleImage} key={file.url || idx}>
                        <img src={file.url} alt={file.name || `product-image-${idx}`} />
                        <span
                          className={styles.cancel}
                          onClick={() => removeImage(idx)}
                          role="button"
                          aria-label="Remove image"
                        >
                          <X size={14} />
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className={styles.noImages}>No images uploaded yet</p>
                  )}
                </div>
              </div>

              <div className={styles.rightContainer}>
                <div className={styles.product}>
                  <div className={styles.sectionTitle}>Product Information</div>
                </div>

                <div className={styles.productInfoData}>
                  <div className={styles.firstR}>
                    <div className={styles.divInput} style={{ flex: "0.6" }}>
                      <label htmlFor="productname">Product Name</label>

                      <input
                        className={styles.input}
                        type="text"
                        id="productname"
                        placeholder="Product Name"
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        value={data.name}
                      />
                    </div>

                    <div className={styles.divInput} style={{ flex: "0.4" }}>
                      <label htmlFor="category">Category</label>

                      <select
                        className={styles.input}
                        id="category"
                        value={data.category}
                        onChange={(e) => setData({ ...data, category: e.target.value })}
                      >
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
                    <div className={styles.divInput} style={{ flex: "0.6" }}>
                      <label htmlFor="brand">Brand</label>
                      <input
                        className={styles.input}
                        type="text"
                        id="brand"
                        placeholder="Brand"
                        onChange={(e) => setData({ ...data, brand: e.target.value })}
                        value={data.brand}
                      />
                    </div>

                    <div className={styles.divInput} style={{ flex: "0.2" }}>
                      <label htmlFor="price">Price</label>
                      <input
                        className={styles.input}
                        type="number"
                        id="price"
                        placeholder="Price"
                        onChange={(e) => setData({ ...data, price: e.target.value })}
                        value={data.price}
                      />
                    </div>

                    <div className={styles.divInput} style={{ flex: "0.2" }}>
                      <label htmlFor="quantity">Stock Quantity</label>
                      <input
                        className={styles.input}
                        type="number"
                        id="quantity"
                        placeholder="quantity"
                        onChange={(e) => setData({ ...data, quantity: e.target.value })}
                        value={data.quantity}
                      />
                    </div>
                  </div>

                  <div className={styles.thirdR}>
                    <label htmlFor="description">Description</label>
                    <textarea
                      className={styles.textarea}
                      id="description"
                      rows="6"
                      onChange={(e) => setData({ ...data, description: e.target.value })}
                      value={data.description}
                    ></textarea>
                  </div>

                  <div className={styles.fourthR}>
                    <div className={styles.ingredients}>
                      <p className={styles.fieldLabel}>Ingredients</p>

                      <div className={styles.box}>
                        {data?.ingredients?.map((item) => (
                          <div className={styles.tag} key={item}>
                            {item}
                            <span onClick={() => removeIngredient(item)}>
                              <X />
                            </span>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: "flex", gap: "1rem" }}>
                        <input
                          className={styles.input}
                          placeholder="Add ingredient and press enter"
                          value={item}
                          onChange={(e) => setItem(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addIngredient(item);
                              setItem("");
                            }
                          }}
                        />
                        <button
                          className={styles.addIngredientBtn}
                          onClick={() => {
                            addIngredient(item);
                            setItem("");
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>

                    <div className={styles.skinTypes}>
                      <p className={styles.fieldLabel}>
                        Skin type <span className={styles.optionalTag}>(optional)</span>
                      </p>

                      <div className={styles.skinTypesOptions}>
                        {["Dry", "Oily", "Sensitive", "Combination", "Normal"].map((type) => (
                          <div className={styles.checkOption} key={type}>
                            <input
                              type="radio"
                              name="SkinType"
                              id={type.toLowerCase()}
                              value={type}
                              checked={data.SkinType === type}
                              onChange={(e) => setData({ ...data, SkinType: e.target.value })}
                            />
                            <label htmlFor={type.toLowerCase()}>{type}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.btns}>
            <div className={styles.btn} onClick={() => router.back()}>
              Cancel
            </div>

            <div className={`${styles.btn} ${styles.primaryBtn}`} onClick={handleUpdateProduct}>
              Save changes
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
