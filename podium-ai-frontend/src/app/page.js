"use client";

import {Poppins} from 'next/font/google'

import { useState, useRef } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import PulseLoader from "react-spinners/PulseLoader";

import { FaRegCopy } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";

const poppins = Poppins({
  subsets: ['latin'],
  weight: '500'
})

const Home = () => {
  const [text, setText] = useState("• ");

  const [format, setFormat] = useState("Speech");

  const [tone, setTone] = useState("Formal");

  const [response, setResponse] = useState("");

  const [generateSelected, setGenerateSelected] = useState(false);

  const responseRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setText((prev) => prev + "\n• ");
    }
  };

  const handleChange = (e) => {
    const newText = e.target.value;

    if (newText === "" || newText === "•") {
      setText("• ");
    } else {
      setText(newText);
    }
  };

  const handleGenerate = async () => {
    try {
      setResponse("");
      setGenerateSelected(true);

      setTimeout(() => {
        responseRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bullets: text, tone, format }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      setResponse(data.result);
    } catch (error) {
      console.error("Error:", error);
      setResponse("An Error Occured");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([response], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${format.toLowerCase()}_${
      new Date().toISOString().split("T")[0]
    }.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <div className={`w-full fixed top-0 h-[70px] bg-purple-400 flex items-center text-3xl border-b-[1px] border-gray-400 ${poppins.className}`}>
        {" "}
        <span className="pl-[235px]">Podium ai</span>{" "}
      </div>
      <div className="w-full h-[calc(100vh-70px)]">
        <section className="w-full h-[70px]"></section>

        {/* BULLET POINTS */}

        <div className="flex px-[250px] flex-col justify-center gap-5 py-5">
          <span>Enter bullet points</span>
          <div className="w-full h-[225px]">
            <textarea
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="• Start typing your first point..."
              className="w-full h-full p-4 font-mono border-[2px] border-gray-500 rounded-md"
            />
          </div>
        </div>

        {/* SELECT FORMAT */}

        <div className="flex px-[250px] flex-col justify-center gap-5 py-5">
          <span>Select Format</span>

          <div className="w-full h-[60px] flex items-center border-[2px] border-gray-500 rounded-md p-[2px] gap-[2px]">
            <button
              className={`${
                format == "Speech"
                  ? "bg-gradient-to-b transition from-rose-500 to-red-600 text-white rounded-sm"
                  : ""
              } w-1/2 h-full`}
              onClick={() => setFormat("Speech")}
            >
              Speech
            </button>
            <button
              className={`${
                format == "PressBrief"
                  ? "bg-gradient-to-b transition from-rose-500 to-red-600 text-white rounded-sm"
                  : ""
              } w-1/2 h-full`}
              onClick={() => setFormat("PressBrief")}
            >
              Press Briefing
            </button>
          </div>
        </div>

        {/* SELECT TONE */}

        <div className="flex px-[250px] flex-col justify-center gap-5 py-5">
          <span>Select Tone</span>

          <div className="w-full h-[60px] flex items-center border-[2px] border-gray-500 rounded-md p-[2px] gap-[2px]">
            <button
              className={`${
                tone == "Formal"
                  ? "bg-gradient-to-b from-rose-500 to-red-600 transition text-white rounded-sm"
                  : ""
              } w-1/3 h-full`}
              onClick={() => setTone("Formal")}
            >
              Formal
            </button>
            <button
              className={`${
                tone == "Conversational"
                  ? "bg-gradient-to-b from-rose-500 to-red-600 transition text-white rounded-sm"
                  : ""
              } w-1/3 h-full`}
              onClick={() => setTone("Conversational")}
            >
              Conversational
            </button>
            <button
              className={`${
                tone == "Executive"
                  ? "bg-gradient-to-b from-rose-500 to-red-600  transition text-white rounded-sm"
                  : ""
              } w-1/3 h-full`}
              onClick={() => setTone("Executive")}
            >
              Executive
            </button>
          </div>
        </div>

        {/* GENERATE RESPONSE */}

        <div className="w-full h-[170px] flex items-center px-[250px] flex-col justify-center gap-5 py-5">
          <button
            className="w-full h-[60px] flex items-center justify-center bg-green-600 rounded-md text-xl text-white cursor-pointer transition-all hover:bg-green-500"
            onClick={handleGenerate}
          >
            Generate
          </button>
        </div>

        {/* GENERATED RESPONSE */}

        {generateSelected && (
          <div
            className={`w-full pt-[60px] bg-gray-100 flex items-center justify-center`}
            ref={responseRef}
          >
            {response == "" ? (
              <div className="w-full h-[calc(100vh-70px)] flex items-center justify-center">
                <div className="w-[90px] h-[90px] flex items-center justify-center rounded-lg shadow-md bg-white">
                  <PulseLoader color="#36d7b7" size={10} />
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-auto h-auto">
                <MarkdownPreview
                  source={response}
                  style={{
                    padding: 16,
                    backgroundColor: "white",
                    color: "black",
                    paddingLeft: 32,
                    paddingRight: 32,
                  }}
                />
                <div className="w-full h-[60px] flex flex-row items-center justify-end gap-[15px] pr-[40px]">
                  <button
                    className="w-[40px] h-[40px] bg-blue-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-blue-400"
                    onClick={handleCopy}
                  >
                    <FaRegCopy />
                  </button>

                  <button
                    className="w-[40px] h-[40px] bg-blue-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-blue-400"
                    onClick={handleDownload}
                  >
                    <FaDownload />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
