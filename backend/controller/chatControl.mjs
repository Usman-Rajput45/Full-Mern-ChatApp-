// export const getMessage = (req, res) => {
//     res.json([
//         {user: "Alice", message: "Hello!"},
//         {user: "Bob", message: "Hi there!"}
//     ])
// } 



import Message from "../models/message.mjs";

export const getMessage = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err });
  }
};
