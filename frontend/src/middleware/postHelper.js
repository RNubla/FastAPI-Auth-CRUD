const EditorJS = require("@editorjs/editorjs");

const postHelper = (config) => {
  //   console.log("POSTHELPER", config);
  return new EditorJS(config);
};
export default postHelper;
