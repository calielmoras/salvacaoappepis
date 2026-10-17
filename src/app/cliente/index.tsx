import Botao from '@/components/Botao';
import Header from '@/components/Header';
import { colors, radius, spacing } from '@/constants/theme';
import { sessao } from '@/data/sessao';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

// Valores de exemplo. Depois vêm da API.
const resumo = [
  { t: 'Solicitações pendentes', v: 1 },
  { t: 'Pedidos concluídos', v: 1 },
  { t: 'Pedidos em andamento', v: 1 },
  { t: 'Orçamentos enviados', v: 1 },
];

export default function AreaCliente() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Header titulo={`Olá, ${sessao.usuario}`} />
      <View style={styles.conteudo}>
        <View style={styles.grade}>
          {resumo.map((r) => (
            <View key={r.t} style={styles.card}>
              <Text style={styles.cardTitulo}>{r.t}</Text>
              <Text style={styles.cardValor}>{r.v}</Text>
            </View>
          ))}
        </View>
        <Botao titulo="Realizar solicitação" onPress={() => router.push('/cliente/solicitacao' as any)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  conteudo: { padding: spacing.md, gap: spacing.md },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: spacing.md },
  card: {
    width: '48%',
    height: 100,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borda,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitulo: { fontSize: 13, textAlign: 'center', color: colors.text },
  cardValor: { fontSize: 26, marginTop: spacing.sm, color: colors.text },
});
