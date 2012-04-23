/*
 * Core class to handle all module interactions through
 * a Publish-Subscribe event system.
 *
 * @author Esteban Abait <estebanabait@gmail.com>
 */

define(function () {

    var Publisher = {

        subscribe: function(channel, fn, context) {
            this.channels = this.channels || {};

            if (!this.channels[channel]) {
                this.channels[channel] = [];
            }
            this.channels[channel].push({
                context: (context || this),
                callback: fn
            });

            return this;
        },

        unsubscribe: function(channel, fn) {
            var i, l, elem, list;

            if (!this.channels) {
                return false;
            }

            list = this.channels[channel];

            if (!list) {
                return false;
            }

            for (i = 0, l = list.length; i < l; i++) {
                elem = list[i].callback;
                if (elem === fn) {
                    list.splice(i);
                    break;
                }
            }

            return this;
        },

        publish: function(channel){
            if (!this.channels || !this.channels[channel]) {
                return false;
            }

            //to get any additional parameter passed to the function
            var args = Array.prototype.slice.call(arguments, 1);

            for (var i = 0, l = this.channels[channel].length; i < l; i++) {
                var subscription = this.channels[channel][i];
                subscription.callback.apply(subscription.context, args);
            }

            return this;
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
