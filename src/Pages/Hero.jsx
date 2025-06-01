import React, { useState, useEffect } from "react";
import {
  Camera,
  Send,
  Leaf,
  MessageCircle,
  BarChart3,
  Upload,
  TreePine,
  Sprout,
} from "lucide-react";

// AfterAnalysis Component
function AfterAnalysis({ treeNumber, npkValues, onBack }) {
  const [photos, setPhotos] = useState({
    stem: null,
    leaf: null,
    bud: null,
    general: null,
  });

  const [uploadStatus, setUploadStatus] = useState("");

  const handlePhotoUpload = (type, event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotos((prev) => ({
        ...prev,
        [type]: file,
      }));
    }
  };

  const uploadPhotos = async () => {
    setUploadStatus("Uploading...");
    try {
      const formData = new FormData();
      Object.entries(photos).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });
      formData.append("treeNumber", treeNumber);

      // Replace with actual API call
      // await axios.post('/postphotos', formData);

      setTimeout(() => {
        setUploadStatus("Photos uploaded successfully!");
      }, 2000);
    } catch (error) {
      setUploadStatus("Upload failed. Please try again.");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-white min-h-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-green-800 flex items-center gap-2">
            <TreePine className="w-8 h-8" />
            Analysis Results - Tree #{treeNumber}
          </h2>
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Analysis
          </button>
        </div>

        {/* NPK Values Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {npkValues.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-green-100"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-800">
                  Spot {index + 1}
                </h3>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">N:</span>
                    <span className="font-medium">{value.n || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">P:</span>
                    <span className="font-medium">{value.p || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">K:</span>
                    <span className="font-medium">{value.k || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Photo Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-green-100">
          <h3 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
            <Camera className="w-6 h-6" />
            Upload Plant Photos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[
              { key: "stem", label: "Stem", icon: "🌿" },
              { key: "leaf", label: "Leaf", icon: "🍃" },
              { key: "bud", label: "Bud", icon: "🌱" },
              { key: "general", label: "General", icon: "📸" },
            ].map(({ key, label, icon }) => (
              <div key={key} className="text-center">
                <label className="block cursor-pointer">
                  <div className="w-full h-32 bg-green-50 border-2 border-dashed border-green-300 rounded-lg flex flex-col items-center justify-center hover:bg-green-100 transition-colors">
                    {photos[key] ? (
                      <div className="text-green-600">
                        <Camera className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">Photo Selected</p>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <div className="text-2xl mb-2">{icon}</div>
                        <p className="text-sm">Upload {label}</p>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhotoUpload(key, e)}
                  />
                </label>
                <p className="text-sm text-gray-600 mt-2">{label} Photo</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              onClick={uploadPhotos}
              disabled={!Object.values(photos).some((photo) => photo)}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Photos
            </button>
            {uploadStatus && (
              <p
                className={`text-sm ${
                  uploadStatus.includes("success")
                    ? "text-green-600"
                    : uploadStatus.includes("failed")
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {uploadStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Hero Component
function Hero() {
  const [treeNumber, setTreeNumber] = useState("");
  const [currentSpot, setCurrentSpot] = useState(null);
  const [npkValues, setNpkValues] = useState([
    { n: "", p: "", k: "" },
    { n: "", p: "", k: "" },
    { n: "", p: "", k: "" },
    { n: "", p: "", k: "" },
  ]);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Chat state
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your agriculture assistant. I can help you with farming questions, crop management, soil health, and plant diseases. How can I assist you today?",
      sender: "bot",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Ref for auto-scrolling chat
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSpotClick = (spotIndex) => {
    setCurrentSpot(spotIndex);
  };

  const handleNPKChange = (field, value) => {
    if (currentSpot !== null) {
      setNpkValues((prev) => {
        const updated = [...prev];
        updated[currentSpot] = { ...updated[currentSpot], [field]: value };
        return updated;
      });
    }
  };

  const startAnalysis = async () => {
    if (!treeNumber) {
      alert("Please enter a tree number");
      return;
    }

    const allSpotsCompleted = npkValues.every(
      (spot) => spot.n && spot.p && spot.k
    );
    if (!allSpotsCompleted) {
      alert("Please complete NPK values for all 4 spots");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to backend
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Replace with actual API call
      // const response = await axios.post('/analyze', { treeNumber, npkValues });

      setShowAnalysis(true);
    } catch (error) {
      alert("Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsChatLoading(true);

    try {
      const response = await callGeminiAPI(currentMessage);

      const botResponse = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting to the AI service right now. Please try again in a moment.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Gemini API Integration
  const callGeminiAPI = async (message) => {
    // Replace with your actual Gemini API key
    const API_KEY = "AIzaSyDcpqbEV5A2gCdKkhTbp93AUxPnmizV-R4";
    const model = "learnlm-2.0-flash-experimental";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    // Agriculture-focused system prompt
    const systemPrompt = `You are an expert agriculture assistant helping farmers with their questions. 
    You should only answer questions related to:
    - Crop management and farming techniques
    - Soil health and fertilization
    - Plant diseases and pest control
    - Agricultural equipment and tools
    - Weather and climate considerations
    - Irrigation and water management
    - Seed selection and planting
    - Harvest timing and post-harvest handling
    - Organic farming practices
    - Agricultural economics and market advice

    If someone asks about topics unrelated to agriculture, politely redirect them back to farming topics.
    Keep your responses practical, helpful, and concise. Use simple language that farmers can easily understand.
    
    User question: ${message}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: systemPrompt,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    };

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Invalid response format from Gemini API");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };

  if (showAnalysis) {
    return (
      <AfterAnalysis
        treeNumber={treeNumber}
        npkValues={npkValues}
        onBack={() => setShowAnalysis(false)}
      />
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 to-white flex overflow-hidden">
      {/* Left Panel - Analysis */}
      <div className="w-full lg:w-1/2 p-8 overflow-y-auto">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-green-800 mb-2 flex items-center justify-center gap-2">
              <Sprout className="w-8 h-8" />
              Tree Analysis
            </h1>
            <p className="text-gray-600">
              Analyze your tree's NPK values across 4 spots
            </p>
          </div>

          {/* Tree Number Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tree Number
            </label>
            <input
              type="number"
              value={treeNumber}
              onChange={(e) => setTreeNumber(e.target.value)}
              placeholder="Enter tree number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Spot Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Select Measurement Spot
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((spotIndex) => (
                <button
                  key={spotIndex}
                  onClick={() => handleSpotClick(spotIndex)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currentSpot === spotIndex
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-green-300 text-gray-700"
                  }`}
                >
                  <div className="font-medium">Spot {spotIndex + 1}</div>
                  <div className="text-xs mt-1">
                    {npkValues[spotIndex].n &&
                    npkValues[spotIndex].p &&
                    npkValues[spotIndex].k
                      ? "✓ Completed"
                      : "Pending"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* NPK Input */}
          {currentSpot !== null && (
            <div className="mb-8 p-6 bg-white rounded-lg border border-green-100 shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                NPK Values for Spot {currentSpot + 1}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {["n", "p", "k"].map((nutrient) => (
                  <div key={nutrient}>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      {nutrient.toUpperCase()}
                    </label>
                    <input
                      type="number"
                      value={npkValues[currentSpot][nutrient]}
                      onChange={(e) =>
                        handleNPKChange(nutrient, e.target.value)
                      }
                      placeholder="0.0"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Start Analysis Button */}
          <button
            onClick={startAnalysis}
            disabled={isLoading}
            className="w-full py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                <BarChart3 className="w-5 h-5" />
                Start Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {/* Right Panel - Chatbot */}
      <div className="w-full lg:w-1/2 bg-white border-l border-gray-200 flex flex-col h-screen max-h-screen">
        {/* Chat Header - Fixed */}
        <div className="flex-shrink-0 p-6 border-b border-gray-200 bg-green-600 text-white">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Agriculture Assistant
          </h2>
          <p className="text-green-100 text-sm mt-1">Powered by Gemini AI</p>
        </div>

        {/* Messages - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.sender === "user"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          {/* Invisible element for auto-scroll */}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input - Fixed */}
        <div className="flex-shrink-0 p-6 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about crops, soil, diseases..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isChatLoading}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
