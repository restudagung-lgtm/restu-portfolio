// === BACKEND (opsional) ===
// File ini tempat menyambungkan penyimpanan online (Firebase) kalau nanti dibutuhkan,
// misalnya untuk form contact yang beneran tersimpan, guestbook, atau view counter.
// Sekarang belum aktif — portofolio ini masih 100% statis (aman untuk GitHub Pages).
//
// Cara mengaktifkan (lihat tutorial Firebase yang sudah dijelaskan sebelumnya):
// 1. Tambahkan script SDK Firebase di index.html (sebelum file ini):
//    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"></script>
//    <script src="https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js"></script>
// 2. Isi firebaseConfig di bawah ini dengan config dari Firebase Console.
// 3. Hilangkan komentar pada kode di bawah.

// const firebaseConfig = {
//   apiKey: "ISI_DENGAN_API_KEY_KAMU",
//   authDomain: "ISI.firebaseapp.com",
//   projectId: "ISI_PROJECT_ID",
//   storageBucket: "ISI.appspot.com",
//   messagingSenderId: "ISI",
//   appId: "ISI"
// };
// firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();
//
// Contoh fungsi kirim pesan dari form contact ke Firestore:
// function sendMessage(name, message){
//   return db.collection("messages").add({ name, message, createdAt: new Date() });
// }
