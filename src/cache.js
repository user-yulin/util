const _storage = window.localStorage;

export default {
    setItem: function(k, v, t) {
        let seconds = parseInt(t);
        let expire = 0;
        if (seconds > 0) {
            expire = new Date().getTime() + seconds * 1000;
        }
        _storage.setItem(k, JSON.stringify({
                value: v,
                expire
            })
        );
    },

    getItem: function(k, _default = null) {
        const time = new Date().getTime();
        const valueItem = _storage.getItem(k);
        if (!valueItem) return _default;
        const {value, expire} = JSON.parse(valueItem);
        if (expire === 0 || expire > time) return value || _default;
        _storage.removeItem(k);
        return _default;
    },

    removeItem: function(k) {
        _storage.removeItem(k);
    }
};
