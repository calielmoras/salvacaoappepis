import { colors, radius, spacing } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const itens = [
  { t: 'Início', r: '/menu' },
  { t: 'Produtos', r: '/produtos' },
  { t: 'Suporte e Soluções', r: '/suporte' },
  { t: 'Sobre', r: '/sobre' },
  { t: 'Área do Cliente', r: '/cliente' },
];

type Props = { titulo?: string; logo?: boolean };

export default function Header({ titulo, logo }: Props) {
  const router = useRouter();
  const [aberto, setAberto] = useState(false);

  const ir = (rota: string) => {
    setAberto(false);
    router.replace(rota as any);
  };

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: colors.white }}>
      <View style={styles.barra}>
        <View style={styles.lado}>
          {router.canGoBack() && (
            <Pressable onPress={() => router.back()} hitSlop={10}>
              <Ionicons name="chevron-back" size={28} color={colors.text} />
            </Pressable>
          )}
        </View>

        {logo ? (
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        ) : (
          <Text style={styles.titulo} numberOfLines={1}>{titulo}</Text>
        )}

        <View style={[styles.lado, { alignItems: 'flex-end' }]}>
          <Pressable onPress={() => setAberto(true)} hitSlop={10}>
            <Ionicons name="menu" size={34} color={colors.text} />
          </Pressable>
        </View>
      </View>

      <Modal transparent visible={aberto} animationType="fade" onRequestClose={() => setAberto(false)}>
        <Pressable style={styles.overlay} onPress={() => setAberto(false)}>
          <SafeAreaView edges={['top']}>
            <View style={styles.menu}>
              {itens.map((i) => (
                <Pressable key={i.r} style={styles.item} onPress={() => ir(i.r)}>
                  <Text style={styles.itemTxt}>{i.t}</Text>
                </Pressable>
              ))}
              <Pressable style={styles.item} onPress={() => ir('/login')}>
                <Text style={[styles.itemTxt, { color: colors.primary }]}>Sair</Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 56,
  },
  lado: { width: 44 },
  titulo: { flex: 1, textAlign: 'center', fontSize: 20, fontStyle: 'italic', color: colors.text },
  logo: { flex: 1, height: 90 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'flex-end' },
  menu: {
    backgroundColor: colors.white,
    marginTop: 56,
    marginRight: spacing.md,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    minWidth: 220,
  },
  item: { paddingVertical: 14, paddingHorizontal: spacing.lg },
  itemTxt: { fontSize: 16, color: colors.text },
});
