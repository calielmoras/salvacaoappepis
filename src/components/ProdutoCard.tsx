import { colors, radius, spacing } from '@/constants/theme';
import { Produto } from '@/data/produtos';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import Botao from './Botao';

export default function ProdutoCard({ produto }: { produto: Produto }) {
  const router = useRouter();
  return (
    <View style={styles.card}>
      <View style={styles.imagemBox}>
        {produto.imagem ? (
          <Image source={produto.imagem} style={styles.imagem} resizeMode="contain" />
        ) : (
          <Ionicons name="shield-checkmark" size={44} color={colors.primary} />
        )}
      </View>
      <Text style={styles.nome} numberOfLines={2}>{produto.nome}</Text>
      <Botao pequeno titulo="Consultar preço" onPress={() => router.push(`/produtos/${produto.id}` as any)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.sm,
    margin: spacing.xs,
    alignItems: 'center',
  },
  imagemBox: {
    width: '100%',
    height: 100,
    backgroundColor: colors.white,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  imagem: { width: '90%', height: '90%' },
  nome: { fontSize: 11, textAlign: 'center', color: colors.text, marginBottom: spacing.sm, minHeight: 30 },
});
