import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-gray-500 font-medium text-sm mb-3">Google Play</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 text-sm hover:text-green-600">Jogos</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-green-600">Aplicativos</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-green-600">Filmes e TV</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-green-600">Livros</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-500 font-medium text-sm mb-3">Suporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 text-sm hover:text-green-600">Central de Ajuda</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-green-600">Fale Conosco</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-green-600">Reportar Problema</a></li>
            </ul>
          </div>
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-gray-500 font-medium text-sm mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 text-sm hover:text-green-600">Política de Privacidade</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-green-600">Termos de Serviço</a></li>
              <li><a href="#" className="text-gray-600 text-sm hover:text-green-600">Política de Conteúdo</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">© 2025 Google LLC</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer