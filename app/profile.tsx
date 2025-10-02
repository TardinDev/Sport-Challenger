import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+33 6 12 34 56 78',
    location: 'Paris, France',
    bio: 'Passionné de sport et de défis !',
    favoriteSports: ['Basketball', 'Football', 'Tennis'],
  });

  const stats = {
    challengesParticipated: 24,
    challengesWon: 12,
    challengesCreated: 8,
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
            <Pressable onPress={() => setIsEditing(!isEditing)}>
              <Text className="text-lg text-white/70">
                {isEditing ? 'Terminer' : 'Modifier'}
              </Text>
            </Pressable>
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
              {isEditing && (
                <Pressable
                  style={{
                    marginTop: 12,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 20,
                  }}>
                  <Text style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
                    Changer la photo
                  </Text>
                </Pressable>
              )}
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

            {/* Profile Information */}
            <View className="px-4">
              <Text className="text-white text-lg font-bold mb-4">Informations</Text>

              {/* Name */}
              <View className="mb-4">
                <Text className="text-white/60 text-sm mb-2">Nom complet</Text>
                {isEditing ? (
                  <TextInput
                    value={profile.name}
                    onChangeText={(text) => setProfile({ ...profile, name: text })}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      padding: 12,
                      borderRadius: 12,
                      fontSize: 16,
                    }}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                  />
                ) : (
                  <Text className="text-white text-base">{profile.name}</Text>
                )}
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-white/60 text-sm mb-2">Email</Text>
                {isEditing ? (
                  <TextInput
                    value={profile.email}
                    onChangeText={(text) => setProfile({ ...profile, email: text })}
                    keyboardType="email-address"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      padding: 12,
                      borderRadius: 12,
                      fontSize: 16,
                    }}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                  />
                ) : (
                  <Text className="text-white text-base">{profile.email}</Text>
                )}
              </View>

              {/* Phone */}
              <View className="mb-4">
                <Text className="text-white/60 text-sm mb-2">Téléphone</Text>
                {isEditing ? (
                  <TextInput
                    value={profile.phone}
                    onChangeText={(text) => setProfile({ ...profile, phone: text })}
                    keyboardType="phone-pad"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      padding: 12,
                      borderRadius: 12,
                      fontSize: 16,
                    }}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                  />
                ) : (
                  <Text className="text-white text-base">{profile.phone}</Text>
                )}
              </View>

              {/* Location */}
              <View className="mb-4">
                <Text className="text-white/60 text-sm mb-2">Localisation</Text>
                {isEditing ? (
                  <TextInput
                    value={profile.location}
                    onChangeText={(text) => setProfile({ ...profile, location: text })}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      padding: 12,
                      borderRadius: 12,
                      fontSize: 16,
                    }}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                  />
                ) : (
                  <Text className="text-white text-base">{profile.location}</Text>
                )}
              </View>

              {/* Bio */}
              <View className="mb-4">
                <Text className="text-white/60 text-sm mb-2">Bio</Text>
                {isEditing ? (
                  <TextInput
                    value={profile.bio}
                    onChangeText={(text) => setProfile({ ...profile, bio: text })}
                    multiline
                    numberOfLines={3}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                      padding: 12,
                      borderRadius: 12,
                      fontSize: 16,
                      minHeight: 80,
                    }}
                    placeholderTextColor="rgba(255,255,255,0.4)"
                  />
                ) : (
                  <Text className="text-white text-base">{profile.bio}</Text>
                )}
              </View>

              {/* Favorite Sports */}
              <View className="mb-4">
                <Text className="text-white/60 text-sm mb-2">Sports préférés</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                  {profile.favoriteSports.map((sport, index) => (
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

              {/* Logout Button */}
              <Pressable
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  padding: 16,
                  borderRadius: 16,
                  marginTop: 16,
                  alignItems: 'center',
                }}>
                <Text style={{ color: '#ef4444', fontSize: 16, fontWeight: '700' }}>
                  Se déconnecter
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
}
