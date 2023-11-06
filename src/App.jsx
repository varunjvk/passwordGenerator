import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const passRef=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numAllowed) str += '0123456789'
    if (charAllowed) str += '!@~#$%^&*[]{}()?><'
    for (let i = 1; i <= length; i++){
      let idx = Math.floor(Math.random() * str.length);
      pass+=str.charAt(idx)
    }

    setPassword(pass)
    
  }, [length, numAllowed, charAllowed])
  
  useEffect(() => { passwordGenerator() }, [length, numAllowed, charAllowed])

  const handleCopy = useCallback(() => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className="w-full max-w-lg shadow-md mx-auto rounded-lg px-4 py-3 bg-gray-600 text-orange-500 text-center my-8">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            className="w-full outline-none px-3 py-1"
            type="text"
            placeholder="password"
            readOnly
            value={password}
            ref={passRef}
          />
          <button
            className="outline-none bg-green-700 text-white px-3 py-0.5 shrink-0"
            title="copy"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>
        <div className="flex gap-x-5 text-sm">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex gap-x-2 text-sm">
            <input
              type="checkbox"
              id="numInput"
              defaultValue={numAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label htmlFor="">Numbers</label>
          </div>
          <div className="flex gap-x-2 text-sm">
            <input
              type="checkbox"
              id="chars"
              defaultValue={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
