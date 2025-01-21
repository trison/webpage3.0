import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <audio loop src="assets/audio/laugh-track.mp3" id="laugh">yr browser can't do audio tags lol</audio>
      <div className="card-container">
        <div className="card">
          <p>trison nguyen</p>
          <p>software dev :)</p>
        </div>
        <div className="card-under"></div>
      </div>
      <button id="count" onClick={() => setCount((count) => count + 1)}>
          count is {count}
      </button>
    </>
  )
}

export default App
