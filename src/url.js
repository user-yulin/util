export default {
    /**
     * 获取URL
     * @param {} params 
     */
    getUrl: function (params = {}) {
        let query = '';
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
    getHash: function () {
        return (location.search || "").replace("#", '');
    },
    /**
     * 获取URL参数对象
     */
    getParams: function (key) {
        const arr = (location.search || "").replace(/^\?/, '').split("&");
        const params = {};
        let data = [];
        for (let i = 0; i < arr.length; i++) {
            data = arr[i].split("=");
            if (data.length === 2) {
                params[data[0]] = data[1];
            }
        }
        return key ? params[key] : params;
    },
}