"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Route = {
    INDEX: "/",
    NOT_FOUND: "*",
    SWAGGER: "/api-docs",
    AUTH: "/auth",
    USER: "/user",
    ADMIN: "/admin",
    SIGNUP: "/signup",
    LOGIN: "/login",
    VERIFICATION: "/verification",
    RESEND_VERIFICATION: "/resendVerification/:email",
    RESET_PASSWORD: "/resetPassword/:email",
    SET_NEW_PASSWORD: "/setNewPassword",
    LOG_OUT: "/logout",
    GET_PROFILE: "/profile",
    UPDATE_PROFILE: "/updateProfile",
    CHANGE_PASSWORD: "/changePassword",
    UPLOAD_PROFILE_PICTURE: "/uploadProfilePicture",
    GET_ALL_USERS: "/users",
    GET_USER: "/user/:id",
    UPDATE_USER_ROLE: "/updateUserRole",
};
exports.default = Route;
//# sourceMappingURL=route.constant.js.map