### weChat h5 utils

```javascript
    import { url, cache, compat } from "h5-utils-js";

    //URL
    url.getUrl() "or" url.getUrl({key:"value"});

    //hash参数
    url.getHash();

    //URL参数对象
    url.getParams();
    
    //set localStorage
    cache.setItem("key","value","time");
    
    //get localStorage
    cache.getItem("key");
    
    //removeItem localStorage
    cache.removeItem("key");
    
    //IOS
    compat.isIOS();
    
    //Android
    compat.isAndroid();

    //weChat
    compat.isWeiXin();

    //weChat init
    compat.mobileInit();
```