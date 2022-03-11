import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.name, options.listeners);

    this.unsubscribes = [];
    this.observer = options.observer;
    this.prepare();
  }

  prepare() {
  }

  $dispatch(eventName, ...args) {
    this.observer.dispatch(eventName, ...args);
  }

  $on(eventName, callback) {
    const unsubscribe = this.observer.subscribe(eventName, callback);
    this.unsubscribes.push(unsubscribe);
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
  }
}
