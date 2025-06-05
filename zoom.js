document.querySelectorAll('.zoomable').forEach(img => {
  let scale = 1;
  const scaleStep = 0.1;
  const maxScale = 3;
  const minScale = 1;

  img.addEventListener('wheel', e => {
    e.preventDefault();
    const rect = img.getBoundingClientRect();

    // Posición del cursor dentro de la imagen
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Cambiar escala según dirección scroll
    if (e.deltaY < 0) {
      // Zoom in
      scale = Math.min(scale + scaleStep, maxScale);
    } else {
      // Zoom out
      scale = Math.max(scale - scaleStep, minScale);
    }

    // Aplicar transform origin para que el zoom se centre en cursor
    const originX = (offsetX / rect.width) * 100;
    const originY = (offsetY / rect.height) * 100;
    img.style.transformOrigin = `${originX}% ${originY}%`;

    // Aplicar escala
    img.style.transform = `scale(${scale})`;

    // Cambiar cursor si está zoomed o no
    if (scale > 1) {
      img.classList.add('zoomed');
    } else {
      img.classList.remove('zoomed');
    }
  });

  // Al hacer clic, resetear zoom
  img.addEventListener('click', () => {
    scale = 1;
    img.style.transform = 'scale(1)';
    img.classList.remove('zoomed');
  });
});
