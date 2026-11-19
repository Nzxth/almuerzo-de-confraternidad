# Almuerzo de Confraternidad

Invitación estática lista para GitHub Pages. Al entrar aparece un pergamino marfil con lazo y sello dorados. Al tocar el sello o el botón «Desplegar la invitación», el pergamino se despliega suavemente y muestra la invitación.

## Publicación

Descomprime el ZIP y sube todos los archivos HTML, CSS, JavaScript, PNG y SVG a la misma carpeta, en la raíz del repositorio. En GitHub, abre Settings → Pages, elige publicar desde la rama que contiene los archivos y la carpeta raíz. No requiere instalación ni compilación.

## Lectura y animación

«Pausar animación» detiene las hojas y las motas de luz. Con la animación en pausa, o si el dispositivo prefiere movimiento reducido, el pergamino se despliega al instante. Al final de la invitación se puede elegir «Volver al pergamino». Si JavaScript no está disponible, la invitación se puede leer directamente.

## Datos del encuentro

20 de diciembre de 2026, 1:00 p. m. (hora de Perú). Oro Andino Lodge, Caraz.

El texto mantiene un tono formal y cálido, sin identificar a quien invita. El diseño usa papel claro, tipografía azul marino, doble marco dorado y ramas de olivo con hojas azules, sobre un fondo de cristal claro con partículas animadas.

## Cuenta regresiva

El contador muestra días, horas, minutos y segundos hasta el 20 de diciembre de 2026 a las 13:00 de Perú. El atributo `data-event-date` de `index.html` incluye el huso horario explícito `-05:00`, equivalente a las 18:00 UTC, para que el instante sea el mismo desde cualquier país. Al llegar muestra ceros y «¡Llegó el día de compartir!». Se recalcula al volver a una pestaña que estaba oculta.

El enlace de ubicación abre una búsqueda por nombre, no una dirección verificada. Las tipografías se cargan desde Google Fonts; si no hay conexión se usan las fuentes del dispositivo.

Para cambiar los datos, edita `index.html` (incluido `data-event-date` y la fecha visible) y actualiza también el evento de calendario en `script.js`. `classic.css` contiene el diseño claro; `botanical-corner.svg`, los adornos; `countdown.js`, la cuenta regresiva.
