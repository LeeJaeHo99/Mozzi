import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Stack } from 'expo-router';
import ReactQueryProvider from '@/providers/ReactQuery.provider';

export default function Layout() {
    return (
        <ReactQueryProvider>
            <SafeAreaProvider>
                <Stack />
            </SafeAreaProvider>
        </ReactQueryProvider>
    );
}
