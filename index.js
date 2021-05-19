const express = require("express");
const app = express();
const port = 5000;
const config = require("./config/key");

const bodyParser = require("body-parser");
const { User } = require("./models/User");

//application/x-www-form-urlencoded 로 생긴 client정보를 처리
app.use(bodyParser.urlencoded({ extended: true }));
//application.json 정보를 처리
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다

  const user = new User(req.body); //.models에 있는 user를 가져와서 인스턴스를 만듦
  //body-parser가 있기 때문에 req.body는 즉 클라이언트 입력 정보와 같은 내용이다

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
