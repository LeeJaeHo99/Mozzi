import { Text, View } from 'react-native';

import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

export default function Home() {
    return (
        <View className="flex-1 justify-center bg-white">
            <Text className="mb-2 px-4 text-center text-xl font-bold text-gray-900">
                Mozzi
            </Text>
            <Text className="mb-6 px-4 text-center text-sm text-gray-500">
                Google 로그인 후 idToken을 확인할 수 있습니다.
            </Text>
            <GoogleLoginButton />
        </View>
    );
}
