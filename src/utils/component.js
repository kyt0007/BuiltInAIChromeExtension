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
  //get highlight
  let selectedText = getSelection().toString();
  const pageTitle = document.title;
  const summarizer = await window.ai.summarizer.create({
    sharedContext: pageTitle,
    format: 'plain-text',
    length: "short"
  });

  if(!selectedText){
    //get document innertext with cleanup
    const unwantedElements = ['button', 'nav', 'aside', 'footer', 'header', '.side-panel', '.ads', '.popup'];
    unwantedElements.forEach(tag => {
      const elements = document.querySelectorAll(tag);
      elements.forEach(element => element.remove());
    });
    const bodyText = document.body.innerText;
    
    if (!bodyText) {
        alert("Can't detect body text.");
        return;
    }
    alert("Summarizing in Progress: May take around a minute")
    try{
      const summary = await summarizer.summarize(bodyText);
      alert(summary);
    }catch (error){
      console.error("Error during summarization:", error);
      alert("An error occurred while summarizing.");
    }
    
    
  }else{

    alert("Summarizing in Progress: May take around a minute")
    try{
      const summary = await summarizer.summarize(selectedText);
      alert(summary);
    }catch (error){
      console.error("Error during summarization:", error);
      alert("An error occurred while summarizing.");
    }
  }

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

