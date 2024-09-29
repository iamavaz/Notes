import { useState, ChangeEvent, FormEvent } from 'react'
import Toast from './Components/Toast'
import './App.css'

interface Note {
  id: number
  content: string
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote(e.target.value)
  }

  const handleAddNote = (e: FormEvent) => {
    e.preventDefault()

    if (newNote.trim() === '') return

    const newNoteObject: Note = {
      id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
      content: newNote,
    }

    setNotes([...notes, newNoteObject])
    setNewNote('')
  }

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setToastMessage('Text copied to clipboard!')
      })
      .catch((err) => {
        console.error('Failed to copy text:', err)
        setToastMessage('Failed to copy text.')
      })
  }

  const handleCloseToast = () => { setToastMessage(null) }

  return (
    <div>
      <div id="title">
        <p><a href="https://store-avy.vercel.app" target="_blank">AVY</a> <a onClick={() => {window.location.reload()}}>NOTES</a></p>
        <p id="license">free and <a href="https://github.com/iamavaz/Notes" target="_blank">open-source</a></p>
      </div>
      <div>
        <form onSubmit={handleAddNote} className="input-container">
          <input type="text" value={newNote} onChange={handleInputChange} placeholder="Enter to add a new note" />
        </form>
      </div>
      <div>
        <div className="notes">
          {notes.map((note) => (
            <ul key={note.id}>
              <li onClick={() => handleCopyToClipboard(note.content)}>{note.content}</li>
            </ul>
          ))}
        </div>
      </div>
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )}
    </div>
  )
}