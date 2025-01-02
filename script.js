// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyDhJWH5MMuvNdUWnszcRr7ZuKdO5ADfZnU",
  authDomain: "camber-life.firebaseapp.com",
  projectId: "camber-life",
  storageBucket: "camber-life.firebasestorage.app",
  messagingSenderId: "822111284845",
  appId: "1:822111284845:web:f6b201534b8feaa3acd964",
  measurementId: "G-G6DS6GRQEK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load Research Data
if (document.getElementById("researchData")) {
  loadResearchData();
}

async function loadResearchData() {
  const researchData = document.getElementById("researchData");
  const querySnapshot = await getDocs(collection(db, "motorcycles"));
  let html = "<ul>";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    html += `<li>
      <strong>${data.name}</strong><br>
      Bore x Stroke: ${data.bore_x_stroke || "N/A"}<br>
      Brakes (Front): ${data.brakes_front || "N/A"}<br>
      Engine Type: ${data.engine_type || "N/A"}<br>
      MSRP: $${data.msrp || "N/A"}
    </li>`;
  });
  html += "</ul>";
  researchData.innerHTML = html;
}

// Load Shop Data
if (document.getElementById("shopData")) {
  loadShopData();
}

async function loadShopData() {
  const shopData = document.getElementById("shopData");
  const querySnapshot = await getDocs(collection(db, "inventory"));
  let html = "<ul>";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    html += `<li>
      <strong>${data.title}</strong><br>
      Dealer: ${data.dealer || "N/A"}<br>
      Price: $${data.price || "N/A"}<br>
      <a href="${data.url}" target="_blank">View Details</a>
    </li>`;
  });
  html += "</ul>";
  shopData.innerHTML = html;
}
