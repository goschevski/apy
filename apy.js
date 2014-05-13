;(function () {

    var Apy = function (options) {
        this.options = options;
        this.validateBase();
        this.validateCollection();
        this.createRoute();
    };

    Apy.prototype = {
        validateBase: function () {
            if ( !this.options.base ) {
                return this.base = '/';
            }

            if ( !this.options.base.match(/\/$/) ) {
                this.options.base += '/';
            }

            this.base = this.options.base;
        },

        validateCollection: function () {
            if ( !this.options.collection ) {
                throw new Error('You must pass collection.');
            }

            if ( typeof this.options.collection !== 'string' ) {
                throw new Error('Collection must be passed as string.');
            }

            this.collection = this.options.collection;
        },

        createRoute: function () {
            this.route = this.base + this.collection + '/';
        },

        send: function (url, method, params, cb) {
            var xhr = new XMLHttpRequest();

            xhr.open(method, url, true);
            xhr.onreadystatechange = function () {
                // If call is good
                if (xhr.readyState == 4) {
                    var data = xhr.responseText;

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
            }

            var body,
                chunks = [];

            if (params) {
                for (var name in params) {
                    chunks.push(name + '=' + encodeURIComponent(params[name]));
                }

                body = chunks.join('&');
                if ( body.length ) {
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                }
            }

            xhr.send(body);
        },

        all: function (cb) {
            this.send(this.route, 'GET', {}, cb);
        },

        find: function (id, cb) {
            this.send(this.route + id, 'GET', {}, cb);
        },

        save: function (data, cb) {
            this.send(this.route, 'POST', data, cb);
        },

        update: function (id, data, cb) {
            this.send(this.route + id, 'PUT', data, cb);
        },

        destroy: function (id, cb) {
            this.send(this.route + id, 'DELETE', {}, cb);
        }
    };

    window.Apy = Apy;

})();