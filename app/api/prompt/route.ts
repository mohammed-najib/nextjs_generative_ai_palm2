import { NextResponse } from "next/server"

const LANGUAGE_MODEL_URL = process.env.LANGUAGE_MODEL_URL

export async function POST(req: Request, _: Response) {
  try {
    const { messages } = await req.json()

    const payload = {
      prompt: {
        messages: messages,
      },
      candidate_count: 1,
    }

    const response = await fetch(LANGUAGE_MODEL_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    const responseJson = await response.json()
    if (!responseJson.candidates) {
      return NextResponse.json(
        {
          message: {
            author: "1",
            content: "Sorry, I couldn't process your question",
          },
        },
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    }
    const output = responseJson.candidates[0]

    return NextResponse.json(
      { message: output },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: {
          author: "1",
          content: "Sorry, I couldn't process your question",
        },
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
  }
}
