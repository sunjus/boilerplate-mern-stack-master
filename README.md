## git commit 할때
미리 올라간 폴더를 삭제하고 commit할때 포함시키고 싶지 않다면
미리 올라간 폴더를 git staging 목록에서 빼는 방법을 쓸것. 
터미널에서 git rm --cached 파일명 -r

## git local과 github이 안전하게 통신하게 하려면 SSH를 설정해서 사용한다
내 컴에 SSH 가 있는지 확인하는 방법은 터미널에서  ls -a ~/.ssh 쳐보면 된다.
나는 작년 10월에 설치했구나. 몰랐다.


## body-parser 라는 dependency를 사용해서 
client side 에서 보내주는  user name, password, email 등을 server에서 받을 수 있다.
npm install body-parser --save

## 아직 clinet side가 없으니 server code 가 잘 작동하는지 테스트해보는 postman을 이용할 것.
post,get 잘 설정하자 postman에서.

## nodemon은 입력변경사항이 있을 때 npm start를 매번 재실행 하지 않고도  페이지 변경사항을 보여주는 것.
npm install nodemon --save-dev 
-dev를 붙이면 개발할때만 쓰고 배포하곤 안쓴단얘기

## config 폴더 생성
몽고디비 비번 등 정보보호가 필요한 코드를 커밋방지하기 위해서
그리고 나중에 헤로쿠 디플로이 할때를 대비해 prod 파일도 생성

## 유저 비번을 암호화 해주기 (https://www.npmjs.com/package/bcrypt)
npm install bcrypt --save

## 비번이 맞다면 유저를 위한 웹토큰을 생성해주기 (https://www.npmjs.com/package/jsonwebtoken)
npm install jsonwebtoken --save
유저 웹토큰을 잠깐 쿠키에 저장해줄 때 쓸
npm install cookie-parser --save


--요기부터 client -------------------------------------------------


## cors 정책 => req, res에 프론트, 서버의 포트가 다른 경우 에러 => proxy 로 해결 (https://create-react-app.dev/docs/proxying-api-requests-in-development/)
프론트는 3000, 서버는 5000 같이 포트가 다를 경우.  data를 주고 받을 때 cors 정책에 걸린다.
Cors 정책은 보안을 위한것. cross-origin resource sharing
proxy를 이용해서 해결하기

## 프론트. 서버 한꺼번에 run start하려면 npm install concurrently --save 깔면 됨
"dev": "concurrently \"npm run backend\" \"npm run start --prefix client\"" 루트 제이슨파일에 입력하고 터미널에서 npm run dev로 앱시작하면 됨

## 리액트 상태관리는 redux로 npm install redux react-redux redux-promise redux-thunk --save
