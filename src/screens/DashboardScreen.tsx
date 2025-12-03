// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Image, Platform } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

interface Props {
  onLogin?: (name: string, email: string) => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('name', '==', email), where('password', '==', password));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const doc = snap.docs[0].data() as any;
        const name = doc.name || email;
        const mail = doc.email || `${email}@example.com`;
        onLogin?.(name, mail);
      } else {
        setError('Invalid credentials (check Firestore users collection).');
      }
    } catch (err) {
      console.error(err);
      setError('Firebase error - check console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' }}>
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <Image source={require('../../assets/icon.png')} style={{ width: 96, height: 96, borderRadius: 48 }} />
      </View>

      <Text style={{ fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 8 }}>Campus Sentry</Text>
      <Text style={{ textAlign: 'center', color: '#6b7280', marginBottom: 20 }}>Sign in to your dashboard</Text>

      <Text style={{ marginBottom: 6, color: '#374151' }}>Username</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Username"
        keyboardType="username"
        autoCapitalize="none"
        textContentType="username"
        importantForAutofill="no"
        style={{ borderWidth: 1, borderColor: '#e6e7eb', padding: 12, borderRadius: 10, marginBottom: 12 }}
      />

      <Text style={{ marginBottom: 6, color: '#374151' }}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter your password"
        autoCapitalize="none"
        textContentType="password"
        importantForAutofill="no"
        style={{ borderWidth: 1, borderColor: '#e6e7eb', padding: 12, borderRadius: 10, marginBottom: 14 }}
      />

      {error ? <Text style={{ color: '#dc2626', marginBottom: 12 }}>{error}</Text> : null}

      <Pressable onPress={handleLogin} style={{ backgroundColor: '#2563eb', padding: 14, borderRadius: 10, alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>{loading ? 'Signing in...' : 'Sign In'}</Text>
      </Pressable>


    </View>
  );
}
