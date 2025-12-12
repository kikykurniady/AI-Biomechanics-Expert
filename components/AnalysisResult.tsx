import React from 'react';
import ReactMarkdown from 'react-markdown';

interface AnalysisResultProps {
  analysis: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis }) => {
  return (
    <div className="w-full bg-brand-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl animate-fade-in-up">
      <div className="bg-gradient-to-r from-brand-accent/20 to-transparent p-6 border-b border-white/5">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          📋 Coach's Report
        </h2>
      </div>
      
      <div className="p-6 sm:p-8">
        <div className="markdown-content text-slate-300 text-base sm:text-lg">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-white mt-6 mb-4 pb-2 border-b border-white/10" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-xl font-bold text-brand-accent mt-8 mb-4" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-white mt-6 mb-2" {...props} />,
              strong: ({node, ...props}) => <strong className="text-brand-accent font-bold" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />,
              li: ({node, ...props}) => <li className="pl-1 marker:text-brand-accent" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 text-slate-300 leading-relaxed" {...props} />,
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-brand-accent pl-4 italic text-slate-400 my-4" {...props} />,
            }}
          >
            {analysis}
          </ReactMarkdown>
        </div>
      </div>

      <div className="bg-black/20 p-4 border-t border-white/5 text-center">
        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
          Powered by Gemini 3 Pro
        </p>
      </div>
    </div>
  );
};

export default AnalysisResult;