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

### Inputs, pasar *data* a un componente hijo

Para que un componente reciba un valor de un componente padre es necesario declarar una variable para almacenar este valor con el metodo input. La sintaxis tendría este aspecto:

    En el componente padre:
    ----------------------------
     <dragonball-character-list
      [characters]="characters()" />
    
Recuerda: llaves cuadradas indican la variable de la clase del componente. Es decir, en este caso, el atributo *characters* en la clase CharacterList(){}. Lo que se le pasa al atributo es el valor desde un atributo, en este caso una *signal* del componente padre, por eso los parentesis.

    En el componente hijo:
    -----------------------------------
    characters = input.required<Character[]>()
    Se declara el atributo para almancenar los datos para su posterior uso


### Outputs, emitir *data* a un componente padre

Similar a los emitters de otros frameworks, en Angular existe un tipo de objeto incluído que permite mandar información de un componente hijo a un componente padre.

Será común que esa informmación que tenemos que pasar sea interactiva o recuperada de un backend, por lo que muchas veces serán *signals*. Si la información es interactiva tendremos señales vinculadas a inputs, y estos inputs o forms tendrán asignados sus eventos y funciones que llamar a continuación.

El primer paso para emitir esa información es declarar el objeto *output()*.

    newCharacterOut = output<Character>()

Este output se podrá usar en los métodos del componente hijo, pasandole como argumento la informacion que se desea emitir.

    addCharacterChild () {
      const newCharacter: Character = {
        id: Math.floor(Math.random() * 100),
        name: this.name(),
        power: this.power()
      }

      **this.newCharacterOut.emit(newCharacter)**
    }

Esto emitirá un evento hacia el componente padre, que podrá ser capturado igual que otros eventos, con el identificador entre paréntesis.
En el componente padre

    Componente padre:
    <dragonball-character-add
      (newCharacterOut)="addCharacterParent($event)"/>

    Se captura el evento entre paréntesis y se llama un método de la clase padre para que se ejecute cuando se dispare
    La palabra clave $event traslada el valor (value) del evento

Una vez capturado se puede usar la información en la clase del componente padre, o pasarla a su vez a un componente hermano.

    addCharacterParent (newCharacter: Character) {
      this.characters.update(
        list => [...list, newCharacter]
      )
    }

Pero obviamente estos cambios no son persistentes, son atributos que se declaran cuando se construye el componente. Para que estos valores persistan el curso propone en este punto almacenar la información no en la clase, sino en un **service**

### Servicios en Angular

Un servicio en Angular y otros frameworks es un archivo en el que se centraliza la lógica y la información de un componente o un grupo de ellos.

Además en Angular, un servicio es una clase que con el decorador *@Injectable* se puede hacer inyección de dependencias.

A continuación se muestra cómo se propone que se haga la inyección de dependencias en las nuevas versiones de Angular.

    import { Injectable, signal } from '@angular/core';
    import { Character } from '../interfaces/character.interface';

    @Injectable({providedIn: 'root'})
    export class DragonballService {
      constructor() { } // el constructor se usaba en anteriores versiones, aun está disponible pero se promueve la nueva forma.
      // Aquí iría toda la info y métodos

      characters = signal<Character[]>([
        {id: 1, name: 'Goku', power: 9001},
        {id: 2, name: 'Vegeta', power: 8000}
      ])

      addCharacter (newCharacter: Character) {
        this.characters.update(
          list => [...list, newCharacter]
        )

      }

    }

Y para inyectarlo en el componente:

    public dragonballService = inject( DragonballService )

Ahora que habría que cambiar las referencias a los atributos y métodos.

    Ya no sería por ejemplo:

    addCharacter()

    Sino:

    dragonbalService.addCharacter($event)

Una vez almacenados ahí, los datos no cambiarán cuando se renderize el componente, solo cambiarán cuando se construya de nuevo la clase del servicios, es decir, cuando se refresque la pagina.

### Efectos

Los Efects en Angular, muy parecidos a React, son operaciones o bloques de código.

Estos bloques de código están vinculados a una signal se ejecutan al menos una vez al iniciar el componente, y cada vez que cambie la signal a la que están vinculados. Similar a los efects con sus dependencias en React.

A diferencia de React, no es necesario declarar las dependencias del efecto, las signals usadas dentro del efectos tienen seguimiento automático.

No se recomienda usar efectos para hacer peticiones HTTP.

Los efectos deben tener una única función.

Ejemplo de efecto:

    saveToLocalStorage = effect( () => {
      localStorage.setItem('characters', JSON.stringify(this.characters()))
    } )


