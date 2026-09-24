
const forgotPasswordEmail = (resetUrl) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Reset Password</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f4f5;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
          <tr>
            <td align="center">

              <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                style="
                  max-width: 600px;
                  background-color: #ffffff;
                  border-radius: 12px;
                  padding: 40px;
                  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
                "
              >

                <tr>
                  <td align="center">
                    <h1 style="
                      color: #111827;
                      margin-bottom: 10px;
                    ">
                      Reset Your Password
                    </h1>

                    <p style="
                      color: #6b7280;
                      font-size: 15px;
                      line-height: 1.6;
                    ">
                      We received a request to reset your password.
                      Click the button below to create a new password.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding: 25px 0;">
                    <a
                      href="${resetUrl}"
                      style="
                        display: inline-block;
                        background-color: #2563eb;
                        color: #ffffff;
                        text-decoration: none;
                        padding: 12px 24px;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: bold;
                      "
                    >
                      Reset Password
                    </a>
                  </td>
                </tr>

                <tr>
                  <td>
                    <p style="
                      color: #6b7280;
                      font-size: 14px;
                      line-height: 1.6;
                    ">
                      If you did not request a password reset, you can safely
                      ignore this email.
                    </p>

                    <p style="
                      color: #6b7280;
                      font-size: 14px;
                      line-height: 1.6;
                    ">
                      This password reset link will expire after a limited time.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding-top: 20px;">
                    <hr style="
                      border: none;
                      border-top: 1px solid #e5e7eb;
                    " />

                    <p style="
                      color: #9ca3af;
                      font-size: 12px;
                      text-align: center;
                    ">
                      If the button doesn't work, copy and paste this link
                      into your browser:
                    </p>

                    <p style="
                      color: #2563eb;
                      font-size: 12px;
                      text-align: center;
                      word-break: break-all;
                    ">
                      ${resetUrl}
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>

      </body>
    </html>
  `;
};

export default forgotPasswordEmail;