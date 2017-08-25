describe('Promise and callbacks', () => {
    let PeopleApi;
    let server;

    beforeEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        server = sinon.fakeServer.create();

        PeopleApi = new Apy({
            base: '/api/v3/people'
        });
    });

    afterEach(function() {
        server.restore();
    });

    it('should return response in callback', (done) => {
        server.respondWith('GET', '/api/v3/people', [200, { 'Content-Type': 'application/json' }, '{ "stuff": "is", "awesome": "in here" }']);

        PeopleApi.all((err, res) => {
            expect(typeof res).toBe('object');
            expect(res.stuff).toBe('is');
            expect(err).toBeNull();

            done();
        });

        server.respond();

        expect(server.requests.length).toBeGreaterThan(0);
    });

    it('should return error in callback', (done) => {
        server.respondWith('GET', '/random');

        PeopleApi.all((err, res) => {
            expect(res).toBeNull();
            expect(typeof err).toBe('object');
            done();
        });

        server.respond();

        expect(server.requests.length).toBeGreaterThan(0);
    });

    it('should resolve promise with success', (done) => {
        server.respondWith('GET', '/api/v3/people', [200, { 'Content-Type': 'application/json' }, '{ "stuff": "is", "awesome": "in here" }']);

        PeopleApi.all().then((data) => {
            expect(typeof data).toBe('object');
            expect(data.stuff).toBe('is');

            done();
        }).catch(() => {});

        server.respond();

        expect(server.requests.length).toBeGreaterThan(0);
    });

    it('should resolve promise with error', (done) => {
        server.respondWith('GET', '/random');

        PeopleApi.all().then(() => {}).catch((err) => {
            expect(typeof err).toBe('object');
            expect(err.message).toBe('Can\'t parse response from the api.');

            done();
        });

        server.respond();

        expect(server.requests.length).toBeGreaterThan(0);
    });
});
