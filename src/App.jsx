import { useState,useCallback, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [char, setChar] = useState(false)
  const [number, setNumber] = useState(false)
  const [password, setPassword] = useState("")

  // Using ref to get the ref of the text i the text field box 
  const passRef =useRef(null)

  const copyToClipBoard=useCallback(()=>{
    passRef.current?.select();

    // passRef.current?.setSelectionRange(0,3)

    window.navigator.clipboard.writeText(password)
  },[password])

  const passwordGenrator =useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="0123456789"
    if (char) str+="@#$&<>{}()+=_*?"
    for (let i = 1; i <= length; i++){
      let ch = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(ch)
    }
    setPassword(pass)

  },[length, number,char,setPassword])
  
  useEffect(()=>{passwordGenrator()},[length, number, char, setPassword, passwordGenrator])
  return (
   <>
   
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600'>
    <h1 className="text-xl text-white text-center py-2">
    PassWord-Generator</h1>
      <div className="flex shadow-md rounded-lg overflow-hidden mb-4">
        <input type="text"
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly 
        ref={passRef}/>
        <button className='outline=none bg-blue-500
         text-white px-3 py-0.5  focus:ring-4 
         shadow-xlg transform active:scale-75 
         transition-transform'
        onClick={copyToClipBoard}>copy</button>

      </div>
      <div className='flex text-sm gap-x-2'>

        {/* seting up the range courser */}
        <div className='flex items-center gap-x-1'>
        <input type="range"
          min={6}
          max={20}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}// reading the value form the text box in string 
           />                                            
           <label> Length: {length}</label>
        </div>


        <div className='flex items-center gap-x-1'>
        <input type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={()=>{setNumber(prev=> !prev)}} //change the state to the previous state
          />
          <label htmlFor='numInput' >Number</label>
        </div>

        <div className='flex items-center gap-x-1'>
        <input type="checkbox"
          defaultChecked={char}
          id="charInput"
          onChange={()=>{setChar(prev=> !prev)}} //change the state to the previous state
          />
          <label htmlFor='charInput'>Character</label>
        </div>

      </div>
    </div>
    
    </>
  )
}

export default App
