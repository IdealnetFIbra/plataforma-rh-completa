import type { 
  Colaborador, 
  Gestor, 
  Avaliacao, 
  ModeloAvaliacao, 
  PerguntaAvaliacao,
  DashboardStats 
} from './types';

// Gestores
export const mockGestores: Gestor[] = [
  {
    id: 'g1',
    nomeCompleto: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    setor: 'Tecnologia',
  },
  {
    id: 'g2',
    nomeCompleto: 'Carlos Oliveira',
    email: 'carlos.oliveira@empresa.com',
    setor: 'Comercial',
  },
  {
    id: 'g3',
    nomeCompleto: 'Ana Costa',
    email: 'ana.costa@empresa.com',
    setor: 'Financeiro',
  },
];

// Colaboradores
export const mockColaboradores: Colaborador[] = [
  {
    id: 'c1',
    nomeCompleto: 'João Silva',
    rg: '12.345.678-9',
    cpf: '123.456.789-00',
    email: 'joao.silva@empresa.com',
    dataNascimento: '1990-05-15',
    setor: 'Tecnologia',
    cargo: 'Desenvolvedor Full Stack',
    gestorId: 'g1',
    status: 'ativo',
    dataAdmissao: '2020-01-10',
  },
  {
    id: 'c2',
    nomeCompleto: 'Pedro Almeida',
    rg: '98.765.432-1',
    cpf: '987.654.321-00',
    email: 'pedro.almeida@empresa.com',
    dataNascimento: '1988-08-22',
    setor: 'Tecnologia',
    cargo: 'Tech Lead',
    gestorId: 'g1',
    status: 'ativo',
    dataAdmissao: '2019-03-15',
  },
  {
    id: 'c3',
    nomeCompleto: 'Juliana Ferreira',
    rg: '11.222.333-4',
    cpf: '111.222.333-44',
    email: 'juliana.ferreira@empresa.com',
    dataNascimento: '1992-11-30',
    setor: 'Comercial',
    cargo: 'Gerente de Vendas',
    gestorId: 'g2',
    status: 'ativo',
    dataAdmissao: '2021-06-01',
  },
  {
    id: 'c4',
    nomeCompleto: 'Roberto Lima',
    rg: '44.555.666-7',
    cpf: '444.555.666-77',
    email: 'roberto.lima@empresa.com',
    dataNascimento: '1985-03-12',
    setor: 'Financeiro',
    cargo: 'Analista Financeiro',
    gestorId: 'g3',
    status: 'ativo',
    dataAdmissao: '2018-09-20',
  },
  {
    id: 'c5',
    nomeCompleto: 'Fernanda Costa',
    rg: '77.888.999-0',
    cpf: '777.888.999-00',
    email: 'fernanda.costa@empresa.com',
    dataNascimento: '1995-07-18',
    setor: 'Tecnologia',
    cargo: 'UX Designer',
    gestorId: 'g1',
    status: 'ativo',
    dataAdmissao: '2022-02-14',
  },
];

// Perguntas de Avaliação
const perguntasPadrao: PerguntaAvaliacao[] = [
  {
    id: 'p1',
    categoria: 'conhecimento',
    titulo: 'Domínio Técnico',
    descricao: 'Domínio técnico, formação e atualização profissional.',
    ordem: 1,
    ativa: true,
  },
  {
    id: 'p2',
    categoria: 'habilidade',
    titulo: 'Capacidade de Execução',
    descricao: 'Capacidade de execução, autonomia e entrega com qualidade.',
    ordem: 2,
    ativa: true,
  },
  {
    id: 'p3',
    categoria: 'atitude',
    titulo: 'Comportamento e Postura',
    descricao: 'Comportamento, postura profissional e relacionamento interpessoal.',
    ordem: 3,
    ativa: true,
  },
  {
    id: 'p4',
    categoria: 'valores',
    titulo: 'Alinhamento com Valores',
    descricao: 'Alinhamento com os valores e cultura da empresa.',
    ordem: 4,
    ativa: true,
  },
  {
    id: 'p5',
    categoria: 'entrega',
    titulo: 'Resultados e Entregas',
    descricao: 'Qualidade e pontualidade das entregas e resultados alcançados.',
    ordem: 5,
    ativa: true,
  },
  {
    id: 'p6',
    categoria: 'seguranca',
    titulo: 'Segurança e Conformidade',
    descricao: 'Cumprimento de normas de segurança e procedimentos.',
    ordem: 6,
    ativa: true,
  },
];

// Modelos de Avaliação
export const mockModelosAvaliacao: ModeloAvaliacao[] = [
  {
    id: 'm1',
    nome: 'Avaliação de Desempenho 2024',
    descricao: 'Modelo padrão de avaliação anual',
    perguntas: perguntasPadrao,
    ativo: true,
    criadoEm: '2024-01-01',
  },
  {
    id: 'm2',
    nome: 'Avaliação 90 Dias',
    descricao: 'Avaliação para novos colaboradores',
    perguntas: perguntasPadrao.slice(0, 4),
    ativo: true,
    criadoEm: '2024-01-15',
  },
];

// Avaliações
export const mockAvaliacoes: Avaliacao[] = [
  {
    id: 'av1',
    colaboradorId: 'c1',
    modeloId: 'm1',
    status: 'respondida',
    dataEnvio: '2024-01-10',
    dataResposta: '2024-01-12',
    dataExpiracao: '2024-01-20',
    token: 'token123',
    respostas: [
      { perguntaId: 'p1', nota: 5, comentario: 'Excelente domínio técnico' },
      { perguntaId: 'p2', nota: 4, comentario: 'Boa capacidade de execução' },
      { perguntaId: 'p3', nota: 5, comentario: 'Ótimo relacionamento' },
      { perguntaId: 'p4', nota: 5, comentario: 'Alinhado com valores' },
      { perguntaId: 'p5', nota: 4, comentario: 'Entregas pontuais' },
      { perguntaId: 'p6', nota: 5, comentario: 'Segue todas as normas' },
    ],
  },
  {
    id: 'av2',
    colaboradorId: 'c2',
    modeloId: 'm1',
    status: 'pendente',
    dataEnvio: '2024-01-15',
    dataExpiracao: '2024-01-25',
    token: 'token456',
  },
  {
    id: 'av3',
    colaboradorId: 'c3',
    modeloId: 'm1',
    status: 'respondida',
    dataEnvio: '2024-01-08',
    dataResposta: '2024-01-10',
    dataExpiracao: '2024-01-18',
    token: 'token789',
    respostas: [
      { perguntaId: 'p1', nota: 4, comentario: 'Bom conhecimento' },
      { perguntaId: 'p2', nota: 5, comentario: 'Excelente execução' },
      { perguntaId: 'p3', nota: 4, comentario: 'Boa postura' },
      { perguntaId: 'p4', nota: 5, comentario: 'Muito alinhado' },
      { perguntaId: 'p5', nota: 5, comentario: 'Entregas excepcionais' },
      { perguntaId: 'p6', nota: 4, comentario: 'Cumpre normas' },
    ],
  },
  {
    id: 'av4',
    colaboradorId: 'c4',
    modeloId: 'm1',
    status: 'pendente',
    dataEnvio: '2024-01-16',
    dataExpiracao: '2024-01-26',
    token: 'token101',
  },
  {
    id: 'av5',
    colaboradorId: 'c5',
    modeloId: 'm2',
    status: 'respondida',
    dataEnvio: '2024-01-05',
    dataResposta: '2024-01-07',
    dataExpiracao: '2024-01-15',
    token: 'token202',
    respostas: [
      { perguntaId: 'p1', nota: 4, comentario: 'Bom conhecimento inicial' },
      { perguntaId: 'p2', nota: 4, comentario: 'Boa adaptação' },
      { perguntaId: 'p3', nota: 5, comentario: 'Excelente integração' },
      { perguntaId: 'p4', nota: 5, comentario: 'Alinhado com cultura' },
    ],
  },
];

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalColaboradores: mockColaboradores.length,
  totalAvaliacoesPendentes: mockAvaliacoes.filter(av => av.status === 'pendente').length,
  totalAvaliacoesRespondidas: mockAvaliacoes.filter(av => av.status === 'respondida').length,
  taxaResposta: Math.round((mockAvaliacoes.filter(av => av.status === 'respondida').length / mockAvaliacoes.length) * 100),
  nivelSatisfacao: 85, // Calculado com base nas notas
  nivelInsatisfacao: 15,
};
