# 04 Geo App
Será una app donde mostrar información sobre países.

## Rutas hija separadas
En equipos reales es común que una app se divida entre desarrolladores para trabajar. En esos casos no es conveniente que todos los desarrolladores estén manipulando el archivo *app.routes.ts*. Se puede crear tantos archivos *.routes.ts* como sea preciso para cada gran parte o gran módulo de una app.

En este caso por ejemplo se crean en *country.routes.ts* las rutas relacionadas con esa parte de la app, se exportan como *default* y se importan desde el archivo de rutas principal mediante *loadChildren: () => import("./country/...")*

## Layouts
En Angular, se llama layout a un componente que envuelve otras pantallas o páginas y cuya finalidad es estructurar, es decir, definir un layout para mostrar distintos componentes a la vez. Un componente de tipo layout tiene un router outlet interno.

Se usa para mostrar componentes compartidos junto a otras páginas, en esta app sirve para que el footer sea siempre visible en las rutas hijas de */country/*