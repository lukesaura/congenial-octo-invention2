// src/screens/WaterLoggingScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { db, serverTime } from '../firebase';
import ViolationCard from '../components/ViolationCard';

export default function WaterLoggingScreen() {
  const [issues, setIssues] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'waterIssues'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map(d => {
        const data: any = d.data();

        let reportedAt = '';
        if (data.dateTime) {
          reportedAt = String(data.dateTime);
        } else if (data.reportedAt && data.reportedAt.seconds) {
          reportedAt = new Date(data.reportedAt.seconds * 1000).toLocaleString();
        } else if (data.createdAt && data.createdAt.seconds) {
          reportedAt = new Date(data.createdAt.seconds * 1000).toLocaleString();
        } else if (data.createdAt) {
          reportedAt = String(data.createdAt);
        }

        let approvedAt: string | undefined;
        if (data.approvedAt && data.approvedAt.seconds) {
          approvedAt = new Date(data.approvedAt.seconds * 1000).toLocaleString();
        } else if (data.approvedAt) {
          approvedAt = String(data.approvedAt);
        }

        return {
          id: d.id,
          location: data.location ?? '—',
          reportedAt,
          approved: !!data.approved,
          approvedAt
        };
      });

      setIssues(items);
      setLoading(false);
    }, (err) => {
      console.error('Firestore listen error', err);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleApprove = async (id: string) => {
    setApprovingId(id);
    try {
      const dref = doc(db, 'waterIssues', id);
      await updateDoc(dref, { approved: true, approvedAt: serverTime() });
      setExpandedId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to approve. Try again.');
    } finally {
      setApprovingId(null);
    }
  };

  if (loading) {
    return <View style={{ padding: 20 }}><Text style={{ color: '#6b7280' }}>Loading water logging issues...</Text></View>;
  }

  // counts for header badges
  const pendingCount = issues.filter(i => !i.approved).length;
  const approvedCount = issues.filter(i => i.approved).length;

  return (
    <ScrollView style={{ padding: 16 }}>
      <View style={{ marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 22, fontWeight: '700', color: '#0f172a' }}>Water Logging Issues</Text>
          <Text style={{ color: '#6b7280' }}>Track and resolve water logging reports</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{
            backgroundColor: '#fff0f0',
            borderWidth: 1,
            borderColor: '#fee2e2',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 10,
            marginLeft: 8,
            alignSelf: 'flex-start'
          }}>
            <Text style={{ color: '#991b1b', fontWeight: '600' }}>{pendingCount} Pending</Text>
          </View>

          <View style={{
            backgroundColor: '#f0fff4',
            borderWidth: 1,
            borderColor: '#bbf7d0',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 10,
            marginLeft: 8,
            alignSelf: 'flex-start'
          }}>
            <Text style={{ color: '#065f46', fontWeight: '600' }}>{approvedCount} Approved</Text>
          </View>
        </View>
      </View>

      {issues.map(i => (
        <ViolationCard
          key={i.id}
          item={{
            id: i.id,
            location: i.location,
            reportedAt: i.reportedAt,
            approved: i.approved,
            approvedAt: i.approvedAt
          }}
          expanded={expandedId === i.id}
          onToggle={(id) => setExpandedId(expandedId === id ? null : id)}
          onApprove={handleApprove}
          approvingId={approvingId}
        />
      ))}
    </ScrollView>
  );
}
