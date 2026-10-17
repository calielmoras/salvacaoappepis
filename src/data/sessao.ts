let usuarioAtual = '';
let autenticado = false;

export const sessao = {
	get usuario() {
		return usuarioAtual;
	},
	get autenticado() {
		return autenticado;
	},
	iniciar(usuario: string) {
		usuarioAtual = usuario;
		autenticado = true;
	},
};
