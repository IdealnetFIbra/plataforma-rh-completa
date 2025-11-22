"use client";

import { Sidebar } from '@/components/custom/sidebar';
import { useState } from 'react';
import { 
  ClipboardCheck, 
  Plus, 
  Send, 
  Edit, 
  Trash2,
  Mail,
  Calendar,
  User,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { mockAvaliacoes, mockColaboradores, mockModelosAvaliacao } from '@/lib/mock-data';

export default function AvaliacoesPage() {
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedColaboradores, setSelectedColaboradores] = useState<string[]>([]);
  const [selectedModelo, setSelectedModelo] = useState('');

  const handleEnviarAvaliacao = () => {
    alert(`Avaliação enviada para ${selectedColaboradores.length} colaborador(es)!`);
    setShowNewModal(false);
    setSelectedColaboradores([]);
    setSelectedModelo('');
  };

  const statusIcons = {
    pendente: <Clock className="w-4 h-4" />,
    respondida: <CheckCircle className="w-4 h-4" />,
    expirada: <XCircle className="w-4 h-4" />,
  };

  const statusColors = {
    pendente: 'bg-orange-100 text-orange-700 border-orange-200',
    respondida: 'bg-green-100 text-green-700 border-green-200',
    expirada: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Avaliações de Desempenho</h1>
            <p className="text-slate-600">Gerencie e envie avaliações para seus colaboradores</p>
          </div>
          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Nova Avaliação
          </button>
        </div>

        {/* Lista de Avaliações */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Colaborador</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Modelo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Data Envio</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Expira em</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {mockAvaliacoes.map((avaliacao) => {
                  const colaborador = mockColaboradores.find(c => c.id === avaliacao.colaboradorId);
                  const modelo = mockModelosAvaliacao.find(m => m.id === avaliacao.modeloId);
                  
                  return (
                    <tr key={avaliacao.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {colaborador?.nomeCompleto.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{colaborador?.nomeCompleto}</p>
                            <p className="text-xs text-slate-500">{colaborador?.cargo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">{modelo?.nome}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">{new Date(avaliacao.dataEnvio).toLocaleDateString('pt-BR')}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">{new Date(avaliacao.dataExpiracao).toLocaleDateString('pt-BR')}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[avaliacao.status]}`}>
                          {statusIcons[avaliacao.status]}
                          {avaliacao.status === 'pendente' ? 'Pendente' : avaliacao.status === 'respondida' ? 'Respondida' : 'Expirada'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {avaliacao.status === 'pendente' && (
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Mail className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Nova Avaliação */}
        {showNewModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900">Nova Avaliação de Desempenho</h2>
                <p className="text-sm text-slate-600 mt-1">Selecione os colaboradores e o modelo de avaliação</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Selecionar Modelo */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Modelo de Avaliação
                  </label>
                  <select
                    value={selectedModelo}
                    onChange={(e) => setSelectedModelo(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Selecione um modelo</option>
                    {mockModelosAvaliacao.map((modelo) => (
                      <option key={modelo.id} value={modelo.id}>
                        {modelo.nome} ({modelo.perguntas.length} perguntas)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selecionar Colaboradores */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Colaboradores ({selectedColaboradores.length} selecionados)
                  </label>
                  <div className="border border-slate-300 rounded-xl max-h-64 overflow-y-auto">
                    {mockColaboradores.map((colaborador) => (
                      <label
                        key={colaborador.id}
                        className="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0"
                      >
                        <input
                          type="checkbox"
                          checked={selectedColaboradores.includes(colaborador.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedColaboradores([...selectedColaboradores, colaborador.id]);
                            } else {
                              setSelectedColaboradores(selectedColaboradores.filter(id => id !== colaborador.id));
                            }
                          }}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {colaborador.nomeCompleto.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-900">{colaborador.nomeCompleto}</p>
                          <p className="text-xs text-slate-500">{colaborador.cargo} - {colaborador.setor}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Data de Expiração */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Data de Expiração
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => setShowNewModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleEnviarAvaliacao}
                  disabled={!selectedModelo || selectedColaboradores.length === 0}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  Enviar Avaliação
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
