import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <p>trison nguyen</p>
        <p>software dev :)</p>
      </div>
      <button id="count" onClick={() => setCount((count) => count + 1)}>
          count is {count}
      </button>
    </>
  )
}

export default App
