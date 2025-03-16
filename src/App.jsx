import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setlength] = useState(8);
  const [Numberallowed, setNumberallowed] = useState(false);
  const [charallowed, setCharallowed] = useState(false);
  const [Passward, setpassward] = useState("");
  //use ref hooks
  const PasswardRef = useRef();
  const PasswardGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (Numberallowed) str += "0123456789";
    if (charallowed) str += "!@#$%^&*";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassward(pass);
  }, [length, Numberallowed, charallowed, setpassward]);

  const copypasswordtoclipboard = useCallback(() => {
    PasswardRef.current?.select();
    // PasswardRef.current?.setSelectionRange(0,5) // this is us to select the partiuluar text with range
    window.navigator.clipboard.writeText(Passward);
  }, [Passward]);

  useEffect(() => {
    PasswardGenerator();
  }, [length, Numberallowed, charallowed, PasswardGenerator]);

  return (
    <>
      <div
        className="w-full h-screen duration-200"
        style={{ background: "black" }}
      >
        <h1 className="flex flex-col   h-screen text-white text-5xl font-extrabold text-center leading-snug p-6 shadow-lg rounded-xl">
          This is the Passward generator <br />
          with{" "}
          <span className="text-yellow-500">Vite + React + Tailwind CSS</span>
        </h1>
        <div
          className="flex flex-col items-center justify-center absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  font-semibold text-center 
            w-full max-w-md shadow-lg rounded-lg px-4 py-8  bg-white bg-yellow-200 "
        >
          {" "}
          <p className="text-xl"> Password generator</p>
          <div className="flex shadow rounded-lg overflow-hidden w-full bg-gray-300 my-5 font-thin">
            <input
              type="text"
              value={Passward}
              className="outline-none w-full py-2 px-3 text-black"
              placeholder="Password appears here"
              readOnly
              ref={PasswardRef}
            />
            <button
              onClick={copypasswordtoclipboard}
              className="outline-none bg-blue-500 text-white px-3 py-1 shrink-0 "
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-3">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={15}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setlength(e.target.value);
                }}
              />
              <label> Length:{length}</label>
            </div>
            <div className="flex items-centre gap-x-1">
              <input
                type="checkbox"
                defaultChecked={Numberallowed}
                id="numberInput"
                onChange={() => {
                  setNumberallowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex items-centre gap-x-1">
            <input
                type="checkbox"
                defaultChecked={charallowed} 
                id="charInput"
                onChange={() => setCharallowed((prev) => !prev)}  
              />
              <label htmlFor="charInput">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
