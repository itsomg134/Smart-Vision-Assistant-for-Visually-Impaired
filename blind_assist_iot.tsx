import React, { useState, useEffect } from 'react';
import { Camera, Mic, Volume2, AlertCircle, Wifi, Zap, Eye, Navigation } from 'lucide-react';

export default function BlindAssistant() {
  const [isScanning, setIsScanning] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [systemStatus, setSystemStatus] = useState('Ready');
  const [voiceCommand, setVoiceCommand] = useState('');
  const [cameraActive, setCameraActive] = useState(false);

  // Text-to-speech function
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert(text);
    }
  };

  // Start camera (simulated for demo)
  const startCamera = () => {
    setCameraActive(true);
    setSystemStatus('Camera Active - Ready to Scan');
    speak('Camera activated. Ready to scan your surroundings.');
  };

  // Simulate object detection with random realistic objects
  const simulateObjectDetection = () => {
    const possibleObjects = [
      { name: 'Chair', positions: ['left', 'right', 'center'], distances: ['near', 'medium'] },
      { name: 'Table', positions: ['center', 'right'], distances: ['near', 'medium'] },
      { name: 'Door', positions: ['left', 'center', 'right'], distances: ['medium', 'far'] },
      { name: 'Wall', positions: ['left', 'right'], distances: ['near', 'medium'] },
      { name: 'Person', positions: ['left', 'center', 'right'], distances: ['medium', 'far'] },
      { name: 'Window', positions: ['left', 'right'], distances: ['medium', 'far'] },
      { name: 'Book', positions: ['center'], distances: ['near'] },
      { name: 'Cup', positions: ['center', 'right'], distances: ['near'] },
      { name: 'Plant', positions: ['left', 'right'], distances: ['near', 'medium'] },
      { name: 'Lamp', positions: ['left', 'right'], distances: ['medium'] }
    ];

    const numObjects = Math.floor(Math.random() * 4) + 3; // 3-6 objects
    const selected = [];
    
    for (let i = 0; i < numObjects; i++) {
      const obj = possibleObjects[Math.floor(Math.random() * possibleObjects.length)];
      const position = obj.positions[Math.floor(Math.random() * obj.positions.length)];
      const distance = obj.distances[Math.floor(Math.random() * obj.distances.length)];
      
      selected.push({
        name: obj.name,
        position: position,
        distance: distance
      });
    }
    
    return selected;
  };

  // Scan environment
  const scanEnvironment = async () => {
    if (!cameraActive) {
      speak('Please activate camera first');
      return;
    }

    setIsScanning(true);
    setSystemStatus('Scanning environment...');
    speak('Scanning your surroundings');

    // Simulate scanning delay
    setTimeout(() => {
      const objects = simulateObjectDetection();
      setDetectedObjects(objects);
      
      // Generate description
      const description = `I detected ${objects.length} objects in your surroundings. ${
        objects.find(o => o.distance === 'near') 
          ? 'Be careful, there are objects close to you.' 
          : 'The path ahead appears clear.'
      }`;
      
      setAiResponse(description);
      
      // Speak results
      let spokenText = `I can see ${objects.length} objects. `;
      objects.forEach((obj, i) => {
        spokenText += `${obj.name} is on your ${obj.position}, ${obj.distance} distance. `;
      });
      spokenText += description;
      
      speak(spokenText);
      setSystemStatus('Scan complete');
      setIsScanning(false);
    }, 2000);
  };

  // Voice recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setSystemStatus('Listening for command...');
        speak('Listening');
      };

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        setVoiceCommand(command);
        handleVoiceCommand(command);
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        setSystemStatus('Ready');
        speak('Could not understand command. Please try again.');
      };

      recognition.onend = () => {
        setIsListening(false);
        setSystemStatus('Ready');
      };

      recognition.start();
    } else {
      alert('Voice recognition not supported in this browser. Please use Chrome or Edge.');
      speak('Voice recognition not supported. Please use the buttons instead.');
    }
  };

  // Handle voice commands
  const handleVoiceCommand = (command) => {
    setSystemStatus(`Processing: ${command}`);
    
    if (command.includes('scan') || command.includes('look') || command.includes('see') || command.includes('environment')) {
      scanEnvironment();
    } else if (command.includes('describe') || command.includes('what') || command.includes('tell')) {
      if (aiResponse) {
        speak(aiResponse + '. ' + detectedObjects.map(o => 
          `${o.name} is on your ${o.position}, ${o.distance} distance`
        ).join('. '));
      } else {
        speak('Please scan first');
      }
    } else if (command.includes('camera') || command.includes('start')) {
      startCamera();
    } else if (command.includes('object') && detectedObjects.length > 0) {
      speak(`There are ${detectedObjects.length} objects detected`);
    } else if (command.includes('help')) {
      speak('Available commands: Say scan to analyze surroundings. Say describe to repeat last description. Say start camera to activate camera. Say objects to know how many objects detected.');
    } else {
      speak('Command not recognized. Say help for available commands.');
    }
  };

  // Initial greeting
  useEffect(() => {
    setTimeout(() => {
      speak('Smart Vision Assistant ready. Tap Start Camera, then tap Scan to analyze your surroundings. You can also use voice commands by tapping the microphone button.');
    }, 500);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <Eye className="w-8 h-8 md:w-10 md:h-10 text-yellow-400" />
            Smart Vision Assistant
          </h1>
          <p className="text-base md:text-lg text-blue-200">IoT-Powered Assistance for the Visually Impaired</p>
        </div>

        {/* Status Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-4 border border-white/20">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Wifi className={`w-5 h-5 ${cameraActive ? 'text-green-400' : 'text-gray-400'}`} />
              <span className="font-semibold text-sm md:text-base">{systemStatus}</span>
            </div>
            {isSpeaking && (
              <div className="flex items-center gap-2 text-yellow-400">
                <Volume2 className="w-5 h-5 animate-pulse" />
                <span className="text-sm md:text-base">Speaking...</span>
              </div>
            )}
          </div>
        </div>

        {/* Camera Visualization */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden mb-4 border-4 border-white/20 relative">
          <div className="w-full h-48 md:h-64 flex items-center justify-center">
            {cameraActive ? (
              <div className="text-center">
                <Camera className="w-20 h-20 text-green-400 mx-auto mb-3 animate-pulse" />
                <p className="text-xl font-bold text-green-400">Camera Active</p>
                <p className="text-sm text-gray-400 mt-2">Ready to scan environment</p>
              </div>
            ) : (
              <div className="text-center">
                <Camera className="w-20 h-20 text-gray-600 mx-auto mb-3" />
                <p className="text-xl font-bold text-gray-400">Camera Inactive</p>
                <p className="text-sm text-gray-500 mt-2">Tap "Start Camera" to begin</p>
              </div>
            )}
          </div>
          {isScanning && (
            <div className="absolute inset-0 bg-blue-500/20 animate-pulse flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="w-16 h-16 text-white animate-spin mx-auto" />
                <p className="text-xl font-bold mt-2">Scanning...</p>
              </div>
            </div>
          )}
        </div>

        {/* Main Control Buttons */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button
            onClick={startCamera}
            className="bg-green-600 hover:bg-green-700 p-4 md:p-6 rounded-2xl flex flex-col items-center gap-2 transition-all transform active:scale-95 shadow-lg"
          >
            <Camera className="w-8 h-8 md:w-12 md:h-12" />
            <span className="font-bold text-xs md:text-base">Start Camera</span>
          </button>

          <button
            onClick={scanEnvironment}
            disabled={isScanning || !cameraActive}
            className="bg-blue-600 hover:bg-blue-700 p-4 md:p-6 rounded-2xl flex flex-col items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Navigation className={`w-8 h-8 md:w-12 md:h-12 ${isScanning ? 'animate-spin' : ''}`} />
            <span className="font-bold text-xs md:text-base">{isScanning ? 'Scanning...' : 'Scan Now'}</span>
          </button>

          <button
            onClick={startListening}
            disabled={isListening}
            className="bg-purple-600 hover:bg-purple-700 p-4 md:p-6 rounded-2xl flex flex-col items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50 shadow-lg"
          >
            <Mic className={`w-8 h-8 md:w-12 md:h-12 ${isListening ? 'animate-pulse' : ''}`} />
            <span className="font-bold text-xs md:text-base">{isListening ? 'Listening...' : 'Voice'}</span>
          </button>
        </div>

        {/* Last Voice Command */}
        {voiceCommand && (
          <div className="bg-purple-600/30 backdrop-blur-lg rounded-2xl p-4 mb-4 border border-purple-400/30">
            <p className="text-sm text-purple-200 mb-1">Last Command:</p>
            <p className="text-lg font-semibold">"{voiceCommand}"</p>
          </div>
        )}

        {/* Detected Objects */}
        {detectedObjects.length > 0 && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-6 mb-4 border border-white/20">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Detected Objects ({detectedObjects.length})
            </h2>
            <div className="space-y-3">
              {detectedObjects.map((obj, idx) => (
                <div key={idx} className="bg-white/10 p-3 md:p-4 rounded-xl hover:bg-white/20 transition-all">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-lg md:text-xl font-semibold">{obj.name}</span>
                    <div className="flex gap-2">
                      <span className="text-xs md:text-sm bg-purple-500 px-2 md:px-3 py-1 rounded-full">
                        {obj.position}
                      </span>
                      <span className="text-xs md:text-sm bg-blue-500 px-2 md:px-3 py-1 rounded-full">
                        {obj.distance}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const text = detectedObjects.map(o => 
                  `${o.name} is on your ${o.position}, ${o.distance} distance`
                ).join('. ');
                speak(text);
              }}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Volume2 className="w-5 h-5" />
              Speak All Objects
            </button>
          </div>
        )}

        {/* AI Description */}
        {aiResponse && (
          <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-white/20 mb-4">
            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
              <Volume2 className="w-6 h-6" />
              Scene Description
            </h2>
            <p className="text-base md:text-lg leading-relaxed">{aiResponse}</p>
            <button
              onClick={() => speak(aiResponse)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl flex items-center gap-2 transition-all"
            >
              <Volume2 className="w-5 h-5" />
              Repeat Description
            </button>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-yellow-600/20 backdrop-blur-lg rounded-2xl p-4 md:p-6 border border-yellow-400/30">
          <h3 className="text-lg md:text-xl font-bold mb-3 text-yellow-300">How to Use:</h3>
          <ul className="space-y-2 text-yellow-100 text-sm md:text-base">
            <li>• <strong>Step 1:</strong> Tap "Start Camera" to activate</li>
            <li>• <strong>Step 2:</strong> Tap "Scan Now" to analyze surroundings</li>
            <li>• <strong>Step 3:</strong> Listen to object descriptions</li>
            <li>• <strong>Voice:</strong> Tap microphone and say commands like "scan", "describe", or "help"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}