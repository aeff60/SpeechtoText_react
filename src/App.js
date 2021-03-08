import React, { useState, useEffect } from 'react'
import './App.css'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'th-TH'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  return (
    <>
      <h1>Speech To Text</h1>
      <div className="container">
        <div className="box">
          <h2>แปลงเสียงพูดเป็นข้อความ</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>ส่วนที่บันทึก</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
          
        </div>
      </div>
      <button onClick={handleSaveNote} disabled={!note}>
            บันทึก
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)}>
            เริ่ม/หยุด
          </button>
    </>
  )
}
export default App