import React from 'react';
import { 
  UploadCloud, 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  Play, 
  Dumbbell, 
  X
} from 'lucide-react';

export const UploadIcon = () => <UploadCloud className="w-12 h-12 text-brand-accent mb-4" />;
export const ActivityIcon = () => <Activity className="w-6 h-6 text-brand-accent" />;
export const SuccessIcon = () => <CheckCircle className="w-5 h-5 text-brand-success" />;
export const WarningIcon = () => <AlertTriangle className="w-5 h-5 text-brand-danger" />;
export const PlayIcon = () => <Play className="w-5 h-5 fill-white text-white" />;
export const LogoIcon = () => <Dumbbell className="w-8 h-8 text-brand-accent" />;
export const CloseIcon = () => <X className="w-6 h-6" />;
