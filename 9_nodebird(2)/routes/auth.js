const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

// 회원가입 폼이 제출되었을 때
router.post('/join', isNotLoggedIn, async (req, res, next) => {
  // request body의 내용을 변수에 담음
  const { email, nick, password } = req.body;

  try {
    // 이미 가입되어 있는지 확인
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect('/join?error=exist');
    }

    // 새로운 사용자면 user table에 회원정보를 저장
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });

    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 로그인 폼이 제출되었을 때
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    // done(서버에러, 성공시 데이터, 사용자정의 에러)
    // 실패: authError에 값이 있는 경우
    if (authError) {
      console.error(authError);
      return next(authError);
    }

    //  실패: user에 값이 없는 경우
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }

    // 성공: authError가 없고 user가 있는 경우
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.redirect('/');
  });

  // res.redirect('/');
});

module.exports = router;
