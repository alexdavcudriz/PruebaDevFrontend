# Prueba Dev Frontend

Esta es una aplicación móvil de lista de tareas desarrollada con Ionic Framework y Angular, con soporte para exportación a Android e iOS usando Apache Cordova.

## Autor

Nombre: Alex Cudriz  
Email: alex.d.cudriz@accenture.com  
GitHub: [https://github.com/alexdavcudriz](https://github.com/alexdavcudriz)

## Características

- Crear, completar y eliminar tareas.
- Asignar categorías personalizadas a tareas.
- Filtrar tareas por categoría.
- Persistencia local (localStorage).
- Interfaz moderna con Ionic.
- Compatible con Android e iOS (usando Cordova).

## Tecnologías

- Ionic Framework
- Angular
- Apache Cordova
- HTML, SCSS, JavaScript

---

## Instalación

```bash
git clone https://github.com/alexdavcudriz/PruebaDevFrontend.git
cd PruebaDevFrontend
npm install
```

## Requisitos

- Node.js y npm
- Ionic CLI (`npm install -g @ionic/cli`)
- Cordova CLI (`npm install -g cordova`)
- Android Studio (para Android)
- Xcode (para iOS, solo en macOS)

---

## Agregar integración Cordova

```bash
ionic integrations enable cordova
```

## Agregar plataformas

```bash
ionic cordova platform add android
ionic cordova platform add ios
```

---

## Ejecutar en navegador

```bash
ionic serve
```

---

## Ejecutar en Android

### Emulador Android

```bash
ionic cordova emulate android
```

### Dispositivo físico Android

```bash
ionic cordova run android
```

---

## Construir APK Android

### Debug APK

```bash
ionic cordova build android
```

Ubicación del APK:
`platforms/android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK

```bash
ionic cordova build android --release
```

---

## Ejecutar en iOS

> ⚠️ Solo disponible en macOS con Xcode instalado.

### Abrir en Xcode

```bash
ionic cordova build ios
open platforms/ios/*.xcworkspace
```

### Ejecutar en simulador iOS

```bash
ionic cordova emulate ios
```

### Ejecutar en dispositivo iOS

Conecta tu iPhone por USB y autoriza el dispositivo desde Xcode.

---

## Capturas de Pantalla

### Lista de tareas

![Lista de tareas](screenshots/tareas.png)

### Crear categoría

![Crear categoría](screenshots/categorias.png)

> Coloca tus capturas de pantalla en `src/assets/screenshots/` y actualiza las rutas si es necesario.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── home/           # Página principal
│   ├── categories/     # Gestión de categorías
│   ├── models/         # Interfaces Task y Category
├── assets/
├── index.html
```

---

## Licencia

MIT © Tu Nombre
