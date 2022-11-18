const doGet = () => {
  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .setTitle("Translation Gummy")
    .setFaviconUrl("https://drive.google.com/uc?id=1Zbe5tbRktvcKWKD_Q7icajm_HXi0gJFx&.png");
};

const translate = (text, tgt, src = "") => {
  let result = {};
  result.text = text;
  result.src = src;
  result.status = 0;

  for (lang of tgt){
    let code = 0;
    let translated = "";
    for (let i = 0; i < 3; i++) {
      try {
        let res = LanguageApp.translate(text, src, lang);
        if (res.length) {
          translated = res;
          code = 200;
          result.status = 200;
          break;
        } else {
          code = 400;
        };
      } catch {
        code = 429;
      };
    };
    result[lang] = {"code": code, "result": translated};
  };

  return result;
};

const getScriptUrl = () => {
  return ScriptApp.getService().getUrl();
};