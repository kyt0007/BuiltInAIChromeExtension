import React,{useState} from 'react';
import { Dropdown } from 'react-bootstrap';

function LanguageSelector({ selectedLanguage, onLanguageChange }) {
    
    const languageOptions = [
        { code: 'ar', label: 'Arabic' },
        { code: 'bn', label: 'Bengali' },
        { code: 'de', label: 'German' },
        { code: 'es', label: 'Spanish' },
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'French' },
        { code: 'ko', label: 'Korean' },
        { code: 'hi', label: 'Hindi' },
        { code: 'it', label: 'Italian' },
        { code: 'ja', label: 'Japanese' },
        { code: 'nl', label: 'Dutch' },
        { code: 'pl', label: 'Polish' },
        { code: 'pt', label: 'Portuguese' },
        { code: 'ru', label: 'Russian' },
        { code: 'th', label: 'Thai' },
        { code: 'tr', label: 'Turkish' },
        { code: 'vi', label: 'Vietnamese' },
        { code: 'zh', label: 'Chinese (Simplified)' },
        { code: 'zh-TW', label: 'Chinese (Traditional)' },
    ];

    const handleLanguageChange = (event) => {
        onLanguageChange(event);
    };
      

    return(

        <div className="language-selector">
            <Dropdown>
                <Dropdown.Toggle variant="secondary" size="sm" id="dropdown-basic" className="custom-dropdown-toggle">
                {selectedLanguage}
                </Dropdown.Toggle>

                <Dropdown.Menu className="custom-dropdown-menu">
                    {languageOptions.map((lang) => (
                        <Dropdown.Item
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className="custom-dropdown-item"
                        >
                            {lang.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}


export default LanguageSelector;