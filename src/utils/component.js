const getSelectedText = async(selectedLanguage) => {
    
    let selectedText = getSelection().toString();
    if(! selectedText){
      alert("No Text Selected");
      return;
    }
    try {
        const detector = await window.ai.languageDetector.create();
        const results = await detector.detect(selectedText);
        const detected = results[0].detectedLanguage;
    
        const translator = await window.ai.translator.create({
          sourceLanguage: detected,
          targetLanguage: selectedLanguage,
        });
    
        const response = await translator.translate(selectedText);
        alert(response); // Display the translation result
        
    
      } catch (error) {
        console.error("Error during translation:", error);
        alert("An error occurred while translating.");
    }
}

const getDOM = async() =>{
    const pageTitle = document.title;
    const bodyText = document.body.innerText;
    
    if (!bodyText) {
        alert("The element with ID 'my-important-div' was not found.");
        return;
    }

    const summarizer = await window.ai.summarizer.create({
        sharedContext: pageTitle,
        format: 'plain-text',
        length: "short"
    });

    alert("Summarizing in Progress: May take around a minute")
    const summary = await summarizer.summarize(bodyText);
    alert(summary);
}

export const translate = async(selectedLanguage) => {
    const [tab] = await chrome.tabs.query({active:true, currentWindow:true});
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      args: [selectedLanguage],
      function: getSelectedText,
    });
};

export const summarize = async() => {
    const [tab] = await chrome.tabs.query({active:true, currentWindow:true});
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: getDOM,
    });
};

