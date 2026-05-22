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
      "Configuración": ["siteConfig"],
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
          defaultValue: "Eleahora: Terapia Transpersonal, Meditación y Mindfulness con Maria Eleonora Corallo. Acompañamiento terapéutico con PNL, conexión espiritual y meditación en Madrid y online.",
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
    // Home Page — Página de Inicio
    // ──────────────────────────────────────────────
    homePage: singleton({
      label: "Página de Inicio",
      path: "src/content/singletons/home",
      schema: {
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

        // Servicios (resumen en home)
        serviciosTitle: fields.text({
          label: "Servicios — Título",
          defaultValue: "Estoy aquí para ti",
        }),

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
      },
    }),

    // ──────────────────────────────────────────────
    // About Page — Sobre Mí
    // ──────────────────────────────────────────────
    aboutPage: singleton({
      label: "Sobre Mí",
      path: "src/content/singletons/about",
      schema: {
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
          defaultValue: "Estoy aquí para tí",
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
        heroLabel: fields.text({
          label: "Hero — Etiqueta",
          defaultValue: "Sesiones",
        }),
        heroTitle: fields.text({
          label: "Hero — Título",
          defaultValue: "¿Con cuál te gustaría empezar?",
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
      },
    }),

    // ──────────────────────────────────────────────
    // Workshop Page — Workshop para Empresas
    // ──────────────────────────────────────────────
    workshopPage: singleton({
      label: "Workshop Empresas",
      path: "src/content/singletons/workshop",
      schema: {
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
          defaultValue: "Transformando el estrés en presencia.",
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

        // Sobre la guía
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

        // Formatos
        formatsTitle: fields.text({
          label: "Formatos — Título",
          defaultValue: "Formatos disponibles",
        }),
        formats: fields.array(
          fields.object({
            name: fields.text({ label: "Nombre" }),
            duration: fields.text({ label: "Duración" }),
            description: fields.text({ label: "Descripción", multiline: true }),
          }),
          {
            label: "Formatos",
            itemLabel: (props) => props.fields.name.value || "Formato",
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
        ctaTitle: fields.text({
          label: "CTA — Título",
          defaultValue: "¿Quieres llevar esta experiencia a tu organización?",
        }),
        ctaButtonText: fields.text({
          label: "CTA — Texto del botón",
          defaultValue: "Solicitar propuesta",
        }),
        ctaButtonLink: fields.text({
          label: "CTA — Enlace del botón",
          defaultValue: "/contacto",
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
        processTitle: fields.text({
          label: "Proceso — Título",
          defaultValue: "Un proceso claro, humano y sin prisa.",
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
          label: "Tagline / Pill",
          defaultValue: "",
        }),
        description: fields.document({
          label: "Descripción",
          formatting: true,
          links: true,
        }),
        duration: fields.text({
          label: "Duración",
          defaultValue: "60 min",
        }),
        sessions: fields.text({
          label: "Número de sesiones",
          defaultValue: "1 sesión",
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
        includesPlan: fields.text({
          label: "Plan de integración (opcional)",
          multiline: true,
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
          defaultValue: "Reservar ahora",
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
