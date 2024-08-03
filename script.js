  
const button = document.querySelector(".btn");
const textArea = document.querySelector("#text-area");

const color = document.querySelector("#color");
const notesContainer = document.querySelector(".notes_container");
const button2 = document.querySelectorAll(".buttons");
let count = 0;
button.addEventListener("click", () => {
    
    if (textArea.value === "") {
    
        alert("Please enter some text");
        return;
        

    }
    const note = document.createElement("div");
    note.classList.add("note");
    note.style.backgroundColor = color.value;
    note.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
    note.style.padding = "10px";
    note.style.margin = "10px 10px 10px 10px";
    note.style.display = "inline-flex";
    note.style.float ="left";
    note.style.alignItems = "center";
    note.style.gap="30px";
    note.style.justifyContent = "space-between";
    note.style.fontSize = "12px";
    note.style.borderRadius = "10px";
    note.style.padding = "20px";
    note.style.cursor = "pointer";
    note.style.transition = "background-color 0.3s ease";

    note.innerHTML = `
    <p style="color: ${color.value="white"}">${textArea.value} </p>
        <button style="backgroundcolor :none";class="buttons" onclick="deleteNote(this)">          ❌</button> `

    notesContainer.appendChild(note);
    textArea.value = "";
    count++;
    playClickSound2();
    console.log(count);
});

//  for delete 

function deleteNote(element) {
    
    element.parentElement.remove();

    count--;
    console.log(count);
    playClickSound();
}


function playClickSound() {
    const sound = document.getElementById('click-sound');
    sound.currentTime = 0; 
    sound.play(); 
}
 

function playClickSound2() {
    const sound = document.getElementById('click-sound2');
    sound.currentTime = 0; // Reset the audio to the beginning
    sound.play(); // Play the sound
}


