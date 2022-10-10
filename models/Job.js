const mongoose = require("mongoose");
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
    hiringManager: {
      name: String,
      id: {
        type: ObjectId,
        ref: "User",
        required: true,
      },
    },
    candidates: [
      {
        name: String,
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

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;