const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    blog: {
      type: mongoose.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
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

module.exports = mongoose.model('Comment', CommentSchema);
