// Background service worker
console.log("AutoApply AI: Background worker started.");

// Listen for messages from content.js (Real scraped data)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "job_scraped") {
        console.log("Received new job from website:", message.data);
        
        // Data ko local storage me save karna taaki index.html usko dikha sake
        chrome.storage.local.get(['aa2_jobs'], function(result) {
            let jobs = result.aa2_jobs || [];
            // Duplicate check
            if (!jobs.find(j => j.title === message.data.title && j.company === message.data.company)) {
                jobs.unshift(message.data);
                chrome.storage.local.set({ 'aa2_jobs': jobs });
            }
        });
    }
});
