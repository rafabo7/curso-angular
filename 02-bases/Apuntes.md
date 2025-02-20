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
- tsconfig.* : configuraciones y opciones de TypeScript. Genralmente no se modificarán.

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

## Componentes y *code behind*
Los componentes de Angular se basan en varios archivos vinculados entre sí. Generalmente un archivo es el renderizado del componente, es decir el HTML, otro es para los estilos, y otro es para la lógica (funciones, event listeners) y demás.

Estos archivos tienen unos nombres estandarizados para las **buenas prácticas: nombreDelComponente.component.\***

Después veremos otros nombres de esta conveción para servicios y demás.

Este último archivo es crucial, en nuestro caso y en casi todos los proyecto reales será un archivo TypeScript. En él se importa las utilidades de componente de angular con: 
  
    import { Component } from '@angular/core';

Se declara los atributos del componente con el decorador *@Component*, que convierte una clase de TypeScript en un componente.

    @Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
    })

*selector* es para el nombre que va a tener la etiqueta HTML que renderizará el componente.

*templateUrl* vincula la class con un archivo html.
*template* permite HTML en linea, con varias lineas usando backticks, pero sin pasarse. Si son más de 5 líneas a un archivo.

*styleUrl* hace lo propio con la hoja de estilos.


Y dentro de una class exportada se declaran los atributos del objeto-componente, con sus métodos y todo los necesario para su funcionalidad. En nuestro caso bastante simple, sólo un contador que cambia o se resetea.

    export class AppComponent {
    public title: string = 'Hola Mundico';
    public counter: number = 10;

    updateCounter( value: number ): void {
      this.counter += value
    }

    resetCounter(): void {
      this.counter = 10
    }
    }

Cuando declaramos un nuevo componente hay que incluir en la lista *declarations* en el archivo *app.module.ts*

El archivo **app.module.ts** es el módulo raíz de la aplicación Angular. Define qué componentes, directivas, pipes y servicios están disponibles en la aplicación.

Para crear componentes es muy común usar la Angular Command Line Interface, que agiliza el proceso de crear varios archivos con el mismo nombre y el mismo sufijo '.component', así como sus respectivos enlaces con estilos y selectores.

## One way data binding
(Enlazado de una sola vía)

Es el concepto de que los atributos de una clase componente se representen de manera dinámica en el html (es parecido al jsx de React(?)).

Angular también permite *two way data binding*, es decir, que la vista afecte al modelo.

Pero hay que priorizar el *one way data binding*

> [!NOTE]
> Las clases de TypeScript también tienen getters y setters, pero en VSCode se ven como si fueran atributos en el autocompletad.
> Los getters y setters se declaran con get y set.
> El binding sólo se hace con los atributos del scope de la class, no con variables que se declaren dentro de métodos.

## Directivas
Las directivas en Angular son instrucciones propias que modifican el DOM. Es decir, es la manera de Angular, inscrita en su ciclo de detección, de manipular el DOM. A diferencia de la manera imperativa de JavaScript para manipular el DOM, las directivas pueden hacerlo de manera declarativa y con una lógica agregada.

Es importante usar estas directivas para manipular el DOM. La forma natva de JS, con querySelector u otros métodos no será detectado por el ciclo de detección de cambios y causará comportamientos inesperados.

#### ngIf
ngIf es una directiva que permite mostrar u ocultar un elemento basándose en una expresión booleana.

#### ngFor
ngFor itera sobre un atributo iterable de la class del componente. Es la manera de Angular para renderizar un array u objeto como una lista.

Es necesario declarar un nombre para los elementos a iterar.

El contenido a renderizar irá dentro de la etiqueta que tiene la directiva ngFor, obligatoriamente la etiqueta 'li'.

ngFor tiene en su haber algunas herramientas para manejar condiciones a la hora de renderizar listas.

En concreto las más comunes son propiedades declaradas internamente por Angular que nosotros podemos asignar a la hora de utilizar un ngFor. Las más comunes son: **index, first, last**.

Se declaran dentro de la directiva así: 

    *ngFor="
        let character of characterList;
        let i = index;
        let isFirst = first;
        let isLast = last;
        let isEven = even
        let isOdd = odd"

*Usaremos estas como ejemplo, aunque sea un poco exagerado. Angular tiene otras propiedades para el ngFor que se pueden consultar en la doc. Tip: también se pueden pasar built-in functions o personalizadas*

Esto es especialmente útil si también usamos el ngClass para estilos. En el caso de este curso, con Bootstrap.

###  ngClass

Enlaza clases de CSS basado en un objeto expresion.

Se usa en el elemento que renderiza cada elemento de una lista. Es decir el list item (li). Seguido del ngFor con todo lo que declaremos:

    [ngClass]="{
        'list-group-item-dark' : isLast,
        'list-group-item-info': isEven
      }"

Se podría usar también con nuestras propieas clases de CSS.

> [!NOTE]
> Cuando un atributo HTML se coloca entre corchetes [] se convierte en dinámico. Se podrá manipular, leer y modificar de forma dinámica con diferentes herramientas de Angular. Se asginan a expresiones de Javascript.







### ngIf-else + ng-Template

#### ngIf-else
una directiva que viene a evitar el encadenamiento de ngIf.
Como su nombre indica se comprueba una condición, si no se cumple se renderiza el elemento html con la referencia local indicada.

Referencia local:
    
    #localReference
    Siempre dentro del mismo archivo de html.

Declaración de ngIf-else:
    
    *ngIf="deletedHero; else notDeleted"

#### ng-Template
Es un elemento virtual del DOM que se renderizará o no según una expresión dada.
La expresión se expresa como una referencia local.
Declaración de un ng-template:
    
    <ng-template #notDeleted >
    <h4>No se ha borrado nada</h4>
    </ng-template>

## Módulos en Angular

Un modulo en ES6 es un archivo exportado e importado por otros archivos.

En Angular, un módulo es una class, con un decorador que establece sun funcionalidad y que se importa en diversos archivos de nuestra app.

Cada módulo entonces encapsula una funcionalidad. Cohesionan el código que tiene funcionamiento en común.

Por defecto los primeros componentes vienen importados y declarado en el archivo *app.module.ts*

Sin embargo a medida que crece una app los componentes y por lo tanto los módulos pueden aumentar en número rápidamente y no es conveniente gestionarlos todos desde el mismo archivo *x.module.ts*. Por ello se declaran otros archivos del mismo tipo que encapsulan la funcionalidad de unos componentes que conviven en la app. A su vez, los módulos declarados deben ser exportados e importados por el archivo principal *app.module.ts*

Estos módulos, de nuevo, son class declaradas de la siguiente manera:

    import { NgModule } from "@angular/core";
    import { CounterComponent } from "./components/counter/counter.component";

    @NgModule({
      declarations: [
        CounterComponent
      ],
      exports: [
        CounterComponent
      ]

    })
    export class CounterModule {

    }

En el array de declarations irán los componentes, que llevan el sufijo Component en su nombre. En el array de imports, siempre irán modulos, con el nombre de la class declarad, por ejemplo: *CounterModule*


### Directorios *pages*

Normalmente cuando trabajamos con Angular vamos a dividir la aplicación en componentes, eso está claro.

Sin embargo estos componentes con mucha seguridad integran a su vez otros componentes que atomizan la funcionalidad y la lógica de la app.

Estos componentes que agrupan a los componentes más pequeños se denominan páginas o *pages*, que tienen su utilidad especialmente cuando se implementa un router.

### Decorador @Input()

@Input() es un decorador de propiedad o atributo de una clase de TypseScript.

Permite pasar una propiedad desde un elemento o componente padre a un componente hijo.

Se declara con la siguiente sintaxis en archivo TS del componente hijo:

    @Input()
    public twoProp: prop[] = []

Y la siguiente sintaxis en archivo HTML del componente padre:

    <childComp [twoProp] = 'oneProp' ></childComp>

**Siempre cumpliendo con los tipos e interfaces**

### Decorador @Output()

Al contratio que @Input(), el decorador @Output() permite a un componente "emitir" valores, atributos u objetos hacia el componente padre.

Una vez el padre tienen acceso a la información necesaria es común pasarla entonces hacia otros componentes hermanos del componente original que emitió los datos.

Así funcionan los formularios simples que vamos a estar viendo. Esto se hace con @Output() junto con la utilidad *EventEmitter*

**La sintaxis básica para emitir eventos a componentes padre es la siguiente**

En el componente que debe emitir la información:

    import { Component, **EventEmitter**, Input, **Output** } from '@angular/core';
    
    export class ListComponent {

      @Input()
      public characterList: Character[] = []

      **********************************************************
      @Output()
      public onDeleteOnChild: EventEmitter<number> = new EventEmitter()
      **********************************************************


      onDeleteCharacter( index: number ): void {  <-- A su vez, será normal que un evento en el hijo llame al EventEmitter hacia el padre.
        *************************
        this.onDeleteOnChild.emit(index)
        *************************
      }

    }

Esto expondrá el método onDelete como si fuera un evento, gracias a EventEmitter, para que el componente padre lo pueda 'escuchar'. Sin embargo lo interesante es que lo que se emite es la información, en este caso el index, que se podrá capturar en el componente padre.

El componente padre podrá escuchar el evento emitido con la notación de (losEventos | click | etc) para entonces asignarle un método en su class como a cualquier otro evento. Con la particularidad de que a ese método le podrá pasar directamente la información emtidia por el componente hijo gracias a la notación '$event'

    padre.component.html:
    <dbz-list
      [characterList]="characters"
      (onDeleteOnChild)="onDeleteOnParent($event)" ></dbz-list>



    padre.component.ts:
    export class ParentComponent {

      public onDeleteOnParent( index: number ) {
        this.someAtribute.splice(index, 1)
      }

    }



### Introducción a Formularios

Para los formularios se recomienda hacer uso del *one way data binding* sobre el *two way data binding*. En el *two way data binding* los cambios en la clase del componente se reflejan en el template, y los del template en la clase. Cada cambio en cualquiera de estas partes provoca un refresco de la página debido a la detección de cambios de Angular, si no llevamos cuidados podemos crear un loop de refrescos infinito.

*One way data binding* mantiene la clase enlazada al template, pero no al revés, por lo que es más sencillo, más recomendable al principio, aunque algunas funcionalidades quedarán cojas.

**Recordatorio**

[Corchetes] para que un atributo en el template apunte a un atributo de la clase del componente.

(Paréntesis) para un atributo en el template que apunta a eventos.

[(*Banana Box*)] asocian un atributo y un evento al mismo tiempo.




