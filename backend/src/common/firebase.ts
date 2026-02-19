import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Attempt to initialize Firebase Admin
// This requires GOOGLE_APPLICATION_CREDENTIALS env var to point to the service account key file
// OR the service account JSON content in a separate env var if parsing manually.

// Only initialize if we have explicit credentials content or path in env
// This prevents accidental initialization with unrelated gcloud default credentials on the developer's machine
const hasCredentials = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (hasCredentials) {
  try {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
      console.log('Firebase Admin Initialized');
    }
  } catch (error) {
    console.warn('Firebase Admin Initialization Failed. Firebase features will not work until valid credentials are provided.', error);
  }
} else {
  console.warn('Firebase Admin: No GOOGLE_APPLICATION_CREDENTIALS provided. Token verification will be skipped in DEV MODE.');
}

export default admin;
