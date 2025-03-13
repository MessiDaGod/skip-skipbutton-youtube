document.getElementById("skipAd").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: forceSkipAd
        });
    });
});

// Function to force skip the ad (runs inside YouTube page)
function forceSkipAd() {
    const video = document.querySelector("video");
    if (video) {
        console.info("YouTube Auto Skipper: Skipping Ad via Popup...");
        video.currentTime = video.duration; // Jump to end of ad
        document.getElementById("status").textContent = "Ad Skipped!";
    } else {
        document.getElementById("status").textContent = "No Ad Detected";
    }
}
