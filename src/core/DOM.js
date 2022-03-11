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

  text(text) {
    if (typeof text === 'string') {
      this.nativeElement.textContent = text;

      return this;
    }

    return this.nativeElement.textContent;
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

  closest(selector) {
    return $(this.nativeElement.closest(selector));
  }

  getCoords() {
    return this.nativeElement.getBoundingClientRect();
  }

  find(selector) {
    return $(this.nativeElement.querySelector(selector));
  }

  findAll(selector) {
    return this.nativeElement.querySelectorAll(selector);
  }

  css(styles) {
    for (const key in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, key)) {
        this.nativeElement.style[key] = styles[key];
      }
    }

    return $(this.nativeElement);
  }

  addClass(className = '') {
    this.nativeElement.classList.add(className);
    return this;
  }

  removeClass(className = '') {
    this.nativeElement.classList.remove(className);
    return this;
  }

  hasClass(className = '') {
    return this.nativeElement.classList.contains(className);
  }

  focus() {
    this.nativeElement.focus();
    return this;
  }

  id(parse = false) {
    if (parse) {
      const parsed = this.id().split(':'); // ['A', '1']; ['C', '8']; ...

      return {
        column: parsed[0].charCodeAt(0), // 65; 68; ...
        row: +parsed[1],
      };
    }

    return this.data.id;
  }

  get data() {
    return this.nativeElement.dataset;
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
