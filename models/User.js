const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //salt10자리
var jwt = require("jsonwebtoken");

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

userSchema.pre("save", function (next) {
  //아래 코드는 https://www.npmjs.com/package/bcrypt 에서 가져와 변경한다
  var user = this;
  //비밀번호를 암호화시킨다. 비번이 변경될 때를 대비해
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      // Store hash in your password DB.
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    //비번변경이 없다면 바로 다름으로 빠져나가기.
    //index.js 파일에 user.save((err, userInfo) => {
    //if (err) return res.json({ success: false, err });
    //return res.status(200).json({
    //   success: true,
    // });
    //}); 여기로 가게 되는 것임
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainpassword는 유저가 입력한 번호, 암호화된 비번은 몽고디비에서 암호화되어 표시된 비번
  //this.password는 위에 userSchema에 있는 password
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    //콜백 true 란 말. 트루면 index.js
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;
  //jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), "secretToken");

  //user._id + 'secretToken' = token
  //=>
  //'secretToken' => user._id

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  //토큰을 decode한다.
  jwt.verify(token,'secretToken', function(err,decoded) {
    //유저 아이디를 이용해서 유져를 찾은 다음에
    //클라이너트에서 가져온 token과  DB에 보관된 토큰이 일치하는지 확인

    user.findOne({"_id": decoded, "token": token}, function(err,user))
  })
};

const User = mongoose.model("User", userSchema); //()에 모델에 이름과 스키마 넣어주기

module.exports = { User };
