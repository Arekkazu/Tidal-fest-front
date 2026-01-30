# 🎵 TidalFest

> Tu festival personalizado basado en tu música favorita de Tidal

![TidalFest Banner](https://img.shields.io/badge/Tidal-00D4FF?style=for-the-badge&logo=tidal&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**TidalFest** genera un cartel de festival único basado en tus artistas favoritos, reproducciones y gustos musicales de Tidal. Conecta tu cuenta y descubre tu lineup perfecto en segundos.

## ✨ Características

- 🎨 **Cartel Personalizado**: Generación automática de un poster de festival con tus artistas top
- 🎧 **Integración con Tidal**: Conexión segura mediante OAuth
- 📱 **Responsive**: Diseño adaptado a móviles, tablets y desktop
- 📥 **Descargable**: Exporta tu cartel como imagen para compartir
- ⚡ **Rápido**: Resultados instantáneos

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 20+
- Cuenta de Tidal
- Backend de TidalFest corriendo (ver configuración)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/tidal-fest-front.git
cd tidal-fest-front

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con la URL de tu backend
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000
```

Para producción, ajusta la URL a tu servidor backend.

## 🏗️ Build

```bash
# Compilar para producción
npm run build

# Servir build localmente
npm run start
```

## 🛠️ Stack Tecnológico

- **React Router 7** - Framework full-stack
- **TypeScript** - Type safety
- **TailwindCSS 4** - Estilos
- **Vite** - Build tool
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

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/increible-feature`)
3. Commit tus cambios (`git commit -m 'Add: increible feature'`)
4. Push a la rama (`git push origin feature/increible-feature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

Hecho con 💙 y mucha música