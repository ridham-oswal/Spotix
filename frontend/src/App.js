import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Components from './components';

const { 
  Sidebar, 
  Header, 
  MusicPlayer, 
  HomePage, 
  SearchPage, 
  LibraryPage, 
  PlaylistPage, 
  AlbumPage 
} = Components;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const audioRef = useRef(null);

  // Mock data for current track
  useEffect(() => {
    if (!currentTrack) {
      setCurrentTrack({
        id: 1,
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: 200,
        albumArt: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=300&fit=crop"
      });
    }
  }, [currentTrack]);

  // Simulate audio playback
  useEffect(() => {
    let interval;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handlePageChange = (page, data = null) => {
    setCurrentPage(page);
    if (data) {
      if (page === 'playlist') {
        setSelectedPlaylist(data);
      } else if (page === 'album') {
        setSelectedAlbum(data);
      }
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onTrackSelect={handleTrackSelect} onPageChange={handlePageChange} />;
      case 'search':
        return <SearchPage searchQuery={searchQuery} onTrackSelect={handleTrackSelect} onPageChange={handlePageChange} />;
      case 'library':
        return <LibraryPage onTrackSelect={handleTrackSelect} onPageChange={handlePageChange} />;
      case 'playlist':
        return <PlaylistPage playlist={selectedPlaylist} onTrackSelect={handleTrackSelect} onPageChange={handlePageChange} />;
      case 'album':
        return <AlbumPage album={selectedAlbum} onTrackSelect={handleTrackSelect} onPageChange={handlePageChange} />;
      default:
        return <HomePage onTrackSelect={handleTrackSelect} onPageChange={handlePageChange} />;
    }
  };

  return (
    <div className="App bg-black text-white min-h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          currentPage={currentPage} 
          onPageChange={handlePageChange}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            currentPage={currentPage}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onPageChange={handlePageChange}
          />
          
          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {renderCurrentPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
      
      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={currentTrack?.duration || 0}
        volume={volume}
        onPlayPause={handlePlayPause}
        onVolumeChange={setVolume}
        onTimeChange={setCurrentTime}
      />
    </div>
  );
}

export default App;