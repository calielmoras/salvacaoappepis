import Header from '@/components/Header';
import ProdutoCard from '@/components/ProdutoCard';
import { colors, radius, spacing } from '@/constants/theme';
import { produtos } from '@/data/produtos';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';

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

            <Image source={require('@/assets/images/banner.png')} style={styles.banner} resizeMode="cover" />
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
    width: '100%',
    height: 130,
    margin: spacing.xs,
    borderRadius: radius.sm,
  },
  vazio: { textAlign: 'center', marginTop: spacing.xl, color: colors.gray },
});
