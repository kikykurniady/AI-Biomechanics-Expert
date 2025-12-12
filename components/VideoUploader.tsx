import React, { useCallback, useState } from 'react';
import { UploadIcon, CloseIcon, PlayIcon } from './Icons';

interface VideoUploaderProps {
  onVideoSelect: (file: File) => void;
  selectedFile: File | null;
  previewUrl: string | null;
  onClear: () => void;
  isLoading: boolean;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ 
  onVideoSelect, 
  selectedFile, 
  previewUrl, 
  onClear,
  isLoading 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0 && files[0].type.startsWith('video/')) {
      onVideoSelect(files[0]);
    }
  }, [onVideoSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onVideoSelect(e.target.files[0]);
    }
  };

  if (selectedFile && previewUrl) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl border border-white/10 group">
        <video 
          src={previewUrl} 
          className="w-full h-full object-contain" 
          controls 
          playsInline
        />
        {!isLoading && (
          <button 
            onClick={onClear}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-brand-danger text-white rounded-full transition-colors backdrop-blur-sm"
            title="Remove video"
          >
            <CloseIcon />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative w-full aspect-video min-h-[300px] rounded-2xl border-2 border-dashed transition-all duration-300
        flex flex-col items-center justify-center cursor-pointer group
        ${isDragging 
          ? 'border-brand-accent bg-brand-accent/5 scale-[1.01]' 
          : 'border-white/10 bg-brand-card hover:bg-slate-800 hover:border-white/20'
        }
      `}
    >
      <input 
        type="file" 
        accept="video/*" 
        onChange={handleFileInput} 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        disabled={isLoading}
      />
      
      <div className="flex flex-col items-center text-center p-6 transition-transform group-hover:scale-105 duration-300">
        <UploadIcon />
        <h3 className="text-lg font-semibold text-white mb-2">
          {isDragging ? 'Drop it here!' : 'Upload your set'}
        </h3>
        <p className="text-slate-400 text-sm max-w-xs mb-4">
          Drag and drop your exercise video here, or click to browse.
        </p>
        <span className="px-4 py-2 rounded-full bg-brand-dark border border-white/10 text-xs text-slate-300 font-medium group-hover:border-brand-accent/50 transition-colors">
          Supports MP4, MOV, WEBM
        </span>
      </div>
    </div>
  );
};

export default VideoUploader;