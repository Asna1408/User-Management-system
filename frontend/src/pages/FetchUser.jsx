import React, { useState } from 'react'

function FetchUser() {
    const [users, setUsers] = useState('')
    const fetch =async()=>{
        const response = await fetch("https://jsonplaceholder.org/users")
        const data = await response.data
        setUsers(data)
    }   
  return (
    <div>
      <button onClick={fetch}>Click me</button>
      {users ? ( <div>
        {users.map(user=>(<h1>{user.name}</h1>))}
      </div> ):(<>click button</>)}
    </div>
  )
}

export default FetchUser
