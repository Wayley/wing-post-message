const TIMEOUT = 1100;

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

export const sendMessageWithPolling = function ({
  message,
  targetOrigin,
  max = 10,
  timeout = TIMEOUT,
}) {
  let _window = window.open(targetOrigin, "_blank");
  let i = 0;
  setTimeout(() => {
    _window.postMessage(message, targetOrigin);
  }, timeout);
  let timer = setInterval(() => {
    if (i > max) {
      clearInterval(timer);
      return;
    }
    i++;
    _window.postMessage(message, targetOrigin);
  }, timeout);
};
export default {
  sendMessage,
  dispatchEvent,
  sendMessageWithPolling,
};