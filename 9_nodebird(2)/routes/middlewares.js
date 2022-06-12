// 프로필 및 로그아웃 라우터 등 접근 전
exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

// 회원가입 및 로그인 라우터 등 접근 전
exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent('이미 로그인한 상태입니다.');
    res.redirect(`/?error=${message}`);
  }
};
