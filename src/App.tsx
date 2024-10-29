import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, RefreshCw } from 'lucide-react';
import { questions, mockEvaluate } from './mockData';
import { RadarChart } from './components/RadarChart';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [evaluation, setEvaluation] = useState<any>(null);
  const [recognition, setRecognition] = useState<any>(null);
  const [interimTranscript, setInterimTranscript] = useState('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'zh-CN';

      recognition.onresult = (event: any) => {
        let finalTranscript = '';
        let currentInterimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            currentInterimTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript) {
          setAnswer(prevAnswer => {
            const newAnswer = prevAnswer ? `${prevAnswer} ${finalTranscript}` : finalTranscript;
            return newAnswer.trim();
          });
          setInterimTranscript('');
        } else {
          setInterimTranscript(currentInterimTranscript);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
    setIsListening(!isListening);
  };

  const handleSubmit = () => {
    const result = mockEvaluate(answer);
    setEvaluation(result.result);
  };

  const getNewQuestion = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
    setAnswer('');
    setEvaluation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-indigo-900 mb-4">Sales Training Assessment</h1>
            <p className="text-lg text-gray-600">Enhance your sales skills through AI-powered feedback</p>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Scenario #{currentQuestion.id}</h2>
              <button
                onClick={getNewQuestion}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
              >
                <RefreshCw size={20} />
                New Question
              </button>
            </div>
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">Context: {currentQuestion.context}</p>
              <p className="text-lg text-gray-800">{currentQuestion.question}</p>
            </div>

            {/* Answer Input */}
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={answer + (interimTranscript ? ` ${interimTranscript}` : '')}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Type your answer here or use voice input (支持中文语音输入)"
                />
                {isListening && interimTranscript && (
                  <div className="absolute bottom-2 right-2">
                    <span className="text-sm text-gray-400">Recording...</span>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={toggleListening}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    isListening
                      ? 'bg-red-100 text-red-600 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                  {isListening ? '停止录音' : '开始录音'}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Send size={20} />
                  Submit Answer
                </button>
              </div>
            </div>
          </div>

          {/* Evaluation Results */}
          {evaluation && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Evaluation Results</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Performance Analysis</h3>
                  <RadarChart scores={evaluation} />
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Expert Feedback</h3>
                    <p className="text-gray-600">{evaluation.expert_comment}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Reference Answer</h3>
                    <p className="text-gray-600">{evaluation.reference_answer}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;