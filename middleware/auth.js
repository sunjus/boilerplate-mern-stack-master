const { User } = require("../models/User");

let auth = (req, res, next) => {
  //인증처리하는 곳
  //순서: 클라이언트 쿠키에서 토큰 가져오기
  let token = req.cookies.x_auth;
  //토큰을 복호화한 후 유저를 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    //유저 없으면 인증 x
    if (!user) return res.json({ isAuth: false, error: true });
    //유저 있으면 인증,
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
