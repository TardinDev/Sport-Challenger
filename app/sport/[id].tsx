import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
  Modal,
  ImageBackground,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router, useLocalSearchParams } from 'expo-router';

type ChallengeType = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
  creator: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  status: 'Ouvert' | 'Complet' | 'Terminé';
};

const mockChallenges: ChallengeType[] = [
  {
    id: '1',
    title: 'Match 3 contre 3',
    description: 'Venez affronter les meilleurs joueurs de la ville',
    date: "Aujourd'hui, 18h00",
    location: 'Stade Municipal',
    participants: 4,
    maxParticipants: 6,
    creator: 'Marc D.',
    difficulty: 'Moyen',
    status: 'Ouvert',
  },
  {
    id: '2',
    title: 'Tournoi du Weekend',
    description: 'Tournoi amical, tous niveaux acceptés',
    date: 'Samedi, 14h00',
    location: 'Complexe Sportif',
    participants: 12,
    maxParticipants: 16,
    creator: 'Sophie L.',
    difficulty: 'Facile',
    status: 'Ouvert',
  },
  {
    id: '3',
    title: 'Finale Championnat',
    description: 'Grande finale du championnat régional',
    date: 'Dimanche, 16h00',
    location: 'Arena Centrale',
    participants: 20,
    maxParticipants: 20,
    creator: 'Thomas K.',
    difficulty: 'Difficile',
    status: 'Complet',
  },
  {
    id: '4',
    title: 'Entraînement intensif',
    description: 'Session pour améliorer vos compétences',
    date: 'Mercredi, 19h00',
    location: 'Gymnase Nord',
    participants: 8,
    maxParticipants: 10,
    creator: 'Julie M.',
    difficulty: 'Difficile',
    status: 'Ouvert',
  },
];

function ChallengeCard({
  item,
  onDelete,
}: {
  item: ChallengeType;
  onDelete: (id: string) => void;
}) {
  const difficultyColors = {
    Facile: '#4ade80',
    Moyen: '#fbbf24',
    Difficile: '#ef4444',
  };

  const statusColors = {
    Ouvert: '#10b981',
    Complet: '#f59e0b',
    Terminé: '#6b7280',
  };

  return (
    <Pressable
      onPress={() => console.log(`Challenge ${item.id} selected`)}
      style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
      }}>
      {/* Header with title and status */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', flex: 1 }}>
          {item.title}
        </Text>
        <View
          style={{
            backgroundColor: statusColors[item.status],
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 12,
          }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: 'white' }}>{item.status}</Text>
        </View>
      </View>

      {/* Description */}
      <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>
        {item.description}
      </Text>

      {/* Info row */}
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 12, color: 'white' }}>📅 {item.date}</Text>
        </View>
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 12, color: 'white' }}>📍 {item.location}</Text>
        </View>
        <View
          style={{
            backgroundColor: difficultyColors[item.difficulty] + '30',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 10,
          }}>
          <Text style={{ fontSize: 12, color: difficultyColors[item.difficulty], fontWeight: '600' }}>
            {item.difficulty}
          </Text>
        </View>
      </View>

      {/* Bottom row: participants and creator */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>
            👥 {item.participants}/{item.maxParticipants}
          </Text>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginLeft: 12 }}>
            Par {item.creator}
          </Text>
        </View>

        {/* Delete button */}
        <Pressable
          onPress={() => onDelete(item.id)}
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            padding: 8,
            borderRadius: 8,
          }}>
          <Text style={{ color: '#ef4444', fontSize: 12, fontWeight: '600' }}>🗑️ Supprimer</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

export default function SportDetailScreen() {
  const { id } = useLocalSearchParams();
  const [challenges, setChallenges] = useState(mockChallenges);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxParticipants: '',
    difficulty: 'Moyen' as 'Facile' | 'Moyen' | 'Difficile',
  });

  const sportName = 'Basketball'; // TODO: Get from sport data based on id

  const filteredChallenges = challenges.filter(
    (challenge) =>
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (challengeId: string) => {
    Alert.alert(
      'Supprimer le challenge',
      'Êtes-vous sûr de vouloir supprimer ce challenge ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            setChallenges(challenges.filter((c) => c.id !== challengeId));
          },
        },
      ]
    );
  };

  const handleCreateChallenge = () => {
    if (!newChallenge.title || !newChallenge.date || !newChallenge.location) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const challenge: ChallengeType = {
      id: Date.now().toString(),
      title: newChallenge.title,
      description: newChallenge.description,
      date: newChallenge.date,
      location: newChallenge.location,
      participants: 0,
      maxParticipants: parseInt(newChallenge.maxParticipants) || 10,
      creator: 'Moi',
      difficulty: newChallenge.difficulty,
      status: 'Ouvert',
    };

    setChallenges([challenge, ...challenges]);
    setModalVisible(false);
    setNewChallenge({
      title: '',
      description: '',
      date: '',
      location: '',
      maxParticipants: '',
      difficulty: 'Moyen',
    });
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-black">
        <LinearGradient
          colors={['#1a1a2e', '#0f0f0f', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />

        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="px-4 py-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Pressable onPress={() => router.back()}>
                <Text className="text-lg text-white/70">← Retour</Text>
              </Pressable>
              <Text className="text-2xl font-bold text-white">{sportName}</Text>
              <View style={{ width: 60 }} />
            </View>

            {/* Search Bar */}
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 16,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                marginBottom: 12,
              }}>
              <Text style={{ fontSize: 18, marginRight: 8 }}>🔍</Text>
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Rechercher un challenge..."
                placeholderTextColor="rgba(255,255,255,0.4)"
                style={{
                  flex: 1,
                  color: 'white',
                  fontSize: 16,
                  paddingVertical: 14,
                }}
              />
            </View>

            {/* Stats and Create Button */}
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-white/70">
                {filteredChallenges.length} challenge(s) disponible(s)
              </Text>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={{
                  backgroundColor: 'white',
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 16, marginRight: 6 }}>+</Text>
                <Text style={{ color: 'black', fontSize: 14, fontWeight: '700' }}>
                  Créer
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Challenges List */}
          <FlatList
            data={filteredChallenges}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: 32,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ChallengeCard item={item} onDelete={handleDelete} />}
            ListEmptyComponent={
              <View style={{ alignItems: 'center', paddingTop: 40 }}>
                <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>
                  Aucun challenge trouvé
                </Text>
              </View>
            }
          />
        </SafeAreaView>

        {/* Create Challenge Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.8)',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                backgroundColor: '#1a1a1a',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                padding: 24,
                paddingBottom: 40,
              }}>
              <View className="mb-6 flex-row items-center justify-between">
                <Text className="text-2xl font-bold text-white">Nouveau Challenge</Text>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text className="text-2xl text-white/70">✕</Text>
                </Pressable>
              </View>

              {/* Form */}
              <View style={{ gap: 12 }}>
                <TextInput
                  value={newChallenge.title}
                  onChangeText={(text) => setNewChallenge({ ...newChallenge, title: text })}
                  placeholder="Titre du challenge *"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: 16,
                    borderRadius: 12,
                    fontSize: 16,
                  }}
                />
                <TextInput
                  value={newChallenge.description}
                  onChangeText={(text) => setNewChallenge({ ...newChallenge, description: text })}
                  placeholder="Description"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  multiline
                  numberOfLines={3}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: 16,
                    borderRadius: 12,
                    fontSize: 16,
                    minHeight: 80,
                  }}
                />
                <TextInput
                  value={newChallenge.date}
                  onChangeText={(text) => setNewChallenge({ ...newChallenge, date: text })}
                  placeholder="Date et heure *"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: 16,
                    borderRadius: 12,
                    fontSize: 16,
                  }}
                />
                <TextInput
                  value={newChallenge.location}
                  onChangeText={(text) => setNewChallenge({ ...newChallenge, location: text })}
                  placeholder="Lieu *"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: 16,
                    borderRadius: 12,
                    fontSize: 16,
                  }}
                />
                <TextInput
                  value={newChallenge.maxParticipants}
                  onChangeText={(text) =>
                    setNewChallenge({ ...newChallenge, maxParticipants: text })
                  }
                  placeholder="Nombre max de participants"
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  keyboardType="numeric"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    padding: 16,
                    borderRadius: 12,
                    fontSize: 16,
                  }}
                />

                {/* Difficulty selector */}
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  {(['Facile', 'Moyen', 'Difficile'] as const).map((level) => (
                    <Pressable
                      key={level}
                      onPress={() => setNewChallenge({ ...newChallenge, difficulty: level })}
                      style={{
                        flex: 1,
                        backgroundColor:
                          newChallenge.difficulty === level
                            ? 'rgba(255,255,255,0.2)'
                            : 'rgba(255,255,255,0.05)',
                        padding: 12,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor:
                          newChallenge.difficulty === level
                            ? 'white'
                            : 'rgba(255,255,255,0.1)',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          textAlign: 'center',
                          fontWeight: newChallenge.difficulty === level ? '700' : '400',
                        }}>
                        {level}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Create Button */}
              <Pressable
                onPress={handleCreateChallenge}
                style={{
                  backgroundColor: 'white',
                  padding: 18,
                  borderRadius: 16,
                  marginTop: 20,
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  Créer le Challenge
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}