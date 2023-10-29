import { useEffect, useState, useCallback, useRef } from "react";


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useREf 
  const passRef = useRef(null)









  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charactersAllowed) {
      str += "!@#$%^&*()_+-";
    }
    for (let i = 1; i < length; i++) {
      let character = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(character);
    }
    setPassword(pass);
  }, [length, numberAllowed, charactersAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(()=>{
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,length );
    window.navigator.clipboard.writeText(password)
  }, [password])



  useEffect(() => {
    passwordGenerator();
  }, [
    length,
    numberAllowed,
    charactersAllowed,
    setPassword,
    passwordGenerator,
  ]);
  return (
    <>
      <div className="w-full w-sm-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-zinc-200">
        <h1 className="text-yellow-600 text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            className="outline-none w-full py-1 px-3"
            value={password}
            placeholder="password"
            readonly
            ref={passRef}
          />
          <button
          onClick={copyPasswordToClipboard} 
          className="outline-none bg-blue-700 text-white px-3 py-0.5">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);

              
              
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charactersAllowed}
              id="characterInput"
              onChange={() => {
                setCharactersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
        made by <a href="www.instagram.com/pdlsensei">@pdlsensei</a>
      </div>
    </>
  );
}

export default App;
