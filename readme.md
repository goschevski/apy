# Apy

[![Build Status](https://travis-ci.org/goschevski/apy.svg?branch=master)](https://travis-ci.org/goschevski/apy)

Apy is a simple client-side library for making rest api ajax calls.

## Define resource
```javascript
var PeopleApi = new Apy({
    base: '/api/v3/people'
});
```

#### All

```javascript
PeopleApi.all({ kind: 'nice', job: 'developer' }, function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```

*GET* request to `/api/v3/people/?kind=nice&job=developer`

```javascript
PeopleApi.all(function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```

*GET* request to `/api/v3/people/`

#### Find
```javascript
PeopleApi.find(12, { job: 'developer' }, function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```

*GET* request to `/api/v3/people/12?job=developer`

```javascript
PeopleApi.find(12, function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```

*GET* request to `/api/v3/people/12`

#### Save
```javascript
PeopleApi.save(obj, { job: 'developer' }, function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```

*POST* request to `/api/v3/people/?job=developer`

```javascript
PeopleApi.save(obj, function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```

*POST* request to `/api/v3/people/`

#### Update
```javascript
PeopleApi.update(12, { job: 'designer' }, { changed: 'job' }, function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```

*PUT* request to `/api/v3/people/12?changed=job`

```javascript
PeopleApi.update(12, { job: 'designer' }, function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```

*PUT* request to `/api/v3/people/12`

#### Destroy
```javascript
PeopleApi.destroy(12, { soft: true }, function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```

*DELETE* request to `/api/v3/people/12?soft=true`

```javascript
PeopleApi.destroy(12, function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```

*DELETE* request to `/api/v3/people/12`

## Extend
```javascript
Apy.prototype.remove = function (id, params, cb) {
    this.destroy(id, params, cb);
};


var api = new Apy();
api.remove('goschevski', function (err, data) {});
```

*DELETE* request to `/goschevski`
