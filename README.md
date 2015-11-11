# Platform People Pager
Create a people paging psudeo-class usable for Mixpanel's platform reports

Include this in your platform report:
```
<script src="https://cdn.rawgit.com/jordanmnunez/mp-platform-people-pager/master/peoplepager.js"></script>
```

To use this constructor you can treat it as a function passing through a function that is called on ever user object, a selector for the engage query, and callback function to fire when all users have been processed.

```
function processUser(user) {
  doThisOnEach(user);
}

var selector = '(defined (properties["$name"]))'

function finishedProcessing() {
  console.log('done');
}

PeoplePager(processUser, selector, finishedProcessing);
```
