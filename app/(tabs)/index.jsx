import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-maslow-cream">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-4xl font-serif text-maslow-blue mb-4 text-center">
          Welcome Home
        </Text>
        <Text className="text-lg text-maslow-blue/60 mb-8 text-center">
          {user?.email}
        </Text>
        
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-maslow-gold rounded-lg px-8 py-3 mt-4"
        >
          <Text className="text-[#1a1a1a] font-bold">
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
