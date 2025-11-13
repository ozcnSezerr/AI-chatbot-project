import { useState } from "react";
import { useGemini } from "./hooks/useGemini";
import { Chatbot } from "./components/Chatbot";
import User from "./components/User";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const { generate, loading } = useGemini();

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleChat = async (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = { role: "user", text: userInput };
    const updatedHistory = [...chatHistory, newUserMessage];
    setChatHistory(updatedHistory);
    setUserInput("");

    const responseText = await generate(updatedHistory);
    setChatHistory([...updatedHistory, { role: "model", text: responseText }]);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <div className="bottom-[calc(4rem+1.5rem)] right-0 m-auto bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px] flex flex-col">
        {/* Başlık */}
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          <p className="text-sm text-[#6b7280] leading-3">Powered by Wit1225</p>
        </div>

        {/* Chat alanı */}
        <div className="flex-1 overflow-auto pr-4 h-[474px]">
          <div className="max-h-[454px] overflow-auto">
            {chatHistory.map((msg, idx) =>
              msg.role === "user" ? (
                <User key={idx} text={msg.text} />
              ) : (
                <Chatbot key={idx} text={msg.text} />
              )
            )}
            {loading && (
              <Chatbot text="Gemini is typing..." />
            )}
          </div>
        </div>

        {/* Input alanı */}
        <div className="flex items-center pt-2">
          <form className="flex items-center justify-center w-full space-x-2" onSubmit={handleChat}>
            <input
              className="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
              placeholder="Message Gemini"
              value={userInput}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              disabled={loading}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
