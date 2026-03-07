import * as Keychain from 'react-native-keychain';

/**
 * Stores authentication and refresh tokens securely using Keychain.
 * @param authToken - The authentication token to store.
 * @param refreshToken - The refresh token to store.
 */
export const storeTokens = async (authToken: string, refreshToken: string) => {
  try {
    await Keychain.setGenericPassword('authToken', authToken, { service: 'auth' });
    await Keychain.setGenericPassword('refreshToken', refreshToken, { service: 'refresh' });
    console.log('Tokens stored successfully!');
  } catch (error) {
    console.log('Error storing tokens:', error);
  }
};

/**
 * Retrieves the authentication token from Keychain.
 * @returns The authentication token or null if not found.
 */
export const getAuthToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: 'auth' });
    return credentials ? credentials.password : null;
  } catch (error) {
    console.log('Error retrieving authToken:', error);
    return null;
  }
};

/**
 * Retrieves the refresh token from Keychain.
 * @returns The refresh token or null if not found.
 */
export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const credentials = await Keychain.getGenericPassword({ service: 'refresh' });
    return credentials ? credentials.password : null;
  } catch (error) {
    console.log('Error retrieving refreshToken:', error);
    return null;
  }
};

/**
 * Removes both authentication and refresh tokens from Keychain.
 */
export const removeTokens = async () => {
  try {
    await Keychain.resetGenericPassword({ service: 'auth' });
    await Keychain.resetGenericPassword({ service: 'refresh' });
    console.log('Tokens removed successfully!');
  } catch (error) {
    console.log('Error removing tokens:', error);
  }
};
