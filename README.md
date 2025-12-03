Expo + Firebase minimal scaffold (mobile-first)
----------------------------------------------

What's included:
- Minimal Expo + TypeScript project scaffold
- Simple LoginScreen that checks Firestore 'users' collection for name/password
- Parking screen that reads 'parkingViolations' and allows approving (updates Firestore)
- Hardcoded Firebase config in src/firebase.ts (you gave it)
- Asset included: the image you uploaded -> /assets/e080a70e-6b98-49df-a8fe-41c614e8950b.png (local path used in project)

How to run (on your machine):
1. Install Expo CLI globally (if not already): npm install -g expo-cli
2. In project folder:
   npm install
   npm start
3. For phone demo: install Expo Go on your phone and scan the QR code printed by 'expo start'.
4. For web (desktop) demo: run 'npm run web' (expo start --web) and open the local URL.

Notes:
- This is a scaffold to demo on device/web. It uses Firebase web SDK and expects your Firestore collections to exist.
- For production mobile builds and App Store / Play Store distribution, use EAS builds (expo docs).

go here for the app : https://github.com/lukesaura/congenial-octo-invention

