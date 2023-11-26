"use client"

import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function AiButton({
  isChatOpen,
  setIsChatOpen,
  question,
  askQuestion,
}: {
  isChatOpen: boolean
  setIsChatOpen: (isChatOpen: boolean) => void
  question: string
  askQuestion: (message: string) => void
}) {
  if (isChatOpen) {
    if (question.length > 0) {
      return (
        <button
          key={"ai-button-ui"}
          className="h-12 w-12 p-3 bg-white hover:bg-blue-100 rounded-full transition-colors pointer-events-auto shadow-2xl"
          onClick={() => {
            askQuestion(question)
          }}
        >
          <FontAwesomeIcon
            key={"hero-button-ui"}
            icon={faAngleRight}
            className="h-full w-full text-blue-600 rotate-0 transition-transform"
          />
        </button>
      )
    } else {
      return (
        <button
          key={"ai-button-ui"}
          className="h-12 w-12 p-3 bg-white hover:bg-blue-100 rounded-full transition-colors pointer-events-auto shadow-2xl"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <FontAwesomeIcon
            key={"hero-button-ui"}
            icon={faAngleRight}
            className="h-full w-full text-blue-600 rotate-90 transition-transform"
          />
        </button>
      )
    }
  } else {
    return (
      <button
        key={"ai-button-ui"}
        className="h-12 w-12 p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors pointer-events-auto shadow-2xl"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <FontAwesomeIcon
          key={"hero-button-ui"}
          icon={faAngleRight}
          className="h-full w-full text-white -rotate-90 transition-transform"
        />
      </button>
    )
  }
}
