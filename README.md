# express-flash
---

```
  实现在express中调用flash，将消息发送到前段页面
  in express.js, use flash to show message to front-page(html)
```

```
npm install wlh-express-flash
```
### 使用(Usage)
---

   1. 后端代码(backend)

```
  app.js

  var app = express();
  var expressFlash = require("express-flash");
  app.use(expressFlash());

  route.js
  exports.login = function(req, res, next) {
      res.flash.error("用户名或密码错误");
      res.render("login");
  }

  exports.loginSuccess = function(req, res, next) {
      res.flash.info("恭喜您登陆成功");
      res.render("loginSuccess");
  }

  login.html
  <%=flash.getErrors()%>

  loginSuccess.html
  <%=flash.getInfos()%>

  //if you want only get lash msg
  // flash.getLashError() flash.getLastInfo()
```

### dependents(依赖)
---

  1. 需要使用session作为存储
  2. express.js


### connect me(联系我)
---

  send email to wanglihui.sjz@gmail.com(深山猎人)