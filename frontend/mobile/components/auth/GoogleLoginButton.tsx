import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import { configureGoogleSignIn } from '@/lib/googleSignIn';

type GoogleLoginButtonProps = {
    onIdToken?: (idToken: string) => void;
};

export default function GoogleLoginButton({ onIdToken }: GoogleLoginButtonProps) {
    const [idToken, setIdToken] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        configureGoogleSignIn();
    }, []);

    const handleSignIn = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            configureGoogleSignIn();

            const response = await GoogleSignin.signIn();

            if (!isSuccessResponse(response)) {
                setErrorMessage('Google 로그인이 취소되었습니다.');
                return;
            }

            let token = response.data.idToken;

            if (!token) {
                const tokens = await GoogleSignin.getTokens();
                token = tokens.idToken;
            }

            if (!token) {
                setErrorMessage(
                    'idToken을 받지 못했습니다. Google Cloud Console 설정을 확인해주세요.',
                );
                return;
            }

            setIdToken(token);
            onIdToken?.(token);
        } catch (error) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        setErrorMessage('로그인이 이미 진행 중입니다.');
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        setErrorMessage('Google Play Services를 사용할 수 없습니다.');
                        break;
                    default:
                        setErrorMessage(error.message ?? 'Google 로그인에 실패했습니다.');
                }
                return;
            }

            setErrorMessage(
                error instanceof Error ? error.message : 'Google 로그인에 실패했습니다.',
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignOut = async () => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            await GoogleSignin.signOut();
            setIdToken(null);
        } catch (error) {
            setErrorMessage(
                error instanceof Error ? error.message : '로그아웃에 실패했습니다.',
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View className="gap-4 p-4">
            <Pressable
                className="items-center rounded-xl bg-black px-4 py-3 disabled:opacity-50"
                disabled={isLoading}
                onPress={handleSignIn}>
                {isLoading ? (
                    <ActivityIndicator color="#ffffff" />
                ) : (
                    <Text className="text-base font-semibold text-white">
                        Google로 로그인
                    </Text>
                )}
            </Pressable>

            {idToken ? (
                <Pressable
                    className="items-center rounded-xl border border-gray-300 px-4 py-3 disabled:opacity-50"
                    disabled={isLoading}
                    onPress={handleSignOut}>
                    <Text className="text-base font-medium text-gray-700">로그아웃</Text>
                </Pressable>
            ) : null}

            {errorMessage ? (
                <Text className="text-sm text-red-500">{errorMessage}</Text>
            ) : null}

            {idToken ? (
                <View className="gap-2">
                    <Text className="text-sm font-semibold text-gray-900">idToken</Text>
                    <Text className="text-xs text-gray-500">
                        길게 눌러 복사한 뒤 Postman body에 넣으세요.
                    </Text>
                    <ScrollView className="max-h-64 rounded-xl border border-gray-200 bg-gray-50 p-3">
                        <Text selectable className="text-xs text-gray-800">
                            {idToken}
                        </Text>
                    </ScrollView>
                </View>
            ) : null}
        </View>
    );
}
