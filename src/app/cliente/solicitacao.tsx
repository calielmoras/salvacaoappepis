import Botao from '@/components/Botao';
import Header from '@/components/Header';
import { colors, radius, spacing } from '@/constants/theme';
import { produtos } from '@/data/produtos';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

function Select({ valor, opcoes, onChange }: { valor: string; opcoes: string[]; onChange: (v: string) => void }) {
  const [aberto, setAberto] = useState(false);
  return (
    <>
      <Pressable style={[styles.input, styles.select]} onPress={() => setAberto(true)}>
        <Text style={{ color: valor ? colors.text : colors.gray, flex: 1 }} numberOfLines={1}>
          {valor || 'Selecione'}
        </Text>
        <Ionicons name="chevron-down" size={18} color={colors.text} />
      </Pressable>
      <Modal transparent visible={aberto} animationType="fade" onRequestClose={() => setAberto(false)}>
        <Pressable style={styles.overlay} onPress={() => setAberto(false)}>
          <View style={styles.lista}>
            {opcoes.map((o) => (
              <Pressable
                key={o}
                style={styles.opcao}
                onPress={() => {
                  onChange(o);
                  setAberto(false);
                }}
              >
                <Text>{o}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

export default function Solicitacao() {
  const router = useRouter();
  const params = useLocalSearchParams<{ produto?: string }>();
  const numero = useMemo(() => Math.floor(100000 + Math.random() * 900000), []);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [produto, setProduto] = useState(params.produto ?? produtos[0].nome);
  const [qtd, setQtd] = useState('');
  const [mensagem, setMensagem] = useState('');

  const enviar = () => {
    if (!nome.trim() || !email.trim() || !telefone.trim() || !qtd.trim()) {
      Alert.alert('Atenção', 'Preencha nome, e-mail, telefone e quantidade.');
      return;
    }
    // TODO: enviar para a API / e-mail
    Alert.alert('Solicitação enviada', `Número ${numero}`, [{ text: 'OK', onPress: () => router.back() }]);
  };

  return (
    <View style={styles.container}>
      <Header titulo={`Solicitação: ${numero}`} />
      <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Nome completo:</Text>
        <TextInput style={styles.input} placeholder="Insira seu nome aqui" placeholderTextColor={colors.gray}
          value={nome} onChangeText={setNome} />

        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} placeholder="voce@empresa.com.br" placeholderTextColor={colors.gray}
          value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

        <Text style={styles.label}>Telefone:</Text>
        <TextInput style={styles.input} placeholder="+55(41)#####-#####" placeholderTextColor={colors.gray}
          value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

        <View style={styles.linha}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Produto ou serviço:</Text>
            <Select valor={produto} opcoes={produtos.map((p) => p.nome)} onChange={setProduto} />
          </View>
          <View style={{ width: 80 }}>
            <Text style={styles.label}>Qnt:</Text>
            <TextInput style={styles.input} placeholder="1,2,3..." placeholderTextColor={colors.gray}
              value={qtd} onChangeText={setQtd} keyboardType="number-pad" />
          </View>
        </View>

        <Text style={styles.label}>Mensagem: (opcional)</Text>
        <TextInput style={[styles.input, styles.mensagem]} value={mensagem} onChangeText={setMensagem}
          multiline textAlignVertical="top" />

        <Botao titulo="Realizar solicitação" onPress={enviar} style={{ marginTop: spacing.md }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  form: { padding: spacing.md, gap: 4 },
  label: { fontSize: 13, color: colors.text, marginTop: spacing.sm, marginBottom: 2 },
  input: {
    backgroundColor: colors.card,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.borda,
    paddingHorizontal: spacing.sm,
    height: 38,
    fontSize: 13,
  },
  select: { flexDirection: 'row', alignItems: 'center' },
  linha: { flexDirection: 'row', gap: spacing.sm },
  mensagem: { height: 110, paddingTop: spacing.sm },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: spacing.lg },
  lista: { backgroundColor: colors.white, borderRadius: radius.md, paddingVertical: spacing.sm },
  opcao: { paddingVertical: 12, paddingHorizontal: spacing.md },
});
