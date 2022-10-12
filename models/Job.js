const mongoose = require("mongoose");
const validator = require("validator");
const ObjectId = mongoose.Types.ObjectId;

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "job title is required"],
      trim: true,
    },
    vacancy: {
      type: Number,
      required: [true, "vacancy number is required"],
      min: [1, "vacancy can't be negative"],
    },
    jobType: {
      type: String,
      required: true,
      enum: {
        values: ["internship", "part-time", "full-time", "contract"],
        message:
          "job type can't be {VALUE}, must be internship/part-time/full-time/contract",
      },
    },
    officeType: {
      type: String,
      required: [true, "office type is required"],
      enum: {
        values: ["remote", "office"],
        message: "office type can't be {VALUE}, must be remote/office",
      },
    },
    location: {
      type: String,
      required: [true, "location is required"],
      lowercase: true,
      trim: true,
    },
    responsibilities: [
      {
        type: String,
        required: true,
      },
    ],
    qualifications: [
      {
        type: String,
        required: true,
      },
    ],
    officeTime: {
      type: String,
    },
    salary: {
      type: Number,
      required: [true, "please provide a salary amount"],
    },
    benefits: [
      {
        type: String,
      },
    ],
    deadline: {
      type: Date,
      required: [true, "please provide a deadline date"],
      validate: [validator.isDate, "please provide a valid date"],
    },
    hiringManager: {
      name: String,
      id: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
    },
    applicantCount: {
      type: Number,
      default: 0,
    },
    candidates: [
      {
        name: String,
        applyDate: Date,
        id: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

jobSchema.methods.checkDeadlineOver = function () {
  const date = new Date();
  const isDeadlineOver = date > this.deadline;

  return isDeadlineOver;
};

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
