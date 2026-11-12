import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [travel, setTravel] = useState('')

  return (
    <>
      <section id="center">
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>

        <label htmlFor="travel-name">Nombre del viaje</label>
        <textarea
          id="travel-name"
          className="text"
          value={travel}
          // El evento proporciona el valor actual del campo que estamos editando.
          onChange={(event) => setTravel(event.currentTarget.value)}
        />

        <button
          type="button"
          className="addTravel"
          onClick={() => console.log(travel)}
        >
          Mostrar viaje en consola
        </button>
      </section>
    </>
  )
}

export default App
