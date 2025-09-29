import { useRef, useState } from 'react';
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
import { Stack } from 'expo-router';
import { eventsData, type EventCardType } from '~/data/events';

const { width } = Dimensions.get('window');
const CARD_W = Math.min(width * 0.65, 280);
const CARD_H = CARD_W * 1.35;
const SPACING = 20;
// Arc height (higher = more curved)
const ARC = 48;
// Distance between card centers
const STEP = CARD_W + SPACING;

function EventCard({
  item,
  index,
  scrollX,
}: {
  item: EventCardType;
  index: number;
  scrollX: Animated.Value;
}) {
  // Take a wider range to smooth the curve
  const inputRange = [
    (index - 2) * STEP,
    (index - 1) * STEP,
    index * STEP,
    (index + 1) * STEP,
    (index + 2) * STEP,
  ];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.8, 0.9, 1, 0.9, 0.8],
    extrapolate: 'clamp',
  });

  const rotateY = scrollX.interpolate({
    inputRange,
    outputRange: ['25deg', '12deg', '0deg', '-12deg', '-25deg'],
    extrapolate: 'clamp',
  });

  // The curve: bottom → middle → top (center) → middle → bottom
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [ARC, ARC * 0.6, 0, ARC * 0.6, ARC],
    extrapolate: 'clamp',
  });

  // Small X offset for 3D accent
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [40, 25, 0, -25, -40],
    extrapolate: 'clamp',
  });

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0.6, 0.8, 1, 0.8, 0.6],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{
        transform: [{ perspective: 1000 }, { translateY }, { translateX }, { rotateY }, { scale }],
        opacity,
      }}>
      <Pressable onPress={() => console.log(`Card ${item.id} pressed`)}>
        <View
          style={{
            width: CARD_W,
            height: CARD_H,
            borderRadius: 28,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 12,
          }}
          className="bg-white/5">
        <ImageBackground source={item.image} resizeMode="cover" className="flex-1">
          <LinearGradient
            colors={['rgba(0,0,0,0.22)', 'rgba(0,0,0,0.6)']}
            style={StyleSheet.absoluteFillObject}
          />

          {item.badge ? (
            <View
              style={{
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 6,
                backgroundColor: 'rgba(255,255,255,0.95)',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 8,
              }}
              className="absolute left-4 top-4">
              <Text className="text-[13px] font-bold text-black">{item.badge}</Text>
            </View>
          ) : null}

          <View className="absolute bottom-28 left-4 flex-row">
            {Array.from({ length: 6 }).map((_, i) => (
              <View
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  borderWidth: 2,
                  borderColor: 'rgba(255,255,255,0.6)',
                  marginLeft: i === 0 ? 0 : -10,
                }}
              />
            ))}
          </View>

          <View className="absolute bottom-4 left-4 right-4">
            <Text numberOfLines={1} className="mb-1 text-xl font-bold text-white">
              {item.title}
            </Text>
            <Text className="text-base font-medium text-white/90">{item.date}</Text>
            <Text className="text-sm text-white/75">{item.place}</Text>
          </View>
        </ImageBackground>
        </View>
      </Pressable>
    </Animated.View>
  );
}

function BackgroundCard({
  item,
  index,
  scrollX,
}: {
  item: EventCardType;
  index: number;
  scrollX: Animated.Value;
}) {
  const inputRange = [
    (index - 2) * STEP,
    (index - 1) * STEP,
    index * STEP,
    (index + 1) * STEP,
    (index + 2) * STEP,
  ];

  const opacity = scrollX.interpolate({
    inputRange,
    outputRange: [0, 0.5, 0.8, 0.5, 0],
    extrapolate: 'clamp',
  });

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [1.1, 1.2, 1.3, 1.2, 1.1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          opacity,
        },
      ]}>
      <Animated.Image
        source={item.image}
        style={{
          width: '100%',
          height: '100%',
          transform: [{ scale }],
        }}
        blurRadius={6}
        resizeMode="cover"
      />
    </Animated.View>
  );
}

export default function HomeScreen() {
  const listRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [bgColors, setBgColors] = useState(eventsData[0].colors);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / STEP);
        if (eventsData[index]) {
          setBgColors(eventsData[index].colors);
        }
      }
    }
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-black">
        {/* Animated background images */}
        {eventsData.map((item, index) => (
          <BackgroundCard key={item.id} item={item} index={index} scrollX={scrollX} />
        ))}

        {/* Gradient overlay - very transparent */}
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={StyleSheet.absoluteFillObject}
        />
        <SafeAreaView className="flex-1">
          {/* Carousel container */}
          <View className="mb-2 mt-6">
            <Animated.FlatList
              ref={listRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={STEP}
              decelerationRate="fast"
              bounces={false}
              contentContainerStyle={{
                paddingHorizontal: (width - CARD_W) / 2,
                paddingVertical: 8,
              }}
              ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
              data={eventsData}
              keyExtractor={(it) => it.id}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              renderItem={({ item, index }) => (
                <EventCard item={item} index={index} scrollX={scrollX} />
              )}
            />
          </View>

          {/* Bottom section */}
          <View className="flex-1 justify-end px-6 pb-8">
            <View className="items-center">
              <Text className="mb-2 text-sm text-white/80">Bienvenue sur</Text>
              <Text className="mb-3 text-4xl font-semibold text-white">Sport Challenger</Text>
            </View>
            <Text className="mb-6 text-base leading-6 text-white/70">
              Rejoignez des sports d'équipe et affrontez des joueurs autour de vous. Trouvez des
              coéquipiers, participez à des tournois et devenez le champion ultime.
            </Text>
            <Pressable
              style={{
                height: 56,
                borderRadius: 28,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 12,
                elevation: 8,
              }}
              className="items-center justify-center"
              onPress={() => {
                console.log('Button pressed');
              }}>
              <Text className="text-lg font-bold text-black">Challenge</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}
