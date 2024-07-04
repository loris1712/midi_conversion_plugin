import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/electron-vite.animate.svg'
import './App.css'
import { Button } from '@radix-ui/themes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen w-screen bg-black flex flex-col items-center justify-center'>
      <Button
        color="red"
        radius="full"
        onClick={() => setCount((count) => count + 1)}
      >
        Welcome
      </Button>
    </div>
  );
}

export default App
