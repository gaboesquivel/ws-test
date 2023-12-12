"use client"

import React, { useCallback, useEffect, useState } from "react";

const connectToServer = () => {
  const socket = new WebSocket("wss://server-production-b4cf.up.railway.app");

  socket.onmessage = (event) => console.log(event);

  return socket;
};

export default function App() {
  const [socket, setSocket] = useState<WebSocket>()
  const [messages, setMessages] = useState<Message[]>([])

  // connect to socket on load
  useEffect(() => {
    console.log('► connecting to socket server')
    const socket = connectToServer()
    setSocket(socket)



  }, [setSocket])

  // subscribe to message event and put them on state
  useEffect(()=>{
    if(!socket) return
    socket.onmessage = (message) =>  {
      console.log('got message from socket', message.data)
      setMessages([...messages, JSON.parse(message.data) as Message])
    }
  }, [messages, setMessages, socket] )

  return (
    <div>
      <p>Overmind Chat</p>
      <ul>
      {messages.map(({user, body}, index) => {
        console.log({user, body})
        return (<li key={index}>
        <span className={`text-[${user.color.toString()}]`}>{user.name}</span> {body}
      </li>)
      })}
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