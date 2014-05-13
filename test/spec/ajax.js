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

    describe('Query', function () {
        it('should throw an error if params are not passed as object', function () {
            try {
                PeopleApi.all(function (err, data) {}, 'some string');
            } catch (err) {
                expect(err.message).toEqual('Params must be passed as object.');
            }
        });

        it('should not append query', function () {
            PeopleApi.all(function (err, data) {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/');
        });

        it('should append query for all method', function () {
            PeopleApi.all(function (err, data) {}, { kind: 'nice', job: 'developers' });
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/?kind=nice&job=developers');
        });

        it('should append query for find method', function () {
            PeopleApi.find(12, function (err, data) {}, { job: 'developers' });
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12?job=developers');
        });

        it('should append query for save method', function () {
            PeopleApi.save({ name: 'apy' }, function (err, data) {}, { job: 'developers' });
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/?job=developers');
        });

        it('should append query for update method', function () {
            PeopleApi.update(12, { name: 'apy' }, function (err, data) {}, { changed: 'name' });
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12?changed=name');
        });

        it('should append query for destroy method', function () {
            PeopleApi.destroy(12, function (err, data) {}, { soft: true });
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12?soft=true');
        });
    });

    describe('Method', function () {
        it('should send GET request for all', function () {
            PeopleApi.all(function (err, data) {});
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
        });

        it('should send GET request for find', function () {
            PeopleApi.find(12, function (err, data) {});
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
        });

        it('should send POST request for save', function () {
            PeopleApi.save({ name: 12 }, function (err, data) {});
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
        });

        it('should send PUT request for update', function () {
            PeopleApi.update(12, { name: 'apy' }, function (err, data) {});
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('PUT');
        });

        it('should send DELETE request for destroy', function () {
            PeopleApi.destroy(12, function (err, data) {});
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('DELETE');
        });
    });

    describe('URL', function () {
        it('should point to right url for all', function () {
            PeopleApi.all(function (err, data) {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/');
        });

        it('should point to right url for find', function () {
            PeopleApi.find(12, function (err, data) {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12');
        });

        it('should point to right url for save', function () {
            PeopleApi.save({ name: 12 }, function (err, data) {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/');
        });

        it('should point to right url for update', function () {
            PeopleApi.update(12, { name: 'apy' }, function (err, data) {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12');
        });

        it('should point to right url for destroy', function () {
            PeopleApi.destroy(12, function (err, data) {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12');
        });
    });
});