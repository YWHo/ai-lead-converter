"use client";

import React, { useEffect } from "react";
import { useChat } from "ai/react";
import RiseLoader from "react-spinners/RiseLoader";

interface LeadMagnetAIChatContainerProps {
  leadMagnetId: string;
  emailCapturePrompt: string;
  firstQuestion: string;
  prompt: string;
  captureEmail: boolean;
}

function LeadMagnetAIChatContainer({
  firstQuestion,
  prompt,
}: LeadMagnetAIChatContainerProps) {
  const {
    messages,
    handleSubmit: handleOpenAIChatSubmit,
    input,
    handleInputChange,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/openai",
  });

  useEffect(() => {
    setMessages([
      { role: "system", content: prompt, id: "1" },
      { role: "assistant", content: firstQuestion, id: "2" },
    ]);
  }, [prompt, firstQuestion, setMessages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: capture user email
    handleOpenAIChatSubmit(e);
  };

  return (
    <div className="flex h-full w-full max-w-3xl flex-col">
      <div className="flex-grow space-y-4 overflow-y-auto rounded-md border-2 border-solid p-4">
        {messages.length === 0 && (
          <div>No messages yet. Start chatting below!</div>
        )}
        {messages
          .filter((message) => message.role !== "system")
          .map((message, idx) => (
            <div
              key={idx}
              className={`flex items-start ${
                message.role === "user" ? "justify-end ml-6" : "mr-6"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {message.content.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
      </div>
      <form onSubmit={handleSubmit} className="my-4 flex">
        <textarea
          value={input}
          onChange={handleInputChange}
          className="flex-grow rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Type your message"
          rows={1}
          style={{ resize: "none" }}
        />
        <button
          type="submit"
          className="ml-4 mt-auto h-10 flex-shrink-0 rounded-md bg-purple-500 px-4 text-white disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? (
            <RiseLoader color="white" size={4} />
          ) : (
            <span>Send</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default LeadMagnetAIChatContainer;
