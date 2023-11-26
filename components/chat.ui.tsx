"use client"

import { MutableRefObject } from "react"

import { ChatInfo } from "@/utils/chat_info.model"

import ChatBubble from "./chat_bubble.ui"

export default function Chat({
  isChatOpen,
  question,
  setQuestion,
  chatList,
  isLoading,
  listRef,
}: {
  isChatOpen: boolean
  question: string
  setQuestion: (question: string) => void
  chatList: ChatInfo[]
  isLoading: boolean
  listRef: MutableRefObject<HTMLDivElement | null>
}) {
  if (isChatOpen) {
    return (
      <div
        key={"chat-ui"}
        className="max:h-3/4 h-[600px] w-[500px] pt-4 pb-3 px-4 flex flex-col bg-blue-600 rounded-lg transition-transform pointer-events-auto"
      >
        <div className="text-white font-bold">
          <div className="text-lg">Chat with</div>
          <div className="text-3xl">PaLM 2 Bot</div>
        </div>
        <div className="h-full my-3 p-2 flex flex-col bg-blue-400 rounded overflow-y-auto">
          <div ref={listRef}>
            {chatList.map((chatInfo) => {
              return <ChatBubble key={chatInfo.id} chatInfo={chatInfo} />
            })}
            {isLoading && (
              <div className="w-full flex justify-center">
                <div className="text-white text-2xl font-bold animate-pulse">
                  ...
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mr-16">
          <textarea
            rows={3}
            className="w-full p-2 rounded focus:outline-none resize-y"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
        </div>
      </div>
    )
  } else {
    return (
      <div
        key={"chat-ui"}
        className="max:h-3/4 h-0 w-0 bg-blue-600 rounded-lg transition-transform pointer-events-auto"
      ></div>
    )
  }
}
