// src/components/ViolationCard.tsx
import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ViolationItem {
  id: string;
  licensePlate?: string;
  vehicleOwner?: string;
  spotOwner?: string;
  plotNumber?: string;
  location?: string;
  // reportedAt: final string used for UI (already formatted)
  reportedAt?: string;
  approved?: boolean;
  approvedAt?: string;
  imageUrl?: string;
}

interface Props {
  item: ViolationItem;
  expanded: boolean;
  onToggle: (id: string) => void;
  onApprove: (id: string) => void;
  approvingId?: string | null;
}

export default function ViolationCard({ item, expanded, onToggle, onApprove, approvingId }: Props) {
  const isWater = !!item.location;

  return (
    <View style={{
      backgroundColor: '#fff',
      borderRadius: 12,
      borderWidth: 2,
      borderColor: item.approved ? '#bbf7d0' : '#fee2e2',
      marginBottom: 14,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 10,
      elevation: 3
    }}>
      <Pressable onPress={() => onToggle(item.id)} style={{ padding: 14 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <View style={{
              width: 54, height: 54, borderRadius: 11, justifyContent: 'center', alignItems: 'center',
              backgroundColor: item.approved ? '#dcfce7' : '#fee2e2', marginRight: 14
            }}>
              <MaterialIcons name={isWater ? "water-damage" : "directions-car"} size={22} color={item.approved ? '#059669' : '#b91c1c'} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontWeight: '700', color: '#0f172a', fontSize: 16 }}>
                {isWater ? (item.location || '—') : (item.licensePlate || '—')}
              </Text>

              <Text style={{ color: '#6b7280', marginTop: 6 }}>
                {isWater
                  ? (item.reportedAt ? `Reported: ${item.reportedAt}` : '—')
                  : (item.vehicleOwner ? item.vehicleOwner : (item.reportedAt ? `Reported: ${item.reportedAt}` : '—'))
                }
              </Text>
            </View>
          </View>

          <View style={{ marginLeft: 12 }}>
            <View style={{
              backgroundColor: item.approved ? '#d1fae5' : '#fee2e2',
              paddingHorizontal: 12, paddingVertical: 7, borderRadius: 999,
              alignSelf: 'flex-start'
            }}>
              <Text style={{ color: item.approved ? '#065f46' : '#991b1b', fontWeight: '600', fontSize: 12 }}>
                {item.approved ? 'Approved' : 'Pending'}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>

      {expanded && (
        <View style={{ padding: 14, borderTopWidth: 1, borderColor: '#eef2f7', backgroundColor: '#fff' }}>
          {/* image (optional) */}
          {item.imageUrl ? (
            <View style={{ marginBottom: 12 }}>
              <Image
                source={{ uri: item.imageUrl }}
                style={{ width: '100%', height: 180, borderRadius: 8, backgroundColor: '#f3f4f6' }}
                resizeMode="cover"
              />
              <Text style={{ color: '#6b7280', fontSize: 12, marginTop: 6 }}>Photo evidence (if available)</Text>
            </View>
          ) : null}

          {isWater ? (
            <View style={{ backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, marginBottom: 10 }}>
              <Text style={{ color: '#94a3b8', fontSize: 12 }}>Location Details</Text>
              <Text style={{ color: '#0f172a', marginTop: 8 }}>{item.location || '—'}</Text>
            </View>
          ) : (
            <>
              <View style={{ backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, marginBottom: 10 }}>
                <Text style={{ color: '#94a3b8', fontSize: 12 }}>Spot Owner</Text>
                <Text style={{ color: '#0f172a', marginTop: 8 }}>{item.spotOwner || '—'}</Text>
              </View>

              <View style={{ backgroundColor: '#f8fafc', padding: 12, borderRadius: 8, marginBottom: 10 }}>
                <Text style={{ color: '#94a3b8', fontSize: 12 }}>Plot Number</Text>
                <Text style={{ color: '#0f172a', marginTop: 8 }}>{item.plotNumber || '—'}</Text>
              </View>
            </>
          )}

          {/* reported + approved timestamps */}
          {item.reportedAt ? <Text style={{ color: '#6b7280', marginBottom: 8 }}>Reported: {item.reportedAt}</Text> : null}
          {item.approved && item.approvedAt ? <Text style={{ color: '#065f46', marginBottom: 8 }}>Approved on {item.approvedAt}</Text> : null}

          {/* Approve button */}
          {!item.approved ? (
            <Pressable
              onPress={() => onApprove(item.id)}
              disabled={approvingId === item.id}
              style={{
                backgroundColor: '#2563eb',
                padding: 12,
                borderRadius: 10,
                alignItems: 'center',
                opacity: approvingId === item.id ? 0.7 : 1
              }}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>
                {approvingId === item.id ? 'Approving...' : 'Approve'}
              </Text>
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
}
