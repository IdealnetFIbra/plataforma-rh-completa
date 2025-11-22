"use client";

import { Sidebar } from '@/components/custom/sidebar';
import { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2,
  Search,
  Mail,
  Building,
  Users,
  X,
  Save,
  Eye
} from 'lucide-react';
import { mockGestores, mockColaboradores } from '@/lib/mock-data';

export default function GestoresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedGestor, setSelectedGestor] = useState<any>(null);
  const [editingGestor, setEditingGestor] = useState<any>(null);

  const filteredGestores = mockGestores.filter(gestor =>
    gestor.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gestor.setor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    gestor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (gestor: any) => {
    setSelectedGestor(gestor);
    setShowDetailModal(true);
  };

  const handleEdit = (gestor: any) => {
    setEditingGestor(gestor);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingGestor({
      id: `g${Date.now()}`,
      nomeCompleto: '',
      email: '',
      setor: '',
    });
    setShowModal(true);
  };

  const handleSave = () => {
    alert('Gestor salvo com sucesso!');
    setShowModal(false);
    setEditingGestor(null);
  };

  const getEquipe = (gestorId: string) => {
    return mockColaboradores.filter(col => col.gestorId === gestorId);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Gestores</h1>
            <p className="text-slate-600">Gerencie os gestores e suas equipes</p>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Novo Gestor
          </button>
        </div>

        {/* Busca */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nome, setor ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Grid de Gestores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGestores.map((gestor) => {
            const equipe = getEquipe(gestor.id);
            
            return (
              <div key={gestor.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {gestor.nomeCompleto.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{gestor.nomeCompleto}</h3>
                      <p className="text-sm text-slate-600">{gestor.setor}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{gestor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Building className="w-4 h-4" />
                    <span>{gestor.setor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    <span>{equipe.length} colaborador{equipe.length !== 1 ? 'es' : ''}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewDetails(gestor)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-semibold hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Ver Equipe
                  </button>
                  <button
                    onClick={() => handleEdit(gestor)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Editar/Novo */}
        {showModal && editingGestor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {editingGestor.nomeCompleto ? 'Editar Gestor' : 'Novo Gestor'}
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">Preencha os dados do gestor</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    defaultValue={editingGestor.nomeCompleto}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    defaultValue={editingGestor.email}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Setor *
                  </label>
                  <input
                    type="text"
                    defaultValue={editingGestor.setor}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
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

        {/* Modal Detalhes/Equipe */}
        {showDetailModal && selectedGestor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {selectedGestor.nomeCompleto.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{selectedGestor.nomeCompleto}</h2>
                    <p className="text-sm text-slate-600">{selectedGestor.setor}</p>
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
                {/* Informações do Gestor */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Informações</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <Mail className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-xs text-slate-500">E-mail</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedGestor.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <Building className="w-5 h-5 text-slate-600" />
                      <div>
                        <p className="text-xs text-slate-500">Setor</p>
                        <p className="text-sm font-semibold text-slate-900">{selectedGestor.setor}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Equipe */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Equipe ({getEquipe(selectedGestor.id).length} colaboradores)
                  </h3>
                  <div className="space-y-3">
                    {getEquipe(selectedGestor.id).map((colaborador) => (
                      <div key={colaborador.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {colaborador.nomeCompleto.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{colaborador.nomeCompleto}</p>
                            <p className="text-xs text-slate-500">{colaborador.cargo}</p>
                          </div>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          colaborador.status === 'ativo' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {colaborador.status === 'ativo' ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    ))}
                    {getEquipe(selectedGestor.id).length === 0 && (
                      <div className="text-center py-8 text-slate-500">
                        <Users className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                        <p>Nenhum colaborador nesta equipe</p>
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
