"use client"

import { useEffect, useRef, useState } from "react"

import { ChatInfo } from "@/utils/chat_info.model"

import AiButton from "./ai_button.ui"
import Chat from "./chat.ui"

export default function Body() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [chatList, setChatList] = useState<ChatInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const listRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [isLoading])

  const askQuestion = async (_question: string) => {
    const newChatList: ChatInfo[] = [
      ...chatList,
      { id: chatList.length, owner: "user", content: _question },
    ]
    setChatList((_chatList) => [
      ..._chatList,
      { id: _chatList.length, owner: "user", content: _question },
    ])
    setQuestion("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:3000/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newChatList.map(({ owner, content }) => ({
            author: owner === "user" ? "0" : "1",
            content: content,
          })),
        }),
      })

      const { message } = await response.json()
      setChatList((_chatList) => [
        ..._chatList,
        { id: _chatList.length, owner: "bot", content: message.content },
      ])
    } catch (error) {
      console.log("error in client is: ", error)
    }

    setIsLoading(false)
  }

  return (
    <main className="relative">
      <div className="absolute top-0 left-0 h-screen w-screen p-2 flex justify-end items-end pointer-events-none z-10">
        <Chat
          isChatOpen={isChatOpen}
          question={question}
          setQuestion={(_question) => setQuestion(_question)}
          chatList={chatList}
          isLoading={isLoading}
          listRef={listRef}
        />
      </div>
      <div className="absolute top-0 left-0 h-screen w-screen py-7 px-6 flex justify-end items-end pointer-events-none z-20">
        <AiButton
          isChatOpen={isChatOpen}
          setIsChatOpen={(_isChatOpen) => setIsChatOpen(_isChatOpen)}
          question={question}
          askQuestion={askQuestion}
        />
      </div>
    </main>
  )
}
