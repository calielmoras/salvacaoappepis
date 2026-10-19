import { ImageSourcePropType } from 'react-native';

export type Produto = {
  id: string; // código exibido em "ID: xxxxx"
  nome: string;
  descricao: string;
  imagem?: ImageSourcePropType;
};

// Exporte as fotos do Figma (botão direito > Export > PNG) para
// assets/images/produtos/ e descomente as linhas "imagem".
export const produtos: Produto[] = [
  {
    id: '31469',
    nome: 'Capacete PLT CA 31469',
    descricao: 'Capacete de segurança com aba frontal e suspensão ajustável, para uso industrial e construção civil.',
    imagem: require('@/assets/images/capacete.png'),
  },
  {
    id: '109060',
    nome: 'Óculos Ampla Visão Univet 620UP',
    descricao: 'Óculos de ampla visão com proteção contra impactos, respingos e poeira. Lente antiembaçante.',
    imagem: require('@/assets/images/oculos.png'),
  },
  {
    id: '20551',
    nome: 'Luva Nitrílica Verde',
    descricao: 'Luva de proteção química em nitrila, indicada para manuseio de produtos químicos e solventes.',
    imagem: require('@/assets/images/luva.png'),
  },
  {
    id: '40872',
    nome: 'Cinto Paraquedista',
    descricao: 'Cinto de segurança tipo paraquedista com talabarte duplo, para trabalho em altura.',
    imagem: require('@/assets/images/cintoparaquedista.png'),
  },
  {
    id: '55120',
    nome: 'Macacão Descartável',
    descricao: 'Vestimenta de proteção descartável contra partículas e respingos leves.',
    imagem: require('@/assets/images/macacao.png'),
  },
  {
    id: '60315',
    nome: 'Máscara PFF2',
    descricao: 'Respirador semifacial dobrável PFF2, proteção contra poeiras, névoas e fumos.',
    imagem: require('@/assets/images/mascara.png'),
  },
];
