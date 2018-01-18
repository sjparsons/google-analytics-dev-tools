import mockEvents from './__data__/initEvents.dev.data';

export function initEvents(receivedEventCallback) {
    let nextToAdd = 0
    receivedEventCallback(mockEvents[nextToAdd]);
    return setInterval(() => {
        nextToAdd = (nextToAdd + 1) % mockEvents.length;
        receivedEventCallback(mockEvents[nextToAdd]);
    }, 5000);
}

export function stopEvents(timeout) {
    clearInterval(timeout);
}
