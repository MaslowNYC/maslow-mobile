import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View className="flex-1 bg-maslow-cream items-center justify-center">
        <ActivityIndicator size="large" color="#3B5998" />
      </View>
    );
  }

  return null;
}
