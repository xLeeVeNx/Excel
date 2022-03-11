export class Observer {
  constructor() {
    this.listeners = {};
  }

  dispatch(eventName = '', ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      console.warn('You need subscribe on event to dispatch something');
      return;
    }
    this.listeners[eventName].forEach((listener) => {
      listener(...args);
    });
  }

  subscribe(eventName = '', callback) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(callback);

    return () => {
      this.listeners[eventName] =
        this.listeners[eventName].filter((listener) => listener !== callback);
    };
  }
}
