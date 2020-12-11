const jwt = require("jsonwebtoken");
const config = require('../config/config')

// 通过用户角色 控制访问的路由权限
// roles 是代入可以访问的角色
// req.user.role 是该用户的角色
exports.authorize = (...roles) => {
  return (ctx, next) => {
    let token;
    // 判断该请求是否拥有token
    if (
      ctx.request.headers.authorization &&
      ctx.request.headers.authorization.startsWith("Bearer")
    ) {
      token = ctx.request.headers.authorization.split(" ")[1];
    }

    // 校验token是否存在
    if (!token) {
      ctx.status = 401
      ctx.body = { msg: '无权限访问该路由'}
      return 
    }

    try {
      //   验证token
      const decoded = jwt.verify(token, config.secretOrKeys);
      const user = decoded.data
      console.log('user => ', user);

      if (!roles.includes(user.role)) {
        ctx.status = 403
        ctx.body = { msg: '该用户无权限访问此路由'}
        return  
      }
      return next();
    } catch (error) {
      ctx.status = 401
      ctx.body = { msg: '无权限访问该路由'}
      return
    }
  };
};