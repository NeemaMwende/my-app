import User from "../models/User";

export default async function handler(req, res) {
  try {
    await User.sync({ alter: true });
    res.status(200).json({ message: "Database initialized" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
