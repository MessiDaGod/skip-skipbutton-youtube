document.getElementById("clearStorage").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;

        const activeTab = tabs[0];

        if (activeTab.url && activeTab.url.includes("youtube.com")) {
            // Clear local storage first
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: clearYouTubeLocalStorage
            });

            // Fully clear YouTube cookies & refresh the page
            clearAllYouTubeCookies(activeTab.id);
        } else {
            console.warn("This action can only be run on YouTube.");
        }
    });
});

// ✅ Clears ONLY `localStorage` for `https://www.youtube.com`
function clearYouTubeLocalStorage() {
    if (window.location.hostname === "www.youtube.com") {
        console.info("YouTube Auto Skipper: Clearing YouTube Local Storage...");

        for (let key in localStorage) {
            if (key.startsWith("yt")) {
                localStorage.removeItem(key);
                console.info(`Removed local storage key: ${key}`);
            }
        }
    } else {
        console.warn("This script should only be run on YouTube.");
    }
}

// ✅ Clears **ALL** YouTube cookies, including same-site & cross-site
function clearAllYouTubeCookies(tabId) {
    chrome.browsingData.remove({
        origins: ["https://www.youtube.com"]
    }, {
        cookies: true
    }, () => {
        console.info("YouTube Auto Skipper: All YouTube cookies cleared!");
        refreshYouTubePage(tabId); // Refresh after clearing
    });
}

// ✅ Refreshes the YouTube page
function refreshYouTubePage(tabId) {
    chrome.tabs.reload(tabId, () => {
        console.info("YouTube Auto Skipper: Page reloaded after clearing storage and cookies.");
    });
}
