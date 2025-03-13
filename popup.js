document.getElementById("clearStorage").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: clearYouTubeLocalStorage
        });
    });
});

// Function to remove all YouTube local storage keys that start with "yt"
function clearYouTubeLocalStorage() {
    console.info("YouTube Auto Skipper: Clearing all YouTube Local Storage keys...");

    for (let key in localStorage) {
        if (key.startsWith("yt")) {
            localStorage.removeItem(key);
            console.info(`Removed: ${key}`);
        }
    }

    alert("YouTube Local Storage Cleared!");
}
