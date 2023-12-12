"use client"

import React, { useEffect, useState } from "react";

export default function App() {
  const [socket, setSocket] = useState<WebSocket>()
  const [messages, setMessages] = useState<Message[]>([])

  // connect to socket on load
  useEffect(() => {
    console.log('► connecting to socket server')
    setSocket(new WebSocket("wss://server-production-b4cf.up.railway.app"))
  }, [setSocket])

  // subscribe to message event and put them on state
  useEffect(()=>{
    if(!socket) return
    socket.onmessage = (message) =>  {
      console.log('got message from socket', message.data)
      // we assume values in message.data are already sanitized
      setMessages([...messages, JSON.parse(message.data) as Message])
    }
  }, [messages, setMessages, socket] )

  return (
    <div>
      <p>Overmind Chat</p>
      <ul>
      {messages.map(({user, body}, index) => <li key={index}>
        <span style={{color: user.color}}>{user.name}</span> {body}
      </li>
      )}
      </ul>

    </div>
  );
}

type Message = {
  user:{ 
    name: string, 
    color:string
  }, 
  body: string
}