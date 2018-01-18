/*global chrome*/

export function initEvents(receivedEventCallback) {
    const listener = createListener(receivedEventCallback);
    chrome.devtools.network.onRequestFinished.addListener(listener);
    return listener;
}

export function stopEvents(listener) {
    chrome.devtools.network.onRequestFinished.removeListener(listener);
}

const ANALYTICS_URL_MATCH = new RegExp('google-analytics.com(/r)?/collect')

function createListener(receivedEventCallback) {
    return (request) => {
        if (ANALYTICS_URL_MATCH.test(request.request.url)) {
            receivedEventCallback(
                transformRequestToEvent(request)
            );
        }
    }
}

function transformRequestToEvent(request) {
    const event = {};
    // Put the query string params as attributes
    request.request.queryString
        .sort((a, b) => a.name - b.name)
        .forEach(({name, value}) => {
            event[name] = decodeURIComponent(value)
        });
    // Save original request:
    event._request = request;
    return event;
}


