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
