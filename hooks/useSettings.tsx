import { useRef} from 'react';

function useSettings() {

  const wordType = useRef<("random" | "sentences" | "numbers") | null>(window.localStorage.getItem("wordType") as "random" | "sentences" | "numbers");
  const wordNum = useRef<string | null>(window.localStorage.getItem("wordNum"));

  function save(wordType : string, wordNum : string) {
    window.localStorage.setItem("wordType", wordType);
    window.localStorage.setItem("wordNum", wordNum);
  }

  return {wordType : wordType.current, wordNum : wordNum.current, save};
}

export default useSettings;