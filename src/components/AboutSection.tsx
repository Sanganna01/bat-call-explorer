
import { Brain, Waves, Zap, Users, BookOpen, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning models trained on thousands of bat call recordings to accurately detect and classify species.'
    },
    {
      icon: Waves,
      title: 'Spectrogram Analysis',
      description: 'Visual representation of audio frequencies over time, revealing the unique acoustic signatures of different bat species.'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Fast analysis pipeline that processes your audio files in seconds, providing immediate results and insights.'
    },
    {
      icon: Users,
      title: 'Educational Focus',
      description: 'Designed specifically for students and educators to learn about bat ecology and bioacoustics research.'
    }
  ];

  const resources = [
    {
      title: 'Bat Conservation International',
      url: 'https://www.batcon.org',
      description: 'Leading organization dedicated to bat conservation worldwide'
    },
    {
      title: 'eBird by Cornell Lab',
      url: 'https://ebird.org',
      description: 'Citizen science platform for wildlife observation and data collection'
    },
    {
      title: 'Merlin Sound ID',
      url: 'https://merlin.allaboutbirds.org',
      description: 'AI-powered bird identification app that inspired our approach'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">About Bat Call Explorer</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover the fascinating world of bat echolocation through cutting-edge AI technology. 
          Our platform makes bat species identification accessible to researchers, students, and nature enthusiasts.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardContent className="p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Bats are among the most important yet misunderstood animals on Earth. Through advanced AI analysis 
              of their echolocation calls, we're making it easier than ever to study these remarkable creatures 
              and understand their vital role in our ecosystems. Our goal is to democratize bat research and 
              foster a deeper appreciation for these nocturnal guardians.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-twilight-500/20 backdrop-blur-sm border border-twilight-400/30 mb-4">
                <feature.icon className="w-6 h-6 text-twilight-300" />
              </div>
              <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* About Bats */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            About Bats & Echolocation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">The Science of Echolocation</h3>
              <p className="text-gray-300 leading-relaxed">
                Bats use echolocation, a sophisticated biological sonar system, to navigate and hunt in complete darkness. 
                They emit high-frequency sound pulses and interpret the echoes that bounce back from objects in their environment.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Each bat species has evolved unique call characteristics - frequency patterns, pulse durations, and intervals 
                that are as distinctive as fingerprints. These acoustic signatures allow researchers to identify species 
                without ever seeing the bat itself.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Why Bats Matter</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-ultrasonic-400 rounded-full mt-2"></div>
                  <p className="text-gray-300">Control insect populations, saving billions in agricultural damage</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-ultrasonic-400 rounded-full mt-2"></div>
                  <p className="text-gray-300">Pollinate over 500 plant species worldwide</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-ultrasonic-400 rounded-full mt-2"></div>
                  <p className="text-gray-300">Disperse seeds for forest regeneration</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-ultrasonic-400 rounded-full mt-2"></div>
                  <p className="text-gray-300">Serve as indicators of ecosystem health</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Details */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">How Our AI Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-twilight-500/20 rounded-lg p-4 mb-3">
                <h4 className="font-semibold text-white">1. Audio Processing</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Convert audio to spectrograms and apply noise reduction algorithms
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-twilight-500/20 rounded-lg p-4 mb-3">
                <h4 className="font-semibold text-white">2. Feature Extraction</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Identify key acoustic features like frequency patterns and call structure
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-twilight-500/20 rounded-lg p-4 mb-3">
                <h4 className="font-semibold text-white">3. Species Classification</h4>
              </div>
              <p className="text-gray-300 text-sm">
                Match features against trained models to identify species with confidence scores
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                <div>
                  <h4 className="font-semibold text-white">{resource.title}</h4>
                  <p className="text-gray-300 text-sm">{resource.description}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-twilight-400/50 text-twilight-300 hover:bg-twilight-500/20"
                  asChild
                >
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSection;
