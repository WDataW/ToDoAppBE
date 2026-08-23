const emailVerification = ({ from, to, verificationUrl }) => ({
  from,
  to,
  subject: 'Verify your email address',

  text: `
Welcome!

Please verify your email address by clicking the link below:

${verificationUrl}

This link will expire soon. If you didn't create an account, you can safely ignore this email.

Thanks!
  `.trim(),

  html: `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333;">
      <h2>Verify your email address</h2>

      <p>Welcome!</p>

      <p>
        Please verify your email address by clicking the button below:
      </p>

      <p>
        <a
          href="${verificationUrl}"
          style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #2563eb;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
          "
        >
          Verify Email Address
        </a>
      </p>

      <p>
        Or copy and paste this link into your browser:
      </p>

      <p>
        <a href="${verificationUrl}">
          ${verificationUrl}
        </a>
      </p>

      <p>
        This link will expire soon. If you didn't create an account,
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