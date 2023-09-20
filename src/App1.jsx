import { useCallback, useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState();
  const [allowChars, setAllowChars] = useState(false);
  const [allowNumbers, setAllowNumbers] = useState(false);

  const passwordRef = useRef(null);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (allowNumbers) str += "0123456789";
    if (allowChars) str += "!#$%^&*_+?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, allowChars, allowNumbers, setLength, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, allowChars, allowNumbers, generatePassword]);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <h1 className="">Password Generator</h1>
      <div className="">
        <input
          ref={passwordRef}
          type="text"
          value={password}
          placeholder="Password"
          readOnly
        />
        <button onClick={copyToClipboard}>Copy</button>
      </div>
      <div className="options">
        <div className="option">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="">Length : {length}</label>
        </div>
        <div className="option">
          <div className="char-check">
            <input
              type="checkbox"
              defaultChecked={allowNumbers}
              name="charInput"
              id=""
              onChange={() => setAllowChars((prev) => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
          <div className="num-check">
            <input
              type="checkbox"
              defaultChecked={allowChars}
              name=""
              id="numberInput"
              onChange={() => setAllowNumbers((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
