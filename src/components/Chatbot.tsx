'use client'

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from 'next/image'

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! I am John, How may I assist you?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = { id: messages.length + 1, text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = { id: messages.length + 2, text: "Thank you for your message. I'm a demo bot.", sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[600px] w-full mx-auto border rounded-lg overflow-hidden">
      <div className="bg-primary p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-foreground">MIVA CHATBOT</h1>
        <Image
          src="/logo-tool.png"
          alt="Chatbot Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>
      <ScrollArea className="flex-grow p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow"
          />
          <Button onClick={handleSend} className="px-4 py-2">
            <Send className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export{ Component }