import { registeruser, loginuser, logoutuser, updateProfile, userPasswordForgot, userPasswordChange, userVerification } from './auth.controllers.js';
import { getAllMessage, getAllContacts, getMessageByUserId, sendMessage } from './message.controllers.js';

export {
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
};

export default {
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
};