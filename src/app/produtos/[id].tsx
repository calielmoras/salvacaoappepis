import Botao from '@/components/Botao';
import Header from '@/components/Header';
import { colors, spacing } from '@/constants/theme';
import { produtos } from '@/data/produtos';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProdutoDetalhe() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return (
      <View style={styles.container}>
        <Header titulo="Produto" />
        <Text style={styles.vazio}>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header titulo={`ID: ${produto.id}`} />
      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.imagemBox}>
          {produto.imagem ? (
            <Image source={produto.imagem} style={styles.imagem} resizeMode="contain" />
          ) : (
            <Ionicons name="shield-checkmark" size={90} color={colors.primary} />
          )}
        </View>

        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.descricao}>{produto.descricao}</Text>

        <Botao
          titulo="Consultar preço"
          style={{ marginTop: spacing.xl }}
          onPress={() =>
            router.push({ pathname: '/cliente/solicitacao', params: { produto: produto.nome } } as any)
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  conteudo: { padding: spacing.lg, alignItems: 'center' },
  imagemBox: { width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' },
  imagem: { width: '80%', height: '100%' },
  nome: { fontSize: 22, textAlign: 'center', marginTop: spacing.lg, color: colors.text },
  descricao: { fontSize: 13, textAlign: 'center', marginTop: spacing.md, color: colors.text },
  vazio: { textAlign: 'center', marginTop: spacing.xl },
});
