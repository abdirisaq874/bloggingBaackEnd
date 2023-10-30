const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    thumbnailUrl: { type: String, required: true },
    content: { type: String, required: true },
    isfeatured: { type: Boolean, required: true },
    minutesToread: { type: Number, required: true },
    tags: [{ type: String, required: true }],
    keywords: [{ type: String, required: true }],
    description: { type: String, required: true },
    minutesToread: { type: Number, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    employee: {
      type: mongoose.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    // declare views parameter and it should be incremented by 1 every time the blog is viewed
    views: { type: Number, default: 0 },
    // Add a 'likes' field to track the number of likes
    likes: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
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

BlogSchema.pre('findOneAndUpdate', function (next) {
  this.update({}, { $inc: { views: 1 } });
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
