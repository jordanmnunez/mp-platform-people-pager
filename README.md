# Platform People Pager
Create a people paging psudeo-class usable for Mixpanel's platform reports

Including the library:
```html
<script src="https://cdn.rawgit.com/jordanmnunez/mp-platform-people-pager/master/peoplepager.js"></script>
```

This will alow you access to the `PeoplePager` constructor:

```js
PeoplePage( Function callable [, String selector [, Function callback]])
```
**Parameters**
- *callable*: a function to be called on for user returned from the request. The user object will be passed in as the first argument of the callable and will be a dictionary of all properties, including $distinct_id.
- *selector*: a string to be included as the selector property of the people query. To query all users set as `null`
- *callback*: a function to be called once the callable has run on every user. No arguments are passed through.

Example:

Treating the constructor as a function you can create a one-off query.

```js
function processUser(user) {
  console.log(user["$distinct_id"]);
}

var selector = '(defined (properties["$name"]))'

function finishedProcessing() {
  console.log('done');
}

PeoplePager(processUser, selector, finishedProcessing);
```
