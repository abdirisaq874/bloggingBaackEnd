const mongoose = require('mongoose');

const BlogMailingSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model('BlogMailing', BlogMailingSchema);
