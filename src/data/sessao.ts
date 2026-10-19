import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_SESSAO = 'sessao-v1';

let usuarioAtual = '';
let autenticado = false;

async function salvarSessao() {
  await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify({ usuario: usuarioAtual, autenticado }));
}

export const sessao = {
	get usuario() {
		return usuarioAtual;
	},
	get autenticado() {
		return autenticado;
	},
	async iniciar(usuario: string) {
		usuarioAtual = usuario.trim();
		autenticado = true;
		await salvarSessao();
	},
	async sair() {
		usuarioAtual = '';
		autenticado = false;
		await AsyncStorage.removeItem(CHAVE_SESSAO);
	},
	async carregar() {
		const dados = await AsyncStorage.getItem(CHAVE_SESSAO);
		if (!dados) {
			usuarioAtual = '';
			autenticado = false;
			return;
		}

		try {
			const sessaoSalva = JSON.parse(dados) as { usuario?: string; autenticado?: boolean };
			usuarioAtual = sessaoSalva.usuario ?? '';
			autenticado = Boolean(sessaoSalva.autenticado);
		} catch {
			usuarioAtual = '';
			autenticado = false;
			await AsyncStorage.removeItem(CHAVE_SESSAO);
		}
	},
};
