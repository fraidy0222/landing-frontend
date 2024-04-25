const routes = [
  {
    path: "/administracion",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requireAuth: true },
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },

      //Users
      {
        path: "/usuarios",
        name: "Usuarios",
        meta: { roles: ["Administrador"] },
        component: () => import("pages/backend/users/UsersPage.vue"),
      },
      {
        path: "/crear-usuario",
        name: "Crear Usuario",
        meta: { roles: ["Administrador"] },
        component: () => import("pages/backend/users/AddUsersPage.vue"),
      },
      {
        path: "/editar-usuario/:id",
        name: "Editar Usuario",
        meta: { roles: ["Administrador"] },
        component: () => import("pages/backend/users/EditUsersPage.vue"),
      },

      //Empresa
      {
        path: "/empresa",
        name: "Empresa",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/empresa/EmpresaPage.vue"),
      },

      // Gestion Faq
      {
        path: "/preguntas-frecuentes",
        name: "Pregunta Frecuentes",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/faq/FaqIndex.vue"),
      },
      {
        path: "/add-pregunta",
        name: "Add Faq",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/faq/AddFAQsPage.vue"),
      },
      {
        path: "/editar-pregunta/:id",
        name: "Editar Faq",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/faq/EditFAQsPage.vue"),
      },

      // Noticas
      {
        path: "/noticias",
        name: "Noticias",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/noticias/NoticiaPage.vue"),
      },
      {
        path: "/crear-noticia",
        name: "Add Noticia",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/noticias/AddNoticiasPage.vue"),
      },
      {
        path: "/editar-noticia/:id",
        name: "Editar Noticia",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/noticias/EditNoticiaPage.vue"),
      },

      // Noticas Categorias
      {
        path: "/noticias-categorias",
        name: "categorias",
        meta: { roles: ["Editor"] },
        component: () =>
          import("pages/backend/noticias/categorias/CategoriasPage.vue"),
      },
      {
        path: "/crear-noticias-categoria",
        name: "add-categoria",
        meta: { roles: ["Editor"] },
        component: () =>
          import("pages/backend/noticias/categorias/AddCategoriasPage.vue"),
      },
      {
        path: "/editar-noticias-categoria/:id",
        name: "edit-categoria",
        meta: { roles: ["Editor"] },
        component: () =>
          import("pages/backend/noticias/categorias/EditCategoriasPage.vue"),
      },

      // Noticas Estado
      {
        path: "/noticias-estados",
        name: "Estados",
        meta: { roles: ["Editor"] },
        component: () =>
          import("pages/backend/noticias/estados/EstadosPage.vue"),
      },
      {
        path: "/crear-noticias-estados",
        name: "add-estados",
        meta: { roles: ["Editor"] },
        component: () =>
          import("pages/backend/noticias/estados/AddEstadosPage.vue"),
      },
      {
        path: "/editar-noticias-estados/:id",
        name: "edit-estados",
        meta: { roles: ["Editor"] },
        component: () =>
          import("pages/backend/noticias/estados/EditEstadosPage.vue"),
      },

      // Gestion Socios
      {
        path: "/socios",
        name: "Socios",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/socios/SociosPage.vue"),
      },
      {
        path: "/crear-socio",
        name: "crear-socio",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/socios/AddSociosPage.vue"),
      },
      {
        path: "/editar-socio/:id",
        name: "editar-socio",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/socios/EditSociosPage.vue"),
      },

      // Gestion Servicios
      {
        path: "/servicios",
        name: "Servicos",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/servicios/ServiciosPage.vue"),
      },
      {
        path: "/crear-servicio",
        name: "crear-servicos",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/servicios/AddServiciosPage.vue"),
      },
      {
        path: "/editar-servicio/:id",
        name: "editar-servicos",
        meta: { roles: ["Editor"] },
        component: () =>
          import("pages/backend/servicios/EditServiciosPage.vue"),
      },

      // Gestion Directivo
      {
        path: "/directivos",
        name: "Directivos",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/team/TeamPage.vue"),
      },
      {
        path: "/crear-directivo",
        name: "Crear Directivo",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/team/AddTeamPage.vue"),
      },
      {
        path: "/editar-directivo/:id",
        name: "Editar Directivo",
        meta: { roles: ["Editor"] },
        component: () => import("pages/backend/team/EditTeamPage.vue"),
      },

      // Gestion Enlaces de Interes
      {
        path: "/enlaces-interes",
        name: "Enlaces",
        meta: { roles: ["Editor"] },
        component: () =>
          import("pages/backend/enlaces-interes/EnlacesInteresPage.vue"),
      },
      {
        path: "/crear-enlaces-interes",
        name: "crear-enlaces-interes",
        meta: { roles: ["Editor"] },
        component: () =>
          import("pages/backend/enlaces-interes/AddEnlacesInteresPage.vue"),
      },
      {
        path: "/editar-enlaces-interes/:id",
        name: "editar-enlaces-interes",
        meta: { roles: ["Editor"] },
        component: () =>
          import("pages/backend/enlaces-interes/EditEnlacesInteresPage.vue"),
      },

      // Enlaces Categorias
      {
        path: "/enlaces-categorias",
        name: "enlaces-categorias",
        meta: { roles: ["Editor"] },
        component: () =>
          import(
            "pages/backend/enlaces-interes/categorias/EnlacesCategoriaPage.vue"
          ),
      },
      {
        path: "/crear-enlaces-categorias",
        name: "craer-enlaces-categorias",
        meta: { roles: ["Editor"] },
        component: () =>
          import(
            "pages/backend/enlaces-interes/categorias/AddEnlacesCategoriaPage.vue"
          ),
      },
      {
        path: "/editar-enlaces-categorias/:id",
        name: "editar-enlaces-categorias",
        meta: { roles: ["Editor"] },
        component: () =>
          import(
            "pages/backend/enlaces-interes/categorias/EditEnlacesCategoriaPage.vue"
          ),
      },

      //  Comentarios Noticias
      {
        path: "/comentarios-noticias",
        name: "comentarios-noticias",
        meta: { roles: ["Editor"] },
        component: () =>
          import(
            "pages/backend/comentarios/noticias/ComentariosNoticiasPage.vue"
          ),
      },
      {
        path: "/crear-comentario-noticia",
        name: "crear-comentarios-noticia",
        meta: { roles: ["Editor"] },
        component: () =>
          import(
            "pages/backend/comentarios/noticias/AddcomentariosNoticiasPage.vue"
          ),
      },
      {
        path: "/editar-comentario-noticia/:id",
        name: "editar-comentarios-noticia",
        meta: { roles: ["Editor"] },
        component: () =>
          import(
            "pages/backend/comentarios/noticias/EditComentariosNoticiaPage.vue"
          ),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/403",
    component: () => import("pages/NoAutorizado.vue"),
  },

  {
    path: "/",
    name: "Login",
    component: () => import("pages/auth/AuthLogin.vue"),
  },
];

export default routes;
