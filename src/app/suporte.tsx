import Botao from '@/components/Botao';
import Header from '@/components/Header';
import { colors, spacing } from '@/constants/theme';
import { Linking, StyleSheet, Text, View } from 'react-native';

export default function Suporte() {
  return (
    <View style={styles.container}>
      <Header titulo="Suporte e Soluções" />
      <View style={styles.conteudo}>
        <Text style={styles.texto}>
          Precisa de ajuda para escolher o EPI ideal para a sua operação? Fale com a nossa equipe técnica.
        </Text>
        {/* Troque pelo número real da empresa */}
        <Botao titulo="Falar no WhatsApp" onPress={() => Linking.openURL('https://wa.me/5541999999999')} />
        <Botao titulo="Enviar e-mail" onPress={() => Linking.openURL('mailto:contato@salvacaoepis.com.br')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  conteudo: { padding: spacing.lg, gap: spacing.md },
  texto: { fontSize: 15, textAlign: 'center', color: colors.text, marginBottom: spacing.md },
});
