import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import AppContent from './src/AppContent';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <AppContent />
      <StatusBar />
    </SafeAreaView>
  );
}
