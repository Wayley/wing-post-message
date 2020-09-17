const TIMEOUT = 1000;

export const sendMessage = function (message, targetOrigin) {
  let _window = window.open(targetOrigin, "_blank");
  let _message = JSON.stringify(message);
  setTimeout(() => {
    _window.postMessage(_message, targetOrigin);
  }, TIMEOUT);
};
export const dispatchEvent = function (origin, callback) {
  window.addEventListener("message", receiveMessage, false);
  function receiveMessage(event) {
    var _origin = event.origin || event.originalEvent.origin;
    if (_origin == origin) {
      callback(event);
    }
  }
};
export default {
  sendMessage,
  dispatchEvent,
};
