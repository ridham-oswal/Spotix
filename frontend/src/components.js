import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Search, 
  Library, 
  Heart, 
  Plus, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Clock,
  Download,
  UserPlus
} from 'lucide-react';

// Mock Data
const mockData = {
  recentlyPlayed: [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", albumArt: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=300&fit=crop", duration: 200 },
    { id: 2, title: "Watermelon Sugar", artist: "Harry Styles", album: "Fine Line", albumArt: "https://images.unsplash.com/photo-1614204424926-196a80bf0be8?w=300&h=300&fit=crop", duration: 174 },
    { id: 3, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", albumArt: "https://images.unsplash.com/photo-1486413869840-a99ac0a4c031?w=300&h=300&fit=crop", duration: 203 },
    { id: 4, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", albumArt: "https://images.unsplash.com/photo-1711054824441-064a99073a0b?w=300&h=300&fit=crop", duration: 178 },
    { id: 5, title: "Stay", artist: "The Kid LAROI, Justin Bieber", album: "F*CK LOVE 3", albumArt: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?w=300&h=300&fit=crop", duration: 141 },
    { id: 6, title: "Industry Baby", artist: "Lil Nas X, Jack Harlow", album: "MONTERO", albumArt: "https://images.unsplash.com/photo-1582730147924-d92f4da00252?w=300&h=300&fit=crop", duration: 212 }
  ],
  
  madeForYou: [
    { id: 1, name: "Discover Weekly", description: "Your weekly mixtape of fresh music", image: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?w=300&h=300&fit=crop", type: "playlist" },
    { id: 2, name: "Release Radar", description: "Catch all the latest music from artists you follow", image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?w=300&h=300&fit=crop", type: "playlist" },
    { id: 3, name: "Daily Mix 1", description: "The Weeknd, Dua Lipa, Harry Styles and more", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop", type: "playlist" },
    { id: 4, name: "Your Time Capsule", description: "The songs that got you through it all", image: "https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?w=300&h=300&fit=crop", type: "playlist" },
    { id: 5, name: "Chill Mix", description: "The perfect mix to unwind to", image: "https://images.unsplash.com/photo-1670028514318-0ac718c0590d?w=300&h=300&fit=crop", type: "playlist" }
  ],
  
  popularArtists: [
    { id: 1, name: "The Weeknd", image: "https://images.unsplash.com/photo-1603569613911-606cb59f28e9?w=300&h=300&fit=crop", type: "artist" },
    { id: 2, name: "Dua Lipa", image: "https://images.pexels.com/photos/5077069/pexels-photo-5077069.jpeg?w=300&h=300&fit=crop", type: "artist" },
    { id: 3, name: "Harry Styles", image: "https://images.unsplash.com/photo-1614204424926-196a80bf0be8?w=300&h=300&fit=crop", type: "artist" },
    { id: 4, name: "Taylor Swift", image: "https://images.unsplash.com/photo-1486413869840-a99ac0a4c031?w=300&h=300&fit=crop", type: "artist" },
    { id: 5, name: "Drake", image: "https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=300&fit=crop", type: "artist" }
  ],

  userPlaylists: [
    { id: 1, name: "My Playlist #1", description: "50 songs", image: "https://images.unsplash.com/photo-1711054824441-064a99073a0b?w=300&h=300&fit=crop", songs: 50 },
    { id: 2, name: "Chill Vibes", description: "32 songs", image: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?w=300&h=300&fit=crop", songs: 32 },
    { id: 3, name: "Workout Mix", description: "28 songs", image: "https://images.unsplash.com/photo-1582730147924-d92f4da00252?w=300&h=300&fit=crop", songs: 28 },
    { id: 4, name: "Road Trip", description: "45 songs", image: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?w=300&h=300&fit=crop", songs: 45 }
  ],

  browseCategories: [
    { id: 1, name: "Pop", color: "bg-pink-500", image: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg?w=300&h=300&fit=crop" },
    { id: 2, name: "Hip-Hop", color: "bg-orange-500", image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop" },
    { id: 3, name: "Rock", color: "bg-red-500", image: "https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?w=300&h=300&fit=crop" },
    { id: 4, name: "Electronic", color: "bg-purple-500", image: "https://images.unsplash.com/photo-1670028514318-0ac718c0590d?w=300&h=300&fit=crop" },
    { id: 5, name: "Jazz", color: "bg-blue-500", image: "https://images.unsplash.com/photo-1603569613911-606cb59f28e9?w=300&h=300&fit=crop" },
    { id: 6, name: "Classical", color: "bg-green-500", image: "https://images.pexels.com/photos/5077069/pexels-photo-5077069.jpeg?w=300&h=300&fit=crop" }
  ]
};

// Sidebar Component
const Sidebar = ({ currentPage, onPageChange }) => {
  return (
    <div className="w-64 bg-black p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Spotify</h1>
      </div>
      
      {/* Main Navigation */}
      <nav className="mb-8">
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => onPageChange('home')}
              className={`flex items-center space-x-3 w-full text-left p-2 rounded-lg transition-colors ${
                currentPage === 'home' ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Home size={24} />
              <span className="font-semibold">Home</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onPageChange('search')}
              className={`flex items-center space-x-3 w-full text-left p-2 rounded-lg transition-colors ${
                currentPage === 'search' ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Search size={24} />
              <span className="font-semibold">Search</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => onPageChange('library')}
              className={`flex items-center space-x-3 w-full text-left p-2 rounded-lg transition-colors ${
                currentPage === 'library' ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Library size={24} />
              <span className="font-semibold">Your Library</span>
            </button>
          </li>
        </ul>
      </nav>
      
      {/* Library Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <Plus size={20} />
            <span>Create Playlist</span>
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-2 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
              <Heart size={16} className="text-white" />
            </div>
            <span>Liked Songs</span>
          </div>
          
          {mockData.userPlaylists.slice(0, 3).map((playlist) => (
            <div key={playlist.id} className="flex items-center space-x-3 p-2 rounded-lg text-gray-400 hover:text-white transition-colors cursor-pointer">
              <img src={playlist.image} alt={playlist.name} className="w-8 h-8 rounded" />
              <span className="text-sm truncate">{playlist.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ currentPage, searchQuery, onSearchChange, onPageChange }) => {
  return (
    <header className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors">
          <ChevronLeft size={20} className="text-gray-400" />
        </button>
        <button className="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors">
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        
        {currentPage === 'search' && (
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for songs, artists, or albums"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-white text-black pl-10 pr-4 py-2 rounded-full w-96 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform">
          Upgrade
        </button>
        <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
      </div>
    </header>
  );
};

// Card Component for albums, playlists, artists
const Card = ({ item, onSelect, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 p-4 rounded-lg hover:bg-gray-700 hover:bg-opacity-70 transition-all duration-300 cursor-pointer group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect && onSelect(item)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative mb-4">
        <img
          src={item.image || item.albumArt}
          alt={item.name || item.title}
          className="w-full aspect-square object-cover rounded-lg shadow-lg"
        />
        
        {isHovered && onPlay && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              onPlay(item);
            }}
          >
            <Play size={20} className="text-black ml-1" />
          </motion.button>
        )}
      </div>
      
      <h3 className="text-white font-semibold text-sm mb-1 truncate">
        {item.name || item.title}
      </h3>
      <p className="text-gray-400 text-xs truncate">
        {item.description || item.artist || `${item.songs} songs`}
      </p>
    </motion.div>
  );
};

// Home Page Component
const HomePage = ({ onTrackSelect, onPageChange }) => {
  return (
    <div className="p-8 space-y-8">
      {/* Good morning section */}
      <section>
        <h1 className="text-3xl font-bold text-white mb-6">Good evening</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockData.recentlyPlayed.slice(0, 6).map((track) => (
            <motion.div
              key={track.id}
              className="bg-gray-800 bg-opacity-30 rounded-lg flex items-center hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              onClick={() => onTrackSelect(track)}
            >
              <img src={track.albumArt} alt={track.album} className="w-16 h-16 rounded-l-lg" />
              <div className="p-4 flex-1">
                <h3 className="text-white font-semibold text-sm">{track.title}</h3>
                <p className="text-gray-400 text-xs">{track.artist}</p>
              </div>
              <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={20} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Made for you */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Made for you</h2>
          <button className="text-gray-400 hover:text-white text-sm font-semibold">Show all</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockData.madeForYou.map((playlist) => (
            <Card
              key={playlist.id}
              item={playlist}
              onSelect={(item) => onPageChange('playlist', item)}
              onPlay={onTrackSelect}
            />
          ))}
        </div>
      </section>
      
      {/* Popular artists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Popular artists</h2>
          <button className="text-gray-400 hover:text-white text-sm font-semibold">Show all</button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockData.popularArtists.map((artist) => (
            <Card
              key={artist.id}
              item={artist}
              onSelect={(item) => onPageChange('artist', item)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

// Search Page Component
const SearchPage = ({ searchQuery, onTrackSelect, onPageChange }) => {
  const filteredTracks = mockData.recentlyPlayed.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8">
      {!searchQuery ? (
        <>
          <h1 className="text-3xl font-bold text-white mb-6">Browse all</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockData.browseCategories.map((category) => (
              <motion.div
                key={category.id}
                className={`${category.color} rounded-lg p-6 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <h3 className="text-white font-bold text-xl mb-4">{category.name}</h3>
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute bottom-0 right-0 w-20 h-20 object-cover rounded-lg transform rotate-12 translate-x-4 translate-y-2"
                />
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-white mb-6">Search results for "{searchQuery}"</h1>
          {filteredTracks.length > 0 ? (
            <div className="space-y-2">
              {filteredTracks.map((track) => (
                <motion.div
                  key={track.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 transition-colors cursor-pointer group"
                  whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                  onClick={() => onTrackSelect(track)}
                >
                  <img src={track.albumArt} alt={track.album} className="w-12 h-12 rounded" />
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{track.title}</h3>
                    <p className="text-gray-400 text-sm">{track.artist}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={16} className="text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
              <p className="text-gray-500 text-sm mt-2">Try searching for something else</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Library Page Component
const LibraryPage = ({ onTrackSelect, onPageChange }) => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Your Library</h1>
        <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
          <Plus size={20} className="text-gray-400" />
        </button>
      </div>
      
      {/* Filter tabs */}
      <div className="flex space-x-2 mb-6">
        <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-semibold">
          Recently played
        </button>
        <button className="px-4 py-2 bg-gray-900 text-gray-400 rounded-full text-sm hover:text-white transition-colors">
          Recently added
        </button>
      </div>
      
      {/* Playlists */}
      <div className="space-y-3">
        <div className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded flex items-center justify-center">
            <Heart size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-medium">Liked Songs</h3>
            <p className="text-gray-400 text-sm">731 songs</p>
          </div>
        </div>
        
        {mockData.userPlaylists.map((playlist) => (
          <motion.div
            key={playlist.id}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 transition-colors cursor-pointer"
            whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
            onClick={() => onPageChange('playlist', playlist)}
          >
            <img src={playlist.image} alt={playlist.name} className="w-12 h-12 rounded" />
            <div>
              <h3 className="text-white font-medium">{playlist.name}</h3>
              <p className="text-gray-400 text-sm">{playlist.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Playlist Page Component
const PlaylistPage = ({ playlist, onTrackSelect, onPageChange }) => {
  if (!playlist) return null;

  return (
    <div className="min-h-full">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-600 to-purple-900 p-8">
        <div className="flex items-end space-x-6">
          <img src={playlist.image} alt={playlist.name} className="w-48 h-48 rounded-lg shadow-2xl" />
          <div>
            <p className="text-white text-sm font-semibold mb-2">PLAYLIST</p>
            <h1 className="text-white text-6xl font-bold mb-4">{playlist.name}</h1>
            <p className="text-gray-300 text-lg mb-2">{playlist.description}</p>
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <span>Spotify</span>
              <span>•</span>
              <span>50 songs, 3 hr 20 min</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="bg-gradient-to-b from-purple-900 to-black p-8">
        <div className="flex items-center space-x-6 mb-8">
          <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
            <Play size={24} className="text-black ml-1" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Heart size={24} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Download size={24} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal size={24} className="text-gray-400" />
          </button>
        </div>
        
        {/* Track list header */}
        <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm font-medium mb-4 pb-2 border-b border-gray-800">
          <div className="col-span-1">#</div>
          <div className="col-span-5">TITLE</div>
          <div className="col-span-4">ALBUM</div>
          <div className="col-span-1">DATE ADDED</div>
          <div className="col-span-1 text-right">
            <Clock size={16} />
          </div>
        </div>
        
        {/* Track list */}
        <div className="space-y-1">
          {mockData.recentlyPlayed.map((track, index) => (
            <motion.div
              key={track.id}
              className="grid grid-cols-12 gap-4 items-center p-2 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 transition-colors cursor-pointer group"
              whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
              onClick={() => onTrackSelect(track)}
            >
              <div className="col-span-1 text-gray-400 text-sm">
                <span className="group-hover:hidden">{index + 1}</span>
                <Play size={16} className="hidden group-hover:block text-white" />
              </div>
              <div className="col-span-5 flex items-center space-x-3">
                <img src={track.albumArt} alt={track.album} className="w-10 h-10 rounded" />
                <div>
                  <h3 className="text-white font-medium text-sm">{track.title}</h3>
                  <p className="text-gray-400 text-xs">{track.artist}</p>
                </div>
              </div>
              <div className="col-span-4 text-gray-400 text-sm">{track.album}</div>
              <div className="col-span-1 text-gray-400 text-sm">5 days ago</div>
              <div className="col-span-1 text-gray-400 text-sm text-right">
                {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Album Page Component (similar to playlist but for albums)
const AlbumPage = ({ album, onTrackSelect, onPageChange }) => {
  if (!album) return null;

  return (
    <div className="min-h-full">
      {/* Similar structure to PlaylistPage but for albums */}
      <div className="bg-gradient-to-b from-blue-600 to-blue-900 p-8">
        <div className="flex items-end space-x-6">
          <img src={album.image} alt={album.name} className="w-48 h-48 rounded-lg shadow-2xl" />
          <div>
            <p className="text-white text-sm font-semibold mb-2">ALBUM</p>
            <h1 className="text-white text-6xl font-bold mb-4">{album.name}</h1>
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <span>{album.artist || 'Various Artists'}</span>
              <span>•</span>
              <span>2023 • 12 songs, 45 min</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-b from-blue-900 to-black p-8">
        {/* Similar controls and track listing as PlaylistPage */}
        <div className="flex items-center space-x-6 mb-8">
          <button className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors">
            <Play size={24} className="text-black ml-1" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Heart size={24} className="text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal size={24} className="text-gray-400" />
          </button>
        </div>
        
        <div className="space-y-1">
          {mockData.recentlyPlayed.slice(0, 12).map((track, index) => (
            <motion.div
              key={track.id}
              className="flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 hover:bg-opacity-50 transition-colors cursor-pointer group"
              whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
              onClick={() => onTrackSelect(track)}
            >
              <div className="w-6 text-gray-400 text-sm">
                <span className="group-hover:hidden">{index + 1}</span>
                <Play size={16} className="hidden group-hover:block text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium text-sm">{track.title}</h3>
                <p className="text-gray-400 text-xs">{track.artist}</p>
              </div>
              <div className="text-gray-400 text-sm">
                {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Music Player Component
const MusicPlayer = ({ 
  currentTrack, 
  isPlaying, 
  currentTime, 
  duration, 
  volume, 
  onPlayPause, 
  onVolumeChange, 
  onTimeChange 
}) => {
  const [isMuted, setIsMuted] = useState(false);
  
  if (!currentTrack) return null;

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onTimeChange(percent * duration);
  };

  const handleVolumeClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onVolumeChange(percent);
  };

  return (
    <div className="bg-gray-900 border-t border-gray-800 p-4">
      <div className="flex items-center justify-between">
        {/* Current track info */}
        <div className="flex items-center space-x-4 min-w-0 w-1/4">
          <img 
            src={currentTrack.albumArt} 
            alt={currentTrack.album} 
            className="w-14 h-14 rounded"
          />
          <div className="min-w-0">
            <h3 className="text-white font-medium text-sm truncate">{currentTrack.title}</h3>
            <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
          </div>
          <button className="p-1 hover:bg-gray-800 rounded transition-colors">
            <Heart size={16} className="text-gray-400 hover:text-white" />
          </button>
        </div>
        
        {/* Player controls */}
        <div className="flex flex-col items-center space-y-2 w-1/2 max-w-md">
          <div className="flex items-center space-x-4">
            <button className="p-1 hover:bg-gray-800 rounded transition-colors">
              <SkipBack size={20} className="text-gray-400 hover:text-white" />
            </button>
            <button
              onClick={onPlayPause}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause size={16} className="text-black" />
              ) : (
                <Play size={16} className="text-black ml-0.5" />
              )}
            </button>
            <button className="p-1 hover:bg-gray-800 rounded transition-colors">
              <SkipForward size={20} className="text-gray-400 hover:text-white" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <div 
              className="flex-1 h-1 bg-gray-600 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="h-1 bg-white rounded-full relative"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* Volume control */}
        <div className="flex items-center space-x-2 w-1/4 justify-end">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX size={20} className="text-gray-400 hover:text-white" />
            ) : (
              <Volume2 size={20} className="text-gray-400 hover:text-white" />
            )}
          </button>
          <div 
            className="w-24 h-1 bg-gray-600 rounded-full cursor-pointer"
            onClick={handleVolumeClick}
          >
            <div 
              className="h-1 bg-white rounded-full"
              style={{ width: `${volume * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export all components
const Components = {
  Sidebar,
  Header,
  MusicPlayer,
  HomePage,
  SearchPage,
  LibraryPage,
  PlaylistPage,
  AlbumPage,
  Card
};

export default Components;