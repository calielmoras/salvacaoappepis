import Header from '@/components/Header';
import { colors, radius, spacing } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const itens = [
  { t: 'Produtos', r: '/produtos' },
  { t: 'Suporte e Soluções', r: '/suporte' },
  { t: 'Sobre', r: '/sobre' },
  { t: 'Área do Cliente', r: '/cliente' },
];

export default function Menu() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Header logo />
      <View style={styles.grade}>
        {itens.map((i) => (
          <Pressable
            key={i.r}
            style={({ pressed }) => [styles.botao, pressed && { opacity: 0.8 }]}
            onPress={() => router.push(i.r as any)}
          >
            <Text style={styles.txt}>{i.t}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: spacing.md,
    rowGap: spacing.md,
    marginTop: spacing.lg,
  },
  botao: {
    width: '48%',
    height: 80,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borda,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  txt: { fontSize: 15, textAlign: 'center', color: colors.text },
});
