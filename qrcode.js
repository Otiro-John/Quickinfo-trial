// document.addEventListener("DOMContentLoaded", () => {
//   const qrcodeDiv = document.getElementById("qrcode");
//   const qrTitle = document.getElementById("qrTitle");
//   const qrInfo = document.getElementById("qrInfo");
//   const downloadBtn = document.getElementById("downloadQR");
//   const backBtn = document.getElementById("backBtn");

//   const folderId = localStorage.getItem("qrFolderId");
//   const fileId = localStorage.getItem("qrFileId");

//   let qrData = "";
//   let qrLabel = "";

//   // Determine what to generate
//   if (folderId) {
//     qrLabel = `Folder: ${folderId}`;
//     qrData = `https://quickinfo.local/folder/${folderId}`;
//   } else if (fileId) {
//     qrLabel = `File ID: ${fileId}`;
//     qrData = `https://quickinfo.local/file/${fileId}`;
//   } else {
//     qrLabel = "No QR data found.";
//     qrData = "N/A";
//   }

//   qrTitle.textContent = qrLabel;
//   qrInfo.textContent = "Scan to view the document or folder in QuickInfo.";

//   // Generate QR code
//   if (qrData !== "N/A") {
//     new QRCode(qrcodeDiv, {
//       text: qrData,
//       width: 200,
//       height: 200,
//     });
//   }

//   // Download QR Code
//   downloadBtn.addEventListener("click", () => {
//     const canvas = qrcodeDiv.querySelector("canvas");
//     const link = document.createElement("a");
//     link.download = `${qrLabel.replace(/\s+/g, "_")}.png`;
//     link.href = canvas.toDataURL("image/png");
//     link.click();
//   });

//   // Back navigation
//   backBtn.addEventListener("click", () => {
//     localStorage.removeItem("qrFolderId");
//     localStorage.removeItem("qrFileId");
//     window.location.href = "files.html";
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
  const qrcodeDiv = document.getElementById("qrcode");
  const qrTitle = document.getElementById("qrTitle");
  const qrInfo = document.getElementById("qrInfo");
  const downloadBtn = document.getElementById("downloadQR");
  const backBtn = document.getElementById("backBtn");

  // Retrieve data
  const folderData = JSON.parse(localStorage.getItem("qrFolderData"));
  const fileData = JSON.parse(localStorage.getItem("qrFileData"));

  let qrData = "";
  let qrLabel = "";
  let fileOrFolder = "";

  // Auto-detect your site base (works with Vercel)
  const siteURL = window.location.origin;

  if (folderData && folderData.id) {
    fileOrFolder = "folder";
    qrLabel = `Folder: ${folderData.name || folderData.id}`;
    qrData = `${siteURL}/folder.html?id=${folderData.id}`;
  } else if (fileData && fileData.id) {
    fileOrFolder = "file";
    qrLabel = `File: ${fileData.name || fileData.id}`;
    qrData = `${siteURL}/file.html?id=${fileData.id}`;
  } else {
    qrLabel = "No QR data found";
    qrData = "N/A";
  }

  qrTitle.textContent = qrLabel;
  qrInfo.textContent = qrData !== "N/A"
    ? "Scan this QR code to access the resource in QuickInfo."
    : "No valid data to generate QR code.";

  // Generate QR code if valid
  if (qrData !== "N/A") {
    new QRCode(qrcodeDiv, {
      text: qrData,
      width: 220,
      height: 220,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });
  }

  // Download QR Code
  downloadBtn.addEventListener("click", () => {
    const canvas = qrcodeDiv.querySelector("canvas");
    if (!canvas) {
      alert("No QR code to download!");
      return;
    }
    const link = document.createElement("a");
    link.download = `${fileOrFolder}_${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  });

  // Back navigation
  backBtn.addEventListener("click", () => {
    localStorage.removeItem("qrFolderData");
    localStorage.removeItem("qrFileData");
    window.location.href = "files.html";
  });
});

