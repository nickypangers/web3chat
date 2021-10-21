let isDev = true;

export const websocketURL = (address) =>
  isDev
    ? "ws://" + window.location.hostname + ":3000/ws?address=" + address
    : "ws://gowschatserver.herokuapp.com/ws?address=" + address;
