import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await signUp({ email, password });

      if (error) {
        if (error.message?.includes('already registered') || error.status === 422) {
          Alert.alert(
            'Account Exists',
            'That email is already in use. Please log in.',
            [
              { text: 'OK', onPress: () => router.replace('/(auth)/login') }
            ]
          );
          return;
        }
        throw error;
      }

      Alert.alert(
        'Welcome to Maslow',
        "Let's set up your preferences.",
        [
          { text: 'OK', onPress: () => router.replace('/(tabs)') }
        ]
      );
    } catch (error) {
      Alert.alert('Registration Failed', error.message || 'Could not create account.');
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
            <View className="w-16 h-16 bg-maslow-blue rounded-full items-center justify-center mb-6">
              <Text className="text-2xl">✨</Text>
            </View>
            <Text className="text-3xl font-serif text-maslow-blue mb-2 tracking-wide">
              Join Waitlist
            </Text>
            <Text className="text-base text-maslow-blue/60 text-center">
              Create your account to secure your spot.
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
                  placeholder="you@example.com"
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
                  Create Password
                </Text>
                <TextInput
                  className="bg-white/50 border border-maslow-blue/20 rounded-lg px-4 py-3 text-maslow-blue focus:border-maslow-gold"
                  placeholder="At least 6 characters"
                  placeholderTextColor="#3B599880"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password-new"
                  editable={!loading}
                />
              </View>

              <TouchableOpacity
                onPress={handleSignUp}
                disabled={loading}
                className="bg-maslow-blue rounded-lg py-4 items-center justify-center mt-6 shadow-md active:opacity-80 disabled:opacity-50"
              >
                {loading ? (
                  <ActivityIndicator color="#F5F1E8" />
                ) : (
                  <Text className="text-maslow-cream font-bold text-base">
                    Reserve My Spot
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-sm text-maslow-blue/50">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text className="text-sm text-maslow-gold font-semibold">
                Log In
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-8 px-8">
            <Text className="text-xs text-maslow-blue/30 text-center">
              By reserving your spot, you agree to the Maslow Privacy Protocol.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
