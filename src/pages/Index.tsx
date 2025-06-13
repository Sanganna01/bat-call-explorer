
import { useState } from 'react';
import { Upload, Volume2, Zap, Search, BarChart3, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AudioUpload from '@/components/AudioUpload';
import DetectionResults from '@/components/DetectionResults';
import SpeciesInfo from '@/components/SpeciesInfo';
import AboutSection from '@/components/AboutSection';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'upload' | 'results' | 'about'>('home');
  const [detectionData, setDetectionData] = useState(null);

  const handleUploadComplete = (data: any) => {
    setDetectionData(data);
    setCurrentView('results');
  };

  const features = [
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Drag & drop your audio files or browse to select them'
    },
    {
      icon: Zap,
      title: 'AI Detection',
      description: 'Advanced machine learning models detect bat calls instantly'
    },
    {
      icon: Search,
      title: 'Species ID',
      description: 'Identify specific bat species from their unique calls'
    },
    {
      icon: BarChart3,
      title: 'Visual Analysis',
      description: 'Interactive spectrograms and timeline visualizations'
    }
  ];

  if (currentView === 'upload') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-night-900 via-twilight-900 to-night-800">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('home')}
              className="text-white hover:bg-white/10"
            >
              ← Back to Home
            </Button>
          </div>
          <AudioUpload onUploadComplete={handleUploadComplete} />
        </div>
      </div>
    );
  }

  if (currentView === 'results' && detectionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-night-900 via-twilight-900 to-night-800">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('home')}
              className="text-white hover:bg-white/10"
            >
              ← Back to Home
            </Button>
          </div>
          <DetectionResults data={detectionData} />
        </div>
      </div>
    );
  }

  if (currentView === 'about') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-night-900 via-twilight-900 to-night-800">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setCurrentView('home')}
              className="text-white hover:bg-white/10"
            >
              ← Back to Home
            </Button>
          </div>
          <AboutSection />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-night-900 via-twilight-900 to-night-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-twilight-500/20 backdrop-blur-sm border border-twilight-400/30 mb-6">
                <Volume2 className="w-10 h-10 text-twilight-300" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Bat Call
                <span className="block bg-gradient-to-r from-twilight-400 to-ultrasonic-400 bg-clip-text text-transparent">
                  Explorer
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                Discover the hidden world of bats through AI-powered audio analysis. 
                Upload recordings and unlock the secrets of echolocation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button 
                onClick={() => setCurrentView('upload')}
                className="bg-twilight-600 hover:bg-twilight-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <Upload className="w-5 h-5 mr-2" />
                Start Detection
              </Button>
              <Button 
                variant="outline"
                onClick={() => setCurrentView('about')}
                className="border-twilight-400/50 text-twilight-300 hover:bg-twilight-500/20 px-8 py-4 text-lg rounded-xl transition-all duration-300"
              >
                <Info className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Cutting-Edge Bat Detection
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our advanced AI system processes your audio recordings to identify bat species with unprecedented accuracy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-twilight-500/20 backdrop-blur-sm border border-twilight-400/30 mb-6 group-hover:animate-pulse-glow">
                    <feature.icon className="w-8 h-8 text-twilight-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Explore the Night?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Upload your audio recordings and discover which bat species are calling in your area
            </p>
            <Button 
              onClick={() => setCurrentView('upload')}
              size="lg"
              className="bg-gradient-to-r from-twilight-600 to-ultrasonic-600 hover:from-twilight-700 hover:to-ultrasonic-700 text-white px-10 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload Audio File
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
