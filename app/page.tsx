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

  const addMessage = (message:Message)=>{
    //desconnecta del estado y solo lee el primer estado no lee el nuevo estado.
    console.log('adding new message', message, messages.length)
    setMessages([...messages, message, {"user":{"name":"Liam","color":"#FF8E76"},"body":"LUL haha"}, {"user":{"name":"Liam","color":"#FF8E76"},"body":"Lolololol"}])
    // console.log(`Messages length ${messages.length}`)
  }

  // connect to socket on load
  useEffect(() => {
    console.log('► connecting to socket server')
    setSocket(connectToServer())
  }, [])

  // subscribe to message event and put them on state
  useEffect(() => {
    if(!socket) return
    socket.onmessage = (message) => {
      addMessage(message.data)
      // put it on back of execution queue to give time 
      // to react to rerender before adding more messages
      // setTimeout(()=>addMessage(message.data),0)
    }
  }, [socket])

  return (
    <div>
      <p>Overmind Chat</p>
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