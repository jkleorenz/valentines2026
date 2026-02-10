(function () {
  "use strict";

  const btnYes = document.getElementById("btnYes");
  const btnNo = document.getElementById("btnNo");
  const responseEl = document.getElementById("response");
  const actions = document.querySelector(".actions");

  if (!btnYes || !btnNo || !responseEl || !actions) return;

  // No button runs away from cursor: track position with inline style
  let noPosition = { x: 0, y: 0 };
  const RUN_DISTANCE = 80;
  const BOUNDS = { x: 120, y: 60 }; // max movement from center

  function getPointerPosition(e) {
    return { x: e.clientX, y: e.clientY };
  }

  function moveNoAway(pointerX, pointerY) {
    const rect = btnNo.getBoundingClientRect();
    const noCenterX = rect.left + rect.width / 2;
    const noCenterY = rect.top + rect.height / 2;

    const dx = noCenterX - pointerX;
    const dy = noCenterY - pointerY;
    const dist = Math.hypot(dx, dy);

    if (dist < RUN_DISTANCE && dist > 5) {
      const angle = Math.atan2(dy, dx);
      const moveX = Math.cos(angle) * (RUN_DISTANCE - dist);
      const moveY = Math.sin(angle) * (RUN_DISTANCE - dist);

      noPosition.x = Math.max(-BOUNDS.x, Math.min(BOUNDS.x, noPosition.x + moveX));
      noPosition.y = Math.max(-BOUNDS.y, Math.min(BOUNDS.y, noPosition.y + moveY));

      btnNo.style.transform = `translate(${noPosition.x}px, ${noPosition.y}px)`;
    }
  }

  document.addEventListener("mousemove", function (e) {
    moveNoAway(e.clientX, e.clientY);
  });

  document.addEventListener("touchmove", function (e) {
    if (e.touches.length) {
      const t = e.touches[0];
      moveNoAway(t.clientX, t.clientY);
    }
  }, { passive: true });

  btnYes.addEventListener("click", function () {
    responseEl.textContent = "Yay! Happy Valentine's Day! 💕";
    responseEl.classList.remove("hidden");
    btnNo.style.display = "none";
  });

  btnNo.addEventListener("click", function () {
    responseEl.textContent = "The No button is shy... try Yes! 😊";
    responseEl.classList.remove("hidden");
  });
})();
