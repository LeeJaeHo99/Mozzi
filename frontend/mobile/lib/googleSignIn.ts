import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { GOOGLE_IOS_CLIENT_ID } from '@/constants/googleAuth';

let isConfigured = false;

export function configureGoogleSignIn() {
    if (isConfigured) {
        return;
    }

    GoogleSignin.configure({
        iosClientId: GOOGLE_IOS_CLIENT_ID,
    });

    isConfigured = true;
}
