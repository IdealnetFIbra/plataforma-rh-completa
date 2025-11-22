"use client";

import { Sidebar } from '@/components/custom/sidebar';
import { useState } from 'react';
import { 
  Settings, 
  Mail, 
  Palette, 
  Upload,
  Save,
  Eye
} from 'lucide-react';

export default function ConfiguracoesPage() {
  const [emailDisparo, setEmailDisparo] = useState('rh@empresa.com.br');
  const [nomeRemetente, setNomeRemetente] = useState('RH - Empresa');
  const [assunto, setAssunto] = useState('Avaliação de Desempenho - Sua participação é importante!');
  const [mensagem, setMensagem] = useState('Olá {nome},\n\nVocê foi selecionado(a) para participar da nossa avaliação de desempenho. Sua opinião é muito importante para nós!\n\nClique no link abaixo para responder:\n{link}\n\nAtenciosamente,\nEquipe de RH');
  
  const [nomeEmpresa, setNomeEmpresa] = useState('Minha Empresa');
  const [corPrimaria, setCorPrimaria] = useState('#3B82F6');
  const [corSecundaria, setCorSecundaria] = useState('#8B5CF6');
  const [logoUrl, setLogoUrl] = useState('');

  const handleSave = () => {
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Configurações</h1>
          <p className="text-slate-600">Personalize a plataforma e configure o envio de e-mails</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configurações de E-mail */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Configurações de E-mail</h2>
                  <p className="text-sm text-slate-600">Configure o e-mail de disparo das avaliações</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    E-mail de Disparo
                  </label>
                  <input
                    type="email"
                    value={emailDisparo}
                    onChange={(e) => setEmailDisparo(e.target.value)}
                    placeholder="rh@empresa.com.br"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-slate-500 mt-1">Este será o e-mail remetente das avaliações</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nome do Remetente
                  </label>
                  <input
                    type="text"
                    value={nomeRemetente}
                    onChange={(e) => setNomeRemetente(e.target.value)}
                    placeholder="RH - Empresa"
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Assunto do E-mail
                  </label>
                  <input
                    type="text"
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mensagem Personalizada
                  </label>
                  <textarea
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Use <code className="bg-slate-100 px-1 rounded">{'{nome}'}</code> para o nome do colaborador e <code className="bg-slate-100 px-1 rounded">{'{link}'}</code> para o link da avaliação
                  </p>
                </div>
              </div>
            </div>

            {/* Personalização Visual */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Personalização Visual</h2>
                  <p className="text-sm text-slate-600">Customize a identidade visual da plataforma</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    value={nomeEmpresa}
                    onChange={(e) => setNomeEmpresa(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Logo da Empresa
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={logoUrl}
                        onChange={(e) => setLogoUrl(e.target.value)}
                        placeholder="URL da logo"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors">
                      <Upload className="w-5 h-5" />
                      Upload
                    </button>
                  </div>
                  {logoUrl && (
                    <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <img src={logoUrl} alt="Logo" className="h-16 object-contain" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Cor Primária
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={corPrimaria}
                        onChange={(e) => setCorPrimaria(e.target.value)}
                        className="w-16 h-12 rounded-lg cursor-pointer border-2 border-slate-300"
                      />
                      <input
                        type="text"
                        value={corPrimaria}
                        onChange={(e) => setCorPrimaria(e.target.value)}
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Cor Secundária
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={corSecundaria}
                        onChange={(e) => setCorSecundaria(e.target.value)}
                        className="w-16 h-12 rounded-lg cursor-pointer border-2 border-slate-300"
                      />
                      <input
                        type="text"
                        value={corSecundaria}
                        onChange={(e) => setCorSecundaria(e.target.value)}
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-5 h-5 text-slate-600" />
                <h3 className="text-lg font-bold text-slate-900">Preview do E-mail</h3>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="mb-4 pb-4 border-b border-slate-200">
                    <p className="text-xs text-slate-500 mb-1">De:</p>
                    <p className="text-sm font-semibold text-slate-900">{nomeRemetente}</p>
                    <p className="text-xs text-slate-600">{emailDisparo}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-1">Assunto:</p>
                    <p className="text-sm font-semibold text-slate-900">{assunto}</p>
                  </div>

                  <div className="text-sm text-slate-700 whitespace-pre-wrap">
                    {mensagem.replace('{nome}', 'João Silva').replace('{link}', 'https://...')}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Preview das Cores</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg border-2 border-slate-300"
                      style={{ backgroundColor: corPrimaria }}
                    />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Primária</p>
                      <p className="text-xs text-slate-500">{corPrimaria}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg border-2 border-slate-300"
                      style={{ backgroundColor: corSecundaria }}
                    />
                    <div>
                      <p className="text-xs font-semibold text-slate-700">Secundária</p>
                      <p className="text-xs text-slate-500">{corSecundaria}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Save className="w-5 h-5" />
            Salvar Configurações
          </button>
        </div>
      </main>
    </div>
  );
}
