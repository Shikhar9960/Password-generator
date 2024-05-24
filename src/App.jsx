import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(false)
  const [character, setcharacter] = useState(false)
  const [password, setpassword] = useState("")

  const passwordRef = useRef(null)


  const passwordgenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (number) {
      str = str + "0123456789"
    }

    if (character) {
      str = str + "!@#$%^&*()_+-*/~"
    }


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setpassword(pass)

  }, [length, number, character, setpassword])





  const copypassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])


  useEffect(() => {
    passwordgenerator()
  }
    , [length, number, character, passwordgenerator])

  return (
    <div>

      <div className='text-center'>
        <h1 className='text-5xl font-serif m-10 text-center text-white '>PASSWORD GENERATOR</h1>
      </div>


      <div className=' m-auto bg-black w-1/2 flex p-10'>
        <input type="text" placeholder='Password' value={password} readOnly ref={passwordRef} className='p-3 m-auto w-2/3 text-black font-extrabold'  />
        <button className='bg-blue-700 text-white p-3 m-auto hover:bg-blue-900 ' onClick={copypassword}>Copy</button>
      </div>


      <div className='m-auto bg-black w-1/2 flex '>
        <input type="range" min={0} max={100} value={length} onChange={(e) => { setlength(e.target.value) }} className='m-auto' />
        <label htmlFor="" className='p-5 text-white m-auto'>Length :{length}</label>
        <input type="checkbox" className='m-auto' onChange={() => {
          setnumber((prev) => !prev)
        }} />
        <label htmlFor="" className='p-5 text-white m-auto'>Numbers</label>
        <input type="checkbox" className='m-auto' onChange={() => {
          setcharacter((prev) => !prev)
        }} />
        <label htmlFor="" className='p-5 text-white m-auto'>Characters</label>
      </div>


    </div>
  )
}

export default App
