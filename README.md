# 🎵 TidalFest

> Tu festival personalizado basado en tu música favorita de Tidal

![TidalFest Banner](https://img.shields.io/badge/Tidal-00D4FF?style=for-the-badge&logo=tidal&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

**TidalFest** genera un cartel de festival único basado en tus artistas favoritos, reproducciones y gustos musicales de Tidal. Conecta tu cuenta y descubre tu lineup perfecto en segundos.

## ✨ Características

- 🎨 **Cartel Personalizado**: Generación automática de un poster de festival con tus artistas top
- 🎧 **Integración con Tidal**: Conexión segura mediante OAuth
- 📱 **Responsive**: Diseño adaptado a móviles, tablets y desktop
- 📥 **Descargable**: Exporta tu cartel como imagen para compartir

## 🚀 Inicio Rápido

### Prerrequisitos

- [Bun](https://bun.sh/) 1.0+ (recomendado) o Node.js 20+ con npm/pnpm
- Cuenta de Tidal
- Backend de TidalFest corriendo

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tidal-fest-front.git
cd tidal-fest-front

# Instalar dependencias con Bun (recomendado)
bun install

# O si prefieres npm/pnpm
# npm install
# pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu backend
```

### Desarrollo

```bash
# Con Bun (recomendado - más rápido)
bun run dev

# O con npm/pnpm
# npm run dev
# pnpm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
```

Para producción, ajusta la URL a tu servidor backend.

## 🏗️ Build para Producción

```bash
# Con Bun (recomendado)
bun run build
bun run start

# O con npm/pnpm
# npm run build
# npm run start
```

### Variables de entorno en producción

```bash
# Setear la URL del backend antes del build
VITE_API_URL=https://tu-api-produccion.com bun run build
```

## 🛠️ Stack Tecnológico

- **React Router 7** - Framework full-stack
- **TypeScript** - Tipado estático
- **TailwindCSS 4** - Estilos
- **Vite** - Build tool ultrarrápido
- **Bun** - Runtime y package manager
- **html-to-image** - Exportación de carteles

## 📂 Estructura del Proyecto

```
app/
├── components/        # Componentes reutilizables
├── constants/         # Constantes y configuración
├── hooks/            # Custom hooks
├── routes/           # Páginas/rutas
├── welcome/          # Landing page
└── env.d.ts          # Tipos de variables de entorno
```
