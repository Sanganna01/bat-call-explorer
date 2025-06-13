
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Music, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface AudioUploadProps {
  onUploadComplete: (data: any) => void;
}

const AudioUpload = ({ onUploadComplete }: AudioUploadProps) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'complete' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      setUploadStatus('idle');
      setErrorMessage('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.wav', '.mp3', '.flac', '.aac']
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: false
  });

  const simulateProcessing = async () => {
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    setUploadStatus('processing');
    setUploadProgress(0);

    // Simulate processing steps
    const steps = [
      'Converting audio format...',
      'Generating spectrogram...',
      'Applying noise reduction...',
      'Running bat detection model...',
      'Identifying species...',
      'Analysis complete!'
    ];

    for (let i = 0; i < steps.length; i++) {
      setUploadProgress((i + 1) * (100 / steps.length));
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Simulate results
    const mockResults = {
      batDetected: true,
      confidence: 0.89,
      detections: [
        { timestamp: 2.3, confidence: 0.91, species: 'Big Brown Bat' },
        { timestamp: 4.7, confidence: 0.85, species: 'Little Brown Bat' },
        { timestamp: 7.1, confidence: 0.92, species: 'Big Brown Bat' }
      ],
      primarySpecies: 'Big Brown Bat',
      audioUrl: URL.createObjectURL(selectedFile!),
      fileName: selectedFile!.name,
      duration: 12.5,
      spectrogramUrl: '/placeholder-spectrogram.png'
    };

    setUploadStatus('complete');
    setTimeout(() => {
      onUploadComplete(mockResults);
    }, 1000);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    simulateProcessing();
  };

  const getStatusContent = () => {
    switch (uploadStatus) {
      case 'uploading':
        return (
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-twilight-400 mx-auto" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Uploading Audio</h3>
              <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
              <p className="text-gray-300 mt-2">{uploadProgress}% complete</p>
            </div>
          </div>
        );
      
      case 'processing':
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-2 h-8 bg-twilight-400 rounded animate-wave"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Analyzing Audio</h3>
              <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
              <p className="text-gray-300 mt-2">Processing with AI models...</p>
            </div>
          </div>
        );
      
      case 'complete':
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-ultrasonic-400 mx-auto" />
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Analysis Complete!</h3>
              <p className="text-gray-300">Redirecting to results...</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  if (uploadStatus === 'uploading' || uploadStatus === 'processing' || uploadStatus === 'complete') {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-12">
            {getStatusContent()}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Upload Audio Recording</h1>
        <p className="text-xl text-gray-300">
          Upload your audio file to detect and identify bat species
        </p>
      </div>

      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardContent className="p-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive 
                ? 'border-twilight-400 bg-twilight-500/10' 
                : 'border-gray-600 hover:border-twilight-500 hover:bg-white/5'
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <Upload className="w-16 h-16 text-twilight-400 mx-auto" />
              <div>
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {isDragActive ? 'Drop your audio file here' : 'Drag & drop your audio file'}
                </h3>
                <p className="text-gray-300 mb-4">
                  or click to browse your files
                </p>
                <p className="text-sm text-gray-400">
                  Supports WAV, MP3, FLAC, AAC files up to 50MB
                </p>
              </div>
            </div>
          </div>

          {selectedFile && (
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-3">
                <Music className="w-8 h-8 text-twilight-400" />
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{selectedFile.name}</h4>
                  <p className="text-sm text-gray-300">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
                <Button 
                  onClick={handleUpload}
                  className="bg-twilight-600 hover:bg-twilight-700"
                >
                  Analyze Audio
                </Button>
              </div>
            </div>
          )}

          {errorMessage && (
            <Alert className="mt-4 border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-300">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-twilight-400 rounded-full mt-2"></div>
            <p className="text-gray-300">Use high-quality recordings with minimal background noise</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-twilight-400 rounded-full mt-2"></div>
            <p className="text-gray-300">Recordings should be at least 5 seconds long for best detection</p>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-twilight-400 rounded-full mt-2"></div>
            <p className="text-gray-300">WAV format provides the highest accuracy for species identification</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioUpload;
