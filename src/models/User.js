const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const UsersSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

UsersSchema.pre("save", async function preSave(next) {
  this.username = this.username.toLowerCase();
  if (!this.isModified("password")) return next();
  try {
    this.password = await this.encryptPassword(this.password);
    return next();
  } catch (err) {
    return next(err);
  }
});

UsersSchema.methods = {
  authenticate: async function authenticate(plainTextPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainTextPassword, this.password, (err, hash) => {
        if (err) return reject(err);
        return resolve(hash);
      });
    });
  },
  encryptPassword: async function encryptPassword(plainTextPassword) {
    if (!plainTextPassword) return "";
    try {
      const salt = await new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, generatedSalt) => {
          if (err) return reject(err);
          return resolve(generatedSalt);
        });
      });
      return new Promise((resolve, reject) => {
        bcrypt.hash(plainTextPassword, salt, (err, hash) => {
          if (err) return reject(err);
          return resolve(hash);
        });
      });
    } catch (err) {
      throw err;
    }
  },
  toJson: function toJson() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
  },
};

module.exports = model("jlsmm_user", UsersSchema);
