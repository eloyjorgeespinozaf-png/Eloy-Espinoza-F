/**
 * Utility to generate and trigger downloads of official installation files
 * for PC (Windows, Linux, Mac) and Mobile Devices (Android, iOS).
 */

export function triggerDownload(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Download Windows Desktop Installer & Shortcut (.bat)
 */
export function downloadWindowsInstaller(appUrl?: string) {
  const currentUrl = appUrl || window.location.origin;
  const batContent = `@echo off
chcp 65001 > nul
cls
echo =====================================================================
echo    CAMPUS VIRTUAL DE INTELIGENCIA ESTRATEGICA (CVIE)
echo    Escuela de Comando y Estado Mayor del Ejercito - Bolivia
echo =====================================================================
echo.
echo [*] Configurando icono oficial y acceso directo de escritorio CVIE...
echo [*] URL de despliegue: ${currentUrl}
echo.

set ICON_PATH=%USERPROFILE%\\.cvie_icon.ico
set SHORTCUT_PATH=%USERPROFILE%\\Desktop\\CVIE - Inteligencia Estrategica.url

powershell -Command "try { Invoke-WebRequest -Uri '${currentUrl}/favicon.ico' -OutFile '%ICON_PATH%' } catch {}" > nul 2>&1

echo [InternetShortcut] > "%SHORTCUT_PATH%"
echo URL=${currentUrl} >> "%SHORTCUT_PATH%"
echo IconIndex=0 >> "%SHORTCUT_PATH%"
if exist "%ICON_PATH%" (
  echo IconFile=%ICON_PATH% >> "%SHORTCUT_PATH%"
) else (
  echo IconFile=%USERPROFILE%\\Desktop\\CVIE - Inteligencia Estrategica.url >> "%SHORTCUT_PATH%"
)
echo HotKey=0 >> "%SHORTCUT_PATH%"

echo.
echo [OK] Acceso directo con icono oficial creado en el Escritorio:
echo      "%SHORTCUT_PATH%"
echo.
echo [*] Desea iniciar el Campus Virtual en modo aplicacion ahora?
echo     (Presione cualquier tecla para abrir o cierre esta ventana)
pause > nul

start "" msedge --app="${currentUrl}" 2>nul || start "" chrome --app="${currentUrl}" 2>nul || start "" "${currentUrl}"

echo.
echo [*] Sistema iniciado. Buen servicio, Oficial.
timeout /t 3 > nul
exit
`;
  triggerDownload('Instalar_CVIE_PC.bat', batContent, 'text/plain;charset=utf-8');
}

/**
 * Download Windows Internet Shortcut file (.url)
 */
export function downloadDesktopShortcut(appUrl?: string) {
  const currentUrl = appUrl || window.location.origin;
  const urlContent = `[InternetShortcut]
URL=${currentUrl}
IconIndex=0
HotKey=0
IDList=
[{000214A0-0000-0000-C000-000000000046}]
Prop3=19,11
`;
  triggerDownload('CVIE - Inteligencia Estrategica.url', urlContent, 'application/internet-shortcut');
}

/**
 * Download Linux & macOS Desktop Launcher (.sh)
 */
export function downloadLinuxMacInstaller(appUrl?: string) {
  const currentUrl = appUrl || window.location.origin;
  const shContent = `#!/usr/bin/env bash
# =====================================================================
#  CAMPUS VIRTUAL DE INTELIGENCIA ESTRATÉGICA (CVIE)
#  Escuela de Comando y Estado Mayor del Ejército - Bolivia
# =====================================================================

APP_URL="${currentUrl}"
DESKTOP_DIR="\${XDG_DATA_HOME:-\$HOME/.local/share}/applications"
SHORTCUT_FILE="\$DESKTOP_DIR/cvie-militar.desktop"

echo "[*] Instalando lanzador de escritorio CVIE..."
mkdir -p "\$DESKTOP_DIR"

cat << 'EOF' > "\$SHORTCUT_FILE"
[Desktop Entry]
Version=1.0
Type=Application
Name=CVIE - Inteligencia Estratégica
GenericName=Simulador Militar de Inteligencia
Comment=Campus Virtual de la Escuela de Comando y Estado Mayor del Ejército
Exec=xdg-open "${currentUrl}"
Icon=security-high
Terminal=false
Categories=Education;Science;Security;
StartupNotify=true
EOF

chmod +x "\$SHORTCUT_FILE"

echo "[OK] Lanzador creado en: \$SHORTCUT_FILE"
echo "[*] Abriendo Campus Virtual..."
xdg-open "\$APP_URL" 2>/dev/null || open "\$APP_URL" 2>/dev/null || echo "Abra \$APP_URL en su navegador."
`;
  triggerDownload('Instalar_CVIE_Linux_Mac.sh', shContent, 'application/x-sh');
}

/**
 * Download Android WebApp & APK Generation Configuration (.json)
 */
export function downloadAndroidConfig(appUrl?: string) {
  const currentUrl = appUrl || window.location.origin;
  const config = {
    name: "Campus Virtual de Inteligencia Estratégica",
    short_name: "CVIE",
    package_id: "bo.mil.ejercito.eceme.cvie",
    version: "2.5.0",
    version_code: 250,
    start_url: currentUrl,
    scope: currentUrl,
    display: "standalone",
    orientation: "any",
    theme_color: "#04130e",
    background_color: "#021811",
    icons: [
      {
        src: `${currentUrl}/pwa-192x192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: `${currentUrl}/pwa-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: `${currentUrl}/pwa-maskable-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ],
    features: [
      "Simulador Interactivo del Ciclo de Inteligencia (CVIE)",
      "Matriz ACH de Falsación Richards Heuer",
      "Preparación de Inteligencia para el Campo de Batalla (IPB)",
      "Cifrado SSL Militar y Evaluación Socrática con Inteligencia Artificial"
    ],
    instructions: "Para empaquetar como archivo .APK nativo de Android, puede importar este manifiesto en PWABuilder (https://www.pwabuilder.com) o Bubblewrap CLI, o instalar directamente desde Chrome tocando 'Instalar aplicación'."
  };

  triggerDownload('CVIE_Android_Package.json', JSON.stringify(config, null, 2), 'application/json');
}

/**
 * Download Apple iOS WebClip Configuration Profile (.mobileconfig)
 */
export function downloadIOSProfile(appUrl?: string) {
  const currentUrl = appUrl || window.location.origin;
  const uuid1 = 'C0F0E9A1-7B32-4D91-8D99-A0B2C3D4E5F6';
  const uuid2 = 'D1F2E3A4-8C43-5E02-9E11-B1C2D3E4F5A7';

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>PayloadContent</key>
    <array>
        <dict>
            <key>FullScreen</key>
            <true/>
            <key>Icon</key>
            <data></data>
            <key>IsRemovable</key>
            <true/>
            <key>Label</key>
            <string>CVIE</string>
            <key>PayloadDescription</key>
            <string>Instala el acceso directo de pantalla de inicio para el Campus Virtual de Inteligencia Estratégica.</string>
            <key>PayloadDisplayName</key>
            <string>CVIE WebClip</string>
            <key>PayloadIdentifier</key>
            <string>bo.mil.ejercito.eceme.cvie.webclip</string>
            <key>PayloadType</key>
            <string>com.apple.webClip.managed</string>
            <key>PayloadUUID</key>
            <string>${uuid1}</string>
            <key>PayloadVersion</key>
            <integer>1</integer>
            <key>Precomposed</key>
            <true/>
            <key>URL</key>
            <string>${currentUrl}</string>
        </dict>
    </array>
    <key>PayloadDescription</key>
    <string>Perfil de Instalación Móvil del Campus Virtual de Inteligencia Estratégica (ECEME Bolivia).</string>
    <key>PayloadDisplayName</key>
    <string>CVIE - Inteligencia Militar</string>
    <key>PayloadIdentifier</key>
    <string>bo.mil.ejercito.eceme.cvie.profile</string>
    <key>PayloadOrganization</key>
    <string>Escuela de Comando y Estado Mayor del Ejército</string>
    <key>PayloadRemovalDisallowed</key>
    <false/>
    <key>PayloadType</key>
    <string>Configuration</string>
    <key>PayloadUUID</key>
    <string>${uuid2}</string>
    <key>PayloadVersion</key>
    <integer>1</integer>
</dict>
</plist>`;

  triggerDownload('CVIE_iOS_WebClip.mobileconfig', xml, 'application/x-apple-aspen-config');
}

/**
 * Download Standalone Portable Offline HTML Package
 */
export function downloadOfflineStandaloneHTML(appUrl?: string) {
  const currentUrl = appUrl || window.location.origin;
  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CVIE - Campus Virtual de Inteligencia Estratégica [Lanzador Autónomo]</title>
  <style>
    body {
      background-color: #021811;
      color: #d1ded9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      box-sizing: border-box;
    }
    .card {
      background: #04140e;
      border: 1px solid #10b981;
      border-radius: 8px;
      max-width: 650px;
      width: 100%;
      padding: 32px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.9);
      text-align: center;
    }
    .badge {
      display: inline-block;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid #34d399;
      color: #86efac;
      padding: 4px 12px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: bold;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    h1 {
      color: #fff;
      font-size: 24px;
      margin: 0 0 8px 0;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    h2 {
      color: #94a3b8;
      font-size: 14px;
      font-weight: normal;
      margin: 0 0 24px 0;
    }
    p {
      font-size: 13px;
      line-height: 1.6;
      color: #9ebcb0;
      margin-bottom: 24px;
      text-align: justify;
    }
    .btn {
      display: inline-block;
      background: #10b981;
      color: #021811;
      font-weight: bold;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 6px;
      font-size: 14px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: background 0.2s;
    }
    .btn:hover {
      background: #34d399;
    }
    .footer {
      margin-top: 24px;
      font-size: 11px;
      color: #52826e;
      border-top: 1px solid #143e2b;
      padding-top: 16px;
    }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">SISTEMA CVIE • LANZADOR AUTÓNOMO</span>
    <h1>Campus Virtual de Inteligencia Estratégica</h1>
    <h2>Escuela de Comando y Estado Mayor del Ejército (ECEME) [Bolivia]</h2>
    <p>
      Este archivo autónomo le permite acceder directamente al nodo seguro del Campus Virtual de Inteligencia Estratégica en cualquier momento desde su computadora o dispositivo móvil, con sincronización de caché local y acceso a todos los módulos doctrinarios y simuladores operacionales.
    </p>
    <a href="${currentUrl}" class="btn" target="_blank">INICIAR CAMPUS VIRTUAL AHORA →</a>
    <div class="footer">
      Soporte Multidispositivo // Conexión Cifrada SSL-TAC-256 // "Ser antes que Parecer"
    </div>
  </div>
</body>
</html>`;
  triggerDownload('CVIE_Lanzador_Offline.html', html, 'text/html;charset=utf-8');
}

/**
 * Direct download of the official emblem / icon image file
 */
export function downloadOfficialEmblem(format: 'jpg' | 'png' | 'ico' = 'png') {
  const filename = format === 'jpg' 
    ? 'Emblema_Inteligencia_Estrategica_Bolivia.jpg' 
    : format === 'ico' 
    ? 'CVIE_Icono_Escritorio.ico' 
    : 'CVIE_Icono_Oficial_512x512.png';
  
  const src = format === 'jpg'
    ? '/Gemini_Generated_Image_h1ntq6h1ntq6h1nt.jpg'
    : format === 'ico'
    ? '/favicon.ico'
    : '/pwa-512x512.png';

  const a = document.createElement('a');
  a.href = src;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

