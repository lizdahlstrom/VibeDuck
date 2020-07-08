import React, { createContext, useState, useEffect } from 'react';

export const PlaybackContext = createContext();

export const PlaybackProvider = (props) => {
  const [currentAudio, setCurrentAudio] = useState();
  const [play, setPlay] = useState(false);

  // sets up the event listener
  useEffect(() => {
    if (!currentAudio) return;

    currentAudio.addEventListener('ended', () => setPlay(false));
    return () => {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio.removeEventListener('ended', () => setPlay(false));
    };
  }, [currentAudio]);

  // handle play status
  useEffect(() => {
    if (!currentAudio) return;

    try {
      play ? currentAudio.play() : currentAudio.pause();
    } catch (err) {
      throw new Error('could not play audio', err);
    }
  }, [play, currentAudio]);

  return (
    <PlaybackContext.Provider
      value={[currentAudio, setCurrentAudio, play, setPlay]}>
      {props.children}
    </PlaybackContext.Provider>
  );
};
