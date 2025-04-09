        document.addEventListener('DOMContentLoaded', () => {
            const button = document.querySelector(".btn");
            const textArea = document.querySelector("#text-area");
            const color = document.querySelector("#color");
            const notesContainer = document.querySelector(".notes_container");
            let notes = [];

            // Load notes from localStorage
            if (localStorage.getItem('stickyNotes')) {
                notes = JSON.parse(localStorage.getItem('stickyNotes'));
                renderNotes();
            }

            button.addEventListener("click", addNote);

            function addNote() {
                if (textArea.value.trim() === "") {
                    showAlert("Please enter some text");
                    return;
                }

                const newNote = {
                    id: Date.now(),
                    text: textArea.value,
                    color: color.value,
                    createdAt: new Date().toISOString()
                };

                notes.unshift(newNote);
                saveNotes();
                renderNotes();
                textArea.value = "";
                playAddSound();
            }

            function renderNotes() {
                if (notes.length === 0) {
                    notesContainer.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-sticky-note"></i>
                            <p>No notes yet. Add your first note!</p>
                        </div>
                    `;
                    return;
                }

                notesContainer.innerHTML = notes.map(note => `
                    <div class="note" style="background-color: ${note.color}">
                        <p>${note.text}</p>
                        <button onclick="deleteNote(${note.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('');
            }

            function deleteNote(id) {
                notes = notes.filter(note => note.id !== id);
                saveNotes();
                renderNotes();
                playClickSound();
            }

            function saveNotes() {
                localStorage.setItem('stickyNotes', JSON.stringify(notes));
            }

            function showAlert(message) {
                const alert = document.createElement('div');
                alert.style.position = 'fixed';
                alert.style.top = '20px';
                alert.style.left = '50%';
                alert.style.transform = 'translateX(-50%)';
                alert.style.backgroundColor = '#dc3545';
                alert.style.color = 'white';
                alert.style.padding = '10px 20px';
                alert.style.borderRadius = '5px';
                alert.style.zIndex = '1000';
                alert.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                alert.textContent = message;
                document.body.appendChild(alert);
                
                setTimeout(() => {
                    alert.style.opacity = '0';
                    setTimeout(() => alert.remove(), 300);
                }, 2000);
            }

            function playClickSound() {
                const sound = document.getElementById('click-sound');
                sound.currentTime = 0;
                sound.play().catch(e => console.log("Sound playback prevented:", e));
            }

            function playAddSound() {
                const sound = document.getElementById('add-sound');
                sound.currentTime = 0;
                sound.play().catch(e => console.log("Sound playback prevented:", e));
            }

            // Make functions available globally
            window.deleteNote = deleteNote;
        });

