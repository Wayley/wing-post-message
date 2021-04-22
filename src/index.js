export const sendMessage = function (message, targetOrigin, TIMEOUT = 1100) {
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
  timeout = 1100,
}) {
  let _window = window.open(targetOrigin, "_blank");
  let i = 0;
  let timer = setInterval(() => {
    if (i > max) {
      clearInterval(timer);
      return;
    }
    i++;
    _window.postMessage(message, targetOrigin);
  }, timeout);
};

function WingPostMessage(options) {
  this.options = Object.assign(
    {
      interval: 1100, // 轮询间隔
      maxPolls: 100, // 最多轮询次数(达到轮询次数之后无论是否收到信息都将终止发送)
    },
    options
  );
}
WingPostMessage.prototype.sendMessage = function ({
  targetPage,
  message,
  targetOrigin,
}) {
  let popup = window.open(targetPage, "_blank");
  const { interval } = this.options;
  let timer = setInterval(() => {
    popup.postMessage(message, targetOrigin);
  }, interval);
  this.dispatchEvent([targetOrigin], (event) => {
    clearInterval(timer);
  });
};
WingPostMessage.prototype.dispatchEvent = function (licensedOrigin, callback) {
  window.addEventListener("message", receiveMessage, false);
  function receiveMessage(event) {
    var origin = event.origin || event.originalEvent.origin;
    if (licensedOrigin == origin || licensedOrigin.indexOf(origin) > -1) {
      callback && callback(event);
    }
  }
};
export { WingPostMessage };
export default WingPostMessage;
