// Yeh script directly job portal par chalegi
console.log("AutoApply AI: Content script is running on this page!");

// Example: LinkedIn se real Job Details fetch karna
function scrapeJobData() {
    // LinkedIn ki specific CSS classes use karke data nikalna
    let titleElement = document.querySelector('.jobs-unified-top-card__job-title');
    let companyElement = document.querySelector('.jobs-unified-top-card__company-name');
    let locationElement = document.querySelector('.jobs-unified-top-card__bullet');

    if (titleElement && companyElement) {
        let jobData = {
            title: titleElement.innerText.trim(),
            company: companyElement.innerText.trim(),
            location: locationElement ? locationElement.innerText.trim() : "Unknown",
            platform: window.location.hostname.includes('linkedin') ? "LinkedIn" : "Other",
            url: window.location.href
        };
        
        console.log("Real Job Found:", jobData);
        // Yeh data hum apne popup (UI) ko bhej sakte hain
        chrome.runtime.sendMessage({ action: "job_scraped", data: jobData });
    }
}

// Example: "Easy Apply" button par click karna
function clickApplyButton() {
    let applyBtn = document.querySelector('.jobs-apply-button--top-card button');
    if (applyBtn && applyBtn.innerText.includes("Easy Apply")) {
        console.log("Found Easy Apply button, clicking now...");
        applyBtn.click();
    } else {
        console.log("Easy Apply button not found.");
    }
}

// Page load hone ke thodi der baad scraping start karna
setTimeout(scrapeJobData, 3000);
