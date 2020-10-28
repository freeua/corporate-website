import { saveAs } from "file-saver";

const downloadFile = (fileURL, fileName) => {
  const oReq = new XMLHttpRequest();
  const URLToPDF = fileURL;

  oReq.open("GET", URLToPDF, true);
  oReq.responseType = "blob";
  oReq.onload = function() {
    const file = new Blob([oReq.response], {
      type: "application/pdf",
    });

    saveAs(file, fileName);
  };

  oReq.send();
};

export default downloadFile;
