import {isResizeNotAllowed} from '@/components/Table/tableFunctions';

export const tableResize = (event, $root, $target) => {
  return new Promise((resolve) => {
    $target.addClass('active');

    const $resizes = $root.findAll('[data-resize]');
    $resizes.forEach(($resizer) => $resizer.style.display = 'none');

    const $parent = $target.closest('[data-type="resizable"]');

    const coords = $parent.getCoords();
    const resizeType = $target.data.resize;

    let value;
    let $items = [];
    let id = '';
    let start = 0;

    if (resizeType === 'horizontal') {
      id = $parent.data.number;
      $items = $root.findAll(`[data-number="${id}"]`);
      start = event.pageX;
    } else {
      start = event.pageY;
    }

    document.onmousemove = (e) => {
      if (resizeType === 'horizontal') {
        const distance = e.pageX - start;
        if (isResizeNotAllowed($target.getCoords().x, coords.x, 25, distance)) {
          value = 30;
          return;
        }
        $target.css({right: -distance + 'px'});
        value = distance + coords.width;
      } else {
        const distance = e.pageY - start;
        if (isResizeNotAllowed($target.getCoords().y, coords.y, 15, distance)) {
          value = 20;
          return;
        }
        $target.css({bottom: -distance + 'px'});
        value = distance + coords.height;
      }
    };

    document.onmouseup = () => {
      $target.removeClass('active');
      $resizes.forEach(($resizer) => $resizer.style.display = 'block');

      if (resizeType === 'horizontal') {
        $items.forEach(($item) => $item.style.width = value + 'px');
      } else {
        $parent.css({height: value + 'px'});
      }
      $target.css({bottom: '-1px', right: '-1px'});

      resolve({
        value,
        type: resizeType,
        id: $parent.data.number,
      });

      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
};
