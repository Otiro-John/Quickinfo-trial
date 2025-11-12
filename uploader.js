// document.getElementById("uploadForm").addEventListener("submit", (e) => {
//   e.preventDefault();

//   const courseId = document.getElementById("courseId").value.trim();
//   const fileInput = document.getElementById("fileInput");
//   const file = fileInput.files[0];
//   const msg = document.getElementById("uploadMsg");

//   if (!courseId || !file) {
//     msg.textContent = "Please fill all fields.";
//     return;
//   }

//   const uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

//   const newFile = {
//     id: Date.now(),
//     name: file.name,
//     courseId,
//     date: new Date().toISOString(),
//   };

//   uploadedFiles.push(newFile);
//   localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));

//   msg.textContent = `✅ File "${file.name}" uploaded successfully.`;
//   fileInput.value = "";
//   document.getElementById("courseId").value = "";
// });




import { storage, db, ref, uploadBytes, getDownloadURL, collection, addDoc } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("uploadForm");
  const fileInput = document.getElementById("fileInput");
  const courseIdInput = document.getElementById("courseId");
  const message = document.getElementById("message");

  uploadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const file = fileInput.files[0];
    const courseId = courseIdInput.value.trim();

    if (!file || !courseId) {
      message.textContent = "Please enter Course ID and choose a file.";
      return;
    }

    try {
      const storageRef = ref(storage, `documents/${courseId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "documents"), {
        courseId,
        fileName: file.name,
        url: fileURL,
        createdAt: new Date().toISOString(),
      });

      message.textContent = `✅ File uploaded successfully for ${courseId}`;
      uploadForm.reset();
    } catch (error) {
      console.error(error);
      message.textContent = "❌ Upload failed. Try again.";
    }
  });
});
