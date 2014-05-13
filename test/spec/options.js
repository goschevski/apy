describe('Apy options', function () {
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
});