exports.randStringGen = (len = 20, res = "") => {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  if (res.length >= len) {
    return res;
  }
  const charc = chars[Math.floor(Math.random() * chars.length)];
  res += Math.random() > 0.5 ? charc : charc.toUpperCase();
  return exports.randStringGen(len, res);
};

exports.errHandler = (err, res, next) => {
  if (err.message.includes("Cast to ObjectId failed")) {
    return res.status(400).json({
      status: false,
      message: "Invalid id - an id should have 24 hexadecimal digits",
      error: err,
    });
  } else if (err.message.includes("E11000 duplicate key")) {
    return res.status(400).json({
      status: false,
      message: "Entry already exists",
      error: err,
    });
  }
  return next(err);
};
