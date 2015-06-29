/**
 * Created by wlh on 15/6/29.
 */


/**
 * @example
 *
 * ```
 * var expressFlash = Middleware()
 * var app = express();
 * app.use(expressFlash());
 *
 * route.js
 *
 * app.use("/error", function(req, res, next) {
 *  res.flash.error("这是一条错误");
 *  res.render("index");
 * })
 *
 * app.use("/info", function(req, res, next) {
 *  res.flash.info("只是一条info")；
 *  res.render("info");
 * })
 *
 * index.html
 *
 * <div>
 *     <%errs = flash.getErrors()%>
 *     <%if(errs && errs.length){%><%=errs%><%}%>
 *
 *     <%infos = flash.getInfos()%>
 *     <%=infos%>
 * </div>
 * ```
 */
function Middleware() {
  return function(req, res, next) {
    var session = req.session;
    if (!session) {
      console.warn("express flash need session support! but req.session is null");
    } else {
      var _flash_error_msg = session._flash_error_msg || [];
      var _flash_info_msg = session._flash_info_msg || [];

      var flash = {
        error: function(err) {
          _flash_error_msg.push(err);
        },
        info: function(info) {
          _flash_info_msg.push()
        },
        getLastError: function() {
          var err = _flash_error_msg.pop();
          session._flash_error_msg = _flash_error_msg;
          return err;
        },
        getErrors: function() {
          //调用后将session中消息设为空
          session._flash_error_msg = [];
          return _flash_error_msg;
        },
        getLastInfo: function() {
          var info = _flash_info_msg.pop();
          session._flash_info_msg = _flash_info_msg;
          return info;
        },
        getInfos: function() {
          session._flash_info_msg = [];
          return _flash_info_msg;
        }
      }

      res.locals.flash = flash;
      res.flash  = flash;
    }

    next();
  }
}

module.exports = Middleware;
