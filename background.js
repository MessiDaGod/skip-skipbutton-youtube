chrome.runtime.onStartup.addListener(() => {
    clearYouTubeData();
});

chrome.runtime.onInstalled.addListener(() => {
    clearYouTubeData();
});

function clearYouTubeData() {
    const youtubeUrl = "https://www.youtube.com";

    // Clear Cookies
    chrome.cookies.getAll({ domain: "youtube.com" }, (cookies) => {
        for (let cookie of cookies) {
            console.log("cookie", cookie);
            chrome.cookies.remove({
                url: `${youtubeUrl}${cookie.path}`,
                name: cookie.name
            });
        }
    });

    // Clear Local Storage
    chrome.browsingData.remove({
        origins: [youtubeUrl]
    }, {
        localStorage: true
    });

    console.info("YouTube Auto Skipper: Cleared YouTube cookies and local storage.");
}
