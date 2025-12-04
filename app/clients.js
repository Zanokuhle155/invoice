import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { db } from "../config/firebaseConfig";

export default function ClientsScreen() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "invoices"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInvoices(data);
      setLoading(false);
    });

    return unsub;
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <View style={styles.card}>
  {/* Client Name */}
  <Text style={styles.client}>{item.client}</Text>

  {/* Invoice Number */}
  <Text style={styles.label}>Invoice #: <Text style={styles.value}>{item.invoiceNumber}</Text></Text>

  {/* Total Price */}
  <Text style={styles.label}>Total Amount: <Text style={styles.value}>{item.total}</Text></Text>

  {/* Quantity */}
  <Text style={styles.label}>Quantity: <Text style={styles.value}>{item.quantity}</Text></Text>

  {/* Notes */}
  <Text style={styles.label}>Notes: <Text style={styles.value}>{item.notes || "None"}</Text></Text>
</View>


        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f5f9", padding: 15 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  invoiceNumber: { fontSize: 18, fontWeight: "700", color: "#007bff" },
  text: { fontSize: 14, color: "#444", marginTop: 5 },
  client: {
  fontSize: 18,
  fontWeight: "700",
  color: "#007bff",
  marginBottom: 8,
},

label: {
  fontSize: 20,
  fontWeight: "600",
  color: "#04818fff",
  marginTop: 4,
},

value: {
  fontWeight: "400",
  color: "#000",
},

});

