let skipButtonPreviouslyFound = false;

function simulateRealClick(element) {
  const rect = element.getBoundingClientRect();
  const clientX = rect.left + rect.width / 2;
  const clientY = rect.top + rect.height / 2;
  const events = [
    new PointerEvent("pointerdown", { bubbles: true, cancelable: true, clientX, clientY }),
    new PointerEvent("pointerup", { bubbles: true, cancelable: true, clientX, clientY }),
    new MouseEvent("click", { bubbles: true, cancelable: true, clientX, clientY, view: window }),
  ];
  events.forEach(event => element.dispatchEvent(event));
}

function clickSkipButton() {
  const skipButtons = document.querySelectorAll(".ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button");
  if (skipButtons.length === 0) {
    if (skipButtonPreviouslyFound) {
      console.info("Skip Ad button removed.");
      skipButtonPreviouslyFound = false;
    }
    return;
  }
  if (!skipButtonPreviouslyFound) {
    console.info("Skip Ad button detected.");
    skipButtonPreviouslyFound = true;
  }
  skipButtons.forEach(button => {
    if (button.offsetParent !== null && !button.disabled) {
      console.info("YouTube Auto Skipper: Clicking 'Skip Ad' button...");
      simulateRealClick(button);
    }
  });
}

const observer = new MutationObserver(() => clickSkipButton());
observer.observe(document.body, { childList: true, subtree: true });
setInterval(clickSkipButton, 1000);