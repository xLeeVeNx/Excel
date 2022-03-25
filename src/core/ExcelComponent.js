import {DOMListener} from './DOMListener';

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.name, options.listeners);

    this.unsubscribes = [];
    this.observer = options.observer;

    this.storeSubscribe = null;
    this.subscribes = options.subscribes || [];
    this.store = options.store;

    this.prepare();
  }

  prepare() {
  }

  $emit(eventName, ...args) {
    this.observer.dispatch(eventName, ...args);
  }

  $on(eventName, callback) {
    const unsubscribe = this.observer.subscribe(eventName, callback);
    this.unsubscribes.push(unsubscribe);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(callback) {
    this.storeSubscribe = this.store.subscribe(callback);
  }

  storeChanged() {

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
    this.storeSubscribe.unsubscribe();
  }
}
