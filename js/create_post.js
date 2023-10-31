import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBiW_sL8eKxcQ7T9xKqQJxxRaIHmizOBoE",
  authDomain: "webridge-81f09.firebaseapp.com",
  projectId: "webridge-81f09",
  storageBucket: "webridge-81f09.appspot.com",
  messagingSenderId: "950961168294",
  appId: "1:950961168294:web:1cc48025ccfb341ea93967",
  measurementId: "G-VWM7GNP66X"
};

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Retrieve the users' ID from the cookie
const volunteerId = getCookie("volunteerId");
const organizationId = getCookie("organizationId");
console.log("volunteerId :"+volunteerId);
console.log("organizationId :"+organizationId);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(); 

const colRef = collection(db, 'posts');

const submitPost = document.getElementById("postForm");

// Function to handle form submission
submitPost.addEventListener("submit", async function (event) {
    event.preventDefault();

    const positionTitle = document.getElementById("txtPositionTitle").value;
    const description = document.getElementById("txtDescription").value;
    const dateStr = document.getElementById("txtDate").value;
    const date = Timestamp.fromDate(new Date(dateStr))
    const hours = document.getElementById("txtHours").value;
    const location = document.getElementById("txtLocation").value;
    const expireDateStr = document.getElementById("txtExpireDate").value;
    const expireDate = Timestamp.fromDate(new Date(expireDateStr));
    const modeOfWork = document.getElementById("mode_of_work").value
    const interests = document.getElementById("interests").value
    const skills = document.getElementById("txtSkills").value
    const preferredLanguage = document.getElementById("txtPreferredLanguage").value;
    const phoneNumber = document.getElementById("txtPhoneNumber").value;
    const email = document.getElementById("txtEmail").value;
    
   
    try {
        await addDoc(colRef, {
            positionTitle: positionTitle,
            description: description,
            date: date,
            hours: hours,
            location: location,
            expireDate: expireDate,
            mode_of_work: modeOfWork,
            interests: interests,
            skills: skills,
            preferredLanguage: preferredLanguage,
            phoneNumber: phoneNumber,
            email: email,
            organizationId: organizationId
        });

        alert("Post submitted successfully!");

        submitPost.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        alert("An error occurred while submitting the post.");
    }
});