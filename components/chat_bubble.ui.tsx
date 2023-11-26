"use client"

import { ChatInfo } from "@/utils/chat_info.model"

export default function ChatBubble({ chatInfo }: { chatInfo: ChatInfo }) {
  if (chatInfo.owner === "user") {
    return (
      <div
        key={"ai-button-ui"}
        className="max-w-[75%] ml-auto mr-2 my-2 py-2 px-4 bg-white rounded-tr-none rounded-l-lg rounded-b-lg shadow-2xl"
      >
        {chatInfo.content}
      </div>
    )
  } else {
    return (
      <div
        key={"ai-button-ui"}
        className="max-w-[75%] mr-auto ml-2 my-2 py-2 px-4 bg-white rounded-tl-none rounded-r-lg rounded-bl-lg shadow-2xl"
      >
        {chatInfo.content}
      </div>
    )
  }
}
