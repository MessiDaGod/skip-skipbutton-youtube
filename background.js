chrome.runtime.onStartup.addListener(() => {
    clearYouTubeData();
});

chrome.runtime.onInstalled.addListener(() => {
    clearYouTubeData();
});

function clearYouTubeData() {
    const youtubeUrl = "https://www.youtube.com";

    // Ensure cookies permission is granted before trying to access cookies
    if (chrome.cookies) {
        chrome.cookies.getAll({ domain: "youtube.com" }, (cookies) => {
            if (chrome.runtime.lastError) {
                console.error("Error fetching cookies:", chrome.runtime.lastError.message);
                return;
            }

            if (!cookies || cookies.length === 0) {
                console.info("YouTube Auto Skipper: No YouTube cookies found to clear.");
                return;
            }

            for (let cookie of cookies) {
                let cookieUrl = `https://youtube.com${cookie.path}`;
                chrome.cookies.remove({ url: cookieUrl, name: cookie.name }, (details) => {
                    if (chrome.runtime.lastError) {
                        console.error(`Error removing cookie ${cookie.name}:`, chrome.runtime.lastError.message);
                    } else {
                        console.info(`Removed cookie: ${cookie.name}`);
                    }
                });
            }
        });
    } else {
        console.warn("YouTube Auto Skipper: Cookies API is not available.");
    }

    // Clear Local Storage
    chrome.browsingData.remove({
        origins: [youtubeUrl]
    }, {
        localStorage: true
    }, () => {
        console.info("YouTube Auto Skipper: Cleared YouTube local storage.");
    });
}
