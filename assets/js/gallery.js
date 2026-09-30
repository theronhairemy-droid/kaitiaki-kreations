// Lightbox gallery: click a thumbnail to view full-size,
// arrow keys / on-screen buttons to move, Esc to close.
(function () {
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.thumb'));
  var box = document.getElementById('lightbox');
  var img = document.getElementById('lbImg');
  var cap = document.getElementById('lbCap');
  var idx = 0;

  function show(i) {
    idx = (i + thumbs.length) % thumbs.length;
    var t = thumbs[idx];
    img.src = t.getAttribute('data-full');
    img.alt = t.querySelector('img').alt;
    cap.textContent = t.getAttribute('data-title');
  }

  function open(i) {
    show(i);
    box.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('lbClose').focus();
  }

  function close() {
    box.hidden = true;
    document.body.style.overflow = '';
    img.src = '';
  }

  thumbs.forEach(function (t, i) {
    t.addEventListener('click', function () { open(i); });
  });

  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', function (e) { e.stopPropagation(); show(idx - 1); });
  document.getElementById('lbNext').addEventListener('click', function (e) { e.stopPropagation(); show(idx + 1); });

  box.addEventListener('click', function (e) {
    if (e.target === box) close();
  });

  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });
})();
