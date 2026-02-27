import { useState, useEffect, useRef } from 'react';
import { RotateCcw, Timer, Zap, Target } from 'lucide-react';

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Technology has revolutionized the way we communicate and work in modern society. Practice makes perfect when it comes to improving your typing speed and accuracy.",
  "Programming is the art of telling another human what one wants the computer to do. The best way to predict the future is to invent it. Stay hungry, stay foolish, and never stop learning new things.",
  "In the world of technology, change is the only constant. Embrace challenges as opportunities for growth. Success is not final, failure is not fatal, it is the courage to continue that counts.",
  "The journey of a thousand miles begins with a single step. Focus on progress, not perfection. Every expert was once a beginner who refused to give up on their dreams and aspirations.",
];

function App() {
  const [sampleText, setSampleText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [elapsedTime, setElapsedTime] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    let interval: number | undefined;
    if (isActive && startTime) {
      interval = window.setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime]);

  const resetTest = () => {
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)];
    setSampleText(randomText);
    setUserInput('');
    setStartTime(null);
    setIsActive(false);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(100);
    setElapsedTime(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (!isActive && value.length === 1) {
      setStartTime(Date.now());
      setIsActive(true);
    }

    setUserInput(value);

    if (value === sampleText) {
      finishTest(value);
    }
  };

  const finishTest = (finalInput: string) => {
    setIsActive(false);
    setIsFinished(true);

    if (!startTime) return;

    const endTime = Date.now();
    const timeInMinutes = (endTime - startTime) / 1000 / 60;
    const wordsTyped = finalInput.trim().split(/\s+/).length;
    const calculatedWpm = Math.round(wordsTyped / timeInMinutes);

    let correctChars = 0;
    for (let i = 0; i < finalInput.length; i++) {
      if (finalInput[i] === sampleText[i]) {
        correctChars++;
      }
    }
    const calculatedAccuracy = Math.round((correctChars / sampleText.length) * 100);

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
  };

  const getCharacterColor = (index: number) => {
    if (index >= userInput.length) return 'text-gray-400';
    return userInput[index] === sampleText[index] ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Zap className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">Typing Speed Test</h1>
          </div>
          <p className="text-gray-600">Test your typing speed and accuracy</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Timer className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Time</span>
              </div>
              <p className="text-3xl font-bold text-blue-600">{elapsedTime}s</p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-600">WPM</span>
              </div>
              <p className="text-3xl font-bold text-green-600">{wpm}</p>
            </div>

            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-600">Accuracy</span>
              </div>
              <p className="text-3xl font-bold text-orange-600">{accuracy}%</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="bg-gray-50 rounded-xl p-6 mb-4 font-mono text-lg leading-relaxed border-2 border-gray-200">
              {sampleText.split('').map((char, index) => (
                <span key={index} className={getCharacterColor(index)}>
                  {char}
                </span>
              ))}
            </div>

            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              disabled={isFinished}
              placeholder="Start typing here..."
              className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl font-mono text-lg resize-none focus:outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>

          <button
            onClick={resetTest}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            <RotateCcw className="w-5 h-5" />
            New Test
          </button>
        </div>

        {isFinished && (
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Test Complete!</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-green-100 text-sm mb-1">Time Taken</p>
                <p className="text-4xl font-bold">{elapsedTime}s</p>
              </div>
              <div>
                <p className="text-green-100 text-sm mb-1">Speed</p>
                <p className="text-4xl font-bold">{wpm} WPM</p>
              </div>
              <div>
                <p className="text-green-100 text-sm mb-1">Accuracy</p>
                <p className="text-4xl font-bold">{accuracy}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
