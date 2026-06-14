import User from "../model/user.js";
import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import Product from "../model/product.js";
import ProductRreview from "../model/productReview.js";


export const RegisterUser = async (req, res) => {
  try {
    const { username, email, password, phone, fullname } = req.body;
    if (!username || !email || !password || !phone || !fullname)
      return res.status(400).json({ message: "All Fields are Required! " });


    const user = await User.findOne({ email });


    if (user) return res.status(409).json({ message: "User Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      phone: phone,
      role: "customer",
      fullname: fullname,
    });

    await newUser.save();

    return res.status(httpStatus.CREATED).json({ message: "User Registered Successfully!" });

  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All Fields are Required! " });

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id, role : user.role}, process.env.SECRET, {
      expiresIn: "7d",
    });

    user.token = token;
    await user.save();

    return res.status(httpStatus.OK).json({
      message: "User Login Successfully!",
      token: token
    });
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
  }
};

export const getAllUsers = async(req, res) => {
  try {
    const users = await User.find({role:"customer"});

    if(users.length == 0)return res.json({message:"No user found !"});

    return res.json(users);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
  }
}

export const getProfile = async(req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if(!user){
      return res.status(httpStatus.NOT_FOUND).json({ message:"User Not Found!" });
    }
    return res.status(httpStatus.OK).json(user);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message:error.message });
  }
}


export const updatedProfileData = async(req,res) => {
  try {
    const data = req.body;
    const user = await User.findById(req.user.id).select("-password");
    if(!user){
      return res.status(httpStatus.NOT_FOUND).json({ message:"User Not Found!" });
    }

    Object.assign(user,data);

    await user.save();

    return res.json({message:"Profile updated successfully!",user});
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message:error.message });
  }
}


export const getAllProducts = async(req,res) => {
  try {
    const allProducts = await Product.find();
    if(!allProducts) return res.status(httpStatus.NOT_FOUND).json({message: "NOT FOUND!"});
    return res.status(httpStatus.OK).json(allProducts);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
}



export const getProductsByCategory = async(req,res) => {
  try {
    const products = await Product.find({
      category: req.params.category
    });
    if(!products) return res.status(httpStatus.NOT_FOUND).json({message:"not found!"});
    
    return res.status(httpStatus.OK).json(products);

  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({message: error.message});
  }
}

export const getProduct  = async(req,res) => {
  const {id} = req.params;
  try {
    const product = await Product.findById(id).populate({
      path: "reviews",

      options:{
        sort:{ createdAt:-1 }
      },
      
      populate: {
        path: "user",
        select: "fullname profileImage"
      }
    });
    if(!product) {
      return res.status(httpStatus.NOT_FOUND).json({message: "No Such Product!"});
    }
    return res.status(httpStatus.OK).json(product);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
}

export const addProduct = async(req,res) => {
  try {
    const Data = req.body;
    const product = new Product();
    Object.assign(product,Data);
    await product.save();

    return res.status(httpStatus.CREATED).json({message: "Product Added Successfully!"});
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
}

export const deleteProduct = async(req,res) => {
  const { id } = req.params;
  try{
    
    await ProductRreview.deleteMany({
      product:id
    });
    
    const product = await Product.findByIdAndDelete(id);
    
    return res.status(httpStatus.OK).json({message: "Product deleted!"});


  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).json({ message: error.message });
  }
}

export const editProduct = async(req,res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id,req.body,{
      new:true,
      runValidators:true
    });

    if(!updatedProduct){
        return res.status(httpStatus.NOT_FOUND).json({
          message:"Product not found"
        });
      }

      return res.status(httpStatus.OK).json({
        message:"Product updated successfully",
        updatedProduct
      });

  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });  
  }
}