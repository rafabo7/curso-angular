# Bases de Angular
## Aspectos a tener en cuenta
### Archivos de un proyecto
(En este caso)

*Cambiará cuando veamos la nueva manera de trabajar con Standalone Components*

- .editorconfig: sobrescribe valores por defecto del editor de codigo. Un maquetador para estandarizar la forma de representar el codigo, una configurador del editor.
- .gitignore: lista de archivos que git no trackea, lo de siempre. Estos archivos se genera cuando se levanta la apliación según la lista de dependencias y versiones. No se editará.
- angular.json: configurador de angular para nuestra aplicación (builders, versiones, archivo index, ect.) Este a veces lo tocaremos pero no mucho.
- package-lock.json: configuracion de los módulos de node, solo se manipula para instalar o quitar dependencias, pero nunca directamente, sino mediante comandos de node, si no se liará.
- package.json: configuración de aplicación de node. Se puede editar según convenga al proyecto, combinar scripts y establecer la privacidad del paquete. Las dependencias necesarias para crear la aplicación de producción para hacer treeshaking(quitar modulos no utilizados pero incluidos por defecto). No todo se modificarña, y modificar con cuidado. También incluye devDependencies.
- README.md: documentación.
- tsconfig.* : configuraciones y opciones de TypeScript. Generalmente no se modificarán.

### Directorios de un proyecto
- .angular: no se suele tocar, maneja el cache de nuestro proyecto. Ignorada
- .vscode: en realidad no es parte del proyecto, no se suele tocar. A veces se incluye un set de instalaciones como recomendación para desarrollo del proyecto. Ignorada.
- node_modules: según la lista de dependencias, se descargan los modulos de node contenidos. Muchos no se usan. Ignorada.
- **src: el que sí vamos a trabajar**
  - favicon.ico
  - index.html (lo único especial es el base href, y el app-root)
  - main.ts (punto de entrada de la app)
  - styles.css (estilos globales)
  - **carpeta *app*** (la lógica de nuestra app)
    - logica, estilos, tests y renderizado de la app
    - assets (con un gitkeep para que trackee la carpeta aunque no tenga nada)
    Los nombres de los archivos son una convención para indicar qué tipo de información contienen. Para ello se usan los sufijos component, config, routes, pages, services, etc.
    - app.component.css -> para los estilos globales de la app
    - app.component.html -> el html de la app y donde está comunmente la ruta de acceso
    - app.component.ts -> la lógica del componente app
    - app.component.spec.ts -> los tests de la lógica del componente app.
    - app.config.ts
    - app.routes.ts


*Se llama pages a componentes que ocupan toda la pantalla, como convención*


### Signals

La nueva forma de renderizar cambios en clases de Angular, para ser sincero a mi no me parecía nada mal lo del data binding pero bueno, dejemos a los pros hacer de pros.

Las signals son unas funciones que almacenas y actualizan valores que sabemos que van a cambiar a lo largo del tiempo de ejecución de la app. Se usa una sintaxis más o menos así:

    public dataSignal = signal(value)

    - - Tiene funciones como - -

    dataSignal.set(value) - para setear el valor, ignoradon valores anteriores.
    dataSignal.update( current => current * value ) - para actualizar mediante una callback que toma como argumento el valor actual.

#### Señales computadas o Read Only Singlas

Las señales computadas son señales que son solo de lectura. Sólo pueden cambiar si sus dependencias, es decir sus atributos en la clase, cambian


### Pipes

Los pipes transforman de manera visual la informacion que mostraremos en pantalla, sin cambias los datos o a los atributos de nuestras clases reales

### Referencias locales

Cuando es necesario declarar un atributo *value* en un input por ejemplo, a un valor que depende de una señal, lo correcto es utilizar la sintaxis que los componentes emplean para hacer referencias a atributos de la clase:

    [value]="singalData()"

Sin embargo, para recuperar datos, eventos o, más adelante, métodos de referencias del DOM hay que declarar una referencia local. Brevemente, una referencia local es el equivalente a referenciar un nodo del DOM en Javascript y asignarlo a una varialbe, sólo que aquí directamente declaramos la variable, por así decirlo.Esto resulta útil para muchas cosas, de momento lo utilizamos igual que muchas veces utilizamos la referencias al DOM en JS, para capturar el valor de un evento, por eso es más o menos equivalente a un e.target.value.

 La sintaxis es la siguiente

    <input
    [value]="singalData()"
    #txtInput                                 // la referencia local con #
    (input)=signalData.set( #txtInput.value ) // sí, la referencia funciona en su mismo nodo
    >


