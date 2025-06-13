
import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface SpectrogramVisualizationProps {
  audioUrl: string;
  detections: Array<{
    timestamp: number;
    confidence: number;
    species: string;
  }>;
  duration: number;
}

const SpectrogramVisualization = ({ audioUrl, detections, duration }: SpectrogramVisualizationProps) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);
    return `${mins}:${secs.padStart(4, '0')}`;
  };

  const handleTimeChange = (value: number[]) => {
    setCurrentTime(value[0]);
  };

  // Generate mock spectrogram visualization
  const generateSpectrogramData = () => {
    const data = [];
    const width = 800;
    const height = 400;
    const timeStep = duration / width;
    
    for (let x = 0; x < width; x++) {
      const time = x * timeStep;
      const column = [];
      
      for (let y = 0; y < height; y++) {
        const frequency = ((height - y) / height) * 100; // 0-100 kHz
        
        // Check if this time has a detection
        const detection = detections.find(d => 
          Math.abs(d.timestamp - time) < 0.5
        );
        
        let intensity = Math.random() * 0.3; // Base noise
        
        if (detection) {
          // Add bat call signature
          if (frequency > 20 && frequency < 80) {
            intensity = Math.random() * 0.8 + 0.2;
          }
        }
        
        column.push(intensity);
      }
      data.push(column);
    }
    
    return data;
  };

  const spectrogramData = generateSpectrogramData();

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Interactive Spectrogram</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Spectrogram Display */}
          <div className="relative bg-night-900 rounded-lg p-4 spectrogram-grid">
            <div className="relative overflow-hidden rounded">
              <canvas
                width={800}
                height={400}
                className="w-full h-auto bg-gradient-to-b from-night-800 to-night-900 rounded"
                style={{ maxHeight: '400px' }}
                ref={(canvas) => {
                  if (canvas) {
                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                      // Draw spectrogram
                      spectrogramData.forEach((column, x) => {
                        column.forEach((intensity, y) => {
                          const alpha = intensity;
                          if (intensity > 0.1) {
                            ctx.fillStyle = `rgba(165, 110, 255, ${alpha})`;
                            ctx.fillRect(x, y, 1, 1);
                          }
                        });
                      });
                      
                      // Draw detection markers
                      detections.forEach((detection) => {
                        const x = (detection.timestamp / duration) * 800;
                        ctx.strokeStyle = '#10b981';
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, 400);
                        ctx.stroke();
                      });
                      
                      // Draw current time indicator
                      const currentX = (currentTime / duration) * 800;
                      ctx.strokeStyle = '#ffffff';
                      ctx.lineWidth = 2;
                      ctx.beginPath();
                      ctx.moveTo(currentX, 0);
                      ctx.lineTo(currentX, 400);
                      ctx.stroke();
                    }
                  }
                }}
              />
              
              {/* Frequency labels */}
              <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8">
                <span>100 kHz</span>
                <span>75 kHz</span>
                <span>50 kHz</span>
                <span>25 kHz</span>
                <span>0 kHz</span>
              </div>
              
              {/* Time labels */}
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>0:00</span>
                <span>{formatTime(duration / 4)}</span>
                <span>{formatTime(duration / 2)}</span>
                <span>{formatTime(3 * duration / 4)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="border-twilight-400/50 text-twilight-300 hover:bg-twilight-500/20"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentTime(0)}
                className="border-twilight-400/50 text-twilight-300 hover:bg-twilight-500/20"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              
              <span className="text-white font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={duration}
                step={0.1}
                className="w-full"
                onValueChange={handleTimeChange}
              />
            </div>
          </div>

          {/* Detection Markers Legend */}
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-ultrasonic-400 rounded"></div>
              <span className="text-gray-300">Bat Call Detected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded"></div>
              <span className="text-gray-300">Current Position</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Details */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Spectrogram Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-white mb-3">Frequency Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Peak Frequency:</span>
                  <span className="text-white">45.2 kHz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Bandwidth:</span>
                  <span className="text-white">20-70 kHz</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Call Duration:</span>
                  <span className="text-white">2-5 ms</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3">Signal Quality</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Signal-to-Noise:</span>
                  <span className="text-white">18.3 dB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Background Noise:</span>
                  <span className="text-white">Low</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Call Clarity:</span>
                  <span className="text-white">Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpectrogramVisualization;
