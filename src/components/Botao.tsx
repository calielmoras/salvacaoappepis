import { colors, radius } from '@/constants/theme';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

type Props = { titulo: string; onPress?: () => void; style?: ViewStyle; pequeno?: boolean };

export default function Botao({ titulo, onPress, style, pequeno }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, pequeno && styles.pequeno, pressed && { opacity: 0.8 }, style]}
    >
      <Text style={[styles.txt, pequeno && styles.txtPequeno]}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.botao,
    borderRadius: radius.pill,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pequeno: { paddingVertical: 6, paddingHorizontal: 12 },
  txt: { color: colors.white, fontSize: 18 },
  txtPequeno: { fontSize: 11 },
});
