function dragCard() {
  let cardElement = document.getElementById("card-container");
  let newX = 0, newY = 0, currX = 0, currY = 0;

  cardElement.onmousedown = (e) => {
    e = e || window.event;
    e.preventDefault();
    currX = e.clientX;
    currY = e.clientY;

    // Stop drag on mouse up.
    document.onmouseup = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      return;
    };

    // While mouse down and moving, calculate new coordinates.
    document.onmousemove = (e) => {
      e = e || window.event;
      e.preventDefault();

      newX = currX - e.clientX;
      newY = currY - e.clientY;
      currX = e.clientX;
      currY = e.clientY;

      cardElement.style.top = (cardElement.offsetTop - newY) + "px";
      cardElement.style.left = (cardElement.offsetLeft - newX) + "px";
    };
  };
}

dragCard();
