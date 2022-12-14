const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const ObjectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "provide a valid email address"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "emmail address is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 2,
            minNumbers: 1,
            minSymbols: 1,
          }),
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Password doesn't match",
      },
    },
    firstName: {
      type: String,
      required: [true, "first name is required"],
      trim: true,
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      minLength: [3, "name must be at least 3 characters"],
      maxLength: [100, "name is too large"],
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "please provide a valid contact number",
      ],
    },
    resume: {
      type: String,
      validate: [validator.isURL, "please provide a valid url"],
    },
    role: {
      type: String,
      enum: {
        values: ["candidate", "hiring-manager", "admin"],
        message: "role can't be {VALUE}",
      },
      default: "candidate",
    },
    appliedJobs: [
      {
        title: String,
        applyDate: Date,
        id: {
          type: ObjectId,
          ref: "Job",
        },
      },
    ],
    status: {
      type: String,
      enum: {
        values: ["active", "inactive", "blocked"],
        message: "status can't be {VALUE}",
      },
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);

  this.password = hashedPassword;
  this.confirmPassword = undefined;

  next();
});

userSchema.pre("updateOne", function (next) {
  const data = this.getUpdate();
  const password = data["$set"].password;

  if (password) {
    data["$set"].password = bcrypt.hashSync(password);
  }

  next();
});

userSchema.methods.comparePassword = function (password, hashedPassword) {
  const isPasswordValid = bcrypt.compareSync(password, hashedPassword);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
