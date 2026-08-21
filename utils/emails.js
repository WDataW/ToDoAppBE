const emailVerification = ({ from, to, verificationUrl }) =>
({
    from: from, // sender address
    to: to, // list of recipients
    subject: 'Verify your email address',
    text: 'Welcome!',
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: @root333;" >
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
            background-color: @root2563eb;
            color: @rootffffff;
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

      <p>${verificationUrl}</p>

      <p>
        This link will expire soon. If you didn't create an account,
        you can safely ignore this email.
      </p>

      <p>Thanks!</p>
    </div >
    `,
}
)

module.exports = { emailVerification }