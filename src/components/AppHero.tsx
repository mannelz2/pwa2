import React, { useState, useEffect } from 'react';
import { Download, ChevronDown, Lock, Upload } from 'lucide-react';

interface AppHeroProps {
  appName: string;
  developer: string;
  rating: number;
  downloads: string;
  imageUrl: string;
}

const AppHero: React.FC<AppHeroProps> = ({
  appName,
  developer,
  rating,
  downloads,
  imageUrl,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [downloadSize, setDownloadSize] = useState(0);
  const [downloadPercent, setDownloadPercent] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [isIOS] = useState(() => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handlePermissionRequest = async () => {
    try {
      const isPushSupported = await window.OneSignal.isPushSupported?.();
      if (!isPushSupported) {
        console.warn('Push não é suportado no navegador.');
        return;
      }

      const alreadySubscribed = await window.OneSignal.isPushNotificationsEnabled?.();
      if (alreadySubscribed) {
        console.log('Usuário já está inscrito para notificações.');
        return;
      }

      await window.OneSignal.showSlidedownPrompt?.();
      const isNowSubscribed = await window.OneSignal.isPushNotificationsEnabled?.();
      console.log('Subscrição ativa?', isNowSubscribed);
    } catch (error) {
      console.error('Erro ao solicitar permissão para notificações:', error);
    }
  };

  const simulateInstallAnimation = async () => {
    setIsInstalling(true);
    setStatusMessage('Verificado por PlayProtect');

    setTimeout(() => {
      setStatusMessage('Pendente...');
    }, 2500);

    setTimeout(() => {
      setStatusMessage('');
      setShowProgress(true);
      let size = 0;
      let percent = 0;
      const interval = setInterval(() => {
        size += 0.25;
        percent += 2;
        setDownloadSize(Number(size.toFixed(1)));
        setDownloadPercent(percent);

        if (percent >= 100) {
          clearInterval(interval);
          setStatusMessage('Instalando...');
          setTimeout(() => {
            setIsInstalled(true);
            setIsInstalling(false);
            if (isIOS) {
              window.dispatchEvent(new Event('showIOSPrompt'));
            }
          }, 2000);
        }
      }, 100);
    }, 5000);
  };

  const handleInstall = async () => {
    if (window.fbq) {
      window.fbq('track', 'Lead');
    }

    if (isIOS) {
      simulateInstallAnimation();
      return;
    }

    if (deferredPrompt) {
      try {
        setIsInstalling(true);
        const promptEvent = deferredPrompt as any;
        const result = await promptEvent.prompt();

        if (result.outcome === 'accepted') {
          await handlePermissionRequest();
          simulateInstallAnimation();
        } else {
          setIsInstalling(false);
        }
        setDeferredPrompt(null);
      } catch (error) {
        console.error('Erro ao instalar:', error);
        setIsInstalling(false);
      }
    } else {
      simulateInstallAnimation();
      await handlePermissionRequest();
    }
  };

  const handleOpen = () => {
    window.location.href = 'https://wlb787.com';
  };

  if (isIOS) {
    return (
      <div className="bg-white py-4">
        <div className="w-full px-4">
          <div className="flex items-start gap-4">
            <img
              src={imageUrl}
              alt={appName}
              className="w-[120px] h-[120px] rounded-[22%] shadow-sm"
            />
            <div className="flex-1 min-w-0">
              <h1 className="text-[22px] font-semibold text-gray-900 leading-tight">{appName}</h1>
              <p className="text-[13px] text-gray-500 mt-1">A casa mais pagante do momento</p>
              <div className="mt-2">
                {!isInstalled ? (
                  <button
                    onClick={handleInstall}
                    disabled={isInstalling}
                    className="bg-[#007AFF] text-white text-[15px] font-semibold px-7 py-1.5 rounded-full"
                  >
                    {isInstalling ? 'Instalando...' : 'OBTER'}
                  </button>
                ) : (
                  <button
                    onClick={handleOpen}
                    className="bg-[#007AFF] text-white text-[15px] font-semibold px-7 py-1.5 rounded-full"
                  >
                    Abrir
                  </button>
                )}
              </div>
              <p className="text-[13px] text-gray-400 mt-1">{downloads}</p>
            </div>
          </div>

          <div className="flex justify-between mt-6 border-t border-gray-200 pt-4">
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center">
                <span className="text-[17px] font-semibold">{rating}</span>
                <span className="text-[17px] text-gray-400 ml-1">★</span>
              </div>
              <span className="text-[13px] text-gray-500 mt-1">12 mil avaliações</span>
            </div>

            <div className="flex flex-col items-center flex-1 border-l border-r border-gray-200">
              <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-md">
                <span className="text-[13px] font-medium text-gray-800">18+</span>
              </div>
              <span className="text-[13px] text-gray-500 mt-1">Classificação</span>
            </div>

            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center justify-center">
                <span className="text-[17px] font-semibold">Nº 2</span>
              </div>
              <span className="text-[13px] text-gray-500 mt-1">Cassino</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-4">
      <div className="w-full px-4">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20">
            <img
              src={imageUrl}
              alt={appName}
              className={`w-20 h-20 rounded-2xl transition-transform duration-300 ${
                isInstalling ? 'scale-90' : 'scale-100'
              }`}
            />
            {isInstalling && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-4 border-2 border-t-green-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <Upload className="w-4 h-4 text-green-600 animate-pulse" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-normal text-gray-900 truncate">{appName}</h1>
            {!isInstalling && (
              <>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-green-600 text-sm">{developer}</span>
                  <span className="text-gray-600 text-sm">• Jogos</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">Sem anúncios, sem conteúdo pago</p>
              </>
            )}
            {isInstalling && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  {statusMessage === 'Verificado por PlayProtect' && (
                    <>
                      <Lock className="w-4 h-4 text-green-600" />
                      <span className="text-gray-800">{statusMessage}</span>
                    </>
                  )}
                  {statusMessage === 'Pendente...' && <span className="text-gray-800">{statusMessage}</span>}
                  {showProgress && !statusMessage && (
                    <span className="text-gray-800">{`${downloadPercent}% • ${downloadSize}MB`}</span>
                  )}
                  {statusMessage === 'Instalando...' && <span className="text-gray-800">{statusMessage}</span>}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center px-4 mt-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="text-lg font-medium">{rating}</span>
              <span className="text-lg">★</span>
            </div>
            <span className="text-xs font-medium text-gray-500 mt-1">12 mil avaliações</span>
          </div>

          <div className="w-px h-8 bg-gray-300"></div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-7 h-7 border-3 border-gray-800">
              <Download className="w-4 h-4 text-gray-800 stroke-2" />
            </div>
            <span className="text-xs font-medium text-gray-500 mt-1">{downloads}</span>
          </div>

          <div className="w-px h-8 bg-gray-300"></div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center bg-black w-7 h-7">
              <span className="text-sm font-medium text-white">18</span>
            </div>
            <span className="text-xs font-medium text-gray-500 mt-1">Classificação</span>
          </div>
        </div>

        <div className="flex mt-4 gap-1">
          {!isInstalled && (
            <>
              <button
                onClick={handleInstall}
                disabled={isInstalling}
                className="flex-grow bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInstalling ? 'Instalando...' : 'Instalar'}
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-2 rounded-md">
                <ChevronDown className="w-5 h-5" />
              </button>
            </>
          )}

          {isInstalled && (
            <button
              onClick={handleOpen}
              className="flex-grow bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-md text-base"
            >
              Abrir
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppHero;