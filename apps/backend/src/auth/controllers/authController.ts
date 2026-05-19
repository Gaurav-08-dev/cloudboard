import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import Session from "../../models/session";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400).json({
      message: "User already exists",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User created",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401).json({
      message: "Invalid credentials",
    });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    res.status(401).json({
      message: "Invalid credentials",
    });
    return;
  }

  const accessToken = generateAccessToken(user._id.toString());

  const refreshToken = generateRefreshToken(user._id.toString());

  await Session.create({
    userId: user._id,
    refreshToken,
    userAgent: req.headers["user-agent"] || "",
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.json({
    accessToken,
  });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.sendStatus(401);
    return;          // return void, not the Response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as jwt.JwtPayload;

    const session = await Session.findOne({ refreshToken: token });

    if (!session) {
      res.sendStatus(403);
      return;
    }

    await Session.deleteOne({ refreshToken: token });

    const newRefreshToken = generateRefreshToken(decoded.userId);

    await Session.create({
      userId: decoded.userId,
      refreshToken: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const accessToken = generateAccessToken(decoded.userId);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.json({ accessToken });

  } catch {
    res.sendStatus(403);
  }
});

export const logout =
asyncHandler(
async (req, res) => {

  const token = req.cookies.refreshToken

  await Session.deleteOne({
    refreshToken: token
  })

  res.clearCookie("refreshToken")

  res.json({
    message: "Logged out"
  })
})