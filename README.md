# Re-Acciona Plus - Clasificador Inteligente de Residuos

## 🌱 Descripción

Re-Acciona Plus es una aplicación web progresiva (PWA) desarrollada como proyecto universitario que utiliza inteligencia artificial para ayudar a los usuarios a clasificar correctamente sus residuos. La aplicación permite a los usuarios tomar fotos o subir imágenes de residuos y recibe recomendaciones instantáneas sobre cómo reciclarlos adecuadamente.

## ✨ Características

- 📸 Captura de imágenes en tiempo real
- 🔄 Cambio entre cámara frontal y trasera
- 📤 Subida de imágenes por arrastrar y soltar
- 🤖 Asistente virtual de reciclaje con IA
- 🎯 Clasificación precisa de residuos
- 📱 Diseño responsivo y adaptable
- ♿ Accesibilidad integrada (WCAG 2.1)
- 🌐 Soporte multilenguaje (en desarrollo)

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (Tailwind CSS)
- JavaScript (Vanilla)
- APIs Web:
  - MediaDevices (Cámara)
  - File API
  - Drag and Drop API
  - Web Storage

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/re-acciona-plus.git
```

2. Navega al directorio del proyecto:
```bash
cd re-acciona-plus
```

3. Abre el archivo index.html en tu navegador o utiliza un servidor local:
```bash
# Si tienes Python instalado
python -m http.server 8000

# Si tienes Node.js instalado
npx serve
```

## 📖 Uso

### Clasificación por Cámara

1. Haz clic en el botón "Cámara"
2. Permite el acceso a la cámara cuando el navegador lo solicite
3. Apunta la cámara al residuo que deseas clasificar
4. Presiona el botón de captura
5. Revisa el resultado y las recomendaciones

### Clasificación por Imagen

1. Haz clic en el botón "Subir"
2. Arrastra una imagen o haz clic para seleccionar
3. Espera el resultado del análisis
4. Revisa las recomendaciones de reciclaje

### Asistente Virtual

1. Escribe tu pregunta en el chat
2. El asistente responderá con información relevante
3. Puedes hacer clic en las categorías predefinidas para obtener información rápida

## 🔧 Estructura del Proyecto

```
re-acciona-plus/
├── index.html          # Archivo principal
├── styles.css         # Estilos CSS
├── app.js            # Lógica principal
└── README.md         # Documentación
```

## 📝 Guía de Estilo

### HTML
- Usa elementos semánticos
- Mantén la accesibilidad con atributos ARIA
- Sigue la estructura de encabezados correctamente

### CSS
- Sigue la metodología de utilidades de Tailwind
- Mantén las animaciones sutiles y performantes
- Asegura el contraste adecuado para accesibilidad

### JavaScript
- Usa ES6+ features
- Mantén las funciones pequeñas y enfocadas
- Documenta las funciones principales
- Maneja errores apropiadamente

## 🔐 Seguridad

- Las imágenes se procesan localmente
- No se almacenan datos sensibles
- Se utilizan las mejores prácticas de seguridad web

## 📱 PWA Features (En Desarrollo)

- Instalable en dispositivos móviles
- Funciona offline
- Notificaciones push
- Actualizaciones automáticas

## ⚡ Performance

La aplicación está optimizada para:
- Carga rápida inicial
- Uso eficiente de recursos
- Respuesta inmediata
- Bajo consumo de datos

## 🌍 Sostenibilidad

Este proyecto busca contribuir a los Objetivos de Desarrollo Sostenible:
- Objetivo 11: Ciudades y comunidades sostenibles
- Objetivo 12: Producción y consumo responsables
- Objetivo 13: Acción por el clima

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

Este proyecto es desarrollado como parte del primer semestre universitario por:
- [Nombres de los integrantes del equipo]

## 📞 Contacto

Para más información sobre el proyecto, contacta a:
- Email: [email del equipo]
- Universidad: [nombre de la universidad]

## 🙏 Agradecimientos

- Profesores y mentores del curso
- Compañeros de clase por su retroalimentación
- [Otros agradecimientos específicos]
