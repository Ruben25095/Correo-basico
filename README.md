# mail-client

Esta plantilla debería ayudarte a comenzar a desarrollar con Vue 3 en Vite.

## Configuración recomendada del IDE

[VS Code](https://code.visualstudio.com/) + [Vue (Oficial)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (y deshabilitar Vetur).

## Configuración recomendada del navegador

- Navegadores basados en Chromium (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Activar Custom Object Formatter en Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Activar Custom Object Formatter en Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Soporte de tipos para importaciones `.vue` en TS

TypeScript no puede manejar información de tipos para importaciones `.vue` por defecto, por lo que reemplazamos el CLI `tsc` con `vue-tsc` para la verificación de tipos. En los editores, necesitamos [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para que el servicio de lenguaje de TypeScript sea consciente de los tipos `.vue`.

## Personalizar la configuración

Consulta la [Referencia de configuración de Vite](https://vite.dev/config/).

## Configuración del proyecto

```sh
npm install
