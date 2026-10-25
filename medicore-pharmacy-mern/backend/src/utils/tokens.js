import jwt from "jsonwebtoken";
import crypto from "crypto";

export function accessToken(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m"
  });
}
export function refreshToken(user) {
  return jwt.sign({ sub: user._id.toString(), type: "refresh" }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d"
  });
}
export function hashToken(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}
export function randomOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}
