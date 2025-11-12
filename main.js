document.addEventListener("DOMContentLoaded", () => {
  const recentFilesList = document.getElementById("recentFiles");
  const files = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

  // Sort files by upload date (descending)
  files.sort((a, b) => new Date(b.date) - new Date(a.date));

  files.slice(0, 5).forEach(file => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${file.name} (${file.courseId})</span>
      <button onclick="generateQR('${file.id}')">QR</button>
    `;
    recentFilesList.appendChild(li);
  });
});

function generateQR(id) {
  localStorage.setItem("qrFileId", id);
  window.location.href = "qrcode.html";
}
