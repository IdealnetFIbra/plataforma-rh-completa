// Tipos da plataforma de RH

export interface Colaborador {
  id: string;
  nomeCompleto: string;
  rg: string;
  cpf: string;
  email: string;
  dataNascimento: string;
  setor: string;
  cargo: string;
  gestorId?: string;
  avatar?: string;
  status: 'ativo' | 'inativo';
  dataAdmissao: string;
}

export interface Gestor {
  id: string;
  nomeCompleto: string;
  email: string;
  setor: string;
  avatar?: string;
}

export interface PerguntaAvaliacao {
  id: string;
  categoria: 'conhecimento' | 'habilidade' | 'atitude' | 'valores' | 'entrega' | 'seguranca';
  titulo: string;
  descricao: string;
  ordem: number;
  ativa: boolean;
}

export interface ModeloAvaliacao {
  id: string;
  nome: string;
  descricao: string;
  perguntas: PerguntaAvaliacao[];
  ativo: boolean;
  criadoEm: string;
}

export interface Avaliacao {
  id: string;
  colaboradorId: string;
  modeloId: string;
  status: 'pendente' | 'respondida' | 'expirada';
  dataEnvio: string;
  dataResposta?: string;
  dataExpiracao: string;
  token: string;
  respostas?: RespostaAvaliacao[];
}

export interface RespostaAvaliacao {
  perguntaId: string;
  nota: number; // 1-5
  comentario?: string;
}

export interface ConfiguracaoEmail {
  emailDisparo: string;
  nomeRemetente: string;
  assunto: string;
  mensagemPersonalizada?: string;
}

export interface ConfiguracaoEmpresa {
  nomeEmpresa: string;
  logoUrl?: string;
  corPrimaria: string;
  corSecundaria: string;
}

export interface DashboardStats {
  totalColaboradores: number;
  totalAvaliacoesPendentes: number;
  totalAvaliacoesRespondidas: number;
  taxaResposta: number;
  nivelSatisfacao: number; // 0-100
  nivelInsatisfacao: number; // 0-100
}
