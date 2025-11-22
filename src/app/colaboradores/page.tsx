"use client";

import { Sidebar } from '@/components/custom/sidebar';
import { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2,
  Search,
  Mail,
  Phone,
  Calendar,
  Briefcase,
  Building,
  User,
  X,
  Save,
  Eye,
  CheckCircle,
  Clock,
  UserCog
} from 'lucide-react';
import { mockColaboradores, mockGestores, mockAvaliacoes, mockModelosAvaliacao } from '@/lib/mock-data';

export default function ColaboradoresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedColaborador, setSelectedColaborador] = useState<any>(null);
  const [editingColaborador, setEditingColaborador] = useState<any>(null);

  const filteredColaboradores = mockColaboradores.filter(col =>
    col.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    col.setor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (colaborador: any) => {
    setSelectedColaborador(colaborador);
    setShowDetailModal(true);
  };

  const handleEdit = (colaborador: any) => {
    setEditingColaborador(colaborador);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingColaborador({
      id: `c${Date.now()}`,
      nomeCompleto: '',
      rg: '',
      cpf: '',
      email: '',
      dataNascimento: '',
      setor: '',
      cargo: '',
      gestorId: '',
      status: 'ativo',
      dataAdmissao: new Date().toISOString().split('T')[0],
    });
    setShowModal(true);
  };

  const handleSave = () => {
    alert('Colaborador salvo com sucesso!');
    setShowModal(false);
    setEditingColaborador(null);
  };

  const getColaboradorAvaliacoes = (colaboradorId: string) => {
    return mockAvaliacoes.filter(av => av.colaboradorId === colaboradorId);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Colaboradores</h1>
            <p className="text-slate-600">Gerencie os colaboradores da empresa</p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Novo Colaborador
          </button>
        </div>

        {/* Busca */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nome, cargo ou setor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Colaborador</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Cargo</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Setor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">E-mail</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredColaboradores.map((colaborador) => {
                  const gestor = mockGestores.find(g => g.id === colaborador.gestorId);
                  
                  return (
                    <tr key={colaborador.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {colaborador.nomeCompleto.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{colaborador.nomeCompleto}</p>
                            <p className="text-xs text-slate-500">Gestor: {gestor?.nomeCompleto || 'N/A'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">{colaborador.cargo}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">{colaborador.setor}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">{colaborador.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full ${
                          colaborador.status === 'ativo' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {colaborador.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(colaborador)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(colaborador)}
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                          >
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

        {/* Modal Editar/Novo */}
        {showModal && editingColaborador && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {editingColaborador.nomeCompleto ? 'Editar Colaborador' : 'Novo Colaborador'}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">Preencha os dados do colaborador</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      defaultValue={editingColaborador.nomeCompleto}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      RG *
                    </label>
                    <input
                      type="text"
                      defaultValue={editingColaborador.rg}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      CPF *
                    </label>
                    <input
                      type="text"
                      defaultValue={editingColaborador.cpf}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      defaultValue={editingColaborador.email}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Data de Nascimento *
                    </label>
                    <input
                      type="date"
                      defaultValue={editingColaborador.dataNascimento}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Cargo *
                    </label>
                    <input
                      type="text"
                      defaultValue={editingColaborador.cargo}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Setor *
                    </label>
                    <input
                      type="text"
                      defaultValue={editingColaborador.setor}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Gestor *
                    </label>
                    <select
                      defaultValue={editingColaborador.gestorId}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Selecione um gestor</option>
                      {mockGestores.map((gestor) => (
                        <option key={gestor.id} value={gestor.id}>
                          {gestor.nomeCompleto} - {gestor.setor}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Data de Admissão *
                    </label>
                    <input
                      type="date"
                      defaultValue={editingColaborador.dataAdmissao}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Status *
                    </label>
                    <select
                      defaultValue={editingColaborador.status}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="ativo">Ativo</option>
                      <option value="inativo">Inativo</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <Save className="w-5 h-5" />
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Detalhes */}
        {showDetailModal && selectedColaborador && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedColaborador.nomeCompleto.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedColaborador.nomeCompleto}</h2>
                    <p className="text-sm text-slate-600">{selectedColaborador.cargo}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Informações Pessoais */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Informações Pessoais</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <User className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-xs text-slate-500">RG</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedColaborador.rg}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <User className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-xs text-slate-500">CPF</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedColaborador.cpf}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <Mail className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-xs text-slate-500">E-mail</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedColaborador.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <Calendar className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-xs text-slate-500">Data de Nascimento</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {new Date(selectedColaborador.dataNascimento).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informações Profissionais */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Informações Profissionais</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <Briefcase className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-xs text-slate-500">Cargo</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedColaborador.cargo}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <Building className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-xs text-slate-500">Setor</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedColaborador.setor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <Calendar className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-xs text-slate-500">Data de Admissão</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {new Date(selectedColaborador.dataAdmissao).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <UserCog className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-xs text-slate-500">Gestor</p>
                        <p className="text-sm font-semibold text-slate-900">
                          {mockGestores.find(g => g.id === selectedColaborador.gestorId)?.nomeCompleto || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Histórico de Avaliações */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Histórico de Avaliações</h3>
                  <div className="space-y-3">
                    {getColaboradorAvaliacoes(selectedColaborador.id).map((avaliacao) => (
                      <div key={avaliacao.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3">
                          {avaliacao.status === 'respondida' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Clock className="w-5 h-5 text-orange-600" />
                          )}
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {mockModelosAvaliacao.find(m => m.id === avaliacao.modeloId)?.nome}
                            </p>
                            <p className="text-xs text-slate-500">
                              Enviada em {new Date(avaliacao.dataEnvio).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          avaliacao.status === 'respondida' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {avaliacao.status === 'respondida' ? 'Respondida' : 'Pendente'}
                        </span>
                      </div>
                    ))}
                    {getColaboradorAvaliacoes(selectedColaborador.id).length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <p>Nenhuma avaliação encontrada</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
