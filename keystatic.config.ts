import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "cloud",
  },
  cloud: {
    project: "eleahora/eleahora",
  },
  ui: {
    brand: {
      name: "Eleahora CMS",
    },
    navigation: {
      "Configuración": ["siteConfig", "globalContent"],
      "Páginas": ["homePage", "aboutPage", "sessionesPage", "workshopPage", "contactoPage"],
      "Contenido": ["sesiones", "testimonios", "legalPages"],
    },
  },
  singletons: {
    // ──────────────────────────────────────────────
    // Site Config — Configuración Global
    // ──────────────────────────────────────────────
    siteConfig: singleton({
      label: "Configuración del Sitio",
      path: "src/content/singletons/site-config",
      schema: {
        siteTitle: fields.text({
          label: "Título del sitio",
          defaultValue: "Eleahora | Terapia Transpersonal y Meditación en Madrid",
        }),
        siteDescription: fields.text({
          label: "Descripción del sitio (meta description)",
          multiline: true,
          defaultValue: "Eleahora: Terapia Transpersonal, Meditación y Mindfulness con Maria Eleonora Corallo. Sesiones individuales, Terapia Angelical, PNL y workshop para empresas. Presencial en Madrid y online.",
        }),
        phoneWhatsapp: fields.text({
          label: "Teléfono WhatsApp",
          defaultValue: "+34605373782",
        }),
        calLink: fields.url({
          label: "Enlace de Calendly/Booking",
          defaultValue: "https://scheduler.zoom.us/maria-eleonora-051exv/sesi-n-eleahora",
        }),
        instagramUrl: fields.url({
          label: "Instagram URL",
          defaultValue: "https://www.instagram.com/eleahora/",
        }),
        facebookUrl: fields.url({
          label: "Facebook URL",
          defaultValue: "https://www.facebook.com/",
        }),
        insightTimerUrl: fields.url({
          label: "Insight Timer URL",
          defaultValue: "https://insighttimer.com/eleahora",
        }),
        linkedinUrl: fields.url({
          label: "LinkedIn URL",
          defaultValue: "https://www.linkedin.com/in/maria-eleonora-corallo-16266165/",
        }),
        colorBackground: fields.text({
          label: "Color de fondo",
          defaultValue: "#fdfbec",
        }),
        colorPrimaryDark: fields.text({
          label: "Color primario oscuro",
          defaultValue: "#3b2639",
        }),
        colorAccentRed: fields.text({
          label: "Color acento rojo",
          defaultValue: "#8c0703",
        }),
        colorAccentPurple: fields.text({
          label: "Color acento púrpura",
          defaultValue: "#6d4492",
        }),
        colorEarth: fields.text({
          label: "Color tierra",
          defaultValue: "#bb896b",
        }),
        colorSage: fields.text({
          label: "Color salvia",
          defaultValue: "#566443",
        }),
        ogImage: fields.image({
          label: "Imagen OG por defecto",
          directory: "public/images",
          publicPath: "/images/",
        }),
      },
    }),

    // ──────────────────────────────────────────────
    // Global Content — Header, Footer y páginas técnicas
    // ──────────────────────────────────────────────
    globalContent: singleton({
      label: "Contenido Global",
      path: "src/content/singletons/global-content",
      schema: {
        headerLogo: fields.image({
          label: "Header — Logo",
          directory: "public/images",
          publicPath: "/images/",
        }),
        headerLogoAlt: fields.text({
          label: "Header — Texto alternativo del logo",
          defaultValue: "Eleahora",
        }),
        navLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Texto" }),
            href: fields.text({ label: "Enlace" }),
            activeKey: fields.text({ label: "Clave activa", defaultValue: "" }),
          }),
          {
            label: "Header — Navegación",
            itemLabel: (props) => props.fields.label.value || "Enlace",
          }
        ),
        headerCtaText: fields.text({
          label: "Header — Texto CTA escritorio",
          defaultValue: "Agendar",
        }),
        headerMobileCtaText: fields.text({
          label: "Header — Texto CTA móvil",
          defaultValue: "Agendar Sesión",
        }),
        mobileMenuAriaLabel: fields.text({
          label: "Header — Etiqueta accesible del menú móvil",
          defaultValue: "Abrir menú",
        }),
        footerLogo: fields.image({
          label: "Footer — Logo",
          directory: "public/images",
          publicPath: "/images/",
        }),
        footerLogoAlt: fields.text({
          label: "Footer — Texto alternativo del logo",
          defaultValue: "Eleahora",
        }),
        footerSlogan: fields.text({
          label: "Footer — Slogan",
          defaultValue: "Soy la voz que te recuerda que estás aquí.",
        }),
        footerMeditationCtaText: fields.text({
          label: "Footer — Texto botón meditación",
          defaultValue: "Escuchar meditación gratuita",
        }),
        footerMeditationCtaAriaLabel: fields.text({
          label: "Footer — Etiqueta accesible botón meditación",
          defaultValue: "Abrir meditación gratuita de Insight Timer en un pop-up",
        }),
        footerExploreTitle: fields.text({ label: "Footer — Título explora", defaultValue: "Explora" }),
        footerExploreLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Texto" }),
            href: fields.text({ label: "Enlace" }),
          }),
          {
            label: "Footer — Enlaces explora",
            itemLabel: (props) => props.fields.label.value || "Enlace",
          }
        ),
        footerContactTitle: fields.text({ label: "Footer — Título conecta", defaultValue: "Conecta" }),
        footerContactLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Texto" }),
            href: fields.text({ label: "Enlace" }),
            external: fields.checkbox({ label: "Abrir en nueva pestaña", defaultValue: false }),
          }),
          {
            label: "Footer — Enlaces conecta",
            itemLabel: (props) => props.fields.label.value || "Enlace",
          }
        ),
        footerLegalTitle: fields.text({ label: "Footer — Título legal", defaultValue: "Legal" }),
        footerLegalLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Texto" }),
            href: fields.text({ label: "Enlace" }),
          }),
          {
            label: "Footer — Enlaces legales",
            itemLabel: (props) => props.fields.label.value || "Enlace",
          }
        ),
        footerCopyright: fields.text({
          label: "Footer — Copyright",
          defaultValue: "Eleahora. Todos los derechos reservados.",
        }),
        footerCreditsPrefix: fields.text({
          label: "Footer — Créditos prefijo",
          defaultValue: "Hecho con amor por",
        }),
        footerCreditsLinks: fields.array(
          fields.object({
            label: fields.text({ label: "Texto" }),
            href: fields.url({ label: "URL" }),
          }),
          {
            label: "Footer — Créditos enlaces",
            itemLabel: (props) => props.fields.label.value || "Crédito",
          }
        ),
        meditationModalTitle: fields.text({
          label: "Modal meditación — Título",
          defaultValue: "Meditación gratuita",
        }),
        meditationModalCloseText: fields.text({
          label: "Modal meditación — Texto cerrar",
          defaultValue: "Cerrar",
        }),
        meditationModalCloseAriaLabel: fields.text({
          label: "Modal meditación — Etiqueta accesible cerrar",
          defaultValue: "Cerrar meditación",
        }),
        meditationModalIframeTitle: fields.text({
          label: "Modal meditación — Título iframe",
          defaultValue: "Insight Timer Embed: Maria Eleonora Corallo",
        }),
        meditationModalEmbedUrl: fields.url({
          label: "Modal meditación — URL embed",
          defaultValue: "https://widgets.insighttimer.com/publisher/Qi5htL7vZhRNNN9BOvdTdSUt6E32?created_at=1776166254",
        }),
        thanksSeoTitle: fields.text({ label: "Gracias — SEO título", defaultValue: "Gracias | Eleahora" }),
        thanksSeoDescription: fields.text({
          label: "Gracias — SEO descripción",
          multiline: true,
          defaultValue: "Gracias por contactar con Eleahora. Hemos recibido tu mensaje y en breve recibirás una respuesta para comenzar tu proceso.",
        }),
        thanksOgTitle: fields.text({ label: "Gracias — OG título", defaultValue: "Gracias por tu mensaje | Eleahora" }),
        thanksKicker: fields.text({ label: "Gracias — Etiqueta", defaultValue: "Mensaje recibido" }),
        thanksTitle: fields.text({ label: "Gracias — Título sin nombre", defaultValue: "Gracias por escribir a Eleahora." }),
        thanksPersonalizedTitle: fields.text({
          label: "Gracias — Título con nombre",
          defaultValue: "{name}, gracias por escribir a Eleahora.",
        }),
        thanksLead: fields.text({
          label: "Gracias — Texto",
          multiline: true,
          defaultValue: "Tu solicitud ya entró en la bandeja prioritaria. Te responderé en máximo 24 horas laborables para coordinar el siguiente paso.",
        }),
        thanksPrimaryCtaText: fields.text({ label: "Gracias — CTA principal texto", defaultValue: "Reservar ahora" }),
        thanksPrimaryCtaLink: fields.url({ label: "Gracias — CTA principal enlace", defaultValue: "https://scheduler.zoom.us/maria-eleonora-051exv/sesi-n-eleahora" }),
        thanksSecondaryCtaText: fields.text({ label: "Gracias — CTA secundario texto", defaultValue: "Escribir por WhatsApp" }),
        notFoundSeoTitle: fields.text({ label: "404 — SEO título", defaultValue: "Página no encontrada | Eleahora" }),
        notFoundSeoDescription: fields.text({
          label: "404 — SEO descripción",
          multiline: true,
          defaultValue: "La página que buscas no existe o ha sido movida. Vuelve al inicio de Eleahora y continúa tu camino.",
        }),
        notFoundOgTitle: fields.text({ label: "404 — OG título", defaultValue: "404 — Página no encontrada | Eleahora" }),
        notFoundNumber: fields.text({ label: "404 — Número visible", defaultValue: "404" }),
        notFoundKicker: fields.text({ label: "404 — Etiqueta", defaultValue: "Página no encontrada" }),
        notFoundTitle: fields.text({ label: "404 — Título", defaultValue: "Este camino no lleva a ningún lado." }),
        notFoundLead: fields.text({
          label: "404 — Texto",
          multiline: true,
          defaultValue: "La página que buscas no existe o ha sido movida. Respira, no pasa nada — vuelve al inicio y retoma tu camino.",
        }),
        notFoundPrimaryCtaText: fields.text({ label: "404 — CTA principal texto", defaultValue: "Volver al inicio" }),
        notFoundPrimaryCtaLink: fields.text({ label: "404 — CTA principal enlace", defaultValue: "/" }),
        notFoundSecondaryCtaText: fields.text({ label: "404 — CTA secundario texto", defaultValue: "Ver sesiones" }),
        notFoundSecondaryCtaLink: fields.text({ label: "404 — CTA secundario enlace", defaultValue: "/sesiones" }),
        legalLastUpdatedPrefix: fields.text({
          label: "Legal — Prefijo última actualización",
          defaultValue: "Última actualización:",
        }),
        legalContentUnavailableText: fields.text({
          label: "Legal — Texto contenido no disponible",
          defaultValue: "Contenido no disponible.",
        }),
      },
    }),

    // ──────────────────────────────────────────────
    // Home Page — Página de Inicio
    // ──────────────────────────────────────────────
    homePage: singleton({
      label: "Página de Inicio",
      path: "src/content/singletons/home",
      schema: {
        seoTitle: fields.text({
          label: "SEO — Título",
          defaultValue: "Eleahora | Terapia Transpersonal y Meditación en Madrid",
        }),
        seoDescription: fields.text({
          label: "SEO — Descripción",
          multiline: true,
          defaultValue: "Eleahora: Terapia Transpersonal, Meditación y Mindfulness con Maria Eleonora Corallo. Sesiones individuales, Terapia Angelical, PNL y workshop para empresas. Presencial en Madrid y online.",
        }),
        ogTitle: fields.text({
          label: "SEO — Título Open Graph",
          defaultValue: "Eleahora — Terapia Transpersonal y Meditación",
        }),
        ogImage: fields.image({
          label: "SEO — Imagen Open Graph",
          directory: "public/images",
          publicPath: "/images/",
        }),
        // Hero
        heroTitle: fields.text({
          label: "Hero — Título",
          defaultValue: "Bienvenido",
        }),
        heroSubtitle: fields.text({
          label: "Hero — Subtítulo",
          multiline: true,
          defaultValue: "Soy la voz que te recuerda que estás aquí.\nEn el presente. Meditación y Terapia Transpersonal. Mindfulness. Espiritualidad aterrizada.",
        }),
        heroCtaText: fields.text({
          label: "Hero — Texto del botón CTA",
          defaultValue: "Estoy aquí para ti",
        }),
        heroCtaLink: fields.text({
          label: "Hero — Enlace del CTA",
          defaultValue: "/sesiones",
        }),
        heroImage: fields.image({
          label: "Hero — Imagen de fondo",
          directory: "public/images",
          publicPath: "/images/",
        }),
        heroImageAlt: fields.text({
          label: "Hero — Texto alternativo",
          defaultValue: "Maria Eleonora Corallo, terapeuta transpersonal y guía de meditación de Eleahora",
        }),

        // Manifiesto
        manifestoLabel: fields.text({
          label: "Manifiesto — Etiqueta",
          defaultValue: "Manifiesto",
        }),
        manifestoTitle: fields.text({
          label: "Manifiesto — Título",
          defaultValue: "Deja que el amor te regule.",
        }),
        manifestoBody: fields.document({
          label: "Manifiesto — Cuerpo",
          formatting: true,
          links: true,
        }),
        manifestoQuote: fields.text({
          label: "Manifiesto — Cita destacada",
          multiline: true,
          defaultValue: "Soy estructura y soy caos. Soy servicio y soy soberanía. Deja que el amor te regule. Confía en el proceso.",
        }),
        manifestoImage: fields.image({
          label: "Manifiesto — Imagen",
          directory: "public/images",
          publicPath: "/images/",
        }),
        manifestoImageAlt: fields.text({
          label: "Manifiesto — Texto alternativo imagen",
          defaultValue: "Sesión de meditación y terapia transpersonal de Eleahora — Manifiesto",
        }),

        // Servicios (resumen en home)
        serviciosTitle: fields.text({
          label: "Servicios — Título",
          defaultValue: "Estoy aquí para ti",
        }),
        serviceCards: fields.array(
          fields.object({
            title: fields.text({ label: "Título" }),
            description: fields.text({ label: "Descripción", multiline: true }),
            href: fields.text({ label: "Enlace" }),
            arrow: fields.text({ label: "Símbolo", defaultValue: "→" }),
            external: fields.checkbox({ label: "Abrir en nueva pestaña", defaultValue: false }),
          }),
          {
            label: "Servicios — Tarjetas",
            itemLabel: (props) => props.fields.title.value || "Tarjeta",
          }
        ),

        // Mindfulness
        mindfulnessLabel: fields.text({
          label: "Mindfulness — Etiqueta",
          defaultValue: "Ciencia & Espíritu",
        }),
        mindfulnessTitle: fields.text({
          label: "Mindfulness — Título",
          defaultValue: "Mindfulness como camino.",
        }),
        mindfulnessLead: fields.text({
          label: "Mindfulness — Introducción",
          multiline: true,
          defaultValue: "La meditación no es escapar. Es llegar. Llegar a ti, a tu respiración, a tu cuerpo, a este momento exacto. Mindfulness es la práctica de estar presente — sin juicio, sin prisa, sin filtros.",
        }),
        mindfulnessBody: fields.text({
          label: "Mindfulness — Descriptivo",
          multiline: true,
          defaultValue: "A través de la respiración consciente, la atención plena y la regulación del sistema nervioso, el Mindfulness nos permite responder en lugar de reaccionar. Es una herramienta científica y espiritual para vivir con más claridad, calma y compasión.",
        }),
        mindfulnessBody2: fields.text({
          label: "Mindfulness — Segundo descriptivo",
          multiline: true,
          defaultValue: "Hoy sabemos que la meditación no solo transforma nuestra experiencia interna: también produce cambios medibles en el cerebro y en el sistema nervioso.",
        }),
        mindfulnessBenefitsTitle: fields.text({
          label: "Mindfulness — Título beneficios",
          defaultValue: "Beneficios del Mindfulness",
        }),
        mindfulnessBenefits: fields.array(
          fields.text({
            label: "Beneficio",
          }),
          {
            label: "Mindfulness — Lista de beneficios",
            itemLabel: (props) => props.value || "Beneficio",
          }
        ),
        mindfulnessConclusion: fields.text({
          label: "Mindfulness — Conclusión",
          multiline: true,
          defaultValue: "En un mundo que nos empuja constantemente hacia el ruido y la velocidad, la meditación se convierte en una forma de volver a uno mismo.",
        }),
        mindfulnessImage: fields.image({
          label: "Mindfulness — Imagen",
          directory: "public/images",
          publicPath: "/images/",
        }),
        mindfulnessImageAlt: fields.text({
          label: "Mindfulness — Texto alternativo imagen",
          defaultValue: "Práctica de mindfulness y meditación consciente con Eleahora",
        }),
        testimonialsTitle: fields.text({
          label: "Testimonios — Título",
          defaultValue: "Testimonios",
        }),
      },
    }),

    // ──────────────────────────────────────────────
    // About Page — Sobre Mí
    // ──────────────────────────────────────────────
    aboutPage: singleton({
      label: "Sobre Mí",
      path: "src/content/singletons/about",
      schema: {
        seoTitle: fields.text({
          label: "SEO — Título",
          defaultValue: "Sobre Mí — Maria Eleonora Corallo | Eleahora",
        }),
        seoDescription: fields.text({
          label: "SEO — Descripción",
          multiline: true,
          defaultValue: "Conoce la historia de Maria Eleonora Corallo, fundadora de Eleahora: de lo corporativo en París al acompañamiento terapéutico con Meditación, PNL Transpersonal y conexión espiritual en Madrid.",
        }),
        ogTitle: fields.text({
          label: "SEO — Título Open Graph",
          defaultValue: "Sobre Mí — Maria Eleonora Corallo | Eleahora",
        }),
        ogImage: fields.image({
          label: "SEO — Imagen Open Graph",
          directory: "public/images",
          publicPath: "/images/",
        }),
        heroLabel: fields.text({
          label: "Hero — Etiqueta",
          defaultValue: "Sobre Mi",
        }),
        heroTitle: fields.text({
          label: "Hero — Título",
          defaultValue: "Soy quien soy y eso es suficiente.",
        }),
        heroSubtitle: fields.text({
          label: "Hero — Subtítulo",
          multiline: true,
          defaultValue: "Un espacio de espiritualidad aterrizada para vivir con más presencia.",
        }),
        profileImage: fields.image({
          label: "Foto de perfil (móvil)",
          directory: "public/images",
          publicPath: "/images/",
        }),
        profileImageDesktop: fields.image({
          label: "Foto de perfil (escritorio)",
          directory: "public/images",
          publicPath: "/images/",
        }),
        profileImageAlt: fields.text({
          label: "Hero — Texto alternativo imagen",
          defaultValue: "Fondo de la sección Sobre Mí de Eleahora — presencia y conexión interior",
        }),

        // Mi recorrido
        recorridoLabel: fields.text({
          label: "Recorrido — Etiqueta",
          defaultValue: "Mi recorrido",
        }),
        recorridoTitle: fields.text({
          label: "Recorrido — Título",
          defaultValue: "Tengo un sueño: llevar la meditación a personas que aún no saben que la necesitan.",
        }),
        recorridoImage: fields.image({
          label: "Recorrido — Imagen",
          directory: "public/images",
          publicPath: "/images/",
        }),
        recorridoImageAlt: fields.text({
          label: "Recorrido — Texto alternativo imagen",
          defaultValue: "Maria Eleonora Corallo, terapeuta transpersonal y fundadora de Eleahora",
        }),
        bioIntro: fields.text({
          label: "Bio — Introducción",
          multiline: true,
          defaultValue: "Nací en Venezuela, en una familia de raíces italianas donde el amor, la expresión y la fuerza emocional eran el lenguaje cotidiano. Crecí entre culturas, entre mundos, aprendiendo desde pequeña que la identidad no es un lugar fijo — es un viaje.",
        }),
        bioBody: fields.document({
          label: "Bio — Cuerpo (rich text)",
          formatting: true,
          links: true,
        }),

        // Así nació Eleahora
        eleahoraLabel: fields.text({
          label: "Eleahora — Etiqueta",
          defaultValue: "Así nació Eleahora",
        }),
        eleahoraTitle: fields.text({
          label: "Eleahora — Título",
          defaultValue: "Un espacio de espiritualidad aterrizada para vivir con más presencia.",
        }),
        eleahoraImage: fields.image({
          label: "Eleahora — Imagen",
          directory: "public/images",
          publicPath: "/images/",
        }),
        eleahoraImageAlt: fields.text({
          label: "Eleahora — Texto alternativo imagen",
          defaultValue: "Proceso de presencia y espiritualidad aterrizada — así nace Eleahora",
        }),

        // Manifiesto personal
        manifestoTitle: fields.text({
          label: "Manifiesto — Título",
          defaultValue: "Mi manifiesto",
        }),
        manifestoText: fields.text({
          label: "Manifiesto — Texto",
          multiline: true,
          defaultValue: "Creo en la meditación como acto de amor propio. Creo en la vulnerabilidad como fortaleza. Creo que sanar no es llegar a un destino — es aprender a caminar con presencia.",
        }),
        serviceList: fields.array(fields.text({ label: "Servicio" }), {
          label: "Eleahora — Lista de formatos",
          itemLabel: (props) => props.value || "Servicio",
        }),
        eleahoraClosingText: fields.text({
          label: "Eleahora — Texto de cierre",
          multiline: true,
          defaultValue: "Porque creo profundamente que estamos viviendo un momento de cambio colectivo donde la consciencia, la presencia y la conexión interior ya no son un lujo, sino una necesidad.",
        }),

        // Galería
        galleryImage1: fields.image({
          label: "Galería — Imagen 1",
          directory: "public/images",
          publicPath: "/images/",
        }),
        galleryImage2: fields.image({
          label: "Galería — Imagen 2",
          directory: "public/images",
          publicPath: "/images/",
        }),

        // CTA
        ctaTitle: fields.text({
          label: "CTA — Título",
          defaultValue: "Te acompaño a volver a conectar con el presente. Bienvenidos",
        }),
        ctaBody: fields.text({
          label: "CTA — Texto",
          multiline: true,
          defaultValue: "Da el primer paso. Estoy aquí para acompañarte en tu proceso de sanación y crecimiento personal.",
        }),
        ctaButtonText: fields.text({
          label: "CTA — Texto del botón",
          defaultValue: "Estoy aquí para ti",
        }),
        ctaButtonLink: fields.text({
          label: "CTA — Enlace del botón",
          defaultValue: "/sesiones",
        }),
      },
    }),

    // ──────────────────────────────────────────────
    // Sesiones Page — Cabecera de Sesiones
    // ──────────────────────────────────────────────
    sessionesPage: singleton({
      label: "Página de Sesiones",
      path: "src/content/singletons/sesiones-page",
      schema: {
        seoTitle: fields.text({
          label: "SEO — Título",
          defaultValue: "Sesiones | Terapia Transpersonal y Meditación | Eleahora",
        }),
        seoDescription: fields.text({
          label: "SEO — Descripción",
          multiline: true,
          defaultValue: "Descubre las sesiones de Eleahora: Acompañamiento Terapéutico con PNL, Terapia Angelical, Perlas de Eleahora, Clase de Meditación y Sesión Energética. Presencial en Madrid y online.",
        }),
        ogTitle: fields.text({
          label: "SEO — Título Open Graph",
          defaultValue: "Sesiones — Eleahora",
        }),
        ogImage: fields.image({
          label: "SEO — Imagen Open Graph",
          directory: "public/images",
          publicPath: "/images/",
        }),
        heroLabel: fields.text({
          label: "Hero — Etiqueta",
          defaultValue: "Sesiones",
        }),
        heroTitle: fields.text({
          label: "Hero — Título",
          defaultValue: "Estoy aquí para ti.",
        }),
        heroSubtitle: fields.text({
          label: "Hero — Subtítulo",
          multiline: true,
          defaultValue: "Permítete leer cada una con calma y déjate sentir.",
        }),
        heroImage: fields.image({
          label: "Hero — Imagen de fondo",
          directory: "public/images",
          publicPath: "/images/",
        }),
        heroImageAlt: fields.text({
          label: "Hero — Texto alternativo imagen",
          defaultValue: "Sesiones Eleahora",
        }),
        ctaTitle: fields.text({
          label: "CTA — Título",
          defaultValue: "Si aún no lo tienes claro, escríbeme aquí",
        }),
        ctaBody: fields.text({
          label: "CTA — Texto",
          multiline: true,
          defaultValue: "Cuéntame qué necesitas y te ayudo a encontrar la sesión ideal para ti.",
        }),
        ctaLink: fields.text({
          label: "CTA — Enlace",
          defaultValue: "/contacto",
        }),
        ctaButtonText: fields.text({
          label: "CTA — Texto del botón",
          defaultValue: "Contactar para más información",
        }),
      },
    }),

    // ──────────────────────────────────────────────
    // Workshop Page — Workshop para Empresas
    // ──────────────────────────────────────────────
    workshopPage: singleton({
      label: "Workshop Empresas",
      path: "src/content/singletons/workshop",
      schema: {
        seoTitle: fields.text({
          label: "SEO — Título",
          defaultValue: "Workshop 'Pienso, luego medito' | Mindfulness para Empresas | Eleahora",
        }),
        seoDescription: fields.text({
          label: "SEO — Descripción",
          multiline: true,
          defaultValue: "Workshop de mindfulness y meditación para empresas y equipos. Programa 'Pienso, luego medito' de Eleahora: reduce el estrés, mejora el foco y fortalece la cohesión del equipo.",
        }),
        ogTitle: fields.text({
          label: "SEO — Título Open Graph",
          defaultValue: "Workshop para Empresas — Eleahora",
        }),
        ogImage: fields.image({
          label: "SEO — Imagen Open Graph",
          directory: "public/images",
          publicPath: "/images/",
        }),
        // Hero
        heroLabel: fields.text({
          label: "Hero — Etiqueta",
          defaultValue: "Experiencia para Empresas",
        }),
        heroTitle: fields.text({
          label: "Hero — Título",
          defaultValue: "Pienso, luego medito",
        }),
        heroSubtitle: fields.text({
          label: "Hero — Subtítulo",
          multiline: true,
          defaultValue: "Una experiencia de mindfulness y meditación diseñada para equipos y organizaciones que quieren reducir el estrés y potenciar el rendimiento.",
        }),
        heroImage: fields.image({
          label: "Hero — Imagen 1",
          directory: "public/images",
          publicPath: "/images/",
        }),
        heroImage2: fields.image({
          label: "Hero — Imagen 2",
          directory: "public/images",
          publicPath: "/images/",
        }),
        heroSecondaryCtaText: fields.text({
          label: "Hero — CTA secundario texto",
          defaultValue: "Ver formatos",
        }),
        heroSecondaryCtaLink: fields.text({
          label: "Hero — CTA secundario enlace",
          defaultValue: "#formatos",
        }),
        facts: fields.array(
          fields.object({
            label: fields.text({ label: "Etiqueta" }),
            value: fields.text({ label: "Valor" }),
            detail: fields.text({ label: "Detalle" }),
          }),
          {
            label: "Datos destacados",
            itemLabel: (props) => props.fields.label.value || "Dato",
          }
        ),

        // Sobre la guía
        guideEyebrow: fields.text({
          label: "Guía — Etiqueta",
          defaultValue: "Sobre la guía",
        }),
        guideName: fields.text({
          label: "Guía — Nombre",
          defaultValue: "Maria Eleonora Corallo",
        }),
        guideBio: fields.text({
          label: "Guía — Biografía",
          multiline: true,
          defaultValue: "Formada en La Sorbonne (París), PNL transpersonal, Meditación y Mindfulness. Facilitadora de espacios de consciencia corporativa. Con más de 10 años de experiencia acompañando a personas y equipos a reconectar con el presente.",
        }),
        guideSlogan: fields.text({
          label: "Guía — Slogan",
          defaultValue: "Soy La Voz QUE TE RECUERDA QUE ESTÁS AQUÍ.",
        }),

        // Workshop
        workshopEyebrow: fields.text({
          label: "Workshop — Etiqueta",
          defaultValue: "El workshop",
        }),
        workshopTitle: fields.text({
          label: "Workshop — Título",
          defaultValue: "Creado para transformar cómo los equipos perciben y manejan el estrés.",
        }),
        workshopDescription: fields.text({
          label: "Workshop — Descripción",
          multiline: true,
          defaultValue: "Una experiencia inmersiva de 3 horas diseñada para equipos que quieren herramientas reales de gestión emocional, neuroregulación y presencia. A través de la meditación, la respiración y dinámicas vivenciales, los participantes descubren cómo volver al presente — en el trabajo y en la vida.",
        }),

        // Experiencia
        experienceEyebrow: fields.text({
          label: "Experiencia — Etiqueta",
          defaultValue: "¿Qué incluye la experiencia?",
        }),
        experienceTitle: fields.text({
          label: "Experiencia — Título",
          defaultValue: "Un recorrido práctico, consciente y aplicable.",
        }),
        experienceItems: fields.array(
          fields.object({
            title: fields.text({ label: "Título" }),
            description: fields.text({ label: "Descripción", multiline: true }),
          }),
          {
            label: "Experiencia — Items",
            itemLabel: (props) => props.fields.title.value || "Item",
          }
        ),

        // Beneficios
        benefitsEyebrow: fields.text({
          label: "Beneficios — Etiqueta",
          defaultValue: "¿Qué te llevas como empresa?",
        }),
        benefitsTitle: fields.text({
          label: "Beneficios — Título",
          defaultValue: "Lo que cambia después de la experiencia.",
        }),
        benefits: fields.array(
          fields.object({
            title: fields.text({ label: "Título" }),
            description: fields.text({ label: "Descripción", multiline: true }),
          }),
          {
            label: "Beneficios",
            itemLabel: (props) => props.fields.title.value || "Beneficio",
          }
        ),

        // Testimonios de empresa
        testimonialsTitle: fields.text({
          label: "Testimonios — Título",
          defaultValue: "Lo que ocurre cuando la pausa también es parte del proceso.",
        }),
        testimonials: fields.array(
          fields.object({
            name: fields.text({ label: "Nombre" }),
            role: fields.text({ label: "Cargo / Empresa" }),
            quote: fields.text({ label: "Testimonio", multiline: true }),
          }),
          {
            label: "Testimonios de empresa",
            itemLabel: (props) => props.fields.name.value || "Testimonio",
          }
        ),

        // Cierre
        closingQuote: fields.text({
          label: "Cita de cierre",
          multiline: true,
          defaultValue: "El verdadero reto de la condición humana no es estar presente, sino darnos cuenta de que no estamos presentes.",
        }),
        closingQuoteAuthor: fields.text({
          label: "Autor de la cita",
          defaultValue: "Meggan Watterson",
        }),

        // CTA
        ctaEyebrow: fields.text({
          label: "CTA — Etiqueta",
          defaultValue: "Siguiente paso",
        }),
        ctaTitle: fields.text({
          label: "CTA — Título",
          defaultValue: "¿Quieres llevar esta experiencia a tu organización?",
        }),
        ctaBody: fields.text({
          label: "CTA — Texto",
          multiline: true,
          defaultValue: "Hablemos para llevar esta experiencia a tu organización.",
        }),
        ctaButtonText: fields.text({
          label: "CTA — Texto del botón",
          defaultValue: "Agendar llamada de descubrimiento",
        }),
        ctaButtonLink: fields.text({
          label: "CTA — Enlace del botón",
          defaultValue: "/contacto",
        }),
        ctaEmailLabel: fields.text({
          label: "CTA — Texto del email",
          defaultValue: "Escríbeme un correo",
        }),
        ctaEmailAddress: fields.text({
          label: "CTA — Dirección de email",
          defaultValue: "info@eleahora.com",
        }),
        whatsappCtaText: fields.text({
          label: "CTA — Texto WhatsApp",
          defaultValue: "WhatsApp",
        }),
      },
    }),

    // ──────────────────────────────────────────────
    // Contacto Page — Contacto
    // ──────────────────────────────────────────────
    contactoPage: singleton({
      label: "Página de Contacto",
      path: "src/content/singletons/contacto",
      schema: {
        seoTitle: fields.text({
          label: "SEO — Título",
          defaultValue: "Contacto | Inicia tu proceso con Eleahora",
        }),
        seoDescription: fields.text({
          label: "SEO — Descripción",
          multiline: true,
          defaultValue: "Escribe a Eleahora para iniciar tu proceso de Terapia Transpersonal, Meditación o Mindfulness. Respuesta en 24h. También puedes agendar directamente o escribir por WhatsApp.",
        }),
        ogTitle: fields.text({
          label: "SEO — Título Open Graph",
          defaultValue: "Contacto — Inicia tu proceso con Eleahora",
        }),
        ogImage: fields.image({
          label: "SEO — Imagen Open Graph",
          directory: "public/images",
          publicPath: "/images/",
        }),
        heroKicker: fields.text({
          label: "Hero — Etiqueta",
          defaultValue: "Contacto Eleahora",
        }),
        heroTitle: fields.text({
          label: "Hero — Título",
          defaultValue: "Este puede ser el primer paso para volver a ti.",
        }),
        heroSubtitle: fields.text({
          label: "Hero — Subtítulo",
          multiline: true,
          defaultValue: "Escribe a Eleahora para iniciar tu proceso. Te responderé en menos de 24 horas.",
        }),
        heroImage: fields.image({
          label: "Hero — Imagen de fondo",
          directory: "public/images",
          publicPath: "/images/",
        }),
        heroCtaText: fields.text({
          label: "Hero — CTA texto",
          defaultValue: "Escribir ahora",
        }),
        heroCtaLink: fields.text({
          label: "Hero — CTA enlace",
          defaultValue: "#formulario-contacto",
        }),
        contactChannelsAriaLabel: fields.text({
          label: "Contacto — Etiqueta accesible canales",
          defaultValue: "Canales de contacto",
        }),
        processPanelAriaLabel: fields.text({
          label: "Proceso — Etiqueta accesible panel",
          defaultValue: "Proceso de contacto",
        }),
        processEyebrow: fields.text({
          label: "Proceso — Etiqueta",
          defaultValue: "",
        }),
        processTitle: fields.text({
          label: "Proceso — Título",
          defaultValue: "¿Cómo funciona?",
        }),
        processSteps: fields.array(
          fields.object({
            step: fields.text({ label: "Paso" }),
            title: fields.text({ label: "Título" }),
            description: fields.text({ label: "Descripción", multiline: true }),
          }),
          {
            label: "Pasos del proceso",
            itemLabel: () => "Paso",
          }
        ),
        whatsappLinkText: fields.text({
          label: "Links rápidos — WhatsApp texto",
          defaultValue: "Escríbeme, estoy aquí para ti.",
        }),
        emailAddress: fields.text({
          label: "Links rápidos — Email",
          defaultValue: "info@eleahora.com",
        }),
        formTitle: fields.text({
          label: "Formulario — Título",
          defaultValue: "Formulario de contacto",
        }),
        formAriaLabel: fields.text({
          label: "Formulario — Etiqueta accesible",
          defaultValue: "Formulario de contacto Eleahora",
        }),
        nameLabel: fields.text({ label: "Formulario — Nombre label", defaultValue: "Nombre y apellido" }),
        namePlaceholder: fields.text({ label: "Formulario — Nombre placeholder", defaultValue: "Tu nombre" }),
        emailLabel: fields.text({ label: "Formulario — Email label", defaultValue: "Email" }),
        emailPlaceholder: fields.text({ label: "Formulario — Email placeholder", defaultValue: "info@eleahora.com" }),
        phoneLabel: fields.text({ label: "Formulario — Teléfono label", defaultValue: "WhatsApp (opcional)" }),
        phonePlaceholder: fields.text({ label: "Formulario — Teléfono placeholder", defaultValue: "+34 ..." }),
        serviceLabel: fields.text({ label: "Formulario — Servicio label", defaultValue: "¿Qué te trajo hasta aquí?" }),
        servicePlaceholder: fields.text({ label: "Formulario — Servicio placeholder", defaultValue: "Selecciona una opción" }),
        workshopServiceOptionLabel: fields.text({ label: "Formulario — Opción workshop", defaultValue: "Workshop para empresas" }),
        otherServiceOptionLabel: fields.text({ label: "Formulario — Opción otro", defaultValue: "Otro / Aún no lo tengo claro" }),
        messageLabel: fields.text({ label: "Formulario — Mensaje label", defaultValue: "Cuéntame brevemente qué necesitas" }),
        messagePlaceholder: fields.text({ label: "Formulario — Mensaje placeholder", defaultValue: "Estoy atravesando..." }),
        consentText: fields.text({
          label: "Formulario — Consentimiento",
          defaultValue: "Acepto que Eleahora me contacte para responder esta solicitud.",
        }),
        submitButtonText: fields.text({ label: "Formulario — Botón enviar", defaultValue: "Enviar mensaje" }),
      },
    }),
  },

  collections: {
    // ──────────────────────────────────────────────
    // Sesiones — Colección de sesiones/servicios
    // ──────────────────────────────────────────────
    sesiones: collection({
      label: "Sesiones",
      path: "src/content/sesiones/*",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: { label: "Nombre de la sesión" },
        }),
        order: fields.integer({
          label: "Orden",
          defaultValue: 1,
        }),
        featured: fields.checkbox({
          label: "Destacada",
          defaultValue: false,
        }),
        tagline: fields.text({
          label: "Número visible",
          defaultValue: "01",
        }),
        pill: fields.text({
          label: "Pill",
          defaultValue: "",
        }),
        description: fields.document({
          label: "Descripción",
          formatting: true,
          links: true,
        }),
        descriptionText: fields.text({
          label: "Descripción visible",
          multiline: true,
          defaultValue: "",
        }),
        details: fields.array(fields.text({ label: "Detalle", multiline: true }), {
          label: "Detalles",
          itemLabel: (props) => props.value || "Detalle",
        }),
        meta: fields.array(fields.text({ label: "Meta" }), {
          label: "Chips meta",
          itemLabel: (props) => props.value || "Meta",
        }),
        duration: fields.text({
          label: "Duración",
          defaultValue: "60 min",
        }),
        modality: fields.select({
          label: "Modalidad",
          options: [
            { label: "Online", value: "online" },
            { label: "Presencial", value: "presencial" },
            { label: "Ambas", value: "ambas" },
          ],
          defaultValue: "online",
        }),
        price: fields.text({
          label: "Precio",
          defaultValue: "",
        }),
        image: fields.image({
          label: "Imagen",
          directory: "public/images/sesiones",
          publicPath: "/images/sesiones/",
        }),
        bookingUrl: fields.url({
          label: "URL de reserva",
          defaultValue: "",
        }),
        ctaText: fields.text({
          label: "Texto del botón CTA",
          defaultValue: "Agendar sesión",
        }),
        seoTitle: fields.text({
          label: "SEO — Título",
          defaultValue: "",
        }),
        seoDescription: fields.text({
          label: "SEO — Descripción",
          multiline: true,
          defaultValue: "",
        }),
      },
    }),

    // ──────────────────────────────────────────────
    // Testimonios — Colección de testimonios
    // ──────────────────────────────────────────────
    testimonios: collection({
      label: "Testimonios",
      path: "src/content/testimonios/*",
      slugField: "name",
      schema: {
        name: fields.slug({
          name: { label: "Nombre" },
        }),
        quote: fields.text({
          label: "Testimonio",
          multiline: true,
        }),
        service: fields.text({
          label: "Servicio / Contexto",
          defaultValue: "",
        }),
        accentColor: fields.select({
          label: "Color de acento",
          options: [
            { label: "Salvia", value: "sage" },
            { label: "Rojo", value: "red" },
            { label: "Púrpura", value: "purple" },
          ],
          defaultValue: "sage",
        }),
        photo: fields.image({
          label: "Foto",
          directory: "public/images/testimonios",
          publicPath: "/images/testimonios/",
        }),
        featured: fields.checkbox({
          label: "Destacado",
          defaultValue: true,
        }),
        order: fields.integer({
          label: "Orden",
          defaultValue: 1,
        }),
      },
    }),

    // ──────────────────────────────────────────────
    // Legal Pages — Páginas legales
    // ──────────────────────────────────────────────
    legalPages: collection({
      label: "Páginas Legales",
      path: "src/content/legal/*",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: { label: "Título" },
        }),
        metaDescription: fields.text({
          label: "Meta descripción",
          multiline: true,
        }),
        lastUpdated: fields.date({
          label: "Última actualización",
          defaultValue: { kind: "today" },
        }),
        content: fields.document({
          label: "Contenido",
          formatting: true,
          links: true,
        }),
      },
    }),
  },
});
