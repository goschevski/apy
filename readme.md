# Apy

[![Build Status](https://travis-ci.org/goschevski/apy.svg?branch=master)](https://travis-ci.org/goschevski/apy)

Apy is a simple client-side library for making ajax rest api calls.

### Define resource
```
var PeopleApi = new Apy({
    base: '/api/v3/',
    collection: 'people'
});
```

#### All

```
PeopleApi.all(function (err, data) {
    if (!err) {
        console.log(data);
    }
}, { kind: 'nice', job: 'developer' });
```

**GET** request to `/api/v3/people/?kind=nice&job=developer`

#### Find
```
PeopleApi.find(12, function (err, data) {
    if (!err) {
        console.log(data);
    }
}, { job: 'developer' });
```

**GET** request to `/api/v3/people/12?job=developer`

#### Save
```
PeopleApi.save(obj, function (err, data) {
    if (!err) {
        console.log(data);
    }
}, { job: 'developer' });
```

**POST** request to `/api/v3/people/?job=developer`

#### Update
```
PeopleApi.update(12, { job: 'designer' }, function (err, data) {
    if (!err) {
        console.log(data);
    }
}, { changed: 'job' });
```

**PUT** request to `/api/v3/people/12?changed=job`

#### Destroy
```
PeopleApi.destroy(12, function (err, data) {
    if (!err) {
        console.log(data);
    }
}, { soft: true });
```

**DELETE** request to `/api/v3/people/12?soft=true`