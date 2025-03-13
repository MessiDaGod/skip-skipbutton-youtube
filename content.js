let skipButtonPreviouslyFound = false;

function findSkipButton() {
  const skipButtons = document.querySelectorAll(".ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button");

  if (skipButtons.length === 0) {
    if (skipButtonPreviouslyFound) {
      console.info("Skip Ad button removed.");
      skipButtonPreviouslyFound = false;
    }
    return null;
  }

  if (!skipButtonPreviouslyFound) {
    console.info("Skip Ad button detected.");
    skipButtonPreviouslyFound = true;
  }

  for (const button of skipButtons) {
    if (button.offsetParent !== null && !button.disabled) {
      console.info("YouTube Auto Skipper: Clicking 'Skip Ad' button...");

      // Dispatch real click events
      button.dispatchEvent(new Event("pointerdown", { bubbles: true }));
      button.dispatchEvent(new Event("pointerup", { bubbles: true }));
      button.dispatchEvent(new Event("click", { bubbles: true, cancelable: true }));

      return true;
    }
  }
  return false;
}

function checkAndSend() {
  if (!chrome.runtime?.id) return; // Ensure extension is running
  const found = findSkipButton();
  if (found) {
    try {
      chrome.runtime.sendMessage({ action: "skipAd" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Send message failed:", chrome.runtime.lastError.message);
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
}

// Observe changes in YouTube's DOM
const observer = new MutationObserver(checkAndSend);
observer.observe(document.body, { childList: true, subtree: true });

// Extra fallback check every second
setInterval(checkAndSend, 1000);
