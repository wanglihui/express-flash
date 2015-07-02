/**
 * Created by wlh on 15/6/29.
 */


/**
 * express-flash 中间件
 *
 * @return {function} 供node.js直接使用的中间件
 *
 * @example
 * <code>
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
 * </code>
 */
function Middleware() {
  return function(req, res, next) {
    var session = req.session;
    if (!session) {
      console.warn("express flash need session support! but req.session is null");
    } else {
      var _flash_error_msg;
      var _flash_info_msg;

      var flash = {
        label: function(msg, label) {
          var _flash_msg;
          var _label = "_flash_"+label+"_msg";
          _flash_msg = session[_label] || [];
          _flash_msg.push(msg);
          session[_label] = _flash_msg;
        },
        getMsgs: function(label) {
          var _flash_msg;
          var _label = "_flash_"+label+"_msg";
          _flash_msg = session[_label] || [];
          delete session[_label];
          return _flash_msg;
        },
        getLashMsg: function(label) {
          var _label = "_flash_"+label+"_msg";
          var _flash_msg = session[_label] || [];
          var msg = _flash_msg.pop();
          session[_label] = _flash_msg;
          return msg;
        },
        error: function(err) {
          _flash_error_msg = session._flash_error_msg || [];
          _flash_error_msg.push(err);
          session._flash_error_msg = _flash_error_msg;
        },
        info: function(info) {
          _flash_info_msg = session._flash_info_msg || [];
          _flash_info_msg.push(info)
          session._flash_info_msg = _flash_info_msg;
        },
        getLastError: function() {
          _flash_error_msg = session._flash_error_msg || [];
          var err = _flash_error_msg.pop();
          session._flash_error_msg = _flash_error_msg;
          return err;
        },
        getErrors: function() {
          _flash_error_msg = session._flash_error_msg || [];
          //调用后将session中消息设为空
          session._flash_error_msg = [];
          return _flash_error_msg;
        },
        getLastInfo: function() {
          _flash_info_msg = session._flash_info_msg || [];
          var info = _flash_info_msg.pop();
          session._flash_info_msg = _flash_info_msg;
          return info;
        },
        getInfos: function() {
          _flash_info_msg = session._flash_info_msg || [];
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
