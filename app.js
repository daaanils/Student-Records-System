
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore, collection, onSnapshot, addDoc} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdMNVaM-SUoVejAEMaeY8FAb8N5DcJqv0",
  authDomain: "studentrecords-aa4ff.firebaseapp.com",
  projectId: "studentrecords-aa4ff",
  storageBucket: "studentrecords-aa4ff.appspot.com",
  messagingSenderId: "564780572163",
  appId: "1:564780572163:web:d0c7c7934dd06fdd04f836",
  measurementId: "G-LBK9NQ16EG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

onSnapshot(collection(db, "students"), snapshot => {
    snapshot.forEach(student => {

        let studentRow = 
        ` <tr>
                
                <td class="p-2 fw-medium rounded-start">${student.data().firstName}</td>
                <td class="p-2 fw-medium">${student.data().lastName}</td>
                <td class="p-2 fw-medium">${student.data().batch}</td>
                <td class="p-2 fw-medium rounded-end">${student.data().grade}</td>
                
                

            </tr>
        `;

        document.querySelector("#tableArea").innerHTML += studentRow;
        

    })
});

function showModal(message) {
const modalBody = document.getElementById("modalBody");
modalBody.innerText = message; // Set the message in the modal
const modal = new bootstrap.Modal(document.getElementById("notificationModal")); // Create a new modal instance
modal.show(); // Show the modal
}


    
document.querySelector("#newStudentForm").addEventListener("submit", (event) => {

    event.preventDefault();


    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const batch = document.querySelector("#batch").value;
    const grade = document.querySelector("#grade").value;

    if (!firstName || !lastName || !batch || !grade) {
        showModal('All inputs are required to fill up!');
        return;
    }

    try {
    addDoc(collection(db, "students"), {
        firstName: firstName,
        lastName: lastName,
        batch: batch,
        grade:  grade
    });

    alert("Successfully Added!")

    document.querySelector("#newStudentForm").reset();
}catch {
    console.log("Error");
}


    });



