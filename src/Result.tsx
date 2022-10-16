const Result = ({ meanings, phonetics, word }: any) => {
  return (
    <div className="w-full">
      <ul className="overflow-scroll max-h-64 max-w-fit">
        <li className="flex flex-col list-none">
          <span className="text-3xl font-bold">{word}</span>
          <p className="opacity-60">
            {phonetics?.map((phonetics: any) => (
              <span>{phonetics.text}</span>
            ))}
          </p>
        </li>

        {meanings?.map((meaning: any) => (
          <li className="my-8">
            <span className="text-xl font-bold">{meaning.partOfSpeech}</span>
            <div className="border-t border-b border-l-4 border-l-[#2fc1ff] rounded px-2">
              <span className="text-xl font-bold">Meaning</span>
              <p className="opacity-60">{meaning.definitions[0].definition}</p>
            </div>

            {meaning?.synonyms?.length > 0 && (
              <div className="border-t border-b border-l-4 border-l-[#2fc1ff] rounded px-2 mt-3">
                <span className="text-xl font-bold">Synonyms</span>
                <p className="opacity-60">{meaning.synonyms.join(", ")}</p>
              </div>
            )}
            
            {meaning?.antonyms?.length > 0 && (
              <div className="border-t border-b border-l-4 border-l-[#2fc1ff] rounded px-2 mt-3">
                <span className="text-xl font-bold">Antonyms</span>
                <p className="opacity-60">{meaning.antonyms.join(", ")}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
