if (process.env.NODE_ENV === 'development') {
    const {initEvents, stopEvents} = require('./initEvents.dev.js')
    module.exports = {initEvents, stopEvents};
} else {
    const {initEvents, stopEvents} = require('./initEvents.prod.js')
    module.exports = {initEvents, stopEvents};
}

