"use client";

import { Sidebar } from '@/components/custom/sidebar';
import { 
  Users, 
  ClipboardCheck, 
  Clock, 
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { mockDashboardStats, mockAvaliacoes, mockColaboradores } from '@/lib/mock-data';

export default function DashboardPage() {
  const stats = mockDashboardStats;

  // Calcular estatísticas adicionais
  const avaliacoesRecentes = mockAvaliacoes.slice(0, 5);
  const colaboradoresComPendencias = mockColaboradores.filter(col => 
    mockAvaliacoes.some(av => av.colaboradorId === col.id && av.status === 'pendente')
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
          <p className="text-slate-600">Visão geral da gestão de avaliações de desempenho</p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Colaboradores */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Ativos
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.totalColaboradores}</h3>
            <p className="text-sm text-slate-600">Total de Colaboradores</p>
          </div>

          {/* Avaliações Respondidas */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <ClipboardCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {stats.taxaResposta}%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.totalAvaliacoesRespondidas}</h3>
            <p className="text-sm text-slate-600">Avaliações Respondidas</p>
          </div>

          {/* Avaliações Pendentes */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                Aguardando
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.totalAvaliacoesPendentes}</h3>
            <p className="text-sm text-slate-600">Avaliações Pendentes</p>
          </div>

          {/* Taxa de Resposta */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                Meta: 80%
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stats.taxaResposta}%</h3>
            <p className="text-sm text-slate-600">Taxa de Resposta</p>
          </div>
        </div>

        {/* Indicadores de Satisfação */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Nível de Satisfação */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg border border-green-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Nível de Satisfação</h3>
                <p className="text-sm text-slate-600">Baseado nas avaliações respondidas</p>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Satisfação Geral</span>
                <span className="text-2xl font-bold text-green-600">{stats.nivelSatisfacao}%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-500 shadow-inner"
                  style={{ width: `${stats.nivelSatisfacao}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-700 bg-green-100 rounded-lg p-3">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Excelente desempenho da equipe!</span>
            </div>
          </div>

          {/* Nível de Insatisfação */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-red-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingDown className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Pontos de Atenção</h3>
                <p className="text-sm text-slate-600">Áreas que precisam de melhoria</p>
              </div>
            </div>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Insatisfação</span>
                <span className="text-2xl font-bold text-red-600">{stats.nivelInsatisfacao}%</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-red-500 to-orange-600 h-full rounded-full transition-all duration-500 shadow-inner"
                  style={{ width: `${stats.nivelInsatisfacao}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-orange-700 bg-orange-100 rounded-lg p-3">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Índice dentro do esperado</span>
            </div>
          </div>
        </div>

        {/* Tabelas de Informações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Avaliações Recentes */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ClipboardCheck className="w-6 h-6 text-blue-600" />
              Avaliações Recentes
            </h3>
            <div className="space-y-3">
              {avaliacoesRecentes.map((avaliacao) => {
                const colaborador = mockColaboradores.find(c => c.id === avaliacao.colaboradorId);
                const statusColors = {
                  respondida: 'bg-green-100 text-green-700 border-green-200',
                  pendente: 'bg-orange-100 text-orange-700 border-orange-200',
                  expirada: 'bg-red-100 text-red-700 border-red-200',
                };
                
                return (
                  <div key={avaliacao.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {colaborador?.nomeCompleto.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{colaborador?.nomeCompleto}</p>
                        <p className="text-xs text-slate-500">{colaborador?.cargo}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColors[avaliacao.status]}`}>
                      {avaliacao.status === 'respondida' ? 'Respondida' : 'Pendente'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Colaboradores com Pendências */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-orange-600" />
              Colaboradores com Pendências
            </h3>
            <div className="space-y-3">
              {colaboradoresComPendencias.map((colaborador) => {
                const pendencias = mockAvaliacoes.filter(
                  av => av.colaboradorId === colaborador.id && av.status === 'pendente'
                ).length;
                
                return (
                  <div key={colaborador.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                        {colaborador.nomeCompleto.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{colaborador.nomeCompleto}</p>
                        <p className="text-xs text-slate-500">{colaborador.setor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-600">{pendencias}</p>
                      <p className="text-xs text-slate-500">pendente{pendencias > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                );
              })}
              {colaboradoresComPendencias.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>Nenhuma pendência no momento!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
