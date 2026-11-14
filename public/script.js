const IMAGES_DIR = "assets/img/";
const IMAGES = [
  IMAGES_DIR + "jeff1.jpg",
  IMAGES_DIR + "jeff2.jpg",
  IMAGES_DIR + "jeff3.jpg",
  IMAGES_DIR + "jeff4.jpg",
  IMAGES_DIR + "jeff5.jpg",
];

// Preload so the image is already cached when the card slides off it.
IMAGES.forEach((src) => { new Image().src = src; });

function dragCard() {

  const card = document.getElementById("card-container");
  const under = document.getElementById("card-under");
  const laugh = document.getElementById("laugh");
  const SNAP_RADIUS_PX = 40;

  let offsetX = 0, offsetY = 0; // current distance from home
  let lastX = 0, lastY = 0;     // pointer position at the last event
  let dragging = false;
  let away = false;
  let imageIndex = 0;

  function showNextImage() {
    under.style.backgroundImage = `url("${IMAGES[imageIndex]}")`;
    imageIndex = (imageIndex + 1) % IMAGES.length;
  }

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

    // Card has left its home area: start the laugh track.
    if (!away && Math.hypot(offsetX, offsetY) > SNAP_RADIUS_PX && laugh.paused) {
      away = true;
      showNextImage();
      laugh.play().catch(() => {}); // ignore if the browser blocks it
    }
  });

  function release() {
    if (!dragging) return;
    dragging = false;
    if (Math.hypot(offsetX, offsetY) <= SNAP_RADIUS_PX) {
      offsetX = 0;
      offsetY = 0;
      away = false; // new image for next card leave.
      card.classList.add("snapping");
      card.style.translate = "0px 0px";

      // Card is back home: stop the laugh track and rewind it.
      laugh.pause();
      laugh.currentTime = 0;
    }
  }

  card.addEventListener("pointerup", release);
  card.addEventListener("pointercancel", release);
}

dragCard();
