import {
  signupTemplate,
  loginTemplate,
  verifyEmailTemplate,
  resetPasswordEmailTemplate,
  changePasswordEmailTemplate,
} from "./template.service";
import { Env } from "../";
import { ESubjectsEmail } from "../../enum";
import { IEmailContent, IUser } from "../../interface";
import { Route } from "../../constant";
import nodemailer, { Transporter } from "nodemailer";

const audience: string = String(Env.get("AUDIENCE"));

/* This code snippet is creating a transporter object using the nodemailer library in TypeScript. The
transporter is responsible for sending emails. Here's a breakdown of what each part of the code is
doing: */
const transporter: Transporter = nodemailer.createTransport({
  service: String(Env.get("EMAIL_SERVICE")),
  auth: {
    user: String(Env.get("EMAIL_USERNAME")),
    pass: String(Env.get("EMAIL_PASSWORD")),
  },
});

/**
 * The `sendEmail` function in TypeScript sends an email with specified content using a transporter.
 * @param {IEmailContent}  - The `sendEmail` function takes an object with the following properties as
 * its parameter:
 * @returns The `sendEmail` function is returning a Promise that resolves to a `Transporter` object.
 */
const sendEmail = ({
  to,
  subject,
  html,
}: IEmailContent): Promise<Transporter> => {
  const config: IEmailContent = {
    from: `${String(Env.get("EMAIL_FROM"))} <${String(
      Env.get("EMAIL_USERNAME")
    )}>`,
    to,
    subject,
    html,
  };
  return transporter.sendMail(config);
};

/**
 * The function `signupEmailSend` sends a signup email to the provided email address using a predefined email template.
 */
export const signupEmailSend = async (user: IUser): Promise<Transporter> => {
  const emailConfig: IEmailContent = {
    to: user?.email,
    subject: ESubjectsEmail.SIGNUP,
    html: signupTemplate(user?.firstName),
  };

  return await sendEmail(emailConfig);
};

/**
 * The `loginEmailSend` function sends an email with login information to the specified email address.
 */
export const loginEmailSend = async (user: IUser): Promise<Transporter> => {
  const emailConfig: IEmailContent = {
    to: user?.email,
    subject: ESubjectsEmail.LOGIN,
    html: loginTemplate({
      name: user?.firstName,
      time: new Date().toISOString(),
      location: "Nagpur, Maharashtra",
    }),
  };

  return await sendEmail(emailConfig);
};

/**
 * The function `verificationEmailSend` sends a verification email with a link containing user ID and
 * token for email verification.
 */
export const verificationEmailSend = async (
  user: IUser,
  token: string
): Promise<Transporter> => {
  const url: string = `${audience}${Route.VERIFICATION}?userId=${String(
    user?._id
  )}&token=${token}`;
  const emailConfig: IEmailContent = {
    to: user?.email,
    subject: ESubjectsEmail.VERIFY_EMAIL,
    html: verifyEmailTemplate(user?.firstName, url),
  };
  return await sendEmail(emailConfig);
};

/**
 * The function `resetPasswordEmailSend` sends a reset password email to a user with a link to set a
 * password.
 */
export const resetPasswordEmailSend = async (
  user: IUser,
  token: string
): Promise<Transporter> => {
  const url: string = `${audience}${Route.SET_NEW_PASSWORD}?userId=${String(
    user?._id
  )}&token=${token}`;
  const emailConfig: IEmailContent = {
    to: user?.email,
    subject: ESubjectsEmail.RESET_PASSWORD,
    html: resetPasswordEmailTemplate(user?.firstName, url),
  };

  return await sendEmail(emailConfig);
};

/**
 * The function changePasswordEmailSend sends an email to a user notifying them that their password has
 * been recently changed.
 */
export const changePasswordEmailSend = async (
  user: IUser
): Promise<Transporter> => {
  const emailConfig: IEmailContent = {
    to: user?.email,
    subject: ESubjectsEmail.RECENTLY_CHANGED_PASSWORD,
    html: changePasswordEmailTemplate(user?.firstName),
  };

  return await sendEmail(emailConfig);
};
