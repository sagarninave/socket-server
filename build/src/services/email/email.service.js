"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordEmailSend = exports.resetPasswordEmailSend = exports.verificationEmailSend = exports.loginEmailSend = exports.signupEmailSend = void 0;
const template_service_1 = require("./template.service");
const __1 = require("../");
const enum_1 = require("../../enum");
const constant_1 = require("../../constant");
const nodemailer_1 = __importDefault(require("nodemailer"));
const audience = String(__1.Env.get("AUDIENCE"));
/* This code snippet is creating a transporter object using the nodemailer library in TypeScript. The
transporter is responsible for sending emails. Here's a breakdown of what each part of the code is
doing: */
const transporter = nodemailer_1.default.createTransport({
    service: String(__1.Env.get("EMAIL_SERVICE")),
    auth: {
        user: String(__1.Env.get("EMAIL_USERNAME")),
        pass: String(__1.Env.get("EMAIL_PASSWORD")),
    },
});
/**
 * The `sendEmail` function in TypeScript sends an email with specified content using a transporter.
 * @param {IEmailContent}  - The `sendEmail` function takes an object with the following properties as
 * its parameter:
 * @returns The `sendEmail` function is returning a Promise that resolves to a `Transporter` object.
 */
const sendEmail = ({ to, subject, html, }) => {
    const config = {
        from: `${String(__1.Env.get("EMAIL_FROM"))} <${String(__1.Env.get("EMAIL_USERNAME"))}>`,
        to,
        subject,
        html,
    };
    return transporter.sendMail(config);
};
/**
 * The function `signupEmailSend` sends a signup email to the provided email address using a predefined email template.
 */
const signupEmailSend = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const emailConfig = {
        to: user === null || user === void 0 ? void 0 : user.email,
        subject: enum_1.ESubjectsEmail.SIGNUP,
        html: (0, template_service_1.signupTemplate)(user === null || user === void 0 ? void 0 : user.firstName),
    };
    return yield sendEmail(emailConfig);
});
exports.signupEmailSend = signupEmailSend;
/**
 * The `loginEmailSend` function sends an email with login information to the specified email address.
 */
const loginEmailSend = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const emailConfig = {
        to: user === null || user === void 0 ? void 0 : user.email,
        subject: enum_1.ESubjectsEmail.LOGIN,
        html: (0, template_service_1.loginTemplate)({
            name: user === null || user === void 0 ? void 0 : user.firstName,
            time: new Date().toISOString(),
            location: "Nagpur, Maharashtra",
        }),
    };
    return yield sendEmail(emailConfig);
});
exports.loginEmailSend = loginEmailSend;
/**
 * The function `verificationEmailSend` sends a verification email with a link containing user ID and
 * token for email verification.
 */
const verificationEmailSend = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${audience}${constant_1.Route.VERIFICATION}?userId=${String(user === null || user === void 0 ? void 0 : user._id)}&token=${token}`;
    const emailConfig = {
        to: user === null || user === void 0 ? void 0 : user.email,
        subject: enum_1.ESubjectsEmail.VERIFY_EMAIL,
        html: (0, template_service_1.verifyEmailTemplate)(user === null || user === void 0 ? void 0 : user.firstName, url),
    };
    return yield sendEmail(emailConfig);
});
exports.verificationEmailSend = verificationEmailSend;
/**
 * The function `resetPasswordEmailSend` sends a reset password email to a user with a link to set a
 * password.
 */
const resetPasswordEmailSend = (user, token) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${audience}${constant_1.Route.SET_NEW_PASSWORD}?userId=${String(user === null || user === void 0 ? void 0 : user._id)}&token=${token}`;
    const emailConfig = {
        to: user === null || user === void 0 ? void 0 : user.email,
        subject: enum_1.ESubjectsEmail.RESET_PASSWORD,
        html: (0, template_service_1.resetPasswordEmailTemplate)(user === null || user === void 0 ? void 0 : user.firstName, url),
    };
    return yield sendEmail(emailConfig);
});
exports.resetPasswordEmailSend = resetPasswordEmailSend;
/**
 * The function changePasswordEmailSend sends an email to a user notifying them that their password has
 * been recently changed.
 */
const changePasswordEmailSend = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const emailConfig = {
        to: user === null || user === void 0 ? void 0 : user.email,
        subject: enum_1.ESubjectsEmail.RECENTLY_CHANGED_PASSWORD,
        html: (0, template_service_1.changePasswordEmailTemplate)(user === null || user === void 0 ? void 0 : user.firstName),
    };
    return yield sendEmail(emailConfig);
});
exports.changePasswordEmailSend = changePasswordEmailSend;
//# sourceMappingURL=email.service.js.map