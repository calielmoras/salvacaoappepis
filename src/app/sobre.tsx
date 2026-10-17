import Header from '@/components/Header';
import { colors, spacing } from '@/constants/theme';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

const Titulo = ({ children }: { children: string }) => <Text style={styles.titulo}>{children}</Text>;
const Par = ({ children }: { children: string }) => <Text style={styles.texto}>{children}</Text>;

export default function Sobre() {
  return (
    <View style={styles.container}>
      <Header titulo="" />
      <View style={{ flex: 1 }}>
        <Image source={require('@/assets/images/logo.png')} style={styles.marcaDagua} resizeMode="contain" />
        <ScrollView contentContainerStyle={styles.conteudo}>
          <Titulo>Sobre nós</Titulo>
          <Par>Na Salvação EPIs, a nossa missão é garantir a máxima segurança e integridade física dos trabalhadores industriais. Oferecemos soluções completas em Equipamentos de Proteção Individual (EPIs) de alta qualidade, em conformidade com as normas e certificações de segurança nacionais e internacionais.</Par>

          <Titulo>Quem somos</Titulo>
          <Par>Fundada com o propósito de simplificar e elevar a gestão de segurança no trabalho, a Salvação EPIs destaca-se pelo fornecimento ágil e consultivo de equipamentos essenciais.</Par>
          <Par>Mais do que vender produtos, atuamos como parceiros estratégicos de empresas de diversos setores — desde a construção civil e indústria química até trabalhos em altura e manutenção —, garantindo que cada equipe trabalhe protegida e em total conformidade com a legislação vigente.</Par>

          <Titulo>Nossos pilares</Titulo>
          <Par>Missão: Fornecer equipamentos de proteção individual de excelência, promovendo a cultura da segurança e prevenindo acidentes no ambiente de trabalho.</Par>
          <Par>Visão: Ser a distribuidora de EPIs de referência pela inovação, rapidez na entrega e atendimento técnico especializado.</Par>
          <Par>Valores:</Par>
          <Par>Compromisso com a Vida: A segurança e o bem-estar dos colaboradores estão sempre em primeiro lugar.</Par>
          <Par>Qualidade Certificada: Trabalhamos apenas com marcas e produtos devidamente homologados (com Certificado de Aprovação - CA ativo).</Par>
          <Par>Agilidade e Eficiência: Entregas rápidas e processos descomplicados para que a sua empresa nunca pare.</Par>
          <Par>Transparência e Ética: Relações comerciais claras, sólidas e de confiança de longo prazo.</Par>

          <Titulo>Diferenciais</Titulo>
          <Par>Catálogo Completo: Proteção auricular, ocular, respiratória, laboral (trabalho em altura), calçado e vestuário técnico num só lugar.</Par>
          <Par>Atendimento Consultivo: A nossa equipa auxilia na escolha exata dos EPIs adequados às necessidades e riscos específicos da sua operação.</Par>
          <Par>Agilidade em Orçamentos: Atendimento B2B otimizado para responder a cotações e solicitações de orçamento com rapidez.</Par>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  marcaDagua: { position: 'absolute', top: 0, left: 0, right: 0, height: 220, opacity: 0.15 },
  conteudo: { padding: spacing.md, paddingBottom: spacing.xl },
  titulo: { fontSize: 20, textAlign: 'center', marginTop: spacing.md, marginBottom: spacing.sm, color: colors.text },
  texto: { fontSize: 12, textAlign: 'center', marginBottom: spacing.sm, color: colors.text },
});
