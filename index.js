

src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"
  const form = document.getElementById('maintenanceForm');
  const qrCodeDiv = document.getElementById('qrcode');
  const copyButton = document.getElementById('copyButton');
  const downloadButton = document.getElementById('downloadButton');
  const qrname = document.getElementById('qrname');
  const jsondata = document.getElementById('jsonData');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const form =  document.getElementById('maintenanceForm');
   
    let formData = new FormData(form); // Object to hold the form data
    let isEmpty = true; // Flag to check if the form is empty
    let datastring = "HRE:"; // String to hold the form data
    // for (let element of form.elements) {
    //   if (element.name && element.value.trim() !== "") { // Check for empty values after trimming whitespace
    //     formData[element.name] = element.value;
    //     isEmpty = false; // Form has at least one filled element
    //   }
    // }
   // Log the data that will be encoded in the QR code
   formData.forEach((value,key) => {
      if(value.trim() !== "") {
        isEmpty = false;
        datastring +=`${key} : ${value}\n`;
        
      }
   });

    if (isEmpty) {
      alert("Please fill atleast one for generating the QR code.");
      return; // Stop further execution
    }

    jsondata.innerHTML = datastring;

    
    console.log(datastring); 
    // Generate QR code
    qrCodeDiv.innerHTML = "";
    let qrcode = new QRCode(qrCodeDiv, {
      text: datastring,
      width: 256,
      height: 256,
      colorDark : "#000000",
      colorLight : "#ffffff",
      correctLevel : QRCode.CorrectLevel.H
    });
     // add a copy button that copy qr code only that can be pasted any where


    // copyButton.addEventListener('click', () => {
    //   navigator.clipboard.writeText(textData)
    //     .then(() => alert('QR code text copied!'))
    //     .catch(err => console.error('Failed to copy: ', err));
    // });

    copyButton.addEventListener('click', async () => {
      try {
          const qrCode = document.getElementById('qrcode');
          const response = await fetch(qrCode.src);
          const blob = await response.blob();
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          alert('QR Code copied to clipboard!');
      } catch (error) {
          console.error('Failed to copy QR Code:', error);
      }
  });

    downloadButton.addEventListener('click', () => {
      const canvas = qrCodeDiv.querySelector('canvas');
      const dataURL = canvas.toDataURL("image/png");
      const downloadLink = document.createElement('a');
      downloadLink.href = dataURL;
      downloadLink.download = `${qrname.value}.png`;
      downloadLink.click();
    });

    // Clear the form after QR code generation
    form.reset();


  });


