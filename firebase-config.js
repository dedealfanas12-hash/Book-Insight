<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.3.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBoNWY2TB9JzKQK0o8JEjjTsdEIdccecYI",
    authDomain: "book-insight-6cc67.firebaseapp.com",
    projectId: "book-insight-6cc67",
    storageBucket: "book-insight-6cc67.firebasestorage.app",
    messagingSenderId: "67965088214",
    appId: "1:67965088214:web:208a0312f0784ac73f7477",
    measurementId: "G-HJMTHV4L69"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
