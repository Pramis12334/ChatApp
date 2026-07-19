const { registeruser, loginuser, logoutuser, updateProfile } = require("./auth.controllers");
const { getAllMessage, getAllContacts, getMessageByUserId, sendMessage } = require("./message.controllers");

module.exports = {
    registeruser,
    loginuser,
    logoutuser,
    updateProfile,
    getAllMessage,
    getAllContacts,
    getMessageByUserId,
    sendMessage
}