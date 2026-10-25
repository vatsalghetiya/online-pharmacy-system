import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { accessToken, refreshToken, hashToken, randomOtp } from "../utils/tokens.js";

export async function register(req, res) {
  const { name, email, password, role = "pharmacist", phone } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required" });
  if (await User.findOne({ email })) return res.status(409).json({ message: "Email already registered" });
  const user = await User.create({
    name, email, phone,
    role: ["super_admin", "pharmacy_admin"].includes(role) ? "pharmacist" : role,
    password: await bcrypt.hash(password, 12)
  });
  const at = accessToken(user), rt = refreshToken(user);
  user.refreshTokenHash = hashToken(rt);
  await user.save();
  res.cookie("refreshToken", rt, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 7*24*60*60*1000 });
  res.status(201).json({ accessToken: at, user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password +refreshTokenHash");
  if (!user || !user.isActive || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const at = accessToken(user), rt = refreshToken(user);
  user.refreshTokenHash = hashToken(rt);
  await user.save();
  res.cookie("refreshToken", rt, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 7*24*60*60*1000 });
  res.json({ accessToken: at, user: publicUser(user) });
}

export async function refresh(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub).select("+refreshTokenHash");
    if (!user || user.refreshTokenHash !== hashToken(token)) throw new Error("invalid");
    const at = accessToken(user);
    res.json({ accessToken: at, user: publicUser(user) });
  } catch {
    res.status(401).json({ message: "Invalid refresh token" });
  }
}

export async function logout(req, res) {
  if (req.cookies.refreshToken) {
    const user = await User.findOne({ refreshTokenHash: hashToken(req.cookies.refreshToken) }).select("+refreshTokenHash");
    if (user) { user.refreshTokenHash = undefined; await user.save(); }
  }
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
}

export async function forgotPassword(req, res) {
  const user = await User.findOne({ email: req.body.email }).select("+password");
  if (!user) return res.json({ message: "If the account exists, a reset code was generated." });
  const otp = randomOtp();
  user.otpHash = hashToken(otp);
  user.otpExpiresAt = new Date(Date.now() + 10*60*1000);
  await user.save();
  console.log(`DEV OTP for ${user.email}: ${otp}`);
  res.json({ message: "If the account exists, an OTP was generated. In development it is printed in the backend console." });
}

export async function verifyOtp(req, res) {
  const user = await User.findOne({ email: req.body.email }).select("+password");
  if (!user || !user.otpHash || user.otpExpiresAt < new Date() || user.otpHash !== hashToken(req.body.otp)) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  user.otpHash = undefined; user.otpExpiresAt = undefined;
  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetTokenHash = hashToken(resetToken);
  user.resetTokenExpiresAt = new Date(Date.now() + 10*60*1000);
  await user.save();
  res.json({ resetToken });
}

export async function resetPassword(req, res) {
  const user = await User.findOne({ resetTokenHash: hashToken(req.body.resetToken) }).select("+password");
  if (!user || user.resetTokenExpiresAt < new Date()) return res.status(400).json({ message: "Invalid reset token" });
  user.password = await bcrypt.hash(req.body.password, 12);
  user.resetTokenHash = undefined; user.resetTokenExpiresAt = undefined;
  await user.save();
  res.json({ message: "Password reset successful" });
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone };
}
