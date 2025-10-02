import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router, useLocalSearchParams } from 'expo-router';

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams();

  // Mock data - in real app, fetch user data based on id
  const user = {
    name: 'Marc D.',
    location: 'Paris, France',
    bio: 'Passionné de basketball depuis 10 ans. Toujours prêt pour un bon match !',
    favoriteSports: ['Basketball', 'Football'],
  };

  const stats = {
    challengesParticipated: 18,
    challengesWon: 9,
    challengesCreated: 5,
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={['#1a1a2e', '#0f3460', '#0f0f0f', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="px-4 py-4 flex-row items-center justify-between">
            <Pressable onPress={() => router.back()}>
              <Text className="text-lg text-white/70">← Retour</Text>
            </Pressable>
            <Text className="text-2xl font-bold text-white">Profil</Text>
            <View style={{ width: 60 }} />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32 }}>
            {/* Profile Picture */}
            <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 24 }}>
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 4,
                  borderColor: 'rgba(255,255,255,0.3)',
                }}>
                <Text style={{ fontSize: 48 }}>👤</Text>
              </View>
              <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginTop: 12 }}>
                {user.name}
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>
                📍 {user.location}
              </Text>
            </View>

            {/* Stats */}
            <View style={{ flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginBottom: 24 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: 16,
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                  {stats.challengesParticipated}
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 }}>
                  Participés
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: 16,
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                  {stats.challengesWon}
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 }}>
                  Gagnés
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  padding: 16,
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                  {stats.challengesCreated}
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4 }}>
                  Créés
                </Text>
              </View>
            </View>

            {/* User Information */}
            <View className="px-4">
              {/* Bio */}
              <View className="mb-4">
                <Text className="text-white/60 text-sm mb-2">Bio</Text>
                <View
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: 16,
                    borderRadius: 12,
                  }}>
                  <Text className="text-white text-base">{user.bio}</Text>
                </View>
              </View>

              {/* Favorite Sports */}
              <View className="mb-4">
                <Text className="text-white/60 text-sm mb-2">Sports préférés</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {user.favoriteSports.map((sport, index) => (
                    <View
                      key={index}
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.3)',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 16,
                      }}>
                      <Text style={{ color: '#3b82f6', fontSize: 14, fontWeight: '600' }}>
                        {sport}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Contact Button */}
              <Pressable
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  padding: 16,
                  borderRadius: 16,
                  marginTop: 16,
                  alignItems: 'center',
                }}>
                <Text style={{ color: '#3b82f6', fontSize: 16, fontWeight: '700' }}>
                  Envoyer un message
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}
