export const templateFrame = (content: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Platform!</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        border:1px solid gray;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
      }
      p {
        color: #666;
        line-height: 1.5;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
    </style>
    </head>
    ${content}
    </html>
    `;
};

export const signupTemplate = (name: string): string => {
  return templateFrame(`
    <body>
      <div class="container">
        <h1>Welcome to Our Platform!</h1>
        <p>Dear ${name},</p>
        <p>We are excited to welcome you to our platform! You are now part of our community.</p>
        <p>Here are some things you can do:</p>
        <ul>
          <li>Explore our features</li>
          <li>Connect with other users</li>
          <li>Start using our services</li>
        </ul>
        <p>Thank you for joining us!</p>
      </div>
    </body>
  `);
};

export const loginTemplate = (emailData): string => {
  return templateFrame(`
    <body>
      <div class="container">
        <h1>Recent Login Notification</h1>
        <p>Dear ${emailData?.name},</p>
        <p>This is to notify you that you recently logged into our platform.</p>
        <p>If this was you, you can disregard this email. If you suspect any unauthorized access, please contact us immediately.</p>
        <p> Time: ${emailData.time} </p>
        <p> Location: ${emailData.location} </p>
        <p>Thank you for using our platform!</p>
        <a href="[YourWebsiteURL]" class="button">Visit Our Platform</a>
      </div>
    </body>
  `);
};

export const verifyEmailTemplate = (name: string, url: string): string => {
  return templateFrame(`
    <body>
      <div class="container">
        <h1>Email Verification</h1>
        <p>Dear ${name},</p>
        <p>We're thrilled you've signed up with us. To finalize your registration and unlock full access to our services, please take a moment to verify your email address by clicking the button below:</p>
        <a href=${url} class="button">Verify Email Address</a>
        <p>If you did not request this verification, please ignore this email.</p>
      </div>
    </body>
  `);
};

export const resetPasswordEmailTemplate = (
  name: string,
  url: string
): string => {
  return templateFrame(`
    <body>
      <div class="container">
        <h1>Reset Password</h1>
        <p>Dear ${name},</p>
        <p>Thank you for using our services! To set a new password for your account and regain access, please click the button below</p>
        <a href=${url} class="button">Reset Password</a>
        <p>If you did not request to set a new password, please ignore this email.</p>
      </div>
    </body>
  `);
};

export const changePasswordEmailTemplate = (name: string): string => {
  return templateFrame(`
    <body>
      <div class="container">
        <h1>Recently Changed Password</h1>
        <p>Dear ${name},</p>
        <p>
          We are writing to inform you that the password associated with your account has recently been changed. 
          Your account security is our top priority, and we wanted to reach out to you to ensure that you are aware of this change.
        </p>
        <p>If you have initiated this change, you can disregard this email.</p>
        <p>
        If you did not request this change or believe your account has been compromised, 
        please take immediate action by contacting our support team at [support@email.com]. 
        We will assist you in securing your account and investigating the matter further.
        </p>
        <p>Thank you for your attention to this matter.</p>
        <p>If you did not request to change password, please ignore this email.</p>
      </div>
    </body>
  `);
};
