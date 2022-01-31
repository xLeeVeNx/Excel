class DOM {
  constructor(selector) {
    this.nativeElement = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;

    this.$$listeners = {};
  }

  html(html) {
    if (typeof html === 'string') {
      this.nativeElement.innerHTML = html;

      return this;
    }

    return this.nativeElement.outerHTML.trim();
  }

  clear() {
    this.nativeElement.html('');

    return this;
  }

  append(node) {
    if (node instanceof DOM) {
      node = node.nativeElement;
    }

    if (Element.prototype.append) {
      this.nativeElement.append(node);
    } else {
      this.nativeElement.appendChild(node);
    }

    return this;
  }

  on(eventType, callback) {
    this.$$listeners[eventType] = callback;
    this.nativeElement.addEventListener(eventType, callback);
  }

  off(eventTypes) {
    eventTypes.forEach((eventType) => {
      this.nativeElement.removeEventListener(
        eventType, this.$$listeners[eventType],
      );
    });
  }
}

export function $(selector) {
  return new DOM(selector);
}

$.create = (tagName, classNames) => {
  const nativeElement = document.createElement(tagName);

  if (classNames) {
    nativeElement.classList.add(classNames);
  }

  return $(nativeElement);
};
