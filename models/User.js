const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //이메일주소에 whitespace관리해 줌
    unique: 1, //이메일주소가 유니크하길 바람
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    //유저가 관리자인지 아닌지 결정해 줌
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    //토큰으로 유효성 검사해 줌
    type: String,
  },
  tokenExp: {
    //토큰유효기간
    type: Number,
  },
});

const User = mongoose.model("User", userSchema); //()에 모델에 이름과 스키마 넣어주기

module.exports = { User };
