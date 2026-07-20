const Model = require('../models/server.js');
const getAllMessage = async (req, res) => {
   try {
    const userId = req.user._id;
    
    const AllMessage = await Model.Message.find({ 
        $or: [{senderId:userId}, {receiverId: userId}],
     });

     const chatPartnerId =  [ ...new Set(AllMessage.map((msg) => 
        msg.senderId.toString() === userId.toString() ? msg.receiverId.toString() : msg.senderId.toString()
     ))];

    return res.status(200).json(chatPartnerId);
   } catch(error) {
    console.log("Error in getAllMessage", error,message);
    return res.status(500).json({ message: "Server Error" })
   }
}
const getAllContacts = async(req, res) => {
    try {
    const userId = req.user._id;
    const filteredUser = await Model.User.find({_id: { $ne: userId}});

    return res.status(200).json(filteredUser);
   } catch(error) {
    console.log("Error in getAllContacts", error,message);
    return res.status(500).json({ message: "Server Error" })
   }
}
const getMessageByUserId = async(req, res) => {
try {
    const userId = req.user._id;
    const {id: userToChatId} = req.params;

    const message = await Model.Message.find({
        $or: [
            {senderId: userId, receiverId: userToChatId},
            {senderId: userToChatId, receiverId: userId}
        ]
    });

    return res.status(200).json(message);
} catch(error) {
    console.log("Error in getMessageByUserId Controllers: ", error.message);
    return res.status(500).json({ message: "Internal Server Error"});
}
}
const sendMessage = async(req, res) => {
try{ 
    const {text} = req.body;
    const image = req.file;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
 
    const newmsg = new Model.Message({
        senderId,
        receiverId,
        text,
        image: image.path
    });
    await newmsg.save();
    return res.status(201).json(newmsg);

} catch(error) {
    console.log("Error in sendMessage Controllers: ", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
}
}

module.exports = {
    getAllMessage,
    getAllContacts,
    getMessageByUserId,
    sendMessage
};