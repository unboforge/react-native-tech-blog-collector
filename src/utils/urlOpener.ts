import { Linking, Alert } from 'react-native';

export async function openUrl(url: string): Promise<void> {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert('오류', 'URL을 열 수 없습니다.');
    }
  } catch (error) {
    Alert.alert('오류', 'URL을 여는 중 문제가 발생했습니다.');
  }
}




