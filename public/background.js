//check capabilities
chrome.runtime.onInstalled.addListener(async() => {
    const availableTranslator = await translation.canTranslate({
        sourceLanguage: 'en',
        targetLanguage: 'fr',
    });

    if(availableTranslator === 'no'){
        alert("The Translator API is not available");
    }else if(availableTranslator !== 'readily'){
        alert("Translator API can be used after the model is downloaded");
    }

    const availableSummarizer = (await self.ai.summarizer.capabilities()).available;
    if (availableSummarizer === 'no') {
        alert("The Summarizer API is not available");
    }else if (availableSummarizer !== 'readily'){
        alert("Summarizer API can be used after the model is downloaded");
    }

    const availableDetector = await translation.canDetect();
    if (availableDetector === 'no') {
        alert("The Detector API is not available");
    }else if (availableDetector !== 'readily'){
        alert("Detector API can be used after the model is downloaded");
    }

})