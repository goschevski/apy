describe('Apy ajax calls', function () {
    var PeopleApi;

    beforeEach(function () {
        jasmine.Ajax.install();
        PeopleApi = new Apy({
            base: '/api/v3/',
            collection: 'people'
        });
    });

    afterEach(function () {
        jasmine.Ajax.uninstall();
    });

    it('should send ajax request for all items', function () {
        PeopleApi.all(function (err, data) {});
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/');
        expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
    });

    it('should send ajax request for one items', function () {
        PeopleApi.find(12, function (err, data) {});
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12');
        expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
    });

    it('should send ajax request for saving item', function () {
        PeopleApi.save({ name: 12 }, function (err, data) {});
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/');
        expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
    });

    it('should send ajax request for updating item', function () {
        PeopleApi.update(12, { name: 'apy' }, function (err, data) {});
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12');
        expect(jasmine.Ajax.requests.mostRecent().method).toBe('PUT');
    });

    it('should send ajax request for destroying item', function () {
        PeopleApi.destroy(12, function (err, data) {});
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12');
        expect(jasmine.Ajax.requests.mostRecent().method).toBe('DELETE');
    });
});