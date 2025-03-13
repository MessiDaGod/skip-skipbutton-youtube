document.getElementById("clearStorage").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;

        const activeTab = tabs[0];

        // Ensure we are only executing this on YouTube
        if (activeTab.url && activeTab.url.includes("youtube.com")) {
            // Clear local storage first
            chrome.scripting.executeScript({
                target: { tabId: activeTab.id },
                function: clearYouTubeLocalStorage
            });

            // Clear cookies, then refresh the page
            clearYouTubeCookies(activeTab.id);
        } else {
            console.warn("This action can only be run on YouTube.");
        }
    });
});

// ✅ Function to clear YouTube local storage inside the YouTube page
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

// ✅ Function to clear YouTube cookies & refresh page
function clearYouTubeCookies(tabId) {
    chrome.cookies.getAll({ domain: "youtube.com" }, (cookies) => {
        if (!cookies || cookies.length === 0) {
            console.info("No YouTube cookies found to clear.");
            refreshYouTubePage(tabId);  // Refresh even if no cookies were found
            return;
        }

        let cookiesDeleted = 0;
        let totalCookies = cookies.length;

        for (let cookie of cookies) {
            let cookieUrl = `https://www.youtube.com${cookie.path || "/"}`;
            chrome.cookies.remove({ url: cookieUrl, name: cookie.name }, () => {
                if (chrome.runtime.lastError) {
                    console.error(`Error removing cookie ${cookie.name}:`, chrome.runtime.lastError.message);
                } else {
                    console.info(`Removed cookie: ${cookie.name}`);
                    cookiesDeleted++;

                    // Only reload after ALL cookies are deleted
                    if (cookiesDeleted === totalCookies) {
                        setTimeout(() => refreshYouTubePage(tabId), 500); // Delay to ensure clearing completes
                    }
                }
            });
        }
    });
}

// ✅ Function to refresh the YouTube page
function refreshYouTubePage(tabId) {
    chrome.tabs.reload(tabId, () => {
        console.info("YouTube Auto Skipper: Page reloaded after clearing storage and cookies.");
    });
}
