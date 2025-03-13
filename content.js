function clickSkipButton() {
    const skipButton = document.querySelector(".ytp-ad-skip-button, .ytp-ad-skip-button-modern");
    if (skipButton) {
      console.info("YouTube Auto Skipper: Clicking Skip Ad button...");
      skipButton.click();
    }
  }

  // Run immediately and check every second for new ads
  setInterval(clickSkipButton, 1000);
