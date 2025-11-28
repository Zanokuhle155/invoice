import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Settings</Text> cause no need */}

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>App Theme</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.item, styles.logout]}>
        <Text style={[styles.itemText, { color: '#fff' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f5f9', padding: 15 },
  title: { fontSize: 22, fontWeight: '700', color: '#333', marginBottom: 10 },
  item: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: { fontSize: 16, color: '#333' },
  logout: { backgroundColor: '#ff7675', marginTop: 20, alignItems: 'center' },
});
