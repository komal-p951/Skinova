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

    return res.status(httpStatus.CREATED).json({ message: "User Created" });

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

    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "7d",
    });

    console.log(token);
    await User.updateOne({ token: token });

    return res.status(httpStatus.OK).json({
      message: "User login successful!",
      token: token,
    });
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
  }
};



export const addProduct = async(req,res) => {
  try {
    const {...Data } = req.body;
    const product = new Product();
    Object.assign(product,Data);
    await product.save();

    return res.status(httpStatus.CREATED).json({message: "Product Added Successfully!"});
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
}


export const getProduct  = async(req,res) => {
  const {id} = req.params;
  try {
    const product = await Product.findById(id);
    if(!product) {
      return res.status(httpStatus.NOT_FOUND).json({message: "No Such Product!"});
    }
    return res.status(httpStatus.OK).json(product);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  }
}


export const deleteProduct = async(req,res) => {
  const { id } = req.params;
  try{
    const product = await Product.findByIdAndDelete(id);

    return res.status(httpStatus.OK).json({message: "Product deleted!"});

  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).json({ message: error.message });
  }
}



