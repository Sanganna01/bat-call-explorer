
import { ExternalLink, MapPin, Clock, Zap, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SpeciesInfoProps {
  species: string;
}

const SpeciesInfo = ({ species }: SpeciesInfoProps) => {
  // Mock data - in a real app, this would come from a database
  const speciesData = {
    'Big Brown Bat': {
      scientificName: 'Eptesicus fuscus',
      image: '/placeholder-bat.jpg',
      description: 'The Big Brown Bat is one of the most common bats in North America. They are excellent hunters, using echolocation to catch insects in flight. These bats are known for their large size and distinctive brown fur.',
      habitat: 'Urban areas, forests, parks, and agricultural regions',
      diet: 'Beetles, moths, flies, and other flying insects',
      size: '10-13 cm body length, 32-35 cm wingspan',
      callFrequency: '25-30 kHz',
      conservationStatus: 'Least Concern',
      facts: [
        'Can live up to 30 years in the wild',
        'Hibernate in caves, mines, and buildings during winter',
        'Females form maternity colonies of 20-300 individuals',
        'Can eat up to half their body weight in insects each night'
      ],
      links: [
        { title: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Big_brown_bat' },
        { title: 'Bat Conservation International', url: 'https://www.batcon.org' },
        { title: 'iNaturalist', url: 'https://www.inaturalist.org' }
      ]
    },
    'Little Brown Bat': {
      scientificName: 'Myotis lucifugus',
      image: '/placeholder-bat2.jpg',
      description: 'The Little Brown Bat is a small, common bat found throughout much of North America. Despite their small size, they are incredibly efficient hunters and play a crucial role in controlling insect populations.',
      habitat: 'Near water sources, forests, and urban areas',
      diet: 'Small flying insects, especially mosquitoes and midges',
      size: '8-9.5 cm body length, 22-27 cm wingspan',
      callFrequency: '40-80 kHz',
      conservationStatus: 'Near Threatened',
      facts: [
        'One of the most studied bat species in North America',
        'Can catch over 1,000 mosquitoes in an hour',
        'Use torpor to conserve energy during cold periods',
        'Severely affected by White-nose Syndrome'
      ],
      links: [
        { title: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Little_brown_bat' },
        { title: 'U.S. Fish & Wildlife Service', url: 'https://www.fws.gov' },
        { title: 'Bat Conservation International', url: 'https://www.batcon.org' }
      ]
    }
  };

  const data = speciesData[species as keyof typeof speciesData] || speciesData['Big Brown Bat'];

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Species Image */}
            <div className="lg:col-span-1">
              <div className="aspect-square bg-gradient-to-br from-twilight-500/20 to-night-600/20 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Volume2 className="w-16 h-16 text-twilight-400 mx-auto mb-4" />
                  <p className="text-gray-300">Species Image</p>
                  <p className="text-sm text-gray-400">Coming Soon</p>
                </div>
              </div>
            </div>

            {/* Species Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{species}</h1>
                <p className="text-xl text-twilight-300 italic mb-4">{data.scientificName}</p>
                <Badge className="bg-ultrasonic-500/20 text-ultrasonic-300 border-ultrasonic-500/50">
                  {data.conservationStatus}
                </Badge>
              </div>

              <p className="text-gray-300 leading-relaxed text-lg">
                {data.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-twilight-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-white">Habitat</h3>
                      <p className="text-gray-300 text-sm">{data.habitat}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Volume2 className="w-5 h-5 text-twilight-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-white">Call Frequency</h3>
                      <p className="text-gray-300 text-sm">{data.callFrequency}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-twilight-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-white">Diet</h3>
                      <p className="text-gray-300 text-sm">{data.diet}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-twilight-400 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-white">Size</h3>
                      <p className="text-gray-300 text-sm">{data.size}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interesting Facts */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Interesting Facts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.facts.map((fact, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-twilight-400 rounded-full mt-2"></div>
                <p className="text-gray-300">{fact}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* External Links */}
      <Card className="bg-white/5 backdrop-blur-sm border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Learn More</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.links.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-between border-twilight-400/50 text-twilight-300 hover:bg-twilight-500/20"
                asChild
              >
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeciesInfo;
