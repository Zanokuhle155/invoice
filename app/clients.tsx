import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const clients = [
  { id: '1', name: 'pickNpay', contact: 'info@picnpay.com' },
  { id: '2', name: 'spar', contact: 'support@spar.com' },
  { id: '3', name: 'shoprite', contact: 'shoprite@.co.za' },
];

export default function ClientsScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Clients</Text> */}
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.contact}>{item.contact}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f5f9', padding: 15 },
  title: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  name: { fontSize: 16, fontWeight: '600', color: '#007bff' },
  contact: { fontSize: 14, color: 'gray', marginTop: 3 },
});
