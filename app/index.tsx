////3////

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Invoice {
  id: string;
  client: string;
  invoiceNumber: string;
  dateIssued: string;
  dueDate: string;
  description: string;
  quantity: string;
  unitPrice: string;
  tax: string;
  total: string;
  notes: string;
}

export default function InvoicesScreen() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      client: 'Game',
      invoiceNumber: 'INV-001',
      dateIssued: '2025-11-06',
      dueDate: '2025-11-15',
      description: 'Tools',
      quantity: '1',
      unitPrice: '250',
      tax: '15',
      total: 'R250.00',
      notes: 'Paid in full',
    },
     {
      id: '2',
      client: 'Spar',
      invoiceNumber: 'INV-002',
      dateIssued: '2025-11-06',
      dueDate: '2025-11-15',
      description: 'Food',
      quantity: '2',
      unitPrice: '400',
      tax: '15',
      total: 'R800.00',
      notes: 'Unpaid',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);

  // Input fields
  const [newClient, setNewClient] = useState('');
  const [newInvoiceNumber, setNewInvoiceNumber] = useState('');
  const [newDateIssued, setNewDateIssued] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newQuantity, setNewQuantity] = useState('');
  const [newUnitPrice, setNewUnitPrice] = useState('');
  const [newTax, setNewTax] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const resetForm = () => {
    setNewClient('');
    setNewInvoiceNumber('');
    setNewDateIssued('');
    setNewDueDate('');
    setNewDescription('');
    setNewQuantity('');
    setNewUnitPrice('');
    setNewTax('');
    setNewNotes('');
    setEditingInvoice(null);
  };

  const handleAddOrUpdate = () => {
    if (!newClient || !newInvoiceNumber || !newQuantity || !newUnitPrice) return;

    const quantity = parseFloat(newQuantity);
    const price = parseFloat(newUnitPrice);
    const taxPercent = parseFloat(newTax) || 0;
    const subtotal = quantity * price;
    const totalWithTax = subtotal + subtotal * (taxPercent / 100);

    const invoiceData: Invoice = {
      id: editingInvoice ? editingInvoice.id : Math.random().toString(),
      client: newClient,
      invoiceNumber: newInvoiceNumber,
      dateIssued: newDateIssued || new Date().toISOString().split('T')[0],
      dueDate: newDueDate || 'N/A',
      description: newDescription,
      quantity: newQuantity,
      unitPrice: newUnitPrice,
      tax: newTax,
      total: `R${totalWithTax.toFixed(2)}`,
      notes: newNotes,
    };

    if (editingInvoice) {
      setInvoices(invoices.map((inv) => (inv.id === editingInvoice.id ? invoiceData : inv)));
    } else {
      setInvoices([...invoices, invoiceData]);
    }

    resetForm();
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  const handleEdit = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setNewClient(invoice.client);
    setNewInvoiceNumber(invoice.invoiceNumber);
    setNewDateIssued(invoice.dateIssued);
    setNewDueDate(invoice.dueDate);
    setNewDescription(invoice.description);
    setNewQuantity(invoice.quantity);
    setNewUnitPrice(invoice.unitPrice);
    setNewTax(invoice.tax);
    setNewNotes(invoice.notes);
    setModalVisible(true);
  };

  const handleView = (invoice: Invoice) => {
    setViewingInvoice(invoice);
    setViewModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.client}>{item.client}</Text>
              <Text style={styles.invoiceNumber}>Invoice: {item.invoiceNumber}</Text>
              <Text style={styles.date}>Issued: {item.dateIssued}</Text>
              <Text >{item.notes}</Text>
              <Text style={styles.amount}>Total: {item.total}</Text>
            </View>

            <View style={styles.iconRow}>
              <TouchableOpacity onPress={() => handleView(item)}>
                <Ionicons name="eye-outline" size={24} color="#6c63ff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Ionicons name="create-outline" size={24} color="#00b894" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Ionicons name="trash-outline" size={24} color="#ff7675" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Floating + Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

      {/* Add/Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <ScrollView>
              <Text style={styles.modalTitle}>
                {editingInvoice ? 'Edit Invoice' : 'Create Invoice'}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Client Name"
                value={newClient}
                onChangeText={setNewClient}
              />
              <TextInput
                style={styles.input}
                placeholder="Invoice Number"
                value={newInvoiceNumber}
                onChangeText={setNewInvoiceNumber}
              />
              <TextInput
                style={styles.input}
                placeholder="Date Issued (YYYY-MM-DD)"
                value={newDateIssued}
                onChangeText={setNewDateIssued}
              />
              <TextInput
                style={styles.input}
                placeholder="Due Date (YYYY-MM-DD)"
                value={newDueDate}
                onChangeText={setNewDueDate}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={newDescription}
                onChangeText={setNewDescription}
              />
              <TextInput
                style={styles.input}
                placeholder="Quantity"
                keyboardType="numeric"
                value={newQuantity}
                onChangeText={setNewQuantity}
              />
              <TextInput
                style={styles.input}
                placeholder="Unit Price"
                keyboardType="numeric"
                value={newUnitPrice}
                onChangeText={setNewUnitPrice}
              />
              <TextInput
                style={styles.input}
                placeholder="Tax % (optional)"
                keyboardType="numeric"
                value={newTax}
                onChangeText={setNewTax}
              />
              <TextInput
                style={[styles.input, { height: 70 }]}
                placeholder="Notes (optional)"
                multiline
                value={newNotes}
                onChangeText={setNewNotes}
              />

              <TouchableOpacity style={styles.saveBtn} onPress={handleAddOrUpdate}>
                <Text style={styles.saveText}>
                  {editingInvoice ? 'Update Invoice' : 'Save Invoice'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'gray', marginTop: 10, textAlign: 'center' }}>Cancel</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* View Modal */}
      <Modal visible={viewModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, { maxHeight: '80%' }]}>
            <ScrollView>
              <Text style={styles.modalTitle}>Invoice Details</Text>
              {viewingInvoice && (
                <>
                  <Text style={styles.detailText}>Client: {viewingInvoice.client}</Text>
                  <Text style={styles.detailText}>Invoice #: {viewingInvoice.invoiceNumber}</Text>
                  <Text style={styles.detailText}>Date Issued: {viewingInvoice.dateIssued}</Text>
                  <Text style={styles.detailText}>Due Date: {viewingInvoice.dueDate}</Text>
                  <Text style={styles.detailText}>Description: {viewingInvoice.description}</Text>
                  <Text style={styles.detailText}>Quantity: {viewingInvoice.quantity}</Text>
                  <Text style={styles.detailText}>Unit Price: R{viewingInvoice.unitPrice}</Text>
                  <Text style={styles.detailText}>Tax: {viewingInvoice.tax}%</Text>
                  <Text style={styles.detailText}>Total: {viewingInvoice.total}</Text>
                  <Text style={styles.detailText}>Notes: {viewingInvoice.notes}</Text>
                </>
              )}
              <TouchableOpacity onPress={() => setViewModalVisible(false)}>
                <Text style={{ color: '#007bff', marginTop: 20, textAlign: 'center' }}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f5f9', padding: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  client: { fontSize: 17, fontWeight: '600', color: '#333' },
  invoiceNumber: { fontSize: 14, color: '#666', marginTop: 3 },
  date: { fontSize: 13, color: 'gray', marginTop: 3 },
  amount: { fontSize: 15, color: '#007bff', marginTop: 5 },
  iconRow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#007bff',
    width: 65,
    height: 65,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  fabText: { fontSize: 35, color: '#fff', marginBottom: 3 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
  },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveText: { color: '#fff', fontWeight: 'bold' },
  detailText: { fontSize: 15, marginVertical: 5, color: '#333' },
});
