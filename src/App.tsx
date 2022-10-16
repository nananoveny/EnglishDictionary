import React, { useEffect, useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

import useDictionaryStore from "./stores/dictionaryStore";
import Result from "./Result";

const synth = window.speechSynthesis;

const App = () => {
  const voices = synth.getVoices();
  const [voiceSelected, setVoiceSelected] = useState("Google US English");
  const [text, setText] = useState("");

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find((voice) => voice.name === voiceSelected);
    utterance.voice = voice!; // voice ?? null
    synth.speak(utterance);
  };

  const dictionaryFetch = useDictionaryStore(
    (state: any) => state.dictionaryFetch
  );

  const { meanings, phonetics, word } = useDictionaryStore(
    (state: any) => state.data
  );

  const handleSpeak = () => {
    if (!text.trim()) return;
    if (!synth.speaking) {
      speak(text);
    } else {
      synth.cancel();
    }
  };

  useEffect(() => {
    if (!text.trim()) return;
    const debounce = setTimeout(() => {
      dictionaryFetch(text);
    }, 500);
    return () => clearTimeout(debounce);
  }, [text]);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#a0e2fe]">
      <div className="bg-white p-10 rounded-md space-y-4 shadow-lg">
        <span className="text-4xl font-bold text-[#2fc1ff]">
          English Dictionary
        </span>
        <form action="">
          <div className="flex flex-col space-y-4">
            <textarea
              name=""
              id=""
              cols="30"
              rows="4"
              placeholder="Enter text"
              className="border-2 rounded outline-none p-2"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="">
              <div className="flex space-x-2 cursor-pointer">
                <select
                  name=""
                  id=""
                  className="w-full outline-none"
                  value={voiceSelected}
                  onChange={(e) => setVoiceSelected(e.target.value)}
                >
                  {voices?.map((voice) => (
                    <option value={voice.name} key={voice.name}>
                      {voice.name}
                    </option>
                  ))}
                </select>
                <FaVolumeUp size={20} onClick={handleSpeak} />
              </div>
            </div>
          </div>
        </form>
        <Result
          meanings={meanings}
          phonetics={phonetics}
          word={word}
          setText={setText}
        />
      </div>
    </div>
  );
};

export default App;
