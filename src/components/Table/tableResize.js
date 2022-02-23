export const tableResize = (event, $root, $target) => {
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
      if ($target.getCoords().x - coords.x < 25 && distance < 0) {
        value = 30;
        return;
      }
      $target.css({right: -distance + 'px'});
      value = distance + coords.width;
    } else {
      const distance = e.pageY - start;
      if ($target.getCoords().y - coords.y < 15 && distance < 0) {
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

    document.onmousemove = null;
    document.onmouseup = null;
  };
};
