describe('Apy ajax calls', () => {
    let PeopleApi;

    beforeEach(() => {
        jasmine.Ajax.install();
        PeopleApi = new Apy({
            base: '/api/v3/people'
        });
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    describe('Query', () => {
        it('should throw an error if params are not passed as object', () => {
            try {
                PeopleApi.all('some string', () => {});
            } catch (err) {
                expect(err.message).toEqual('Params must be passed as object.');
            }
        });

        it('should not append query', () => {
            PeopleApi.all(() => {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/');
        });

        it('should append query for all method', () => {
            PeopleApi.all({ kind: 'nice', job: 'developers' }, () => {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/?kind=nice&job=developers');
        });

        it('should append query for find method', () => {
            PeopleApi.find(12, { job: 'developers' }, () => {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12?job=developers');
        });

        it('should append query for save method', () => {
            PeopleApi.save({ name: 'apy' }, { job: 'developers' }, () => {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/?job=developers');
        });

        it('should append query for update method', () => {
            PeopleApi.update(12, { name: 'apy' }, { changed: 'name' }, () => {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12?changed=name');
        });

        it('should append query for destroy method', () => {
            PeopleApi.destroy(12, { soft: true }, () => {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12?soft=true');
        });
    });

    describe('HTTP Method', () => {
        it('should send GET request for all', () => {
            PeopleApi.all(() => {});
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
        });

        it('should send GET request for find', () => {
            PeopleApi.find(12, () => {});
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('GET');
        });

        it('should send POST request for save', () => {
            PeopleApi.save({ name: 12 }, () => {});
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('POST');
        });

        it('should send PUT request for update', () => {
            PeopleApi.update(12, { name: 'apy' }, () => {});
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('PUT');
        });

        it('should send DELETE request for destroy', () => {
            PeopleApi.destroy(12, () => {});
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('DELETE');
        });
    });

    describe('HTTP URL', () => {
        it('should point to right url for all', () => {
            PeopleApi.all(() => {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/');
        });

        it('should point to right url for find', () => {
            PeopleApi.find(12, () => {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12');
        });

        it('should point to right url for save', () => {
            PeopleApi.save({ name: 12 }, () => {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/');
        });

        it('should point to right url for update', () => {
            PeopleApi.update(12, { name: 'apy' }, () => {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12');
        });

        it('should point to right url for destroy', () => {
            PeopleApi.destroy(12, () => {});
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/v3/people/12');
        });
    });
});