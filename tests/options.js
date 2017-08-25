describe('Apy options', () => {
    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    it('should append slash to base if there is a need', () => {
        const api = new Apy({ base: '/api' });
        const api2 = new Apy({ base: '/api/' });
        expect(api.base).toEqual('/api/');
        expect(api2.base).toEqual('/api/');
    });

    it('should not append slash to base', () => {
        const api = new Apy({ base: '/api', appendSlash: false });
        const api2 = new Apy({ base: '/api/' });
        expect(api.base).toEqual('/api');
        expect(api2.base).toEqual('/api/');
    });

    it('should have a default base', () => {
        const api = new Apy();
        expect(api.base).toEqual('/');
    });

    describe('Extend', () => {
        it('should be extensible', () => {
            // extend
            Apy.prototype.remove = function (id, params, cb) {
                this.destroy(id, params, cb);
            };

            // instance for testing
            const api = new Apy();
            api.remove('goschevski', () => {});

            // test
            expect(jasmine.Ajax.requests.mostRecent().method).toBe('DELETE');
            expect(jasmine.Ajax.requests.mostRecent().url).toBe('/goschevski');
        });
    });
});