
declare global {
  interface Window {
    overmind: {
      socket: WebSocket
    }
  }
}

export {}
