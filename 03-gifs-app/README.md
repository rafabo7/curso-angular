# Gifs APP
Proyecto para practicar la estructuración de un proyecto en componentes reutilizables.

## Extrayendo a componentes
Es conveniente dividir los proyectos en componentes pequeños (dentro de lo razonable) que contengan la estructura y la lógica de manera aislada. De esa manera una app será más mantenible, legible y reutilizable.

En este caso por ejemplo, se obtuvo la estructra html con estilos tailwind del dashboard al completo, y se fueron creando componente para cada "pieza" que lo componía.

Será muy común que unos componentes contengan otros, como por ejemplo side-menu contiene a side-menu-header y side-menu-options. Si existen estas relaciones (que existirán), también es buena práctica que la estructura de carpetas la refleje, para saber dónde buscar cada parte de la app.


## Rutas hijas
Este proyecto necesita implementar rutas hijas para mostrar páginas como search o trending a la derecha de la pantalla, mientras que a la izquierda se sigue mostrando la barra de administración del dashboard.
Para hacer esto, los *path* de las paginas deben declararse dentro del *path* de la pagina madre, en un array denominado *children*

        {
            path: 'dashboard',
            loadComponent: () => 
                import('./gifs/pages/dashboard-page/dashboard-page.component'),
            children: [
                {
                    path: 'trending',
                    loadComponent: () => 
                        import('./gifs/pages/trending-page/trending-page.component')
                },
                {
                    path: 'search',
                    loadComponent: () => 
                        import('./gifs/pages/search-page/search-page.component')
                }

            ]
        }

Ahora las rutas serán *.../dashboard/trending*

## Environments
Los archivos environments en un proyecto de Angular almacenan variables de etorno como atributos de una clase *environment* de manera global para usarlas a lo largo de toda la app, por lo que hay que considerar bien qué variables declarar aquí.
Para usarlas se asgina *environmen* a un atributo de la clase de un componente y se acceden a las distintas variables con notación de objeto.

## Alias para rutas
A veces las rutas para importar recursos entre clases de un mismo proyecto se pueden alargar debido a la estructura de carpetas.
Para configurar variables más legibles se añaden en el archivo *tsconfig.json*, dentro de *compilerOptions*.

        "compilerOptions": {
            "baseUrl": ".",
            "paths": {
            "@environments/*": ["src/environments/*"]
            } ... 
        }
baseUrl se refiere al directorio del proyecto, y los paths asignan un identificador legible a cada ruta que queremos simplificar.

## Servicios

En Angular, igual que en otros framworks, un servicio es una **clase** que encapsula lógica empleada en la app. Puede contener funcionalidades compartidas entre componente, peticiones hhtp como en este proyecto, o gestionar autenticación entre otras cosas.

Cuando un servicio en Angular está provisto en el root se comportan como un singleton, pero hay que inyectarlo y declarar la instacia allá donde queramos utilizarlo.

## Http y Observable
Un Observable es un patrón de diseño de Angular que indica que un objeto puede estar emitiendo valores. Un Observable es *async*, admite métodos encadenados similares a las promesas, pero con mayor contro como por ejemplo que puede emitir valores, que es *lazy* (no se ejecuta hasta que te subscribes), que se puede cancelas y que admite RxJS(Reactive Extensions for Javascript o libreria de métodos asíncronos)

Angular tiene su propia API de peticiones http, llamada HttpClient. Más versátil y personalizable que el fetch del navegador. Es necesario injectarlo asignado a un objeto dentro de la clase en que se use, y añadir el provider en app.config.ts

### Subscribe() en servicios ?
Generalmente no es recomendable no es recomendable suscribirse a peticiones de httpCliente en la clase del servicio, ya que podría fallar o modificarse la info antes de llegar al componente que debe utilizarla. Pero tampoco se recomienda que la petición devuelva un Observable hacia el componente ya que será común que el objeto observable precise de modificaciones antes de ser usado o renderizado.

Aquí entrar en juego las funciones RXJS, hacia las cuales se redirige el valor retornado de la peticion http (un observable) para hacer de manera encadenada todas las modificaciones necesarias antes de mandar la info hacia el componente, donde solamente se empleará el subscribe().

Para encadenar funciones de RXJS a una petición http se usa:

    .pipe(
        tap(...),
        map(...),
        etc...
    )
Cada callback pasa el valor de retorno a la siguiente función.

*Aclaración: en el curso hay una excepción a estas buenas prácticas recomendadas. La función loadTrendingGifs() en GifService se subscribe a la petición http y es ahí donde modifica la info. Es el mismo constructor de GifService quien llama a loadTrendingGifs(). Según los instructores de udemy es común hacer esto para funcionalidades que deben ejecutarse al montar la aplicación y mostrar un contendio inicial, como es caso de los gif en trending-page*


### Mapper
Este proyecto recibe una respuesta http con muchisima info, y solo necesitamos algunas cosas. Para ello se implementa una función que recibe la respuesta completa y se queda sólo con la info que necesita la app.

Esta función se llama *mapper* y se suele declarar en un archivo aislado dentro de la carpeta *app/mapper*


### Persistencia
Un componente puede cargar información desde una API gracias a las llamadas declaradas en los servicios y a los eventos escuchados en el template del componente. Sin embargo, si esa información (en este caso gifs)  no se almacena de alguna manera al cambiar de página el componente se volverá a renderizar, reinciando el valor de lso inputs y con ellos la información de la petición http.

Para conservar esa información hay varios métodos.

Un método podría ser almacenar la información de las distintas peticiones en el archivo del servicio, en una estructura de datos propia de TypeScript llamada Record\<T,T>. Record es una estructura de datos similar a un objeto o un json, pero con llaves dinámicas.

    searchHistory: Record<string, Gif[]>


Claro, lo interesante es que este Record, puede estar asignado a una señal y ser modificaco de manera de dinámica por la app. Y para mostrar en el panel laterial de nuestra app las búsquedas recientes, recuperamos las keys del objeto Record en una señal computada, que se actualizará cuando se actualice la dependiecia con searchHistory.

    // Search results as a record, keys as queries
    searchHistory = signal<Record<string, Gif[]>>({})

    // Keys of record, for aside display of recent searches
    searchHistoryKeys = computed( () => Object.keys(this.searchHistory()) )

Dentro del mismo servicio, gracias a las funciones RXJS de httpCliente de Angular, podemos asignar estas señales como un efecto secundario de la petición http.

Una vez tenemos la funcionalidad para almacenar los datos, una función deseable es volver a los resultados de la búsqueda. Para ellos usaremos lo que se conoce como URL dinámicas, es decir, URL que cambiarán según un parámetro para mostrar una u otra información. Estos URL dinámicos es necesario declararlos en el archivo *app.routes.ts*, y quedaría tal que así:

    {
        path: 'history/:query/:param2/:param3',
        loadComponent: () => 
            import('./gifs/pages/gif-history/gif-history.component')
    },

Luego se podrán concatenar con el URL pasado a [routerLink], así:

     <a [routerLink]="['dashboard/history' , key]" />

Genralmente, un componente puede adaptar su contenido según su url cambien gracias a los parametros de URL dinámicas. En nuestro caso, distintos parametros hacen referencia a distintos resultados de búsqueda.

Para recuperar esa información se usa:

    url = inject(ActivatedRoute).params.subscribe( (para) => console.log(para['query']) )

**Ojito:** ActivatedRoute será un observable que emitirá datos cada vez que la url cambie. Con el atributo params y subscribe, conseguimos emitir solamete el valor de los parametros. La linea anterior imprimirá únicamente el valor del parametro con la key = 'query' (previamente asignado en *app.routes.ts*)

En Angular moderno basado en señales se puede pasar directamente cualquier observable a una signal con *toSignal(Observable)*. Y de nuevo, cualquier observable tiene el método pipe para trabajar con funciones RXJS encadenadas y hacer cálculos o modificaciones antes de usar el observable.




    

