import { useState, useEffect, useRef } from 'react';
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
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router, useLocalSearchParams } from 'expo-router';

type ChallengeType = {
  id: string;
  challengeNumber: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: number;
  maxParticipants: number;
  creator: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
  status: 'En cours' | 'À venir' | 'Terminé' | 'Annulé';
  isLive?: boolean;
};

const sportsData: Record<
  string,
  { name: string; colors: string[]; image: { uri: string } }
> = {
  '1': {
    name: 'Basketball',
    colors: ['#1a1a2e', '#0f3460'],
    image: {
      uri: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
    },
  },
  '2': {
    name: 'Football',
    colors: ['#1b4332', '#2d6a4f'],
    image: {
      uri: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=800&fit=crop',
    },
  },
  '3': {
    name: 'Handball',
    colors: ['#1e3a5f', '#2a5a8a'],
    image: {
      uri: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=1200&h=800&fit=crop',
    },
  },
  '4': {
    name: 'Tennis',
    colors: ['#1a472a', '#2c6b3f'],
    image: {
      uri: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop',
    },
  },
  '5': {
    name: 'Rugby',
    colors: ['#1b3a2f', '#2e5c4a'],
    image: {
      uri: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&h=800&fit=crop',
    },
  },
  '6': {
    name: 'Volleyball',
    colors: ['#2b1d4e', '#4a3572'],
    image: {
      uri: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=1200&h=800&fit=crop',
    },
  },
  '7': {
    name: 'Athlétisme',
    colors: ['#1a1f3a', '#2d3561'],
    image: {
      uri: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&h=800&fit=crop',
    },
  },
  '8': {
    name: 'Boxe',
    colors: ['#2b0d0d', '#4a1616'],
    image: {
      uri: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=1200&h=800&fit=crop',
    },
  },
  '9': {
    name: 'Natation',
    colors: ['#0d1f2d', '#1a3a4f'],
    image: {
      uri: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200&h=800&fit=crop',
    },
  },
  '10': {
    name: 'Badminton',
    colors: ['#1d2d1a', '#354d2f'],
    image: {
      uri: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&h=800&fit=crop',
    },
  },
};

const mockChallenges: ChallengeType[] = [
  {
    id: '1',
    challengeNumber: '#CH-2024-001',
    title: 'Match 3 contre 3',
    description: 'Venez affronter les meilleurs joueurs de la ville',
    date: "Aujourd'hui, 18h00",
    location: 'Stade Municipal',
    participants: 4,
    maxParticipants: 6,
    creator: 'Marc D.',
    difficulty: 'Moyen',
    status: 'En cours',
    isLive: true,
  },
  {
    id: '2',
    challengeNumber: '#CH-2024-002',
    title: 'Tournoi du Weekend',
    description: 'Tournoi amical, tous niveaux acceptés',
    date: 'Samedi, 14h00',
    location: 'Complexe Sportif',
    participants: 12,
    maxParticipants: 16,
    creator: 'Sophie L.',
    difficulty: 'Facile',
    status: 'À venir',
    isLive: false,
  },
  {
    id: '3',
    challengeNumber: '#CH-2024-003',
    title: 'Finale Championnat',
    description: 'Grande finale du championnat régional',
    date: 'Dimanche, 16h00',
    location: 'Arena Centrale',
    participants: 20,
    maxParticipants: 20,
    creator: 'Thomas K.',
    difficulty: 'Difficile',
    status: 'Terminé',
    isLive: false,
  },
  {
    id: '4',
    challengeNumber: '#CH-2024-004',
    title: 'Entraînement intensif',
    description: 'Session pour améliorer vos compétences',
    date: 'Mercredi, 19h00',
    location: 'Gymnase Nord',
    participants: 8,
    maxParticipants: 10,
    creator: 'Julie M.',
    difficulty: 'Difficile',
    status: 'En cours',
    isLive: true,
  },
  {
    id: '5',
    challengeNumber: '#CH-2024-005',
    title: 'Défi marathon',
    description: 'Courir ensemble pour battre des records',
    date: 'Vendredi, 07h00',
    location: 'Parc Central',
    participants: 15,
    maxParticipants: 30,
    creator: 'Paul R.',
    difficulty: 'Difficile',
    status: 'À venir',
    isLive: false,
  },
  {
    id: '6',
    challengeNumber: '#CH-2024-006',
    title: 'Match amical débutants',
    description: 'Pour ceux qui commencent, ambiance conviviale',
    date: 'Lundi, 20h00',
    location: 'Terrain de quartier',
    participants: 6,
    maxParticipants: 10,
    creator: 'Emma B.',
    difficulty: 'Facile',
    status: 'À venir',
    isLive: false,
  },
  {
    id: '7',
    challengeNumber: '#CH-2024-007',
    title: 'Compétition annulée',
    description: 'Match annulé en raison des conditions météo',
    date: 'Hier, 15h00',
    location: 'Stade Ouest',
    participants: 0,
    maxParticipants: 12,
    creator: 'Alex M.',
    difficulty: 'Moyen',
    status: 'Annulé',
    isLive: false,
  },
];

function BlinkingLive() {
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();

    return () => blink.stop();
  }, [blinkAnim]);

  return (
    <Animated.View style={{ opacity: blinkAnim, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Text style={{ fontSize: 14 }}>📹</Text>
      <Text style={{ fontSize: 11, fontWeight: '700', color: 'white' }}>LIVE</Text>
    </Animated.View>
  );
}

function ChallengeCard({
  item,
  onViewLive,
  onAcceptChallenge,
}: {
  item: ChallengeType;
  onViewLive: (id: string) => void;
  onAcceptChallenge: (id: string) => void;
}) {
  const difficultyColors = {
    Facile: '#4ade80',
    Moyen: '#fbbf24',
    Difficile: '#ef4444',
  };

  const statusColors = {
    'En cours': '#10b981',
    'À venir': '#3b82f6',
    'Terminé': '#6b7280',
    'Annulé': '#ef4444',
  };

  return (
    <Pressable
      onPress={() => console.log(`Challenge ${item.challengeNumber} selected`)}
      style={{
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
      }}>
      {/* Challenge Number */}
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 12, fontWeight: '600', color: 'rgba(255,255,255,0.5)' }}>
          {item.challengeNumber}
        </Text>
      </View>

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
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}>
          {item.status === 'En cours' && item.isLive ? (
            <BlinkingLive />
          ) : (
            <Text style={{ fontSize: 11, fontWeight: '700', color: 'white' }}>
              {item.status}
            </Text>
          )}
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
            backgroundColor: 'rgba(255,255,255,0.1)',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 10,
          }}>
          <Text style={{ fontSize: 12, color: 'white' }}>
            👥 {item.participants}/{item.maxParticipants}
          </Text>
        </View>
      </View>

      {/* Bottom row: creator and action buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Pressable onPress={() => router.push(`/user/${item.id}`)}>
          <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', textDecorationLine: 'underline' }}>
            Par {item.creator}
          </Text>
        </Pressable>

        {/* Accept button - only show for upcoming challenges */}
        {item.status === 'À venir' && (
          <Pressable
            onPress={() => onAcceptChallenge(item.id)}
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 12,
            }}>
            <Text style={{ color: '#22c55e', fontSize: 13, fontWeight: '600' }}>✓ Accepter</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

export default function SportDetailScreen() {
  const { id } = useLocalSearchParams();
  const [challenges, setChallenges] = useState(mockChallenges);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<
    'Tous' | 'En cours' | 'À venir' | 'Terminé' | 'Annulé'
  >('Tous');
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxParticipants: '',
    difficulty: 'Moyen' as 'Facile' | 'Moyen' | 'Difficile',
  });

  const sportId = Array.isArray(id) ? id[0] : id || '1';
  const sport = sportsData[sportId] || {
    name: 'Basketball',
    colors: ['#1a1a2e', '#0f3460'],
    image: {
      uri: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&h=800&fit=crop',
    },
  };

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = selectedFilter === 'Tous' || challenge.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const challengesByStatus = {
    'En cours': challenges.filter((c) => c.status === 'En cours'),
    'À venir': challenges.filter((c) => c.status === 'À venir'),
    'Terminé': challenges.filter((c) => c.status === 'Terminé'),
  };

  const handleViewLive = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId);
    if (challenge?.isLive) {
      Alert.alert(
        'Match en direct',
        `Le match "${challenge.title}" est en cours de diffusion !`,
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Regarder',
            onPress: () => {
              console.log('Navigate to live stream for challenge:', challengeId);
              // TODO: Navigate to live stream screen
            },
          },
        ]
      );
    } else {
      Alert.alert('Match en cours', `Le match "${challenge?.title}" est en cours mais pas diffusé.`);
    }
  };

  const handleAcceptChallenge = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId);
    if (!challenge) return;

    if (challenge.participants >= challenge.maxParticipants) {
      Alert.alert('Challenge complet', 'Ce challenge a atteint le nombre maximum de participants.');
      return;
    }

    Alert.alert(
      'Accepter le challenge',
      `Voulez-vous participer au challenge "${challenge.title}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Accepter',
          onPress: () => {
            setChallenges(
              challenges.map((c) =>
                c.id === challengeId
                  ? { ...c, participants: c.participants + 1 }
                  : c
              )
            );
            Alert.alert('Confirmé !', 'Vous avez rejoint le challenge avec succès !');
          },
        },
      ]
    );
  };

  const handleDeclineChallenge = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId);
    if (!challenge) return;

    Alert.alert(
      'Refuser le challenge',
      `Êtes-vous sûr de vouloir refuser le challenge "${challenge.title}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Refuser',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Challenge refusé', 'Vous avez refusé ce challenge.');
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

    const challengeNumber = `#CH-2024-${String(challenges.length + 1).padStart(3, '0')}`;

    const challenge: ChallengeType = {
      id: Date.now().toString(),
      challengeNumber: challengeNumber,
      title: newChallenge.title,
      description: newChallenge.description,
      date: newChallenge.date,
      location: newChallenge.location,
      participants: 0,
      maxParticipants: parseInt(newChallenge.maxParticipants) || 10,
      creator: 'Moi',
      difficulty: newChallenge.difficulty,
      status: 'À venir',
      isLive: false,
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
        {/* Background Image with Blur */}
        <ImageBackground
          source={sport.image}
          resizeMode="cover"
          blurRadius={3}
          style={StyleSheet.absoluteFillObject}>
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.75)', 'rgba(0,0,0,0.85)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </ImageBackground>

        <SafeAreaView className="flex-1">
          {/* Header */}
          <View className="px-4 py-4">
            <View className="mb-4 flex-row items-center justify-between">
              <Pressable onPress={() => router.back()}>
                <Text className="text-lg text-white/70">← Retour</Text>
              </Pressable>
              <Text className="text-2xl font-bold text-white">{sport.name}</Text>
              <View style={{ width: 60 }} />
            </View>

            {/* Stats Section */}
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 16,
                  padding: 12,
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                  {challengesByStatus['En cours'].length}
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 }}>
                  En cours
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 16,
                  padding: 12,
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                  {challengesByStatus['À venir'].length}
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 }}>
                  À venir
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 16,
                  padding: 12,
                  alignItems: 'center',
                }}>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>
                  {challengesByStatus['Terminé'].length}
                </Text>
                <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 }}>
                  Terminés
                </Text>
              </View>
            </View>

            {/* Filters */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {(['Tous', 'En cours', 'À venir', 'Terminé', 'Annulé'] as const).map((filter) => (
                  <Pressable
                    key={filter}
                    onPress={() => setSelectedFilter(filter)}
                    style={{
                      backgroundColor:
                        selectedFilter === filter ? 'white' : 'rgba(255,255,255,0.2)',
                      paddingHorizontal: 16,
                      paddingVertical: 10,
                      borderRadius: 20,
                    }}>
                    <Text
                      style={{
                        color: selectedFilter === filter ? 'black' : 'white',
                        fontWeight: '600',
                        fontSize: 14,
                      }}>
                      {filter}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>

            {/* Search Bar */}
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
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

            {/* Results count and Create Button */}
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-white/70">
                {filteredChallenges.length} challenge(s)
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
            renderItem={({ item }) => (
              <ChallengeCard
                item={item}
                onViewLive={handleViewLive}
                onAcceptChallenge={handleAcceptChallenge}
              />
            )}
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