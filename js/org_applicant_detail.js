// Function to get the value of a cookie by its name
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


// Retrieve the user's ID from the cookie
  const idPost = getCookie("idPost");
  const idVolunteer = getCookie("idVolunteer");

//   console.log(idPost);
//   console.log(idVolunteer);

import { getFirestore, collection, getDoc ,doc , getDocs, updateDoc,
    query , where
} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";


const firebaseConfig = {
apiKey: "AIzaSyBiW_sL8eKxcQ7T9xKqQJxxRaIHmizOBoE",
authDomain: "webridge-81f09.firebaseapp.com",
projectId: "webridge-81f09",
storageBucket: "webridge-81f09.appspot.com",
messagingSenderId: "950961168294",
appId: "1:950961168294:web:1cc48025ccfb341ea93967",
measurementId: "G-VWM7GNP66X"
};


initializeApp( firebaseConfig );

const db = getFirestore();

async function getApplicantInfo() {
    const collectionRef = collection( db, 'volunteer' );
    const colRef = collection( db, 'application' );
    const q = query(colRef, where( "volunteerID", "==" , idVolunteer ), where( "postsID", "==" , idPost ));
    let filteredApplicant = [];
    getDocs(q, colRef)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                filteredApplicant= doc.data();
                
                });
    
                async function getVolunteerDetails() {
                    const docRef = doc(collectionRef, idVolunteer);
                    let data = []
                        getDoc(docRef)
                            .then((snapshot) => {
                                data = snapshot.data();
                                // console.log("Document data:", data);
                                document.getElementById("applicant_info").innerHTML = `<h2>${data.firstName} ${data.lastName}</h2>
                                <p>${data.city}, ${data.province}</p>
                                <section>
                                <h3>Bio:</h3>
                                <p>${data.bio}</p>
                                </section>
                                <section>
                                <h3>Email:</h3>
                                <p>${data.email}</p>
                                </section>
                                <section>
                                <h3>Contact Number:</h3>
                                <p>${data.phoneNumber}</p>
                                </section>
                                <section>
                                <h3>Introduce yourself and tell us why you want to volunteer for this opportunity?</h3>
                                <p>${filteredApplicant.motive}</p>
                                </section>`;
                                
                        
                                let h3 = document.createElement("h3");
                                h3.innerHTML = "Experience";
                                applicant_info.append(h3)
                                data.experience.forEach(function(exp) {
                                    let p = document.createElement("p");
                                    p.innerHTML = `${exp.jobTitle}`
                                    applicant_info.append(p);
                                    let p1 = document.createElement("p");
                                    p1.innerHTML = `${exp.company}`
                                    applicant_info.append(p1);
                                    let p2 = document.createElement("p");
                                    p2.innerHTML = `${exp.startDate} - ${exp.endDate}`
                                    applicant_info.append(p2);
                                })
                    
                                let h3_1 = document.createElement("h3");
                                h3_1.innerHTML = "Professional Certificate";
                                applicant_info.append(h3_1);
                                data.certificate.forEach(function(cert) {
                                    let p3 = document.createElement("p");
                                    p3.innerHTML = `${cert.certificateName}`
                                    applicant_info.append(p3);
                                    let p4 = document.createElement("p");
                                    p4.innerHTML = `${cert.dateObtained}`
                                    applicant_info.append(p4);
                                    let p5 = document.createElement("p");
                                    p5.innerHTML = `${cert.issuingOrg}`
                                    applicant_info.append(p5);
                                })
                    
                                let h3_2 = document.createElement("h3");
                                h3_2.innerHTML = "Skills";
                                applicant_info.append(h3_2);
                                data.skills.forEach(function(skill) {
                                    let p6 = document.createElement("p");
                                    p6.innerHTML = `${skill}`
                                    applicant_info.append(p6);
                                })
                    
                                let h3_3 = document.createElement("h3");
                                h3_3.innerHTML = "Language";
                                applicant_info.append(h3_3);
                                let p7 = document.createElement("p");
                                p7.innerHTML = `${data.language}`
                                applicant_info.append(p7);
                        })
                        .catch((error) => {
                                console.error("Error getting document:", error);
                        });
                }
    
                (async () => {
                
                    try {
                      const result = await getVolunteerDetails();
                    } catch (error) {
                      console.error(error);
                    }
                  })();
    
    
            })
            .catch((error) => {
                console.error("Error:", error);
            });
                    
}

async function getPostDetails() {
    const idOrganization = getCookie("idOrganization");
    console.log(idOrganization);
    const colRefOrg = collection( db, 'organization' );
    const docRefOrg = doc(colRefOrg, idOrganization);
    let dataOrg = [];
    await getDoc(docRefOrg)
        .then((snapshot) => {
            console.log(snapshot);
            dataOrg = snapshot.data();
            console.log(dataOrg.name);
        

        })
        .catch((error) => {
            console.error("Error:", error);
        });

    const colRefPost = collection( db, 'posts' );
    const docRefPost = doc(colRefPost, idPost);
    let dataPost = []
    await getDoc(docRefPost)
        .then((snapshotPost) => {
            dataPost = snapshotPost.data();
            // console.log("Document data:", dataPost);
            document.getElementById("post_info").innerHTML = `<h2>Applied Position:</h2>
            <section>
            <h3>${dataPost.positionTitle}</h3>
            <p>${dataOrg.name}</p>
            <p>Posted On:${dataPost.date.toDate().toLocaleDateString()}</p>
            <p>Expiry On:${dataPost.expireDate.toDate().toLocaleDateString()}</p>
            <p>${dataPost.date.toDate().toLocaleDateString()}</p>
            <p>${dataPost.hours}</p>
            <p>${dataPost.location}</p>
            <p>${dataPost.skills}</p>
            <p>${dataPost.preferredLanguage}</p>
            <p>${dataPost.workMode}</p>
            </section>
            <section>
            <h3>Descriptions</h3>
            <p>${dataPost.description}</p>
            </section>
            `;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

const applicationRef = collection( db, 'application' );

async function getAppliedAndApprovedNumber() {
    const q = query(applicationRef, where("postsID", "==", idPost));

    let countApproved = 0;
    let applicantsArray = []
    await getDocs(q, applicationRef)
        .then((snapshot) => {
            snapshot.docs.forEach(doc => {
                applicantsArray.push(doc.data())
            })
            // console.log(applicantsArray);
            const h4 = document.createElement('h4');
            h4.innerText = `Applicants`;
            total.append(h4);
            const p = document.createElement('p');
            p.innerText = `${applicantsArray.length}`;
            total.append(p);

            for(let i = 0; i < applicantsArray.length; i++) {
                if(applicantsArray[i].status === "approved"){
                    countApproved++;
                }
            }

            const h4_2 = document.createElement('h4');
            h4_2.innerText = `Approved`;
            total.append(h4_2);
            const p1 = document.createElement('p');
            p1.innerText = `${countApproved}`;
            total.append(p1);  

        })
        .catch(err => {
            console.log(err.message)
        })
}

async function handleApproveButtonEvent() {
    const q = query(applicationRef, where( "volunteerID", "==" , idVolunteer ), where( "postsID", "==" , idPost ));

    await getDocs(q,applicationRef)
    .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
        const documentRef = doc(applicationRef, document.id);

        const dataToUpdate = {
            status: "approved"
        };

        updateDoc(documentRef, dataToUpdate)
            .then(() => {
            console.log('Document field updated successfully.');
            })
            .catch((error) => {
            console.error('Error updating document field:', error);
            });
        });
    })
    .catch((error) => {
        console.error("Error querying for documents:", error);
    });
}

async function declineEvent(e) {
    e.preventDefault();
    const q = query(applicationRef, where( "volunteerID", "==" , idVolunteer ), where( "postsID", "==" , idPost ));

    await getDocs(q,applicationRef)
    .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
        const documentRef = doc(applicationRef, document.id);

        const updatingData = {
            declineMessage : msg.value,
            status: "rejected"
        }
        

        updateDoc(documentRef, updatingData)
            .then(() => {
            console.log('Document field updated successfully.');
            })
            .catch((error) => {
            console.error('Error updating document field:', error);
            });
        });
    })
    .catch((error) => {
        console.error("Error querying for documents:", error);
    });
    section_decline_wrap.style.display = "none";
}

function cancelEvent(e) {
    e.preventDefault();
    section_decline_wrap.style.display = "none";
}

function handleDeclineButtonEvent() {
    section_decline_wrap.style.display = "block";
    decline.addEventListener('click', declineEvent);
    cancel.addEventListener('click', cancelEvent);
}

async function displayButtons() {
const declineButton = document.createElement('button');
declineButton.innerHTML = 'Decline';
button.append(declineButton);
declineButton.addEventListener('click', handleDeclineButtonEvent);
const approveButton = document.createElement('button');
approveButton.innerHTML = 'Approve';
button.append(approveButton);
approveButton.addEventListener('click', handleApproveButtonEvent);
}

(async () => {
                
    try {
      const result = await getApplicantInfo();
      const res = await getPostDetails();
      const res_num = await getAppliedAndApprovedNumber();
      const res_button = await displayButtons();
    } catch (error) {
      console.error(error);
    }
  })();

 