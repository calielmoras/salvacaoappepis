import Header from '@/components/Header';
import ProdutoCard from '@/components/ProdutoCard';
import { colors, radius, spacing } from '@/constants/theme';
import { produtos } from '@/data/produtos';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Produtos() {
  const [busca, setBusca] = useState('');
  const lista = produtos.filter((p) => p.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <View style={styles.container}>
      <Header logo />
      <FlatList
        data={lista}
        keyExtractor={(p) => p.id}
        numColumns={2}
        contentContainerStyle={{ padding: spacing.sm }}
        ListHeaderComponent={
          <View style={{ marginBottom: spacing.md }}>
            <View style={styles.busca}>
              <TextInput
                style={styles.input}
                placeholder="Pesquise aqui..."
                placeholderTextColor={colors.gray}
                value={busca}
                onChangeText={setBusca}
              />
              <Ionicons name="options" size={20} color={colors.text} />
              <Ionicons name="search" size={22} color={colors.text} style={{ marginLeft: spacing.sm }} />
            </View>

            {/* Troque por <Image source={require('@/assets/images/banner.png')} /> quando exportar o banner do Figma */}
            <View style={styles.banner}>
              <Text style={styles.bannerTitulo}>Proteja suas</Text>
              <Text style={[styles.bannerTitulo, { color: colors.primary }]}>mãos</Text>
              <Text style={styles.bannerTitulo}>no trabalho</Text>
              <Text style={styles.bannerSub}>Encontre o luva ideal para cada tarefa e risco.</Text>
            </View>
          </View>
        }
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum produto encontrado.</Text>}
        renderItem={({ item }) => <ProdutoCard produto={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  busca: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    height: 40,
    margin: spacing.xs,
  },
  input: { flex: 1, fontSize: 14, fontWeight: '600' },
  banner: {
    backgroundColor: '#F2F2F2',
    margin: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.sm,
    height: 130,
    justifyContent: 'center',
  },
  bannerTitulo: { fontSize: 18, fontWeight: '800', color: colors.dark, lineHeight: 22 },
  bannerSub: { fontSize: 9, color: colors.gray, marginTop: spacing.xs },
  vazio: { textAlign: 'center', marginTop: spacing.xl, color: colors.gray },
});
