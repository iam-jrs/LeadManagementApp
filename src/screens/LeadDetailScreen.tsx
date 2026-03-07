// LeadDetailScreen displays and allows editing of a single lead's details, with theme support.
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { View, Text, StyleSheet, TouchableOpacity, Linking, TextInput, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import leadsData from '../mock/data.json';
import { Dropdown } from 'react-native-element-dropdown';
import { updateLead } from '../store/leadSlice';
console.log('updateLead:', updateLead);
import CustomButton from '../components/CustomButton';
import { K } from '../constants/AppConstants';

// Main LeadDetailScreen component
const LeadDetailScreen = ({ route }: any) => {
  // Get leadId from navigation params
  const { leadId } = route.params;
  // Theme context
  const { theme } = useContext(ThemeContext);
  // Redux hooks
  const dispatch = useDispatch();
  // Find the lead by id
  const lead = useSelector((state: RootState) => state.lead.leads.find(l => l.id === leadId));
  // Local state for status and comments
  const [status, setStatus] = useState(lead?.status || '');
  const [comment, setComment] = useState(lead?.comments || '');

  // Update status in store when changed
  const handleStatusChange = (item: any) => {
    setStatus(item.value);
    dispatch(updateLead({ id: leadId, status: item.value }));
  };

  // Update comments in store when blurred
  const handleCommentBlur = () => {
    if (comment !== lead?.comments) {
      dispatch(updateLead({ id: leadId, comments: comment }));
    }
  };

  // If lead not found, show message
  if (!lead) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }] }>
        <Text style={{ color: theme.text }}>Lead not found.</Text>
      </View>
    );
  }

  // Action handlers for call, WhatsApp, and email
  const handleCall = () => {
    Linking.openURL(`tel:${lead.client.mobile_number}`);
  };
  const handleWhatsApp = () => {
    Linking.openURL(`whatsapp://send?phone=${lead.client.mobile_number}`);
  };
  const handleEmail = () => {
    if (lead.client.email) {
      Linking.openURL(`mailto:${lead.client.email}`);
    }
  };

  // Render lead details UI
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      {/* Lead info section */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text }]}>Client Name:</Text>
        <Text style={[styles.value, { color: theme.text }]}> 
          {lead.client.name}
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>Mobile:</Text>
        <Text style={[styles.value, { color: theme.text }]}> 
          {lead.client.mobile_number}
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>Email:</Text>
        <Text style={[styles.value, { color: theme.text }]}> 
          {lead.client.email || '-'}
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>Project:</Text>
        <Text style={[styles.value, { color: theme.text }]}> 
          {lead.project.name}
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>Assignee:</Text>
        <Text style={[styles.value, { color: theme.text }]}> 
          {lead.agent.name}
        </Text>
        <Text style={[styles.label, { color: theme.text }]}>Source:</Text>
        <Text style={[styles.value, { color: theme.text }]}>{lead.source}</Text>
        <Text style={[styles.label, { color: theme.text }]}>Created:</Text>
        <Text style={[styles.value, { color: theme.text }]}> 
          {new Date(lead.created_at).toLocaleString()}
        </Text>
      </View>
      {/* Status dropdown section */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text }]}>Status:</Text>
        <Dropdown
          style={[styles.dropdown, { backgroundColor: theme.inputBoxColor }]}
          data={leadsData.statuses.map((s: any) => ({
            label: s.label,
            value: s.value,
          }))}
          labelField="label"
          valueField="value"
          value={status}
          onChange={handleStatusChange}
          placeholderStyle={{ color: theme.subText }}
          selectedTextStyle={{ color: theme.text }}
        />
      </View>
      {/* Notes/comments section */}
      <View style={styles.section}>
        <Text style={[styles.label, { color: theme.text }]}> 
          Notes/Comments:
        </Text>
        <TextInput
          style={[
            styles.textArea,
            { backgroundColor: theme.inputBoxColor, color: theme.text },
          ]}
          value={comment || ''}
          onChangeText={setComment}
          onBlur={handleCommentBlur}
          placeholder="Add notes or comments..."
          placeholderTextColor={theme.subText}
          multiline
        />
      </View>
      {/* Action buttons for call, WhatsApp, and email */}
      <View style={styles.actionsRow}>
        <CustomButton
          title="Call"
          onPress={handleCall}
          style={styles.actionBtn}
        />
        <CustomButton
          title="WhatsApp"
          onPress={handleWhatsApp}
          style={styles.actionBtn}
        />
        <CustomButton
          title="Email"
          disabled={!lead.client.email}
          onPress={handleEmail}
          style={styles.actionBtn}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: K.fontSizeConstants.headings,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    width: '100%',
    marginBottom: 18,
  },
  label: {
    fontWeight: 'bold',
    fontSize: K.fontSizeConstants.regular,
    marginTop: 6,
  },
  value: {
    fontSize: K.fontSizeConstants.regular,
    marginBottom: 2,
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    fontSize: K.fontSizeConstants.regular,
    backgroundColor: '#fafafa',
  },
  textArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 70,
    fontSize: K.fontSizeConstants.regular,
    backgroundColor: '#fafafa',
    marginTop: 6,
    textAlignVertical: 'top',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  actionBtn: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
 
});

export default LeadDetailScreen;
