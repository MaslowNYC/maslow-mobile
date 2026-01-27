import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useAuth } from '../../src/contexts/AuthContext';
import { Redirect } from 'expo-router';

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or a loading screen
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#C5A059',
        tabBarInactiveTintColor: '#3B599880',
        tabBarStyle: {
          backgroundColor: '#F5F1E8',
          borderTopColor: '#3B599820',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>💳</Text>,
        }}
      />
    </Tabs>
  );
}
