function dragCard() {
  const card = document.getElementById("card-container");
  const SNAP_RADIUS_PX = 40;

  let offsetX = 0, offsetY = 0; // current distance from home
  let lastX = 0, lastY = 0;     // pointer position at the last event
  let dragging = false;

  card.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    card.setPointerCapture(e.pointerId); // keep receiving events even if the pointer leaves the card
    card.classList.remove("snapping");   // no easing while dragging
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  card.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    offsetX += e.clientX - lastX;
    offsetY += e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    card.style.translate = `${offsetX}px ${offsetY}px`;
  });

  function release() {
    if (!dragging) return;
    dragging = false;
    if (Math.hypot(offsetX, offsetY) <= SNAP_RADIUS_PX) {
      offsetX = 0;
      offsetY = 0;
      card.classList.add("snapping");
      card.style.translate = "0px 0px";
    }
  }

  card.addEventListener("pointerup", release);
  card.addEventListener("pointercancel", release);
}

dragCard();
