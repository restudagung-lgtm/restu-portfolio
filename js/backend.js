// === BACKEND (Firebase) ===
// Form contact terhubung ke Firebase Firestore: setiap pesan yang dikirim
// akan tersimpan di collection "messages" pada project Firebase kamu.
//
// PENTING — Firestore Security Rules:
// Config di bawah ini (apiKey, dll.) AMAN untuk ditaruh di kode sisi client;
// bukan seperti password. Yang menjaga keamanan data adalah Security Rules
// di Firebase Console. Supaya orang lain hanya bisa MENGIRIM pesan (create)
// dan TIDAK BISA membaca/menghapus pesan orang lain, pakai rules seperti ini
// (Firebase Console → Firestore Database → Rules):
//
//   rules_version = '2';
//   service cloud.firestore {
//     match /databases/{database}/documents {
//       match /messages/{id} {
//         allow create: if request.resource.data.name is string
//                       && request.resource.data.email is string
//                       && request.resource.data.message is string
//                       && request.resource.data.name.size() < 200
//                       && request.resource.data.email.size() < 200
//                       && request.resource.data.message.size() < 5000;
//         allow read, update, delete: if false;
//       }
//     }
//   }
//
// Kalau rules masih default ("allow read, write: if false" / mode test yang expired),
// pengiriman pesan akan gagal dengan error "Missing or insufficient permissions".

const firebaseConfig = {
  apiKey: "AIzaSyA_mSC0BffgzGCQYKHnZXEinhTVm2gfPm4",
  authDomain: "restu-portfolio.firebaseapp.com",
  projectId: "restu-portfolio",
  storageBucket: "restu-portfolio.firebasestorage.app",
  messagingSenderId: "660912880468",
  appId: "1:660912880468:web:4961fde062358d9a6b66c1",
  measurementId: "G-7TVCEPNY7Z"
};

let db = null;

(function initFirebase() {
  if (typeof firebase === "undefined") {
    console.warn("Firebase SDK belum termuat (cek koneksi internet / script CDN di index.html).");
    return;
  }
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
  } catch (err) {
    console.error("Gagal inisialisasi Firebase:", err);
  }
  // Analytics hanya berjalan kalau situs diakses lewat http(s) (live server / hosting),
  // bukan dibuka langsung dari file lokal (file://) — jadi dibungkus try/catch supaya
  // tidak mematikan fitur lain kalau gagal.
  try {
    if (location.protocol !== "file:" && firebase.analytics) firebase.analytics();
  } catch (err) {
    console.warn("Firebase Analytics tidak aktif:", err.message);
  }
})();

// === Kirim pesan form contact ke Firestore ===
const cfForm = document.getElementById("contactForm");
const cfStatus = document.getElementById("cfStatus");
const cfSubmit = document.getElementById("cfSubmit");

function setStatus(msg, kind) {
  if (!cfStatus) return;
  cfStatus.textContent = msg;
  cfStatus.className = "form-status" + (kind ? " " + kind : "");
}

cfForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("cfName").value.trim();
  const email = document.getElementById("cfEmail").value.trim();
  const message = document.getElementById("cfMessage").value.trim();

  if (!name || !email || !message) {
    setStatus("Nama, email, dan pesan wajib diisi.", "error");
    return;
  }
  if (!db) {
    setStatus("Backend belum aktif. Cek console (F12) untuk detail.", "error");
    return;
  }

  cfSubmit.disabled = true;
  cfSubmit.textContent = "Mengirim...";
  setStatus("", "");

  try {
    await db.collection("messages").add({
      name, email, message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    cfForm.reset();
    setStatus("Pesan terkirim, terima kasih! 🎉", "success");
  } catch (err) {
    console.error("Gagal mengirim pesan:", err);
    setStatus("Gagal mengirim pesan (" + err.code + "). Coba lagi nanti.", "error");
  } finally {
    cfSubmit.disabled = false;
    cfSubmit.textContent = "Send Message";
  }
});
