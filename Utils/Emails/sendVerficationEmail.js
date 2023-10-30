const sendEmail = require('./sendEmail');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/Auth/Verify-email?token=${verificationToken}&email=${email}`;

  const message = `
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            /* Tailwind CSS styles */
            .max-w-lg { max-width: 32rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .p-6 { padding: 1.5rem; }
            .border { border-width: 1px; }
            .border-gray-300 { border-color: rgba(209, 213, 219); }
            .text-lg { font-size: 1.125rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .font-bold { font-weight: 700; }
            .bg-blue-500 { background-color: #3b82f6; }
            .text-white { color: #fff; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .rounded-full { border-radius: 9999px; }
            .text-center { text-align: center; }
            .text-blue-500 { color: #3b82f6; }
        </style>
        <title>Email Verification</title>
    </head>
    <body>
        <div style="max-width: 32rem; margin-left: auto; margin-right: auto; padding: 1.5rem; border: 1px solid rgba(209, 213, 219);">
            <p style="font-size: 1.125rem; margin-bottom: 1rem;">Hey ${name},</p>

            <p style="margin-bottom: 1rem;">We’re excited to welcome you to ORBIBA ROBOTICS! Before you begin your journey, we need to verify your account. Follow these steps to complete the verification process:</p>

            <p style="margin-bottom: 1.5rem;"><strong>Click the link below to verify your account:</strong></p>
            <a href="${verifyEmail}" style="display: block; background-color: #3b82f6; color: #fff; font-weight: bold; padding: 0.5rem 1rem; border-radius: 9999px; text-align: center; margin-bottom: 1.5rem;">Verify My Account</a>

            <p style="margin-bottom: 1rem;">If the link isn’t clickable, you can copy and paste this URL into your browser:</p>
            <p style="margin-bottom: 1.5rem;"><a href="${verifyEmail}" style="color: #3b82f6;">${verifyEmail}</a></p>

            <p style="margin-bottom: 1rem;">After verification, you’ll have access to all the amazing features on ORBIBA ROBOTICS.</p>

            <p style="margin-bottom: 1.5rem;">If you encounter any issues or have questions, our support team is here to help. Simply reply to this email or reach out to us at <a href="mailto:support@orbibarobotics.com" style="color: #3b82f6;">support@orbibarobotics.com</a>.</p>

            <p style="margin-bottom: 0.5rem;">Welcome aboard!</p>
            <p style="font-weight: 700;">Sincerely, ORBIBA ROBOTICS</p>
        </div>
    </body>
    </html>
  `;

  return sendEmail({
    to: email,
    subject: 'Email Confirmation for ORBIBA ROBOTICS',
    html: `${message}`,
  });
};

module.exports = sendVerificationEmail;
