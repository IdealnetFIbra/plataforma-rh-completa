"use client";

import { Sidebar } from '@/components/custom/sidebar';
import { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2,
  Save,
  X,
  GripVertical,
  CheckCircle
} from 'lucide-react';
import { mockModelosAvaliacao } from '@/lib/mock-data';
import type { PerguntaAvaliacao } from '@/lib/types';

export default function ModelosPage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingModelo, setEditingModelo] = useState<any>(null);
  const [perguntas, setPerguntas] = useState<PerguntaAvaliacao[]>([]);

  const categorias = [
    { value: 'conhecimento', label: 'C - Conhecimento', color: 'blue' },
    { value: 'habilidade', label: 'H - Habilidade', color: 'green' },
    { value: 'atitude', label: 'A - Atitude', color: 'purple' },
    { value: 'valores', label: 'V - Valores', color: 'pink' },
    { value: 'entrega', label: 'E - Entrega', color: 'orange' },
    { value: 'seguranca', label: 'S - Segurança', color: 'red' },
  ];

  const handleEditModelo = (modelo: any) => {
    setEditingModelo(modelo);
    setPerguntas(modelo.perguntas);
    setShowEditModal(true);
  };

  const handleAddPergunta = () => {
    const novaPergunta: PerguntaAvaliacao = {
      id: `p${Date.now()}`,
      categoria: 'conhecimento',
      titulo: '',
      descricao: '',
      ordem: perguntas.length + 1,
      ativa: true,
    };
    setPerguntas([...perguntas, novaPergunta]);
  };

  const handleRemovePergunta = (id: string) => {
    setPerguntas(perguntas.filter(p => p.id !== id));
  };

  const handleUpdatePergunta = (id: string, field: string, value: any) => {
    setPerguntas(perguntas.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSaveModelo = () => {
    alert('Modelo salvo com sucesso!');
    setShowEditModal(false);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Modelos de Avaliação</h1>
            <p className="text-slate-600">Crie e personalize modelos de avaliação de desempenho</p>
          </div>
          <button
            onClick={() => {
              setEditingModelo({ id: `m${Date.now()}`, nome: 'Novo Modelo', descricao: '', perguntas: [], ativo: true });
              setPerguntas([]);
              setShowEditModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Novo Modelo
          </button>
        </div>

        {/* Lista de Modelos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockModelosAvaliacao.map((modelo) => (
            <div key={modelo.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{modelo.nome}</h3>
                  <p className="text-sm text-slate-600">{modelo.descricao}</p>
                </div>
                {modelo.ativo && (
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                    Ativo
                  </span>
                )}
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-2">Perguntas:</p>
                <div className="flex flex-wrap gap-2">
                  {modelo.perguntas.slice(0, 6).map((pergunta) => {
                    const cat = categorias.find(c => c.value === pergunta.categoria);
                    return (
                      <span key={pergunta.id} className={`text-xs font-semibold px-2 py-1 rounded-full bg-${cat?.color}-100 text-${cat?.color}-700`}>
                        {cat?.label.split(' - ')[0]}
                      </span>
                    );
                  })}
                  {modelo.perguntas.length > 6 && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                      +{modelo.perguntas.length - 6}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEditModelo(modelo)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Editar Modelo */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 sticky top-0 bg-white z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Editar Modelo</h2>
                    <p className="text-sm text-slate-600 mt-1">Personalize as perguntas da avaliação</p>
                  </div>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Nome e Descrição */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nome do Modelo
                    </label>
                    <input
                      type="text"
                      defaultValue={editingModelo?.nome}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Descrição
                    </label>
                    <input
                      type="text"
                      defaultValue={editingModelo?.descricao}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Perguntas */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-sm font-semibold text-slate-700">
                      Perguntas ({perguntas.length})
                    </label>
                    <button
                      onClick={handleAddPergunta}
                      className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar Pergunta
                    </button>
                  </div>

                  <div className="space-y-4">
                    {perguntas.map((pergunta, index) => (
                      <div key={pergunta.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-start gap-3">
                          <div className="mt-3">
                            <GripVertical className="w-5 h-5 text-slate-400" />
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                  Categoria
                                </label>
                                <select
                                  value={pergunta.categoria}
                                  onChange={(e) => handleUpdatePergunta(pergunta.id, 'categoria', e.target.value)}
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  {categorias.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                      {cat.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-600 mb-1">
                                  Título
                                </label>
                                <input
                                  type="text"
                                  value={pergunta.titulo}
                                  onChange={(e) => handleUpdatePergunta(pergunta.id, 'titulo', e.target.value)}
                                  placeholder="Ex: Domínio técnico"
                                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-xs font-semibold text-slate-600 mb-1">
                                Descrição
                              </label>
                              <textarea
                                value={pergunta.descricao}
                                onChange={(e) => handleUpdatePergunta(pergunta.id, 'descricao', e.target.value)}
                                placeholder="Descreva o critério de avaliação..."
                                rows={2}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>

                          <button
                            onClick={() => handleRemovePergunta(pergunta.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {perguntas.length === 0 && (
                      <div className="text-center py-12 text-slate-500">
                        <p className="mb-4">Nenhuma pergunta adicionada ainda</p>
                        <button
                          onClick={handleAddPergunta}
                          className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          Adicionar Primeira Pergunta
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 flex gap-3 sticky bottom-0 bg-white">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveModelo}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <Save className="w-5 h-5" />
                  Salvar Modelo
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
