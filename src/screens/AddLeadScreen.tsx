
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addLead } from '../store/leadSlice';
import { RootState } from '../store/store';
import Toast from 'react-native-toast-message';
import { Dropdown } from 'react-native-element-dropdown';
import leadsData from '../mock/data.json';
import CustomTextInput from '../components/CustomTextInput';
import CustomButton from '../components/CustomButton';

const AddLeadScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const leads = useSelector((state: RootState) => state.lead.leads);
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data: any) => {
    // Prevent duplicate mobile number
    if (leads.some((l: any) => l.client.mobile_number === data.mobileNumber)) {
      Toast.show({ type: 'error', text1: 'Mobile number already exists!' });
      return;
    }
    dispatch(
      addLead({
        status: 'new',
        sub_status: 'new',
        source: data.source,
        client: {
          id: 0,
          name: data.clientName,
          email: data.email || null,
          mobile_number: data.mobileNumber,
          dial_code: '+971',
        },
        project: data.project,
        agent: data.assignee,
        comments: '',
      }),
    );
    Toast.show({ type: 'success', text1: 'Lead added successfully!' });
    
    setTimeout(() => navigation.goBack(), 500);
    reset();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      {/* Client Name */}
      <Controller
        control={control}
        name="clientName"
        rules={{ required: 'Client name is required', minLength: { value: 2, message: 'Minimum 2 characters' } }}
        render={({ field: { onChange, value, onBlur } }) => (
          <CustomTextInput
            hintText="Client Name"
            inputValue={value}
            onInputTextChange={onChange}
            showValidation={!!errors.clientName}
            validationText={errors.clientName?.message as string}
            errStatus={!!errors.clientName}
            onBlur={onBlur}
            style={styles.input}
          />
        )}
      />

      {/* Mobile Number */}
      <Controller
        control={control}
        name="mobileNumber"
        rules={{
          required: 'Mobile number is required',
          pattern: { value: /^\d{10,12}$/, message: 'Enter 10–12 digits' }
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <CustomTextInput
            hintText="Mobile Number"
            inputValue={value}
            onInputTextChange={onChange}
            showValidation={!!errors.mobileNumber}
            validationText={errors.mobileNumber?.message as string}
            errStatus={!!errors.mobileNumber}
            onBlur={onBlur}
            style={styles.input}
            keyboardType="numeric"
            maxLength={12}
          />
        )}
      />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        rules={{
          pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Invalid email format' }
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <CustomTextInput
            hintText="Email (optional)"
            inputValue={value}
            onInputTextChange={onChange}
            showValidation={!!errors.email}
            validationText={errors.email?.message as string}
            errStatus={!!errors.email}
            onBlur={onBlur}
            style={styles.input}
            keyboardType="email-address"
          />
        )}
      />

      {/* Project Dropdown */}
      <Controller
        control={control}
        name="project"
        rules={{ required: 'Project is required' }}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            style={styles.dropdown}
            data={leadsData.projects.map((p: any) => ({ label: p.name, value: p.id }))}
            labelField="label"
            valueField="value"
            placeholder="Select Project"
            value={value}
            onChange={item => onChange(item.value)}
          />
        )}
      />
      {errors.project && <Text style={styles.error}>{errors.project.message as string}</Text>}

      {/* Source Dropdown */}
      <Controller
        control={control}
        name="source"
        rules={{ required: 'Source is required' }}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            style={styles.dropdown}
            data={leadsData.sources.map((s: string) => ({ label: s.charAt(0).toUpperCase() + s.slice(1), value: s }))}
            labelField="label"
            valueField="value"
            placeholder="Select Source"
            value={value}
            onChange={item => onChange(item.value)}
          />
        )}
      />
      {errors.source && <Text style={styles.error}>{errors.source.message as string}</Text>}

      {/* Assignee Dropdown */}
      <Controller
        control={control}
        name="assignee"
        rules={{ required: 'Assignee is required' }}
        render={({ field: { onChange, value } }) => (
          <Dropdown
            style={styles.dropdown}
            data={leadsData.agents.map((a: any) => ({ label: a.name, value: a.id }))}
            labelField="label"
            valueField="value"
            placeholder="Select Assignee"
            value={value}
            onChange={item => onChange(item.value)}
          />
        )}
      />
      {errors.assignee && <Text style={styles.error}>{errors.assignee.message as string}</Text>}


      <CustomButton
        title="Add Lead"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  dropdown: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
});

export default AddLeadScreen;
