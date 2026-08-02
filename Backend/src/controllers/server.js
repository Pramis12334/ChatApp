const { registeruser, loginuser, logoutuser, updateProfile, userPasswordForgot, userPasswordChange, userVerification } = require("./auth.controllers");
const { getAllMessage, getAllContacts, getMessageByUserId, sendMessage } = require("./message.controllers");

module.exports = {
    registeruser,
    loginuser,
    logoutuser,
    updateProfile,
    getAllMessage,
    getAllContacts,
    getMessageByUserId,
    sendMessage,
    userPasswordForgot,
    userPasswordChange,
    userVerification
}