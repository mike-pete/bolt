chrome.runtime.onInstalled.addListener((details) => {
	if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({url: 'https://boltapply.com/welcome'});
		chrome.runtime.setUninstallURL('https://airtable.com/appNu5vfueuKHkcnG/pagcdUy85kCy4SB35/form')
	}
})
