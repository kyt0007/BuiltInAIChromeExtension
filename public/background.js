//check capabilities
chrome.runtime.onInstalled.addListener(async() => {

    const availableDetector = await ai.languageDetector.capabilities().available;
    const translatorCapabilities = await ai.translator.capabilities();
    const availableTranslator = translatorCapabilities.languagePairAvailable('en', 'es');
    const availableSummarizer = (await self.ai.summarizer.capabilities()).available;
    

    if(availableTranslator === 'no'){
        alert("The Translator API is not available");
    }else if(availableTranslator !== 'readily'){
        alert("Translator API can be used after the model is downloaded");
    }

    if (availableSummarizer === 'no') {
        alert("The Summarizer API is not available");
    }else if (availableSummarizer !== 'readily'){
        alert("Summarizer API can be used after the model is downloaded");
    }

    if (availableDetector === 'no') {
        alert("The Detector API is not available");
    }else if (availableDetector !== 'readily'){
        alert("Detector API can be used after the model is downloaded");
    }

})