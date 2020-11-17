'use strict';

var url = {
  /**
   * 获取URL
   * @param {} params 
   */
  getUrl: function getUrl(params) {
    if (params === void 0) params = {};
    var query = '';
    Object.keys(params).forEach(function (key) {
      query += key + '=' + params[key] + '&';
    });

    if (query.length > 0) {
      query = '?' + query.substr(0, query.length - 1);
    }

    return location.href.replace(location.search, '').replace(location.hash, '') + query;
  },

  /**
   * 获取hash(取消#)
   */
  getHash: function getHash() {
    return (location.search || "").replace("#", '');
  },

  /**
   * 获取URL参数对象
   */
  getParams: function getParams(key) {
    var arr = (location.search || "").replace(/^\?/, '').split("&");
    var params = {};
    var data = [];

    for (var i = 0; i < arr.length; i++) {
      data = arr[i].split("=");

      if (data.length === 2) {
        params[data[0]] = data[1];
      }
    }

    return key ? params[key] : params;
  }
};

var date = {
  getTime: function getTime(date) {
    if (date === void 0) date = new Date();
    return new Date(date).getTime();
  },
  format: function format(date, formatStr) {
    if (date === void 0) date = new Date();
    if (formatStr === void 0) formatStr = "YYYY-MM-DD";
    var $date = new Date(date);
    var $Y = $date.getFullYear();
    var $M = $date.getMonth();
    var $D = $date.getDate();
    var $W = $date.getDay();
    var $H = $date.getHours();
    var $m = $date.getMinutes();
    var $s = $date.getSeconds();
    var $ms = $date.getMilliseconds();

    function padStart(string, length, pad) {
      var s = String(string);

      if (!s || s.length >= length) {
        return string;
      }

      return "" + Array(length + 1 - s.length).join(pad) + string;
    }

    function get$H(num) {
      return padStart($H % 12 || 12, num, '0');
    }
    var matches = {
      YY: String($Y).slice(-2),
      YYYY: $Y,
      M: $M + 1,
      MM: padStart($M + 1, 2, '0'),
      D: $D,
      DD: padStart($D, 2, '0'),
      H: String($H),
      HH: padStart($H, 2, '0'),
      h: get$H(1),
      hh: get$H(2),
      m: String($m),
      mm: padStart($m, 2, '0'),
      s: String($s),
      ss: padStart($s, 2, '0'),
      SSS: padStart($ms, 3, '0')
    };
    var REGEX_FORMAT = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
    return formatStr.replace(REGEX_FORMAT, function (match, $1) {
      return $1 || matches[match];
    });
  }
};

var _storage = window.localStorage;
var cache = {
  setItem: function setItem(k, v, t) {
    var seconds = parseInt(t);
    var expire = 0;

    if (seconds > 0) {
      expire = new Date().getTime() + seconds * 1000;
    }

    _storage.setItem(k, JSON.stringify({
      value: v,
      expire: expire
    }));
  },
  getItem: function getItem(k, _default) {
    if (_default === void 0) _default = null;
    var time = new Date().getTime();

    var valueItem = _storage.getItem(k);

    if (!valueItem) {
      return _default;
    }

    var ref = JSON.parse(valueItem);
    var value = ref.value;
    var expire = ref.expire;

    if (expire === 0 || expire > time) {
      return value || _default;
    }

    _storage.removeItem(k);

    return _default;
  },
  removeItem: function removeItem(k) {
    _storage.removeItem(k);
  }
};

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var u = navigator.userAgent;

function isAndroid() {
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}

function isIOS() {
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

function isWeiXin() {
  return u.indexOf('MicroMessenger') > -1;
}
/**
 * 移动端初始化
 */


function mobileInit() {
  function handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke('setFontSizeCallback', {
      'fontSize': 0
    }); // 重写设置网页字体大小的事件

    WeixinJSBridge.on('menu:setfont', function () {
      WeixinJSBridge.invoke('setFontSizeCallback', {
        'fontSize': 0
      });
    });
  }

  if (isAndroid()) {
    if ((typeof WeixinJSBridge === "undefined" ? "undefined" : _typeof(WeixinJSBridge)) == "object" && typeof WeixinJSBridge.invoke == "function") {
      handleFontSize();
    } else {
      if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
      } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", handleFontSize);
        document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
      }
    }
  }

  if (isIOS()) {
    window.addEventListener('focusout', function () {
      setTimeout(function () {
        window.scrollTo(0, document.documentElement.scrollTop || document.body.scrollTop);
      }, 100);
    });
  }

  var bodyHeight = window.document.body.offsetHeight;
  var timer = setInterval(function () {
    bodyHeight = window.document.body.offsetHeight;

    if (bodyHeight > 0) {
      clearInterval(timer);
    }
  }, 100);

  window.onresize = function () {
    if (window.history && window.history.length > 1) {
      bodyHeight -= 49;
    }

    if (bodyHeight - window.document.body.offsetHeight > 49) {
      window.document.body.style.height = bodyHeight + 'px';
    }
  };
}

var compat = {
  isAndroid: isAndroid,
  isIOS: isIOS,
  isWeiXin: isWeiXin,
  mobileInit: mobileInit
};

var main = {
  url: url,
  date: date,
  cache: cache,
  compat: compat
};

module.exports = main;
