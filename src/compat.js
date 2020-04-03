const u = navigator.userAgent;

export const isAndroid = function () {
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}

export const isIOS = function () {
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

export const isWeiXin = function () {
    return u.indexOf('MicroMessenger') > -1;
}

/**
 * 移动端初始化
 */
export const mobileInit = function () {
    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', {'fontSize': 0});
        });
    }

    if (isAndroid()) {
        if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
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
            setTimeout(() => {
                window.scrollTo(0, document.documentElement.scrollTop || document.body.scrollTop);
            }, 100);
        });
    }

    let bodyHeight = window.document.body.offsetHeight;
    let timer = setInterval(function () {
        bodyHeight = window.document.body.offsetHeight;
        if (bodyHeight > 0) {
            clearInterval(timer);
        }
    }, 100);
    window.onresize = function () {
        if(window.history && window.history.length > 1){
            bodyHeight -= 49;
        }
        if ((bodyHeight - window.document.body.offsetHeight) > 49)
            window.document.body.style.height = bodyHeight + 'px';
    }
}

export default {
    isAndroid,
    isIOS,
    isWeiXin,
    mobileInit
}