import React, { useState, useRef } from 'react';

const AudioRecorder = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunks = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks.current, { type: 'audio/webm' });
        chunks.current = [];
        onRecordingComplete(audioBlob);
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div>
      {recording ? (
        <button onClick={stopRecording}>⏹ Stop Recording</button>
      ) : (
        <button onClick={startRecording}>🎙 Start Recording</button>
      )}
    </div>
  );
};

export default AudioRecorder;
