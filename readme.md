# Apy

[![Build Status](https://travis-ci.org/goschevski/apy.svg?branch=master)](https://travis-ci.org/goschevski/apy)

Apy is a simple client-side library for making rest api ajax calls.

## Define resource
```javascript
var PeopleApi = new Apy({
    base: '/api/v3/',
    collection: 'people'
});
```

#### All

```javascript
PeopleApi.all(function (err, data) {
    if (!err) {
        console.log(data);
    }
}, { kind: 'nice', job: 'developer' });
```

*GET* request to `/api/v3/people/?kind=nice&job=developer`

#### Find
```javascript
PeopleApi.find(12, function (err, data) {
    if (!err) {
        console.log(data);
    }
}, { job: 'developer' });
```

*GET* request to `/api/v3/people/12?job=developer`

#### Save
```javascript
PeopleApi.save(obj, function (err, data) {
    if (!err) {
        console.log(data);
    }
}, { job: 'developer' });
```

*POST* request to `/api/v3/people/?job=developer`

#### Update
```javascript
PeopleApi.update(12, { job: 'designer' }, function (err, data) {
    if (!err) {
        console.log(data);
    }
}, { changed: 'job' });
```

*PUT* request to `/api/v3/people/12?changed=job`

#### Destroy
```javascript
PeopleApi.destroy(12, function (err, data) {
    if (!err) {
        console.log(data);
    }
}, { soft: true });
```

*DELETE* request to `/api/v3/people/12?soft=true`

## Extend
```javascript
Apy.prototype.remove = function (id, cb, params) {
    this.destroy(id, cb, params);
};


var api = new Apy({ collection: 'developers' });
api.remove('goschevski', function (err, data) {});
```

*DELETE* request to `/developers/goschevski`
