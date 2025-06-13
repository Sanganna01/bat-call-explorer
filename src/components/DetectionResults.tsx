
import { useState } from 'react';
import { CheckCircle, XCircle, Clock, Zap, Volume2, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SpeciesInfo from './SpeciesInfo';
import SpectrogramVisualization from './SpectrogramVisualization';

interface DetectionResultsProps {
  data: {
    batDetected: boolean;
    confidence: number;
    detections: Array<{
      timestamp: number;
      confidence: number;
      species: string;
    }>;
    primarySpecies: string;
    audioUrl: string;
    fileName: string;
    duration: number;
    spectrogramUrl: string;
  };
}

const DetectionResults = ({ data }: DetectionResultsProps) => {
  const [selectedDetection, setSelectedDetection] = useState(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins}:${secs.padStart(4, '0')}`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-ultrasonic-500';
    if (confidence >= 0.6) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Detection Results</h1>
        <p className="text-xl text-gray-300">Analysis of {data.fileName}</p>
      </div>

      {/* Main Result Card */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardContent className="p-8">
          <div className="flex items-center justify-center space-x-6 mb-8">
            {data.batDetected ? (
              <CheckCircle className="w-16 h-16 text-ultrasonic-400" />
            ) : (
              <XCircle className="w-16 h-16 text-red-400" />
            )}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                {data.batDetected ? 'Bats Detected!' : 'No Bats Detected'}
              </h2>
              <div className="flex items-center justify-center space-x-4">
                <Badge className={`${getConfidenceColor(data.confidence)} text-white px-3 py-1`}>
                  {(data.confidence * 100).toFixed(1)}% Confidence
                </Badge>
                <span className="text-gray-300">
                  {data.detections.length} detection{data.detections.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
          </div>

          {data.batDetected && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Clock className="w-8 h-8 text-twilight-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Duration</h3>
                <p className="text-gray-300">{formatTime(data.duration)}</p>
              </div>
              <div className="text-center">
                <Zap className="w-8 h-8 text-twilight-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Primary Species</h3>
                <p className="text-gray-300">{data.primarySpecies}</p>
              </div>
              <div className="text-center">
                <Volume2 className="w-8 h-8 text-twilight-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white">Call Events</h3>
                <p className="text-gray-300">{data.detections.length}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {data.batDetected && (
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-sm">
            <TabsTrigger value="timeline" className="data-[state=active]:bg-twilight-600">
              Detection Timeline
            </TabsTrigger>
            <TabsTrigger value="spectrogram" className="data-[state=active]:bg-twilight-600">
              Spectrogram
            </TabsTrigger>
            <TabsTrigger value="species" className="data-[state=active]:bg-twilight-600">
              Species Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Detection Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.detections.map((detection, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedDetection === index
                          ? 'bg-twilight-500/20 border-twilight-400'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedDetection(index)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getConfidenceColor(detection.confidence)}`} />
                            <span className="text-white font-mono">
                              {formatTime(detection.timestamp)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{detection.species}</h4>
                            <p className="text-sm text-gray-300">
                              {(detection.confidence * 100).toFixed(1)}% confidence
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-twilight-400/50 text-twilight-300 hover:bg-twilight-500/20"
                        >
                          Play Call
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="spectrogram">
            <SpectrogramVisualization 
              audioUrl={data.audioUrl}
              detections={data.detections}
              duration={data.duration}
            />
          </TabsContent>

          <TabsContent value="species">
            <SpeciesInfo species={data.primarySpecies} />
          </TabsContent>
        </Tabs>
      )}

      {/* Audio Player */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Volume2 className="w-5 h-5 mr-2" />
            Original Audio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <audio controls className="w-full">
            <source src={data.audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetectionResults;
