import { useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Pressable,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';

type SportCardType = {
  id: string;
  name: string;
  image: { uri: string };
  challenges: number;
  followers: number;
  colors: string[];
};

const sportsData: SportCardType[] = [
  {
    id: '1',
    name: 'Basketball',
    image: {
      uri: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
    },
    challenges: 42,
    followers: 1250,
    colors: ['#1a1a2e', '#0f3460'],
  },
  {
    id: '2',
    name: 'Football',
    image: {
      uri: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=800&fit=crop',
    },
    challenges: 68,
    followers: 2340,
    colors: ['#1b4332', '#2d6a4f'],
  },
  {
    id: '3',
    name: 'Handball',
    image: {
      uri: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&h=800&fit=crop',
    },
    challenges: 23,
    followers: 890,
    colors: ['#1e3a5f', '#2a5a8a'],
  },
  {
    id: '4',
    name: 'Tennis',
    image: {
      uri: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop',
    },
    challenges: 35,
    followers: 1560,
    colors: ['#1a472a', '#2c6b3f'],
  },
  {
    id: '5',
    name: 'Rugby',
    image: {
      uri: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&h=800&fit=crop',
    },
    challenges: 29,
    followers: 1120,
    colors: ['#1b3a2f', '#2e5c4a'],
  },
  {
    id: '6',
    name: 'Volleyball',
    image: {
      uri: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200&h=800&fit=crop',
    },
    challenges: 31,
    followers: 980,
    colors: ['#2b1d4e', '#4a3572'],
  },
  {
    id: '7',
    name: 'Athlétisme',
    image: {
      uri: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=800&fit=crop',
    },
    challenges: 45,
    followers: 1780,
    colors: ['#1a1f3a', '#2d3561'],
  },
  {
    id: '8',
    name: 'Boxe',
    image: {
      uri: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=800&fit=crop',
    },
    challenges: 18,
    followers: 670,
    colors: ['#2b0d0d', '#4a1616'],
  },
  {
    id: '9',
    name: 'Natation',
    image: {
      uri: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200&h=800&fit=crop',
    },
    challenges: 27,
    followers: 1340,
    colors: ['#0d1f2d', '#1a3a4f'],
  },
  {
    id: '10',
    name: 'Badminton',
    image: {
      uri: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&h=800&fit=crop',
    },
    challenges: 22,
    followers: 750,
    colors: ['#1d2d1a', '#354d2f'],
  },
];

const { width } = Dimensions.get('window');

function SportCard({ item }: { item: SportCardType }) {
  return (
    <Pressable
      onPress={() => router.push(`/sport/${item.id}`)}
      style={{ marginBottom: 16 }}>
      <View
        style={{
          width: width - 32,
          height: 120,
          borderRadius: 24,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        }}>
        <ImageBackground source={item.image} resizeMode="cover" style={{ flex: 1 }}>
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.8)']}
            style={StyleSheet.absoluteFillObject}
          />

          <View
            style={{
              flex: 1,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* Sport name */}
            <Text
              style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: 'white',
                flex: 1,
              }}>
              {item.name}
            </Text>

            {/* Stats */}
            <View style={{ gap: 8, alignItems: 'flex-end' }}>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 12,
                }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: '700' }}>
                  {item.challenges} challenges
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.25)',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 12,
                }}>
                <Text style={{ color: 'white', fontSize: 12, fontWeight: '700' }}>
                  {item.followers.toLocaleString()} followers
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </Pressable>
  );
}

export default function SportsScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={['#0f0f0f', '#1a1a1a', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="px-4 py-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-3xl font-bold text-white">Sports</Text>
                <Pressable
                  onPress={() => router.push('/location')}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                  }}>
                  <Text className="text-sm text-white/60">📍 Paris, France</Text>
                  <Text className="ml-2 text-sm text-white/60">›</Text>
                </Pressable>
              </View>

              {/* Profile */}
              <Pressable
                onPress={() => router.push('/profile')}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: 'rgba(255,255,255,0.3)',
                }}>
                <Text style={{ fontSize: 22 }}>👤</Text>
              </Pressable>
            </View>

            <Text className="mt-4 text-sm text-white/70">
              Sélectionnez votre sport préféré
            </Text>
          </View>

          {/* Sports List */}
          <FlatList
            data={sportsData}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: 32,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <SportCard item={item} />}
          />
        </SafeAreaView>
      </View>
    </>
  );
}