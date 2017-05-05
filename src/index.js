'use strict';

class Apy {
    constructor (options) {
        this.options = options;
        this.validateBase();
        this.validateCollection();
        this.createRoute();
    }

    all (cb, params) {
        const query = this.mapParams(params || {});
        this.send(`${this.route}${query}`, 'GET', {}, cb);
    }

    find (id, cb, params) {
        const query = this.mapParams(params || {});
        this.send(`${this.route}${id}${query}`, 'GET', {}, cb);
    }

    save (data, cb, params) {
        const query = this.mapParams(params || {});
        this.send(`${this.route}${query}`, 'POST', data, cb);
    }

    update (id, data, cb, params) {
        const query = this.mapParams(params || {});
        this.send(`${this.route}${id}${query}`, 'PUT', data, cb);
    }

    destroy (id, cb, params) {
        const query = this.mapParams(params || {});
        this.send(`${this.route}${id}${query}`, 'DELETE', {}, cb);
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

    validateCollection () {
        if (!this.options.collection) {
            throw new Error('You must pass collection.');
        }

        if (typeof this.options.collection !== 'string') {
            throw new Error('Collection must be passed as string.');
        }

        this.collection = this.options.collection;
    }

    createRoute () {
        this.route = `${this.base}${this.collection}/`;
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
