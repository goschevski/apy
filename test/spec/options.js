describe('Apy options', function () {
    beforeEach(function () {
        jasmine.Ajax.install();
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    it('should append slash to base if there is a need', function () {
        var api = new Apy({ base: '/api', collection: 'people' });
        var api2 = new Apy({ base: '/api/', collection: 'people' });
        expect(api.base).toEqual('/api/');
        expect(api2.base).toEqual('/api/');
    });

    it('should have a default base', function () {
        var api = new Apy({ collection: 'people' });
        expect(api.route).toEqual('/people/');
    });

    it('should have a collection', function () {
        try {
            var api = new Apy({});
        } catch (err) {
            expect(err.message).toEqual('You must pass collection.');
        }
    });

    it('should throw an error for bad collection', function () {
        try {
            var api = new Apy({ base: '/api/', collection: ['people'] });
        } catch (err) {
            expect(err.message).toEqual('Collection must be passed as string.');
        }
    });

    it('should have a route', function () {
        var api = new Apy({ base: '/api/', collection: 'people' });
        expect(api.route).toEqual('/api/people/');
    });

    describe('Extend', function () {
        it('should be extensible', function () {
            // extend
            Apy.prototype.remove = function (id, cb, params) {
                this.destroy(id, cb, params);
            };

            // instance for testing
            var api = new Apy({ collection: 'developers' });
            api.remove('goschevski', function (err, data) {});

            // test
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('DELETE');
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/developers/goschevski');
        });
    });
});