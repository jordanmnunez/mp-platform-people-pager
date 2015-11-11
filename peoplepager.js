var PeoplePager = function(callable, selector, callback) {
    if (this instanceof PeoplePager) {
        if (typeof callable === 'function') {
            this.callable = callable;
        } else {
            throw "callable is not a function";
        }
        if (typeof selector === 'string' && selector) {
            this.selector = selector;
        }
        this.callback = callback;
        this.counter = 0;
        this.page = 0;
        this._init();
    } else {
        return new PeoplePager(callable, selector, callback);
    }
}

PeoplePager.prototype = {
    constructor: PeoplePager,
    _init: function() {
        this._query();
    },
    _query: function() {
        defered = $.Deferred();
        var p = {}
        if (this.page > 0) {
            p.page = this.page;
        }
        if (this.sessionId) {
            p.session_id = this.sessionId;
        }
        if (this.selector) {
            p.selector = this.selector;
        }
        var that = this;
        MP.api.people(p).pipe(function(d){that._process(d.json, defered)});
        defered.done(function(){that._page()})
    },
    _process: function(data, defered) {
        if (this.page === 0) {
            this.sessionId = data.session_id;
            this.total = data.total
        }
        this.lastDataLength = data.results.length;
        data.results.length
        for (var i=0; i < data.results.length; i++) {
            data.results[i]["$properties"]["$distinct_id"] = data.results[i]["$distinct_id"]
            this.callable(data.results[i]["$properties"]);
            this.counter += 1
        }
        this.lastDataLength = data.results.length
        defered.resolve();
    },
    _page: function(){
        if (this.lastDataLength === 1000) {
            this.page += 1;
            this._query();
        } else {
            if (this.callback !== undefined) {
                if (typeof this.callback === 'function') {
                    this.callback();
                } else {
                    throw "callback is not a function";
                }
            }
        }
    }
}
