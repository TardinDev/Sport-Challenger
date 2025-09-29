import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';

const COUNTRIES = [
  { code: 'BE', name: 'Belgique', cities: ['Bruxelles', 'Anvers', 'Gand', 'Charleroi', 'Liège'] },
  { code: 'CM', name: 'Cameroun', cities: ['Yaoundé', 'Douala', 'Garoua', 'Bamenda', 'Bafoussam'] },
  { code: 'CA', name: 'Canada', cities: ['Montréal', 'Québec', 'Toronto', 'Vancouver', 'Ottawa'] },
  { code: 'CG', name: 'Congo', cities: ['Brazzaville', 'Pointe-Noire', 'Dolisie', 'Nkayi', 'Ouesso'] },
  { code: 'CI', name: 'Côte d\'Ivoire', cities: ['Abidjan', 'Bouaké', 'Yamoussoukro', 'San-Pédro', 'Daloa'] },
  { code: 'FR', name: 'France', cities: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes', 'Bordeaux'] },
  { code: 'GA', name: 'Gabon', cities: ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda'] },
  { code: 'ML', name: 'Mali', cities: ['Bamako', 'Sikasso', 'Mopti', 'Koutiala', 'Kayes'] },
  { code: 'SN', name: 'Sénégal', cities: ['Dakar', 'Thiès', 'Saint-Louis', 'Kaolack', 'Ziguinchor'] },
  { code: 'CH', name: 'Suisse', cities: ['Genève', 'Zurich', 'Bâle', 'Lausanne', 'Berne'] },
];

export default function LocationScreen() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchCity, setSearchCity] = useState('');

  const country = COUNTRIES.find((c) => c.code === selectedCountry);
  const filteredCities = country?.cities.filter((city) =>
    city.toLowerCase().includes(searchCity.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedCity && selectedCountry) {
      // TODO: Save location to storage/context
      router.replace('/');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={['#1a1a2e', '#0f3460', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <SafeAreaView className="flex-1">
          <View className="flex-1 px-6 py-8">
            <Text className="mb-2 text-center text-3xl font-bold text-white">
              Où êtes-vous ?
            </Text>
            <Text className="mb-8 text-center text-base text-white/70">
              Sélectionnez votre pays et votre ville pour trouver des défis près de chez vous
            </Text>

            {/* Country Selection */}
            {!selectedCountry && (
              <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <Text className="mb-4 text-lg font-semibold text-white">Pays</Text>
                {COUNTRIES.map((country) => (
                  <Pressable
                    key={country.code}
                    onPress={() => setSelectedCountry(country.code)}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      borderRadius: 16,
                      padding: 20,
                      marginBottom: 12,
                    }}>
                    <Text className="text-lg font-semibold text-white">{country.name}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}

            {/* City Selection */}
            {selectedCountry && (
              <View className="flex-1">
                <View className="mb-4 flex-row items-center justify-between">
                  <Text className="text-lg font-semibold text-white">
                    {country?.name} - Ville
                  </Text>
                  <Pressable onPress={() => setSelectedCountry(null)}>
                    <Text className="text-sm text-white/70">Changer</Text>
                  </Pressable>
                </View>

                <TextInput
                  value={searchCity}
                  onChangeText={setSearchCity}
                  placeholder="Rechercher une ville..."
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 12,
                    padding: 16,
                    color: 'white',
                    fontSize: 16,
                    marginBottom: 16,
                  }}
                />

                <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                  {filteredCities?.map((city) => (
                    <Pressable
                      key={city}
                      onPress={() => setSelectedCity(city)}
                      style={{
                        backgroundColor:
                          selectedCity === city
                            ? 'rgba(255,255,255,0.2)'
                            : 'rgba(255,255,255,0.1)',
                        borderRadius: 16,
                        padding: 20,
                        marginBottom: 12,
                        borderWidth: selectedCity === city ? 2 : 0,
                        borderColor: 'white',
                      }}>
                      <Text className="text-lg font-semibold text-white">{city}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Continue Button */}
            {selectedCity && (
              <Pressable
                onPress={handleContinue}
                style={{
                  backgroundColor: 'white',
                  borderRadius: 28,
                  padding: 18,
                  marginTop: 16,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 12,
                  elevation: 8,
                }}>
                <Text className="text-center text-lg font-bold text-black">Continuer</Text>
              </Pressable>
            )}
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}