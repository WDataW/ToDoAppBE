const emailVerification = ({ from, to, verificationCode }) => ({
  from,
  to,
  subject: 'Verify your email address',

  text: `
Welcome!

Thanks for creating an account.

Your verification code is:

${verificationCode}

Enter this 6-digit code in the verification screen to verify your email address.

This code will expire soon. If you didn't create an account, you can safely ignore this email.

Thanks!
  `.trim(),

  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333;">
      <h2>Verify your email address</h2>

      <p>Welcome!</p>

      <p>
        Thanks for creating an account. Please use the verification code below
        to verify your email address:
      </p>

      <div
        style="
          margin: 24px 0;
          padding: 16px;
          background-color: #f3f4f6;
          border-radius: 8px;
          text-align: center;
        "
      >
        <span
          style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #111827;
          "
        >
          ${verificationCode}
        </span>
      </div>

      <p>
        Enter this 6-digit code in the verification screen to verify your
        email address.
      </p>

      <p>
        This code will expire soon. If you didn't create an account,
        you can safely ignore this email.
      </p>

      <p>Thanks!</p>
    </div>
  `.trim(),
});



const passwordReset = ({ from, to, resetUrl }) => ({
  from,
  to,
  subject: 'Reset your password',

  text: `
Hello!

We received a request to reset your password.

Reset your password by clicking the link below:

${resetUrl}

This link will expire soon. If you didn't request a password reset, you can safely ignore this email.

Thanks!
  `.trim(),

  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333;">
      <h2>Reset your password</h2>

      <p>Hello!</p>

      <p>
        We received a request to reset your password.
      </p>

      <p>
        Click the button below to choose a new password:
      </p>

      <p>
        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Reset Password
        </a>
      </p>

      <p>
        Or copy and paste this link into your browser:
      </p>

      <p>
        <a href="${resetUrl}">
          ${resetUrl}
        </a>
      </p>

      <p>
        This link will expire soon. If you didn't request a password reset,
        you can safely ignore this email.
      </p>

      <p>Thanks!</p>
    </div>
  `.trim(),
});


module.exports = { emailVerification, passwordReset }