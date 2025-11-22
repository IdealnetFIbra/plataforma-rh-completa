"use client";

import { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Send,
  Star,
  AlertCircle
} from 'lucide-react';

// Simulação de dados da avaliação (normalmente viria da URL/token)
const mockAvaliacao = {
  colaborador: {
    nome: 'João Silva',
    cargo: 'Desenvolvedor Full Stack',
    setor: 'Tecnologia'
  },
  modelo: {
    nome: 'Avaliação de Desempenho 2024',
    perguntas: [
      {
        id: 'p1',
        categoria: 'conhecimento',
        titulo: 'Domínio Técnico',
        descricao: 'Avalie o conhecimento técnico, formação e atualização profissional do colaborador.',
      },
      {
        id: 'p2',
        categoria: 'habilidade',
        titulo: 'Capacidade de Execução',
        descricao: 'Avalie a capacidade de execução, autonomia e entrega com qualidade.',
      },
      {
        id: 'p3',
        categoria: 'atitude',
        titulo: 'Comportamento e Postura',
        descricao: 'Avalie o comportamento, postura profissional e relacionamento interpessoal.',
      },
      {
        id: 'p4',
        categoria: 'valores',
        titulo: 'Alinhamento com Valores',
        descricao: 'Avalie o alinhamento com os valores e cultura da empresa.',
      },
      {
        id: 'p5',
        categoria: 'entrega',
        titulo: 'Resultados e Entregas',
        descricao: 'Avalie a qualidade e pontualidade das entregas e resultados alcançados.',
      },
      {
        id: 'p6',
        categoria: 'seguranca',
        titulo: 'Segurança e Conformidade',
        descricao: 'Avalie o cumprimento de normas de segurança e procedimentos.',
      },
    ]
  },
  empresa: {
    nome: 'Minha Empresa',
    logo: '',
    corPrimaria: '#3B82F6',
    corSecundaria: '#8B5CF6'
  }
};

export default function ResponderAvaliacaoPage() {
  const [respostas, setRespostas] = useState<Record<string, { nota: number; comentario: string }>>({});
  const [submitted, setSubmitted] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<Record<string, number>>({});

  const handleNotaChange = (perguntaId: string, nota: number) => {
    setRespostas({
      ...respostas,
      [perguntaId]: {
        ...respostas[perguntaId],
        nota
      }
    });
  };

  const handleComentarioChange = (perguntaId: string, comentario: string) => {
    setRespostas({
      ...respostas,
      [perguntaId]: {
        ...respostas[perguntaId],
        comentario
      }
    });
  };

  const handleSubmit = () => {
    const todasRespondidas = mockAvaliacao.modelo.perguntas.every(
      p => respostas[p.id]?.nota > 0
    );

    if (!todasRespondidas) {
      alert('Por favor, responda todas as perguntas antes de enviar.');
      return;
    }

    setSubmitted(true);
  };

  const categoriaColors: Record<string, string> = {
    conhecimento: 'from-blue-500 to-blue-600',
    habilidade: 'from-green-500 to-green-600',
    atitude: 'from-purple-500 to-purple-600',
    valores: 'from-pink-500 to-pink-600',
    entrega: 'from-orange-500 to-orange-600',
    seguranca: 'from-red-500 to-red-600',
  };

  const categoriaLabels: Record<string, string> = {
    conhecimento: 'C - Conhecimento',
    habilidade: 'H - Habilidade',
    atitude: 'A - Atitude',
    valores: 'V - Valores',
    entrega: 'E - Entrega',
    seguranca: 'S - Segurança',
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Avaliação Enviada!</h1>
          <p className="text-lg text-slate-600 mb-8">
            Obrigado por participar da nossa avaliação de desempenho. Sua opinião é muito importante para nós!
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <p className="text-sm text-blue-800">
              Suas respostas foram registradas com sucesso e serão analisadas pela equipe de RH.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            {mockAvaliacao.empresa.logo ? (
              <img src={mockAvaliacao.empresa.logo} alt="Logo" className="h-12" />
            ) : (
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {mockAvaliacao.empresa.nome}
              </div>
            )}
            <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full">
              Avaliação de Desempenho
            </span>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{mockAvaliacao.modelo.nome}</h1>
            <div className="flex items-center gap-4 text-slate-600">
              <div>
                <span className="font-semibold">Colaborador:</span> {mockAvaliacao.colaborador.nome}
              </div>
              <div className="w-1 h-1 bg-slate-400 rounded-full" />
              <div>
                <span className="font-semibold">Cargo:</span> {mockAvaliacao.colaborador.cargo}
              </div>
              <div className="w-1 h-1 bg-slate-400 rounded-full" />
              <div>
                <span className="font-semibold">Setor:</span> {mockAvaliacao.colaborador.setor}
              </div>
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Instruções</h3>
              <p className="text-sm text-blue-800">
                Avalie cada critério de 1 a 5 estrelas, onde 1 é insatisfatório e 5 é excelente. 
                Você pode adicionar comentários opcionais para justificar sua avaliação.
              </p>
            </div>
          </div>
        </div>

        {/* Perguntas */}
        <div className="space-y-6">
          {mockAvaliacao.modelo.perguntas.map((pergunta, index) => (
            <div key={pergunta.id} className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${categoriaColors[pergunta.categoria]} rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{pergunta.titulo}</h3>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${categoriaColors[pergunta.categoria]} text-white`}>
                      {categoriaLabels[pergunta.categoria]}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{pergunta.descricao}</p>
                </div>
              </div>

              {/* Estrelas */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Avaliação *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((nota) => (
                    <button
                      key={nota}
                      type="button"
                      onClick={() => handleNotaChange(pergunta.id, nota)}
                      onMouseEnter={() => setHoveredStar({ ...hoveredStar, [pergunta.id]: nota })}
                      onMouseLeave={() => setHoveredStar({ ...hoveredStar, [pergunta.id]: 0 })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          nota <= (hoveredStar[pergunta.id] || respostas[pergunta.id]?.nota || 0)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  {respostas[pergunta.id]?.nota > 0 && (
                    <span className="ml-3 text-sm font-semibold text-slate-700">
                      {respostas[pergunta.id].nota}/5
                    </span>
                  )}
                </div>
              </div>

              {/* Comentário */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Comentário (opcional)
                </label>
                <textarea
                  value={respostas[pergunta.id]?.comentario || ''}
                  onChange={(e) => handleComentarioChange(pergunta.id, e.target.value)}
                  placeholder="Adicione observações sobre esta avaliação..."
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Botão Enviar */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">
                {Object.keys(respostas).filter(k => respostas[k]?.nota > 0).length} de {mockAvaliacao.modelo.perguntas.length} perguntas respondidas
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Send className="w-5 h-5" />
              Enviar Avaliação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
