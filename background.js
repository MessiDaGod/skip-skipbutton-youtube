// background.js

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "skipAd" && sender.tab) {
      const tabId = sender.tab.id;

      chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: skipAdInPage
      });
    }
  });

  function skipAdInPage() {
    const skipButton = document.querySelector(".ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button");
    if (skipButton && skipButton.offsetParent !== null) {
      console.info("YouTube Auto Skipper: Clicking 'Skip Ad' button...");

      skipButton.dispatchEvent(new Event("pointerdown", { bubbles: true }));
      skipButton.dispatchEvent(new Event("pointerup", { bubbles: true }));
      skipButton.dispatchEvent(new Event("click", { bubbles: true, cancelable: true }));
    }
  }
