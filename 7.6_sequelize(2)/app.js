const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true,
});

// 서버실행시 mysql과 연동함
// force: 서버실행시마다 테이블을 재생성 할 것인지 여부
sequelize
  .sync({ force: true })
  .then(() => {
    console.log('데이터베이스 연결성공');
  })
  .catch(err => {
    console.error(err);
  });

// app.use('요청경로', 미들웨어)
// 아래 app.use들은 요청경로가 없으므로 모든 요청에 실행됨

// (236p) 요청과 응답에 대한 정보를 콘솔에 기록함(개발환경: 'dev', 배포환경: 'combined')
app.use(morgan('dev'));
// (237p) 정적인 파일을 제공하는 라우터 역할
app.use(express.static(path.join(__dirname, 'public')));

// (237p) request body의 데이터형식에 따라(json 또는 query string) body-parser가 parsing하여 req.body에 추가함
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없어요`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
