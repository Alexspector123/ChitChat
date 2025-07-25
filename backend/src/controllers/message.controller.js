import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in get users for sidebar", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const id = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: id, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: id }
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in get messages controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id:receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl="";
        if (image) {
            console.log("Later on");
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in send message controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}