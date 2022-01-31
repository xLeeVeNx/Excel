import {capitalize} from '@/core/utils';

export class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('$root doesn\'t provided for DOMListener.js');
    }

    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const callbackName = getCallbackName(listener);
      if (!this[callbackName]) {
        throw new Error(
          `method ${callbackName} is not implemented in ${this.name}.js`,
        );
      }
      this.$root.on(listener, this[callbackName].bind(this));
    });
  }

  removeDOMListeners() {
    this.$root.off(this.listeners);
  }
}

function getCallbackName(name) {
  return 'on' + capitalize(name);
}
