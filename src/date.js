export default {
    getTime: function ( date = new Date() ) {
        return new Date(date).getTime()
    },

    format: function ( date = new Date(), formatStr = "YYYY-MM-DD" ) {
        const $date = new Date(date);
        const $Y = $date.getFullYear();
        const $M = $date.getMonth();
        const $D = $date.getDate();
        const $W = $date.getDay();
        const $H = $date.getHours();
        const $m = $date.getMinutes();
        const $s = $date.getSeconds();
        const $ms = $date.getMilliseconds();

        function padStart(string, length, pad) {
            var s = String(string);
            if (!s || s.length >= length) return string;
            return "" + Array(length + 1 - s.length).join(pad) + string;
        }

        function get$H(num) {
            return padStart($H % 12 || 12, num, '0');
        };

        const matches = {
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
            SSS: padStart($ms, 3, '0'),
        };

        const REGEX_FORMAT = /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
        
        return formatStr.replace(REGEX_FORMAT, function (match, $1) {return $1 || matches[match] });
    }
}