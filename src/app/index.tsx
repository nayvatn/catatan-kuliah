import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { initDB } from '../db/database';
import { getNotes, addNote, updateNote, deleteNote, Note } from '../services/noteServices';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const load = async () => setNotes(await getNotes());

  useEffect(() => {
    initDB().then(load);
  }, []);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return Alert.alert('Isi dulu', 'Judul & isi jangan kosong');
    if (editId) {
      await updateNote(editId, title, content);
      setEditId(null);
    } else {
      await addNote(title, content);
    }
    setTitle(''); setContent(''); load();
  };

  const handleEdit = (n: Note) => {
    setTitle(n.title); setContent(n.content); setEditId(n.id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Catatan Kuliah</Text>
      <TextInput style={styles.input} placeholder="Judul catatan..." value={title} onChangeText={setTitle} />
      <TextInput style={[styles.input, { height: 80 }]} placeholder="Isi catatan..." value={content} onChangeText={setContent} multiline />
      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>{editId ? 'Update Catatan' : 'Simpan Catatan'}</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => handleEdit(item)}><Text style={{ color: 'blue' }}>Edit</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => { Alert.alert('Hapus?', 'Yakin hapus?', [{ text: 'Batal' }, { text: 'Hapus', onPress: async () => { await deleteNote(item.id); load(); } }]); } }><Text style={{ color: 'red' }}>Hapus</Text></TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  btn: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  card: { borderWidth: 1, borderColor: '#eee', padding: 12, borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  row: { flexDirection: 'row', gap: 15, marginTop: 8 },
});