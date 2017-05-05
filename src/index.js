'use strict';

class Apy {
    constructor (options) {
        this.options = options || {};
        this.validateBase();
    }

    all (params, cb) {
        if (typeof params === 'function') {
            cb = params;
            params = {};
        }

        const query = this.mapParams(params || {});
        this.send(`${this.base}${query}`, 'GET', {}, cb);
    }

    find (id, params, cb) {
        if (typeof params === 'function') {
            cb = params;
            params = {};
        }

        const query = this.mapParams(params || {});
        this.send(`${this.base}${id}${query}`, 'GET', {}, cb);
    }

    save (data, params, cb) {
        if (typeof params === 'function') {
            cb = params;
            params = {};
        }

        const query = this.mapParams(params || {});
        this.send(`${this.base}${query}`, 'POST', data, cb);
    }

    update (id, data, params, cb) {
        if (typeof params === 'function') {
            cb = params;
            params = {};
        }

        const query = this.mapParams(params || {});
        this.send(`${this.base}${id}${query}`, 'PUT', data, cb);
    }

    destroy (id, params, cb) {
        if (typeof params === 'function') {
            cb = params;
            params = {};
        }

        const query = this.mapParams(params || {});
        this.send(`${this.base}${id}${query}`, 'DELETE', {}, cb);
    }

    validateBase () {
        if (!this.options.base) {
            this.base = '/';
            return;
        }

        if (!this.options.base.match(/\/$/)) {
            this.options.base += '/';
        }

        this.base = this.options.base;
    }

    mapParams (params) {
        if (typeof params !== 'object') {
            throw new Error('Params must be passed as object.');
        }

        const arr = [];

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
            }
        }

        return arr.length === 0 ? '' : `?${arr.join('&')}`;
    }

    send (url, method, params, cb) {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url, true);
        xhr.onreadystatechange = () => {
            // If call is good
            if (xhr.readyState === 4) {
                let data = xhr.responseText;

                // Try to parse response
                try {
                    data = JSON.parse(data);
                } catch (err) {
                    cb(new Error('Can\'t parse response from the api.'), null);
                    return;
                }

                // Call the callback
                cb(null, data);

            } else {
                // Return err to callback if can't get data from api
                cb(new Error('Can\'t get data from the api!'), null);
            }
        };

        let body;
        const chunks = [];

        if (params) {
            for (const name in params) {
                if (params.hasOwnProperty(name)) {
                    chunks.push(`${name}=${encodeURIComponent(params[name])}`);
                }
            }

            body = chunks.join('&');
            if ( body.length ) {
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            }
        }

        xhr.send(body);
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Apy;
} else {
    window.Apy = Apy;
}
