# 04 Geo App
Será una app donde mostrar información sobre países.

## Rutas hija separadas
En equipos reales es común que una app se divida entre desarrolladores para trabajar. En esos casos no es conveniente que todos los desarrolladores estén manipulando el archivo *app.routes.ts*. Se puede crear tantos archivos *.routes.ts* como sea preciso para cada gran parte o gran módulo de una app.

En este caso por ejemplo se crean en *country.routes.ts* las rutas relacionadas con esa parte de la app, se exportan como *default* y se importan desde el archivo de rutas principal mediante *loadChildren: () => import("./country/...")*

## Layouts
En Angular, se llama layout a un componente que envuelve otras pantallas o páginas y cuya finalidad es estructurar, es decir, definir un layout para mostrar distintos componentes a la vez. Un componente de tipo layout tiene un router outlet interno.

Se usa para mostrar componentes compartidos junto a otras páginas, en esta app sirve para que el footer sea siempre visible en las rutas hijas de */country/*

## Reactividad asíncrona con Resource

Generalmente para hacer peticiones http u otras tareas asíncronas.

*Ver documentación de Angular, es una feature en desarrollo y puede cambiar, en Async reactivity with resources*

Hay que importar e inicializar un objeto resource.

El objeto resource toma como argumento un objeto de configuración, en el que se específica que dependencias va a tener y va a poder usar internamente. Cuando esas dependencias cambien, el resource se ejecutará, por lo que conviene que las dependencias sean señales para mantener la reactividad a lo largo de la app.

El objeto de configuración de resource toma dos atributos: uno para los parámetros, llamado generalmente *params* que es un método que devuelve un objeto con las dependencias nombradas:

    params: () => ({ query: this.query() })

Otro atributo es un loader asíncrono, contiene también un método que realiza la petición, la validación previa y tiene funciones propias que facilitan gestionar los estados de carga y los errores. En nuestro caso el cuerpo del método se declara directamente en el loader, pero podría estar también estar declarado fuera y ser invocado por el loader.

El loader devuelve una promesa (un observable), que a veces puede ser útil, pero en nuestro caso, ya que devuelve la información ya mapeada y lista para usar, convienen que devuelva la info directamente. Para ello puede usarse *firstValueFrom* desde rxjs acompañado de *await*, que resolverá la promesa devolviendo el primer valor detectado:

    loader: async( {params} ) => {

      if ( !params.query ) return []

      return await firstValueFrom(

        this.countryService.searchByCapital(params.query)
      )
    }


Algunas funciones propias del loader son *hasValue(), error(), value()* y otras, y son señales propias del loader. error() captura el error lanzado por el servicio que hace la petición

El incoveniente de este método es que devuelve y trabaja con promesas en el loader y generalmente nosotros esperaremos un observable, por lo que es necesesario para el valor devuelto por *firstValueOf*

### RxResource 

Similar a resource, pero este ya devuelve un observable, puediendo prescindir de firstValueOf

Su implementación es muy parecida, está experimental, hay que revisar periódicamente la documentación, algunas opciones cambién de nomenclatura con las versiones. Revisar en *rxResourceOptions*

Se usuaría de la siguiente manera:


    capitalResource = rxResource({
      params: () => ({ query: this.query() }),

      stream: ( {params} ) => {

        if ( !params.query ) return of([])

        return this.countryService.searchByCapital(params.query)
      }
    })

**of convierte un elemento en un Observable basado en ese elemento, en este caso un array vacío**

