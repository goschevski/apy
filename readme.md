# Apy

[![Build Status](https://travis-ci.org/goschevski/apy.svg?branch=master)](https://travis-ci.org/goschevski/apy)

Apy is a simple client-side library for making ajax rest api calls.

### Example

```
var PeopleApi = new Apy({
    base: '/api/v3/',
    collection: 'people'
});

// Get all
PeopleApi.all(function (err, data) {
    if (!err) {
        console.log(data);
    }
});

// Get one
PeopleApi.find(id, function (err, data) {
    if (!err) {
        console.log(data);
    }
});

// Save
PeopleApi.save(obj, function (err, data) {
    if (!err) {
        console.log(data);
    }
});

// Update
PeopleApi.update(id, obj, function (err, data) {
    if (!err) {
        console.log(data);
    }
});

// Destroy
PeopleApi.destroy(id, function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```