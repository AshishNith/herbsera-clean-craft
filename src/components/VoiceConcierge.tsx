import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, PhoneOff, Mic, MicOff, Sparkles, Loader2, X, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { SYSTEM_PROMPT } from "@/constants/websiteContext";

export default function VoiceConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [callState, setCallState] = useState<"idle" | "connecting" | "active" | "ended">("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isMutedRef = useRef(isMuted);

  // Sync mute state ref to prevent stale closures in Web Audio callbacks
  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyArCieA7gW8N1kbrfWP6GPOsaG9KoG6e4g";

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const micSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  
  // Playback queue management
  const nextPlayTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  const stopAudioPlayback = () => {
    // Stop all scheduled playback nodes to handle barge-in/interruption
    activeSourcesRef.current.forEach(source => {
      try {
        source.stop();
      } catch (err) {
        // Source might have already finished
      }
    });
    activeSourcesRef.current = [];
    if (audioContextRef.current) {
      nextPlayTimeRef.current = audioContextRef.current.currentTime;
    }
  };

  const endCall = () => {
    // Guard against double-invocation (onclose → endCall → ws.close → onclose loop)
    if (wsRef.current) {
      const ws = wsRef.current;
      wsRef.current = null;
      ws.onclose = null;
      ws.onerror = null;
      ws.onmessage = null;
      ws.close();
    }

    setCallState("ended");

    // Stop mic stream
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach(track => track.stop());
      micStreamRef.current = null;
    }

    // Stop script processor nodes
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (micSourceRef.current) {
      micSourceRef.current.disconnect();
      micSourceRef.current = null;
    }

    // Stop playback
    stopAudioPlayback();

    // Close AudioContext
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    setTimeout(() => {
      setCallState("idle");
    }, 2000);
  };

  const startCall = async () => {
    if (!apiKey) {
      setErrorMessage("Gemini API Key is missing in the environment configuration.");
      return;
    }

    setCallState("connecting");
    setErrorMessage("");

    try {
      // 1. Initialize AudioContext at 16kHz for input downsampling
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass({ sampleRate: 16000 });
      audioContextRef.current = audioContext;
      nextPlayTimeRef.current = audioContext.currentTime;

      // 2. Request microphone permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        }
      });
      micStreamRef.current = stream;

      // 3. Connect WebSocket to Gemini Realtime Live API (v1beta)
      const socketUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key=${apiKey.trim()}`;
      const ws = new WebSocket(socketUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        // Send session configuration handshake
        const setupMessage = {
          setup: {
            model: "models/gemini-3.1-flash-live-preview",
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                languageCode: "hi-IN",
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: "Kore"
                  }
                }
              }
            },
            systemInstruction: {
              parts: [{ text: SYSTEM_PROMPT }]
            }
          }
        };
        ws.send(JSON.stringify(setupMessage));
      };

      ws.onmessage = async (event) => {
        try {
          let text = "";
          if (typeof event.data === "string") {
            text = event.data;
          } else if (event.data instanceof Blob) {
            text = await event.data.text();
          } else if (event.data instanceof ArrayBuffer) {
            text = new TextDecoder().decode(event.data);
          } else {
            text = event.data.toString();
          }

          const message = JSON.parse(text);

          // Handle setup completion
          if (message.setupComplete) {
            setCallState("active");

            // Make the AI speak first by sending an initial prompt
            const greetMessage = {
              clientContent: {
                turns: [
                  {
                    role: "user",
                    parts: [
                      {
                        text: "Namaste! Please greet the customer warmly in friendly Hinglish as the HerbsEra Botanical Concierge. Introduce yourself briefly and ask how you can help them today. Keep it short, warm, and natural."
                      }
                    ]
                  }
                ],
                turnComplete: true
              }
            };
            ws.send(JSON.stringify(greetMessage));

            // Start Recording & Streaming Microphone Input
            const source = audioContext.createMediaStreamSource(stream);
            micSourceRef.current = source;

            // scriptProcessor captures mono inputs in chunks of 2048
            const processor = audioContext.createScriptProcessor(2048, 1, 1);
            scriptProcessorRef.current = processor;

            processor.onaudioprocess = (e) => {
              if (isMutedRef.current || ws.readyState !== WebSocket.OPEN) return;

              const float32 = e.inputBuffer.getChannelData(0);
              
              // Downsample/convert Float32 samples [-1.0, 1.0] to signed Int16 PCM [-32768, 32767]
              const pcm16 = new Int16Array(float32.length);
              for (let i = 0; i < float32.length; i++) {
                const s = Math.max(-1, Math.min(1, float32[i]));
                pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
              }

              // Encode PCM buffer to Base64
              const u8Array = new Uint8Array(pcm16.buffer);
              let binary = "";
              for (let i = 0; i < u8Array.byteLength; i++) {
                binary += String.fromCharCode(u8Array[i]);
              }
              const base64 = btoa(binary);

              // Stream audio chunk to WebSocket
              ws.send(JSON.stringify({
                realtimeInput: {
                  audio: {
                    mimeType: "audio/pcm;rate=16000",
                    data: base64
                  }
                }
              }));
            };

            source.connect(processor);
            processor.connect(audioContext.destination);
            return;
          }
          
          // Check for incoming audio content from model
          const parts = message.serverContent?.modelTurn?.parts;
          if (parts) {
            for (const part of parts) {
              const inlineData = part.inlineData;
              if (inlineData && inlineData.mimeType?.startsWith("audio/pcm")) {
                const base64Audio = inlineData.data;
                
                // Decode base64 to byte array
                const binaryStr = atob(base64Audio);
                const bytes = new Uint8Array(binaryStr.length);
                for (let i = 0; i < binaryStr.length; i++) {
                  bytes[i] = binaryStr.charCodeAt(i);
                }

                const int16Samples = new Int16Array(bytes.buffer);
                
                // Convert 16-bit PCM back to float32 values for web playback
                const float32Samples = new Float32Array(int16Samples.length);
                for (let i = 0; i < int16Samples.length; i++) {
                  float32Samples[i] = int16Samples[i] / 32768.0;
                }

                // Play back 24kHz audio chunk gaplessly on timeline
                if (audioContextRef.current && audioContextRef.current.state !== "suspended") {
                  const playCtx = audioContextRef.current;
                  const audioBuffer = playCtx.createBuffer(1, float32Samples.length, 24000);
                  audioBuffer.getChannelData(0).set(float32Samples);

                  const sourceNode = playCtx.createBufferSource();
                  sourceNode.buffer = audioBuffer;
                  sourceNode.connect(playCtx.destination);

                  const startTime = Math.max(nextPlayTimeRef.current, playCtx.currentTime);
                  sourceNode.start(startTime);
                  
                  // Keep track of node to support interruption/barge-in
                  activeSourcesRef.current.push(sourceNode);
                  nextPlayTimeRef.current = startTime + audioBuffer.duration;
                  
                  sourceNode.onended = () => {
                    activeSourcesRef.current = activeSourcesRef.current.filter(n => n !== sourceNode);
                  };
                }
              }
            }
          }

          // Handle interruption flag from server if any
          if (message.serverContent?.interrupted) {
            stopAudioPlayback();
          }

        } catch (err) {
          console.error("Error processing websocket message:", err);
        }
      };

      ws.onerror = (err) => {
        console.error("WebSocket Error:", err);
        setErrorMessage("Connection failed. Check your API key.");
      };

      ws.onclose = (event) => {
        console.error("WebSocket closed. Code:", event.code, "Reason:", event.reason);
        if (event.code !== 1000) {
          const reason = event.reason || "Connection closed unexpectedly.";
          setErrorMessage(reason.length > 80 ? reason.slice(0, 80) + "…" : reason);
        }
        endCall();
      };

    } catch (err: any) {
      console.error("Failed to start voice session:", err);
      setErrorMessage(err.message || "Could not access microphone.");
      setCallState("idle");
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      // Clear scheduled playbacks if muting (assumes user wants to speak or silence model)
      stopAudioPlayback();
    }
  };

  return (
    <>
      {/* Floating Calling Icon */}
      <div className="fixed bottom-6 left-6 z-[150]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.3)] cursor-pointer text-white relative transition-colors ${
            callState === "active" ? "bg-red-500 hover:bg-red-600 shadow-red-500/20" : "bg-forest hover:bg-forest-light"
          }`}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {callState === "active" ? (
            <PhoneOff size={22} className="animate-pulse" />
          ) : (
            <Phone size={22} className="animate-bounce" />
          )}

          {callState === "active" && (
            <span className="absolute inset-0 rounded-full border border-red-400 animate-ping opacity-75" />
          )}
          {callState === "idle" && (
            <span className="absolute inset-0 rounded-full border border-emerald-400 animate-ping opacity-25 pointer-events-none" />
          )}
        </motion.button>
      </div>

      {/* Glassmorphic Concierge Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 150 }}
            className="fixed bottom-24 left-6 w-[calc(100%-3rem)] sm:w-96 bg-[#022c22]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-6 z-[150] text-white flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-lime-400" />
                <h3 className="font-headline font-black text-sm uppercase tracking-wider text-white">Botanical Concierge</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center gap-8 py-4">
              {/* Audio Animation / Waveform */}
              <div className="relative w-32 h-32 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
                {callState === "active" ? (
                  <>
                    {/* Pulsing sound waves */}
                    <motion.div
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full border border-lime-400/20"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 0.4 }}
                      className="absolute inset-0 rounded-full border border-lime-400/40"
                    />
                    <Volume2 size={36} className="text-lime-400 animate-pulse" />
                  </>
                ) : callState === "connecting" ? (
                  <Loader2 size={36} className="text-lime-400 animate-spin" />
                ) : (
                  <Phone size={36} className="text-stone-400" />
                )}
              </div>

              {/* Status Indicator */}
              <div className="text-center space-y-1">
                <p className="font-headline font-black text-sm uppercase tracking-widest text-white">
                  {callState === "active"
                    ? "Call Connected"
                    : callState === "connecting"
                    ? "Connecting..."
                    : callState === "ended"
                    ? "Call Ended"
                    : "Concierge Offline"}
                </p>
                <p className="text-[10px] font-body text-stone-400 max-w-[280px]">
                  {callState === "active"
                    ? "Speak naturally. Ask about gemstone soaps, ingredients, or order policies."
                    : callState === "connecting"
                    ? "Initializing WebSocket handshake & audio context..."
                    : callState === "ended"
                    ? "Thank you for visiting HerbsEra."
                    : "Click Start Call to initiate real-time botanical audio assistant."}
                </p>
                {errorMessage && (
                  <p className="text-[10px] font-body text-red-400 font-semibold pt-2">
                    ⚠️ {errorMessage}
                  </p>
                )}
              </div>

              {/* Active Call Controls */}
              <div className="flex items-center gap-4 w-full pt-4 border-t border-white/5 justify-center">
                {callState === "active" ? (
                  <>
                    {/* Mute Button */}
                    <Button
                      onClick={toggleMute}
                      variant="outline"
                      size="icon"
                      className={`w-12 h-12 rounded-full bg-white/5 border-white/10 text-white hover:bg-white/10 ${
                        isMuted ? "text-red-400 border-red-500/30 bg-red-500/10" : ""
                      }`}
                    >
                      {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                    </Button>
                    
                    {/* End Call Button */}
                    <Button
                      onClick={endCall}
                      className="bg-red-500 hover:bg-red-600 text-white w-28 h-12 rounded-full font-headline font-black text-[10px] uppercase tracking-wider"
                    >
                      <PhoneOff size={16} className="mr-1.5 inline" /> End Call
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={startCall}
                    disabled={callState === "connecting"}
                    className="bg-lime-400 hover:bg-white text-emerald-950 w-48 h-12 rounded-full font-headline font-black text-[10px] uppercase tracking-widest"
                  >
                    <Phone size={16} className="mr-1.5 inline animate-pulse" /> Start Call
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
