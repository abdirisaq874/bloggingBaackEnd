module.exports = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'abdirisaq874@gmail.com',
    pass: process.env.APP_PASSWORD,
  },
};
