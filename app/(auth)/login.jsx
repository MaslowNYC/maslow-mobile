import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await signIn({ email, password });
      
      if (error) {
        Alert.alert('Access Denied', error.message || 'Invalid credentials.');
        return;
      }

      if (data?.user) {
        // Navigate to tabs (home screen)
        router.replace('/(tabs)');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-maslow-cream">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="items-center mb-12">
            {/* Logo/Brand */}
            <View className="w-16 h-16 bg-maslow-gold rounded-full items-center justify-center mb-6">
              <Text className="text-2xl">🔒</Text>
            </View>
            <Text className="text-3xl font-serif text-maslow-blue mb-2 tracking-wide">
              Member Access
            </Text>
            <Text className="text-base text-maslow-blue/60 text-center">
              Enter your credentials to access the facility.
            </Text>
          </View>

          <View className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-maslow-blue/10">
            <View className="space-y-4">
              <View className="space-y-2">
                <Text className="text-sm font-semibold text-maslow-blue mb-1">
                  Email
                </Text>
                <TextInput
                  className="bg-white/50 border border-maslow-blue/20 rounded-lg px-4 py-3 text-maslow-blue focus:border-maslow-gold"
                  placeholder="member@maslownyc.com"
                  placeholderTextColor="#3B599880"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  editable={!loading}
                />
              </View>

              <View className="space-y-2">
                <Text className="text-sm font-semibold text-maslow-blue mb-1">
                  Password
                </Text>
                <TextInput
                  className="bg-white/50 border border-maslow-blue/20 rounded-lg px-4 py-3 text-maslow-blue focus:border-maslow-gold"
                  placeholder="Enter your password"
                  placeholderTextColor="#3B599880"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                className="bg-maslow-gold rounded-lg py-4 items-center justify-center mt-6 shadow-md active:opacity-80 disabled:opacity-50"
              >
                {loading ? (
                  <ActivityIndicator color="#1a1a1a" />
                ) : (
                  <Text className="text-[#1a1a1a] font-bold text-base">
                    Enter Dashboard
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-sm text-maslow-blue/50">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text className="text-sm text-maslow-gold font-semibold">
                Join Waitlist
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-8 px-8">
            <Text className="text-xs text-maslow-blue/30 text-center">
              By accessing, you agree to the Maslow Privacy Protocol.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
