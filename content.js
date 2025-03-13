function clickSkipButton() {
    // Target both modern and legacy skip buttons
    const skipButton = document.querySelector(".ytp-ad-skip-button, .ytp-ad-skip-button-modern");

    if (!skipButton) {
        console.info("Checked and no Skip Ad button...")
    }
    if (skipButton && skipButton.offsetParent !== null) { // Ensure button is visible
        console.info("YouTube Auto Skipper: Clicking 'Skip Ad' button...");
        skipButton.click();
    }
    const skipButton2 = document.querySelector(".ytp-skip-ad-button");


    if (!skipButton2) {
        console.info("#2 Checked and no Skip Ad button...")
    }
    if (skipButton2 && skipButton2.offsetParent !== null) { // Ensure button is visible
        console.info("#2 YouTube Auto Skipper: Clicking 'Skip Ad' button...");
        skipButton2.click();
    }
}

// Observer to detect when ads are injected
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            clickSkipButton();
        }
    });
});

// Observe changes in the entire document
observer.observe(document.body, { childList: true, subtree: true });

// Extra fallback check every second
setInterval(clickSkipButton, 1000);
