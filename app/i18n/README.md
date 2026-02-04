# Internacionalización (i18n)

Este proyecto utiliza **react-i18next** para soportar múltiples idiomas.

## 🌍 Idiomas soportados

- **Español (es)** - Idioma por defecto
- **English (en)**

## 📁 Estructura de archivos

```
app/i18n/
├── config.ts           # Configuración de i18next
├── locales/
│   ├── es.json        # Traducciones en español
│   └── en.json        # Traducciones en inglés
└── README.md          # Este archivo
```

## 🚀 Uso en componentes

### Importar el hook

```tsx
import { useTranslation } from "react-i18next";

function MiComponente() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t("welcome.title")}</h1>
      <p>{t("welcome.description")}</p>
    </div>
  );
}
```

### Interpolación de variables

```tsx
// En el archivo JSON:
{
  "welcome": {
    "greeting": "Hola {{name}}, bienvenido!"
  }
}

// En el componente:
<p>{t("welcome.greeting", { name: "Juan" })}</p>
// Resultado: "Hola Juan, bienvenido!"
```

### Cambiar idioma programáticamente

```tsx
import { useTranslation } from "react-i18next";

function MiComponente() {
  const { i18n } = useTranslation();
  
  const cambiarIdioma = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <button onClick={() => cambiarIdioma("en")}>
      Change to English
    </button>
  );
}
```

## 🎨 Componente LanguageSelector

Ya incluimos un componente selector de idioma que:
- Se posiciona en la esquina superior derecha
- Guarda la preferencia en localStorage
- Muestra banderas y códigos de idioma

Para usarlo en cualquier página:

```tsx
import { LanguageSelector } from "../components/LanguageSelector";

export function MiPagina() {
  return (
    <>
      <LanguageSelector />
      {/* resto del contenido */}
    </>
  );
}
```

## 📝 Agregar nuevas traducciones

1. Abre `app/i18n/locales/es.json`
2. Agrega tu nueva clave:
```json
{
  "miSeccion": {
    "titulo": "Mi Título",
    "descripcion": "Mi descripción"
  }
}
```

3. Agrega la misma estructura en `app/i18n/locales/en.json`:
```json
{
  "miSeccion": {
    "titulo": "My Title",
    "descripcion": "My description"
  }
}
```

4. Úsalo en tu componente:
```tsx
<h1>{t("miSeccion.titulo")}</h1>
```

## 🌐 Agregar un nuevo idioma

1. Crea un nuevo archivo en `app/i18n/locales/`, ejemplo: `fr.json`
2. Copia la estructura de `es.json` o `en.json`
3. Traduce todo el contenido
4. Actualiza `app/i18n/config.ts`:

```typescript
import fr from "./locales/fr.json";

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr }, // Nuevo
};
```

5. Actualiza `LanguageSelector.tsx`:

```typescript
const languages = [
  { code: "es", label: "ES", flag: "🇪🇸" },
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "fr", label: "FR", flag: "🇫🇷" }, // Nuevo
];
```

## 🔧 Configuración

La configuración en `app/i18n/config.ts` incluye:

- **LanguageDetector**: Detecta automáticamente el idioma del navegador
- **fallbackLng**: Idioma por defecto si no se encuentra el del usuario (español)
- **lng**: Idioma inicial (español)
- **localStorage**: Guarda la preferencia del usuario

## 💡 Tips

- Usa puntos (`.`) para anidar traducciones: `t("welcome.dialog.title")`
- Mantén consistencia en la estructura entre idiomas
- Usa nombres descriptivos para las claves
- Agrupa traducciones relacionadas bajo la misma sección
- Para textos largos, considera dividirlos en partes más pequeñas

## 🐛 Troubleshooting

### Las traducciones no aparecen

1. Verifica que el archivo JSON esté bien formateado
2. Asegúrate de haber importado `useTranslation` correctamente
3. Revisa que la clave existe en ambos archivos de idioma
4. Limpia el cache del navegador o localStorage

### El idioma no cambia

1. Verifica que `i18n` esté inicializado en `root.tsx`
2. Comprueba que localStorage no esté bloqueado
3. Asegúrate de que el código del idioma es correcto (`es`, `en`)

## 📚 Recursos

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)