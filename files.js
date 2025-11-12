// document.addEventListener("DOMContentLoaded", () => {
//   const foldersContainer = document.getElementById("foldersContainer");
//   const fileListSection = document.getElementById("fileListSection");
//   const folderTitle = document.getElementById("folderTitle");
//   const fileList = document.getElementById("fileList");
//   const backBtn = document.getElementById("backBtn");

//   const uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

//   // Group files by courseId
//   const grouped = uploadedFiles.reduce((acc, file) => {
//     if (!acc[file.courseId]) acc[file.courseId] = [];
//     acc[file.courseId].push(file);
//     return acc;
//   }, {});

//   // Display folders
//   for (let courseId in grouped) {
//     const folderDiv = document.createElement("div");
//     folderDiv.className = "folder";
//     folderDiv.innerHTML = `
//       <span>${courseId} (${grouped[courseId].length} files)</span>
//       <button class="qr-btn" onclick="generateFolderQR('${courseId}')">QR</button>
//     `;
//     folderDiv.addEventListener("click", (e) => {
//       if (e.target.tagName === "BUTTON") return; // ignore if QR button clicked
//       showFiles(courseId, grouped[courseId]);
//     });
//     foldersContainer.appendChild(folderDiv);
//   }

//   // Show files in folder
//   function showFiles(courseId, files) {
//     foldersContainer.style.display = "none";
//     fileListSection.classList.remove("hidden");
//     folderTitle.textContent = `Folder: ${courseId}`;

//     fileList.innerHTML = "";
//     files.forEach((f) => {
//       const li = document.createElement("li");
//       li.innerHTML = `
//         <span>${f.name}</span>
//         <button class="qr-btn" onclick="generateFileQR('${f.id}')">QR</button>
//       `;
//       fileList.appendChild(li);
//     });
//   }

//   // Back button
//   backBtn.addEventListener("click", () => {
//     fileListSection.classList.add("hidden");
//     foldersContainer.style.display = "grid";
//   });
// });

// // QR generation handlers
// function generateFolderQR(courseId) {
//   localStorage.setItem("qrFolderId", courseId);
//   window.location.href = "qrcode.html";
// }

// function generateFileQR(fileId) {
//   localStorage.setItem("qrFileId", fileId);
//   window.location.href = "qrcode.html";
// }


import { db, collection, getDocs, query, orderBy } from "./firebase.js";

document.addEventListener("DOMContentLoaded", async () => {
  const filesContainer = document.querySelector(".folders");
  const filesByCourse = {};

  const q = query(collection(db, "documents"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (!filesByCourse[data.courseId]) filesByCourse[data.courseId] = [];
    filesByCourse[data.courseId].push(data);
  });

  Object.keys(filesByCourse).forEach((courseId) => {
    const folderDiv = document.createElement("div");
    folderDiv.className = "folder";
    folderDiv.innerHTML = `
      <h3>${courseId}</h3>
      ${filesByCourse[courseId]
        .map(
          (f) => `
          <div class="file-item">
            <p>${f.fileName}</p>
            <a href="${f.url}" target="_blank">View/Download</a>
            <button onclick="generateQR('${f.url}')">QR Code</button>
          </div>`
        )
        .join("")}
    `;
    filesContainer.appendChild(folderDiv);
  });
});

window.generateQR = (url) => {
  localStorage.setItem("qrFileURL", url);
  window.location.href = "qrcode.html";
};

