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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Tab switching logic
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const contents = document.querySelectorAll(".content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      contents.forEach((content) => content.classList.remove("active"));

      tab.classList.add("active");
      const contentId = tab.id.replace("Tab", "");
      document.getElementById(contentId.toLowerCase()).classList.add("active");
    });
  });

  // Load data
  loadResearchData();
  loadShopData();
});

// Load Research Data from Firestore
async function loadResearchData() {
  const researchData = document.getElementById("researchData");
  researchData.innerHTML = "<p>Loading research data...</p>";

  try {
    const querySnapshot = await getDocs(collection(db, "motorcycles"));
    if (querySnapshot.empty) {
      researchData.innerHTML = "<p>No data found.</p>";
    } else {
      let html = "<ul>";
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        html += `<li><strong>${data.modelName}</strong>: ${data.details}</li>`;
      });
      html += "</ul>";
      researchData.innerHTML = html;
    }
  } catch (error) {
    researchData.innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
}

// Load Shop Data from Firestore
async function loadShopData() {
  const shopData = document.getElementById("shopData");
  shopData.innerHTML = "<p>Loading shop data...</p>";

  try {
    const querySnapshot = await getDocs(collection(db, "inventory"));
    if (querySnapshot.empty) {
      shopData.innerHTML = "<p>No data found.</p>";
    } else {
      let html = "<ul>";
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        html += `<li><strong>${data.itemName}</strong>: $${data.price}</li>`;
      });
      html += "</ul>";
      shopData.innerHTML = html;
    }
  } catch (error) {
    shopData.innerHTML = `<p>Error loading data: ${error.message}</p>`;
  }
}
