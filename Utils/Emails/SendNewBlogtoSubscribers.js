const sendEmail = require('./sendEmail');

const sendNewBlogtoSubscribers = async ({ title, content, origin, email }) => {
  const message = `
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
         
            <title>${title}</title>
        </head>
        <body>
            <div style="max-width: 32rem; margin-left: auto; margin-right: auto; padding: 1.5rem; border: 1px solid rgba(209, 213, 219);">
                <p style="font-size: 1.125rem; margin-bottom: 1rem;">Hey there,</p>
    
                <p style="margin-bottom: 1rem;">We’re excited to share with you our new blog ${title}.</p>
    
                <p style="margin-bottom: 1rem;">${content}</p>
                <p style="margin-top: 2rem;">If you no longer wish to receive our emails, you can 
                <a href="${origin}/unsubscribe" style="color: #3b82f6">unsubscribe here</a>.</p>
                </div>
                </body>
                </html>`;
  return sendEmail({
    to: email,
    subject: title,
    html: message,
  });
};
module.exports = sendNewBlogtoSubscribers;
