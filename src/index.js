const TIMEOUT = 1100;

export const sendMessage = function ({
  message,
  targetOrigin,
  timeout = TIMEOUT,
}) {
  let _window = window.open(targetOrigin, "_blank");
  setTimeout(() => {
    _window.postMessage(message, targetOrigin);
  }, timeout);
};

export const sendMessageWithPolling = function ({
  message,
  targetOrigin,
  max = 10,
  interval = TIMEOUT,
}) {
  let _window = window.open(targetOrigin, "_blank");
  let i = 1;
  let timer = setInterval(() => {
    if (i > max) {
      clearInterval(timer);
      return;
    }
    i++;
    _window.postMessage(message, targetOrigin);
  }, interval);
};

export const dispatchEvent = function (
  licensedOrigin,
  callback,
  errorCallback
) {
  window.addEventListener("message", receiveMessage, false);
  function receiveMessage(event) {
    var origin = event.origin || event.originalEvent.origin;
    try {
      const type = typeof licensedOrigin;
      if (type == "string" && licensedOrigin == origin) {
        callback(event);
      } else if (
        type == "object" &&
        Array.isArray(licensedOrigin) &&
        licensedOrigin.indexOf(origin) > -1
      ) {
        callback(event);
      } else {
        errorCallback(new Error("parameter error"));
      }
    } catch (error) {
      errorCallback(error);
    }
  }
};
export default {
  sendMessage,
  dispatchEvent,
  sendMessageWithPolling,
};
