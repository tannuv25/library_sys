import User from "../models/user.js";
import bcrypt from "bcryptjs";

const createAdminIfNotExists = async () => {
  try {
    console.log("Checking admin...");

    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      name: "Super Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin"
    });

    console.log("Admin created successfully");

  } catch (error) {
    console.error("FULL ERROR:", error);
  }
};

export default createAdminIfNotExists;
