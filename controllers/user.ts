import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userSchema, { User } from "../models/user"; 

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body)
    const user = await userSchema.findOne({ mobileNumber: req.body.mobileNumber });
    console.log(user)
    if (user) {
      res.status(409).json({ message: "User with given mobile number already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    console.log("success");

    const newUser = await new userSchema({
      ...req.body,
      password: hashPassword,
    }).save();

    res.status(200).send({
      success: true,
      newUser,
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during registration",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  console.log("login");

  const { mobileNumber, password } = req.body;
  if (!mobileNumber || !password) {
    res.status(400).json({ message: "Mobile Number and Password are required" });
    return;
  }

  const user = await userSchema.findOne({ mobileNumber: mobileNumber });

  if (!user) {
    res.status(401).json({ message: "Invalid Mobile Number or Password" });
    return;
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    res.status(401).json({ message: "Invalid Password" });
    return;
  }

  const token = jwt.sign(
    { id: user._id},
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );

  res.json({
    message: "Login successful",
    user,
    token,
  });
};

export const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const filterQuery = {};
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = 3;

    const total = await userSchema.countDocuments(filterQuery);
    const results = await userSchema
      .find(filterQuery)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.status(200).json({ totalPages: Math.ceil(total / pageSize), results });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while retrieving users",
    });
  }
};
