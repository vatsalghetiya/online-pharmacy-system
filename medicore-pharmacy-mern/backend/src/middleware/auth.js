import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function protect(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1] : null;
    if (!token) return res.status(401).json({ message: "Authentication required" });
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(payload.sub).select("-password -refreshTokenHash");
    if (!req.user || !req.user.isActive) return res.status(401).json({ message: "Invalid session" });
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired access token" });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
}
