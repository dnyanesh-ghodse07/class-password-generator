import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(4);
  const [allowNumbers, setAllowNumbers] = useState(false);
  const [allowCharacters, setAllowCharacters] = useState(false);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowNumbers) {
      str += "0123456789";
    }

    if (allowCharacters) {
      str += "!±@$#%^*:;";
    }
    for (let i = 1; i <= length; i++) {
      let characterIndex = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(characterIndex);
    }
    setPassword(pass);
  }, [length, allowCharacters, allowNumbers, setLength]);

  useEffect(() => {
    generatePassword();
  }, [length, allowCharacters, allowNumbers]);

  return (
    <>
      <h1>Password Generator</h1>
      <div className="password-input">
        <input
          type="text"
          value={password}
          placeholder="password"
          //   onChange={(e) => setPassword(e.target.value)}
        />
        <button>Copy</button>
      </div>
      <div className="options">
        <div className="range">
          <input
            type="range"
            min={8}
            max={50}
            value={length}
            name=""
            id=""
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: {length}</label>
        </div>
        <div className="numbers">
          <input
            type="checkbox"
            name=""
            id=""
            value={allowNumbers}
            onChange={() => setAllowNumbers((prev) => !prev)}
          />
          <label htmlFor="length">Numbers</label>
        </div>
        <div className="characters">
          <input
            type="checkbox"
            name=""
            id=""
            value={allowCharacters}
            onChange={() => setAllowCharacters((prev) => !prev)}
          />
          <label htmlFor="length">Special Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
