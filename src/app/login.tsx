import Botao from '@/components/Botao';
import { colors, radius, spacing } from '@/constants/theme';
import { cadastrarConta, validarCredenciais } from '@/data/contas';
import { sessao } from '@/data/sessao';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [criandoConta, setCriandoConta] = useState(false);

  const entrar = async () => {
    if (!usuario.trim() || !senha) {
      Alert.alert('Atenção', 'Informe usuário e senha.');
      return;
    }
    if (criandoConta && senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      if (criandoConta) {
        const criada = await cadastrarConta(usuario, senha);
        if (!criada) {
          Alert.alert('Atenção', 'Este nome de usuário já está cadastrado.');
          return;
        }
      } else if (!(await validarCredenciais(usuario, senha))) {
        Alert.alert('Acesso negado', 'Usuário ou senha inválidos. Crie uma conta ou confira seus dados.');
        return;
      }

      await sessao.iniciar(usuario.trim());
      router.replace('/menu');
    } catch {
      Alert.alert('Erro', 'Não foi possível acessar as contas salvas neste dispositivo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.centro}
      >
        <View style={styles.painel}>
          <View style={styles.logoBox}>
            <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.campo}>
            <Ionicons name="mail" size={16} color={colors.gray} />
            <TextInput
              style={styles.input}
              placeholder="Nome de usuário"
              placeholderTextColor={colors.gray}
              value={usuario}
              onChangeText={setUsuario}
              autoCapitalize="none"
              autoComplete="username"
            />
          </View>

          <View style={styles.campo}>
            <Ionicons name="lock-closed" size={16} color={colors.gray} />
            <TextInput
              style={styles.input}
              placeholder={criandoConta ? 'Crie uma senha (mínimo 6 caracteres)' : 'Senha'}
              placeholderTextColor={colors.gray}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              autoComplete={criandoConta ? 'new-password' : 'current-password'}
            />
          </View>

          <Botao
            titulo={criandoConta ? 'Criar conta' : 'Entrar'}
            onPress={entrar}
            style={{ alignSelf: 'stretch', marginTop: spacing.sm }}
          />

          <Pressable
            onPress={() => setCriandoConta(!criandoConta)}
            accessibilityRole="button"
          >
            <Text style={styles.alternarModo}>
              {criandoConta ? 'Já tem uma conta? Entrar' : 'Não tem conta? Criar agora'}
            </Text>
          </Pressable>

          {criandoConta && (
            <Text style={styles.aviso}>Conta salva neste dispositivo.</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  centro: { flex: 1, justifyContent: 'center', padding: spacing.md },
  painel: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.md,
  },
  logoBox: { backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md },
  logo: { width: 140, height: 120 },
  campo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.borda,
    paddingHorizontal: spacing.md,
    height: 44,
    alignSelf: 'stretch',
  },
  input: { flex: 1, marginLeft: spacing.sm, fontSize: 13 },
  alternarModo: { color: colors.dark, fontSize: 14, fontWeight: '600', padding: spacing.xs },
  aviso: { color: colors.gray, fontSize: 12, textAlign: 'center' },
});
