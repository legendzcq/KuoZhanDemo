

export const getString = (key)=> {
    let language =  global.LanguageType;
    let languagePackage = languagePackage = require("./string/zh");
    try {
        switch (language) {
            case "en":
                languagePackage = require("./string/en");
                break;
            case "in":
                languagePackage = require("./string/en");
                break;
        }
    }
    catch (e) { }
    return languagePackage[key];
};

