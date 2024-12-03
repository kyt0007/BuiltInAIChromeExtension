//@ts-check
import './App.css';
import React, { useState, useEffect } from 'react';
import LanguageSelector from './utils/languagesSelector';
import { translate, summarize } from './utils/component';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  useEffect(() => {
    
    chrome.storage.local.get('selectedLanguage', (result) => {
      if (result.selectedLanguage) {
        setSelectedLanguage(result.selectedLanguage);
      }
    });
  }, []);

  useEffect(() => {
    // Call the async function inside the effect
    chrome.storage.local.set({ 'selectedLanguage': selectedLanguage });
  }, [selectedLanguage]);


  const handleLanguageChange = async (newLanguage) => {
    setSelectedLanguage(newLanguage);
  };


  return (
    <div className="App">
      
      <LanguageSelector
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
      
      <button onClick={()=>translate(selectedLanguage)}>
        Translate
      </button>
      
      <button onClick={summarize}> Summarize</button>

    </div>
  );
}

export default App;
