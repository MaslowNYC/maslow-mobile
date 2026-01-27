import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* THE LOGO/BRAND */}
        <View style={styles.header}>
          <Text style={styles.brand}>MASLOW</Text>
          <Text style={styles.status}>SANCTUARY LOCKED</Text>
        </View>

        {/* THE INTERACTION */}
        <TouchableOpacity style={styles.button} onPress={() => alert('Unlock sequence initiated')}>
          <Text style={styles.buttonText}>UNLOCK SUITE</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A', // Maslow Dark Blue
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  header: {
    alignItems: 'center',
    gap: 10,
  },
  brand: {
    color: '#C5A059', // Maslow Gold
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  status: {
    color: '#64748B',
    fontSize: 12,
    letterSpacing: 2,
  },
  button: {
    backgroundColor: '#C5A059',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 2,
    shadowColor: '#C5A059',
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  buttonText: {
    color: '#0F172A',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});