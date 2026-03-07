// LoginScreen handles user authentication via email and OTP, with theme and persistent storage support.
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';
import { useForm, Controller } from 'react-hook-form';
import { storeTokens } from '../utils/tokenStorage';
import { useAuth } from '../context/AuthContext';
import { LoginFormValues } from '../types';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../context/ThemeContext';
import { createMMKV } from 'react-native-mmkv';
import { IcTick } from '../assets/icons/IcTick';
import { K } from '../constants/AppConstants';

// Mock OTP for demonstration (replace with real OTP logic in production)
const MOCK_OTP = '1234';

// Main LoginScreen component
const LoginScreen = () => {
  // Get login function from AuthContext
  const { login } = useAuth();
  // Get theme from ThemeContext
  const { theme } = useContext(ThemeContext);
  // MMKV storage instance for persistent data
  const storage = createMMKV();
  // React Hook Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormValues>({
    defaultValues: { email: '', otp: '', rememberMe: false },
  });
  // Local state for loading and step (email or otp)
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'otp'>('email');


  // Handle email submission: validate and move to OTP step
  const onSubmitEmail = (data: LoginFormValues) => {
    clearErrors('email');
    setStep('otp');
  };

  // Handle OTP submission: validate OTP, store tokens, and log in
  const onSubmitOtp = async (data: LoginFormValues) => {
    setLoading(true);
    clearErrors('otp');
    setTimeout(async () => {
      if (data.otp !== MOCK_OTP) {
        setError('otp', { type: 'manual', message: 'Invalid OTP' });
        setLoading(false);
        return;
      }
      // Mock token generation and storage
      const authToken = 'mock-token-123';
      const refreshToken = 'mock-refresh-456';
      try {
        await storeTokens(authToken, refreshToken);
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
        });
        login();
        // Store rememberMe preference
        storage.set('rememberMe', data.rememberMe ? true : false);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Failed to store token securely.',
          text2: error instanceof Error ? error.message : 'Unknown error',
        });
      }
      setLoading(false);
    }, 1200);
  };

  // Render login UI: email step, OTP step, and loading indicator
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header section */}
      <View style={{ alignItems: 'center', marginBottom: 40, gap: 10 }}>
        <Text style={[styles.title, { color: theme.text }]}>Login</Text>
        <Text style={{ color: theme.text, marginBottom: 20 }}>
          {step === 'email'
            ? 'Enter your email to get OTP.'
            : 'Enter the OTP sent to your email.'}
        </Text>
      </View>
      {/* Email input step */}
      {step === 'email' && (
        <View style={styles.formSection}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                hintText="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                inputValue={value}
                onInputTextChange={onChange}
                errStatus={!!errors.email}
                showValidation={!!errors.email}
                validationText={errors.email?.message}
                style={styles.input}
              />
            )}
          />
          <CustomButton
            title="Send OTP"
            onPress={handleSubmit(onSubmitEmail)}
            disabled={loading}
          />
        </View>
      )}
      {/* OTP input step */}
      {step === 'otp' && (
        <View style={styles.formSection}>
          <Controller
            control={control}
            name="otp"
            rules={{
              required: 'OTP is required',
              minLength: { value: 4, message: 'OTP must be 4 digits' },
              maxLength: { value: 4, message: 'OTP must be 4 digits' },
              pattern: { value: /^\d{4}$/, message: 'OTP must be numeric' },
            }}
            render={({ field: { onChange, value } }) => (
              <CustomTextInput
                hintText="Enter OTP"
                keyboardType="numeric"
                inputValue={value}
                onInputTextChange={onChange}
                maxLength={4}
                errStatus={!!errors.otp}
                showValidation={!!errors.otp}
                validationText={errors.otp?.message}
                style={styles.input}
              />
            )}
          />
          {/* Remember me checkbox */}
          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => onChange(!value)}
              >
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: value
                        ? theme.primary
                        : theme.inputBoxColor,
                      borderColor: theme.primary,
                    },
                  ]}
                >{value && (
                  <IcTick
                    width={14}
                    height={14}
                    strokeColor={K.colorsConstants.white}
                    strokeWidth={2}
                  />)}
                </View>
                <Text style={[styles.checkboxLabel, { color: theme.text }]}>
                  Remember me
                </Text>
              </TouchableOpacity>
            )}
          />
        
          <CustomButton
            title="Login"
            onPress={handleSubmit(onSubmitOtp)}
            disabled={loading}
          />
        </View>
      )}
      {/* Loading indicator */}
      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    // padding: 16,
   
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  formSection: {
    width: '100%',
    maxWidth: 340,
    marginBottom: 16,
    gap:10
  },
  input: {
   
    marginBottom: 10,
   
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default LoginScreen;
