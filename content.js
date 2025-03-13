function detectAndSkipAd() {
    const video = document.querySelector("video");
    const adContainer = document.querySelector(".ytp-ad-player-overlay-layout"); // Ad indicator

    if (video && adContainer && adContainer.offsetParent !== null) {
        console.info("YouTube Auto Skipper: Ad detected. Skipping...");
        video.currentTime = video.duration; // Jump to end of ad

        // Wait a short moment, then resume playback
        setTimeout(() => {
            if (video.paused) {
                console.info("YouTube Auto Skipper: Resuming playback...");
                video.play(); // Resume the video
            }
        }, 0);
    }
}

// Observe changes in YouTube's DOM to detect ads dynamically
const observer = new MutationObserver(detectAndSkipAd);
observer.observe(document.body, { childList: true, subtree: true });

// Extra fallback check every second
setInterval(detectAndSkipAd, 1000);
