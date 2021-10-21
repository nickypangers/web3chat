import store from "../store";

const processCommand = (commandResponse) => {
  switch (commandResponse.command) {
    case "/address":
      store.commit("setAddress", commandResponse.data);
      return;
    default:
      return;
  }
};

export const processMessage = (msg) => {
  let msgObject = JSON.parse(msg);

  if (msgObject.messageType == 0) {
    processCommand(msgObject.data);
    return;
  }

  store.commit("pushToChatMessageList", msgObject);
};
