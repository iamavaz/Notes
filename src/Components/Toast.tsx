import React from 'react'
import '../App.css'

interface ToastProps {
  message: string
  onClose: () => void
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return <div className="toast">{message}</div>
}

export default Toast