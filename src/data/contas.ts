import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

type ContaSalva = { salt: string; hashSenha: string };
type ContasSalvas = Record<string, ContaSalva>;

const CHAVE_CONTAS = 'contas-v1';

function normalizarUsuario(usuario: string) {
  return usuario.trim().toLowerCase();
}

function paraHexadecimal(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function gerarHashSenha(senha: string, salt: string) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${senha}`);
}

async function lerContas(): Promise<ContasSalvas> {
  const dados = await AsyncStorage.getItem(CHAVE_CONTAS);
  return dados ? JSON.parse(dados) as ContasSalvas : {};
}

export async function cadastrarConta(usuario: string, senha: string) {
  const contas = await lerContas();
  const usuarioNormalizado = normalizarUsuario(usuario);

  if (contas[usuarioNormalizado]) return false;

  const salt = paraHexadecimal(Crypto.getRandomBytes(16));
  contas[usuarioNormalizado] = { salt, hashSenha: await gerarHashSenha(senha, salt) };
  await AsyncStorage.setItem(CHAVE_CONTAS, JSON.stringify(contas));
  return true;
}

export async function validarCredenciais(usuario: string, senha: string) {
  const conta = (await lerContas())[normalizarUsuario(usuario)];
  if (!conta) return false;

  return (await gerarHashSenha(senha, conta.salt)) === conta.hashSenha;
}