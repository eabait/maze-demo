//Generic publisher object
//Observer pattern implementation
//based on JavaScript Patterns (Stefanov,2010)

define(function () {
    
    var Publisher = {
        
        subscribers: {
            any: []
        },
        
        subscribe: function(fn, type) {
            type = type || 'any';
            if (typeof this.subscribers[type] === 'undefined') {
                this.subscribers[type] = [];
            }
            this.subscribers[type].push(fn);
        },
        
        unsubscribe: function(fn, type) {
            this.visitSubscribers('unsubscribe', fn, type);
        },
        
        publish: function(publication, type) {
            this.visitSubscribers('publish', publication, type);
        },
        
        visitSubscribers: function(action, arg, type) {
            var pubType = type || 'any',
            subscribers = this.subscribers[pubType],
            i,
            max = subscribers.length;
            for (i=0; i < max; i+= 1) {
                if (action === 'publish') {
                    subscribers[i](arg);
                } else {
                    if (subscribers[i] === arg) {
                        subscribers.splice(i, 1);
                    }
                }
            }
        },
        
        /**
         * This function is used to copy the Publisher
         * methods to an object o which has to be able
         * to notify events
         */
        makePublisher : function(o) {
            var i;
            for (i in Publisher) {
                if (Publisher.hasOwnProperty(i) && typeof Publisher[i] === 'function') {
                    o[i] = Publisher[i];
                }
            }
            o.subscribers = {
                any:[]
            };
        }
    };
    
    return Publisher;
});
