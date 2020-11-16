const _storage = window.localStorage;

const cache = function () {

};

cache.prototype.setItem = (k, v, t) => {
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
};

cache.prototype.getItem = (k, _default = null) => {
    const time = new Date().getTime();
    const valueItem = _storage.getItem(k);
    if (!valueItem) return _default;
    const {value, expire} = JSON.parse(valueItem);
    if (expire === 0 || expire > time) return value || _default;
    _storage.removeItem(k);
    return _default;
};

cache.prototype.removeItem = (k) => {
    _storage.removeItem(k);
};


export default new cache;
