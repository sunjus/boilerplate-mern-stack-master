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
