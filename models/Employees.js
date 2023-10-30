const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema(
  {
    bio: { type: String, required: true },
    titleAtOrbiba: { type: String, required: true },
    description: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    salary: { type: Number, required: true },
    //  Employment Status must be enum of fulltime or parttime, contract or insternship

    employmentStatus: {
      type: String,
      enum: ['fulltime', 'parttime', 'contract', 'insternship'],
      required: true,
    },
    //  Location must be enum of remote or office
    location: {
      type: String,
      enum: ['remote', 'office'],
      required: true,
    },
    //  Experience Level must be enum of junior or mid or senior
    experienceLevel: {
      type: String,
      enum: ['junior', 'mid', 'senior'],
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

module.exports = mongoose.model('Employee', EmployeeSchema);
