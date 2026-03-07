LeadManagementApp

LeadManagementApp is a cross-platform mobile CRM application built with React Native for managing real estate leads. The application allows agents to login, view leads, search/filter leads, view lead details, and create new leads.

The app supports both iOS and Android and demonstrates clean architecture, state management, and scalable component design.

====================================================================================================

✨ Features
 - Authentication

 - Secure token storage

 - Persistent login session

 - Leads Management

 - View paginated list of leads

 - Search leads by client name or mobile number

 - Filter leads by status

 - Sort leads by creation date

 - Pull-to-refresh support

 - Lead Details

 - View complete lead information

 - Update lead status

 - Add comments/notes

 - Lead Creation

 - Form validation using react-hook-form

 - Call,Send WhatsApp message or/and Send Email to client

====================================================================================================

Additional Features

 - Light/Dark mode (system based)

 - Reusable UI components

 - Toast notifications for feedback

====================================================================================================

📁 Project Structure
src/
 ├── components/
 │     ├── CustomButton
 │     └── CustomTextInput
 │
 ├── screens/
 │     ├── LoginScreen
 │     ├── LeadsListScreen
 │     ├── LeadDetailScreen
 │     └── AddLeadScreen
 │
 ├── navigation/
 │     ├── RootNavigator
 │     ├── AuthNavigator
 │     └── AppNavigator
 │
 ├── store/
 │     ├── authSlice
 │     └── leadSlice
 │
 ├── utils/
 ├── types/
 └── constants/

====================================================================================================
📦 Setup Instructions

- Clone repository 

git clone https://github.com/iam-jrs/LeadManagementApp.git

cd LeadManagementApp

- Install dependencies

npm install

- Install iOS dependencies

cd ios
pod install
cd ..
====================================================================================================
▶️ Running the App
- Start Metro
yarn start

- Run Android
yarn android

- Run iOS
yarn ios

====================================================================================================
📸 Screenshots

Attached in the mail.

====================================================================================================

🏗 Architecture Decisions

Redux Toolkit - Chosen for scalable state management and predictable state updates.

React Hook Form - Provides performant form handling with minimal re-renders.

MMKV Storage and keychain storage - Used for fast and secure storage of authentication tokens.

Component Reusability - Reusable UI components ensure consistent design and maintainability.

Navigation Architecture - Navigation is separated into AuthNavigator and AppNavigator to handle authentication flow.


====================================================================================================

📚 References

React Native Documentation - https://reactnative.dev/docs/getting-started
Redux Toolkit Documentation - https://redux-toolkit.js.org/introduction/getting-started
React Navigation Documentation - https://reactnavigation.org/docs/stack-navigator/
React Native MMKV Documentation - https://github.com/mrousavy/react-native-mmkv
