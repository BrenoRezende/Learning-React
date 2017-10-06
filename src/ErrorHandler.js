import PubSub from 'pubsub-js';

export default class ErrorHandler {
    publishErrors(errors) {
        for (var i = 0; i < errors.length; i++) {
            PubSub.publish('form-error', errors[i]);
        }
    }
}
