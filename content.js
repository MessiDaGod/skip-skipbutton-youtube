function detectAndSkipAd() {
    const video = document.querySelector("video");
    const adContainer = document.querySelector(".ytp-ad-player-overlay-layout"); // Ad indicator

    if (video && adContainer && adContainer.offsetParent !== null) {
        console.info("YouTube Auto Skipper: Ad detected. Skipping...");
        video.currentTime = video.duration; // Jump to end of ad
    }
}

function removeYouTubePopups() {
    const popupContainer = document.querySelector("ytd-popup-container");
    const promoRenderer = document.querySelector("yt-mealbar-promo-renderer");

    if (popupContainer) {
        console.info("YouTube Auto Skipper: Removing popup container...");
        popupContainer.remove();
    }

    if (promoRenderer) {
        console.info("YouTube Auto Skipper: Removing YouTube promo banner...");
        promoRenderer.remove();
    }
}

// Observe changes in YouTube's DOM to detect ads and popups dynamically
const observer = new MutationObserver(() => {
    detectAndSkipAd();
    removeYouTubePopups();
});

observer.observe(document.body, { childList: true, subtree: true });

// Extra fallback check every second
setInterval(() => {
    detectAndSkipAd();
    removeYouTubePopups();
}, 1000);

// Run once on script load in case elements are already present
detectAndSkipAd();
removeYouTubePopups();
