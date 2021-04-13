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
      interval: 1500, // 轮询间隔
      maxPolls: 10, // 最多轮询次数(达到轮询次数之后无论是否收到信息都将终止发送)
    },
    options
  );
}
WingPostMessage.prototype.sendMessage = function ({
  message,
  targetOpeningUrl,
  targetOrigin,
}) {
  let _window = window.open(targetOpeningUrl, "_blank");
  const { interval, maxPolls } = this.options;
  let i = 1;
  // 轮询发送信息
  let timer = setInterval(() => {
    if (i > maxPolls) {
      clearInterval(timer);
      return;
    }
    i++;
    _window.postMessage(message, targetOrigin);
  }, interval);
  // 收到回复后终止轮询
  this.dispatchEvent(targetOrigin, () => {
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
