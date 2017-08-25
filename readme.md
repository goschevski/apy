# Apy

[![Build Status](https://travis-ci.org/goschevski/apy.svg?branch=master)](https://travis-ci.org/goschevski/apy)

Apy is a simple client-side library for making REST API AJAX calls.
It supports both callback and promises.

## API

### all ([params], [callback])

#### Params
- **params** *(object)*: serialized and appended as a querystring to the url
- **callback** *(function)*: triggered when the request is done

#### Returns
- **promise**: Returns the Promise.

### find (id, [params], [callback])

#### Params
- **id** *(string|number)*: id of resource appended to the url
- **params** *(object)*: serialized and appended as a querystring to the url
- **callback** *(function)*: triggered when the request is done

#### Returns
- **promise**: Returns the Promise.

### save (data, [params], [callback])

#### Params
- **data** *(object)*: sent as body of the request
- **params** *(object)*: serialized and appended as a querystring to the url
- **callback** *(function)*: triggered when the request is done

#### Returns
- **promise**: Returns the Promise.

### update (id, data, [params], [callback])

#### Params
- **id** *(string|number)*: id of resource appended to the url
- **data** *(object)*: sent as body of the request
- **params** *(object)*: serialized and appended as a querystring to the url
- **callback** *(function)*: triggered when the request is done

#### Returns
- **promise**: Returns the Promise.

### destroy (id, [params], [callback])

#### Params
- **id** *(string|number)*: id of resource appended to the url
- **params** *(object)*: serialized and appended as a querystring to the url
- **callback** *(function)*: triggered when the request is done

#### Returns
- **promise**: Returns the Promise.


## Examples

## First define resource
```javascript
var PeopleApi = new Apy({
    base: '/api/v3/people'
});
```

#### So let's fetch all nice developers

```javascript
PeopleApi.all({ kind: 'nice', job: 'developer' }, function (err, data) {
    if (!err) {
        console.log(data);
    }
});
```

*GET* request to `/api/v3/people/?kind=nice&job=developer`

#### Or we can fetch all developers even if they are not nice...

```javascript
PeopleApi.all().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});
```

