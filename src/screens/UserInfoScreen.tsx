// src/screens/UserInfoScreen.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';

interface Props {
  user: { name: string; email: string };
  onConfirmSignOut: () => void;
  onCancel: () => void;
}

export default function UserInfoScreen({ user, onConfirmSignOut, onCancel }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <View style={{ backgroundColor: '#fff', padding: 20, borderRadius: 12, shadowOpacity: 0.06, elevation: 3 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 6 }}>Account Information</Text>
        <Text style={{ color: '#6b7280', marginBottom: 12 }}>Review your details before signing out</Text>

        <View style={{ backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, marginBottom: 8 }}>
          <Text style={{ color: '#6b7280' }}>Full Name</Text>
          <Text style={{ fontWeight: '700', marginTop: 6 }}>{user.name}</Text>
        </View>

        <View style={{ backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, marginBottom: 12 }}>
          <Text style={{ color: '#6b7280' }}>Email Address</Text>
          <Text style={{ fontWeight: '700', marginTop: 6 }}>{user.email}</Text>
        </View>

        <Pressable onPress={onConfirmSignOut} style={{ backgroundColor: '#ef4444', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Confirm Sign Out</Text>
        </Pressable>

        <Pressable onPress={onCancel} style={{ backgroundColor: '#f3f4f6', padding: 12, borderRadius: 8, alignItems: 'center' }}>
          <Text style={{ color: '#374151' }}>Return to Dashboard</Text>
        </Pressable>
      </View>
    </View>
  );
}
