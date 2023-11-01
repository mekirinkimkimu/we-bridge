import { initializeApp} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, query, where} from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js';
import { getCookie, setCookie} from "./backend.js"

const firebassApp = initializeApp({
    apiKey: "AIzaSyBiW_sL8eKxcQ7T9xKqQJxxRaIHmizOBoE",
    authDomain: "webridge-81f09.firebaseapp.com",
    projectId: "webridge-81f09",
    storageBucket: "webridge-81f09.appspot.com",
    messagingSenderId: "950961168294",
    appId: "1:950961168294:web:1cc48025ccfb341ea93967",
    measurementId: "G-VWM7GNP66X"
  });

const storage = getStorage();

// Reference to Firestore
const db = getFirestore(firebassApp);

// Reference to the volunteer collection
const volunteerCollection = collection(db, "volunteer");

// Retrieve the user's ID from the cookie
const volunteerId = await getCookie("volunteerId");

console.log(volunteerId);

async function getVolunteerInfo(){
    const docRef = doc(volunteerCollection, volunteerId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const volunteerData = docSnap.data();
        console.log("Document data:", volunteerData);
        document.getElementById('volunteerName').innerHTML = volunteerData.firstName;
        document.getElementById('txtFirstName').innerHTML =  volunteerData.firstName + " " + volunteerData.lastName;
        document.getElementById('profilePic').src = (volunteerData.photoLink == null ? " " : volunteerData.photoLink);
        document.getElementById('txtBio').innerHTML = (volunteerData.bio == null ? " " : volunteerData.bio);
        document.getElementById('txtCity').innerHTML = (volunteerData.city == null ? " " : volunteerData.city);
        document.getElementById('txtProvince').innerHTML = (volunteerData.province == null ? " " : volunteerData.province);
        document.getElementById('txtSkill').innerHTML = (volunteerData.skills == null ? " " : volunteerData.skills.join(',') );
        getApplicantInfo();
        
    } else {
        console.log("No such document!");
    }
}

async function getApplicantInfo() {
    const collectionRef = collection( db, 'volunteer' );
    const colRef = collection( db, 'application' );
    const q = query(colRef, where( "volunteerID", "==" , volunteerId ));
    getDocs(q, colRef)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const application= doc.data();
                    let txt2Inner = `<header><h3>${application.motive}</h3></header>`;
                    document.getElementById("h1Recomm").style.display = "block";
                    let card2Div = document.createElement("div"); // create new Div, cardDiv to display details data             
                    card2Div.setAttribute("class", "card"); // set the class, card to cardDiv ..... ${imgPath} .......
                    txt2Inner += `<a href="">${doc.id}</p>`;
                    txt2Inner += `<p>${application.dateApplied.toDate().toLocaleString()}</p>`;
                    txt2Inner += `<p>${application.status}</p>`; // add the title             
                    card2Div.innerHTML = txt2Inner;
                    containerRec.appendChild(card2Div); // add cardDiv to orderDiv
                    const viewButton = document.createElement('button');
                    viewButton.setAttribute("class", "viewButton");
                    viewButton.setAttribute("data-appId", doc.id);
                    viewButton.setAttribute("data-postId", application.postsID);
                    viewButton.innerHTML = 'View';
                    card2Div.append(viewButton);
                    console.log("button appened");
                    viewButton.addEventListener('click', handleViewButtonEvent); 
                });
            });
}
  
  // Call the function when the window loads
  window.onload = getVolunteerInfo();

document.getElementById("btnEditProfile").addEventListener("click", function (event) {
    event.preventDefault();
    const pageURL = "volunteer_build_profile.html";
    window.location.href = pageURL;
});

async function handleViewButtonEvent(event) {
    let appId = event.target.getAttribute('data-appId');
    let postId = event.target.getAttribute('data-postId');
    console.log(appId);
    console.log(postId);
   await setCookie("vol_applicationId", appId,1);
   await setCookie("vol_postId", postId,1)
}