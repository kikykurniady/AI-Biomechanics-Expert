import React, { useState } from 'react';
import Header from './components/Header';
import VideoUploader from './components/VideoUploader';
import AnalysisResult from './components/AnalysisResult';
import { analyzeVideoForm } from './services/geminiService';
import { VideoFile, AnalysisState } from './types';
import { ActivityIcon, WarningIcon } from './components/Icons';

const App: React.FC = () => {
  const [video, setVideo] = useState<VideoFile | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisState>({
    isLoading: false,
    result: null,
    error: null,
  });

  const handleVideoSelect = (file: File) => {
    // Basic validation
    if (file.size > 20 * 1024 * 1024) {
       alert("Video is too large for this demo (Max 20MB). Please try a shorter clip.");
       return;
    }

    const previewUrl = URL.createObjectURL(file);
    setVideo({ file, previewUrl });
    setAnalysis({ isLoading: false, result: null, error: null });
  };

  const handleClear = () => {
    if (video?.previewUrl) {
      URL.revokeObjectURL(video.previewUrl);
    }
    setVideo(null);
    setAnalysis({ isLoading: false, result: null, error: null });
  };

  const handleAnalyze = async () => {
    if (!video) return;

    setAnalysis({ isLoading: true, result: null, error: null });

    try {
      const result = await analyzeVideoForm(video.file);
      setAnalysis({ isLoading: false, result, error: null });
    } catch (err: any) {
      setAnalysis({ 
        isLoading: false, 
        result: null, 
        error: err.message || "Something went wrong during analysis." 
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-brand-accent selection:text-brand-dark">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
        
        {/* Intro Section */}
        {!video && !analysis.result && (
          <div className="text-center mb-10 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              Perfect Your Form
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Coach Gemini is an AI-powered physiotherapist that lives in your browser. It uses <span className="text-brand-accent font-semibold">Gemini 3 Pro</span>'s multimodal vision capabilities to analyze your biomechanics instantly.
            </p>
          </div>
        )}

        {/* Upload Section */}
        <div className="space-y-8">
          <div className="transition-all duration-500 ease-in-out">
            <VideoUploader 
              onVideoSelect={handleVideoSelect}
              selectedFile={video?.file || null}
              previewUrl={video?.previewUrl || null}
              onClear={handleClear}
              isLoading={analysis.isLoading}
            />
          </div>

          {/* Controls */}
          {video && !analysis.isLoading && !analysis.result && (
            <div className="flex justify-center animate-fade-in">
              <button
                onClick={handleAnalyze}
                className="
                  group relative px-8 py-4 bg-brand-accent text-brand-dark font-bold text-lg rounded-full 
                  shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] 
                  transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2
                "
              >
                <ActivityIcon />
                <span>Analyze Form</span>
                <span className="absolute inset-0 rounded-full border border-white/40 animate-pulse"></span>
              </button>
            </div>
          )}

          {/* Loading State */}
          {analysis.isLoading && (
            <div className="text-center py-12 animate-pulse space-y-4">
              <div className="inline-block relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-brand-card rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-t-brand-accent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-2xl font-bold text-white">Thinking like a Pro...</h3>
              <p className="text-slate-400">Gemini 3 Pro is analyzing your biomechanics frame by frame.</p>
            </div>
          )}

          {/* Error Message */}
          {analysis.error && (
            <div className="bg-red-500/10 border border-brand-danger/50 p-6 rounded-xl flex items-start gap-4 text-brand-danger animate-shake">
              <WarningIcon />
              <div>
                <h4 className="font-bold">Analysis Failed</h4>
                <p className="text-sm opacity-90 mt-1">{analysis.error}</p>
                <button 
                  onClick={handleAnalyze} 
                  className="mt-4 text-xs font-bold underline hover:text-white transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Results Display */}
          {analysis.result && (
            <div className="space-y-8">
               <AnalysisResult analysis={analysis.result} />
               
               <div className="flex justify-center pt-8 border-t border-white/5">
                 <button 
                   onClick={handleClear}
                   className="px-6 py-3 bg-brand-card hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-white/10"
                 >
                   Analyze Another Video
                 </button>
               </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-white/5 bg-black/20">
        <p>&copy; {new Date().getFullYear()} Coach Gemini AI. Use at your own risk.</p>
      </footer>
    </div>
  );
};

export default App;