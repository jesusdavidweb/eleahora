import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "jesusdavidweb/eleahora",
  },

  ui: {
    brand: {
      name: "Eleahora CMS",
    },
  },

  // ============================================================
  // SINGLETONS — Datos únicos de página o configuración global
  // ============================================================
  singletons: {
    siteConfig: singleton({
      label: "⚙️ Configuración Global",
      path: "src/content/singletons/site-config",
      schema: {
        siteTitle: fields.text({
          label: "Título del Sitio (SEO)",
          defaultValue:
            "Eleahora | Terapia Transpersonal y Meditación en Madrid",
        }),
        siteDescription: fields.text({
          label: "Meta Description Global",
          multiline: true,
          defaultValue:
            "Eleahora: Terapia Transpersonal, Meditación y Mindfulness con Maria Eleonora Corallo.",
        }),
        phoneWhatsapp: fields.text({
          label: "Teléfono WhatsApp (con prefijo)",
          defaultValue: "+34605373782",
        }),
        calLink: fields.url({
          label: "Enlace de Reserva (cal.eu)",
          defaultValue: "https://cal.eu/eleahora/sesiones",
        }),
        instagramUrl: fields.url({
          label: "URL Instagram",
          defaultValue: "https://www.instagram.com/eleahora/",
        }),
        facebookUrl: fields.url({
          label: "URL Facebook",
          defaultValue:
            "https://www.facebook.com/profile.php?id=100063992806553",
        }),
        insightTimerUrl: fields.url({
          label: "URL Insight Timer",
          defaultValue: "https://insighttimer.com/eleahora",
        }),
        colorBackground: fields.text({
          label: "🎨 Color Fondo Principal",
          description: "HEX: Beige crema. Ej: #fdfbec",
          defaultValue: "#fdfbec",
        }),
        colorPrimaryDark: fields.text({
          label: "🎨 Color Primario Oscuro",
          description: "HEX: Morado berenjena. Ej: #3b2639",
          defaultValue: "#3b2639",
        }),
        colorAccentRed: fields.text({
          label: "🎨 Color Acento Rojo",
          description: "HEX: Rojo arcilla. Ej: #8c0703",
          defaultValue: "#8c0703",
        }),
        colorAccentPurple: fields.text({
          label: "🎨 Color Acento Púrpura",
          description: "HEX: Púrpura místico. Ej: #6d4492",
          defaultValue: "#6d4492",
        }),
        colorEarth: fields.text({
          label: "🎨 Color Tierra/Cobre",
          description: "HEX: Tierra cálida. Ej: #bb896b",
          defaultValue: "#bb896b",
        }),
        colorSage: fields.text({
          label: "🎨 Color Verde Salvia",
          description: "HEX: Verde oliva. Ej: #566443",
          defaultValue: "#566443",
        }),
        ogImage: fields.image({
          label: "Imagen OG por defecto (redes sociales)",
          directory: "public/images",
          publicPath: "/images/",
        }),
      },
    }),

    homePage: singleton({
      label: "🏠 Página de Inicio",
      path: "src/content/singletons/home",
      schema: {
        heroTitle: fields.text({
          label: "Hero — Título Principal (H1)",
          defaultValue: "Soy la voz que te recuerda que estás aquí.",
        }),
        heroSubtitle: fields.text({
          label: "Hero — Subtítulo",
          multiline: true,
          defaultValue:
            "En el presente.\nMeditación y Terapia Transpersonal.\nMindfulness. Espiritualidad aterrizada.",
        }),
        heroCtaText: fields.text({
          label: "Hero — Texto del Botón CTA",
          defaultValue: "Estoy aquí para ti",
        }),
        heroImage: fields.image({
          label: "Hero — Imagen de Fondo",
          directory: "public/images",
          publicPath: "/images/",
        }),
        manifestoLabel: fields.text({
          label: "Manifiesto — Etiqueta",
          defaultValue: "Manifiesto",
        }),
        manifestoTitle: fields.text({
          label: "Manifiesto — Título (H2)",
          defaultValue: "El milagro de lo cotidiano.",
        }),
        manifestoBody: fields.document({
          label: "Manifiesto — Cuerpo de texto",
          formatting: true,
        }),
        manifestoQuote: fields.text({
          label: "Manifiesto — Cita destacada",
          multiline: true,
          defaultValue:
            '"Soy estructura y soy caos. Soy servicio y soy soberanía. Deja que el amor te regule. Confía en el proceso."',
        }),
        manifestoImage: fields.image({
          label: "Manifiesto — Imagen",
          directory: "public/images",
          publicPath: "/images/",
        }),
        mindfulnessLabel: fields.text({
          label: "Mindfulness — Etiqueta",
          defaultValue: "Ciencia & Espíritu",
        }),
        mindfulnessTitle: fields.text({
          label: "Mindfulness — Título (H2)",
          defaultValue: "Mindfulness como medicina.",
        }),
        mindfulnessLead: fields.text({
          label: "Mindfulness — Párrafo introductorio",
          multiline: true,
          defaultValue:
            "La meditación es una herramienta de neuroregulación. El mindfulness es una práctica que entrena la mente para volver al momento presente.",
        }),
        mindfulnessBody: fields.text({
          label: "Mindfulness — Párrafo descriptivo",
          multiline: true,
          defaultValue:
            "A través de la respiración, la atención plena y la consciencia corporal, el sistema nervioso aprende a salir del estado de alerta constante.",
        }),
        mindfulnessBenefitsTitle: fields.text({
          label: "Mindfulness — Título de beneficios",
          defaultValue: "Beneficios de practicar mindfulness regularmente:",
        }),
        mindfulnessBenefits: fields.array(fields.text({ label: "Beneficio" }), {
          label: "Lista de Beneficios",
          itemLabel: (props) => props.value || "Beneficio",
        }),
        mindfulnessConclusion: fields.text({
          label: "Mindfulness — Frase de cierre",
          multiline: true,
          defaultValue:
            '"En un mundo que nos empuja constantemente hacia el ruido y la velocidad, la meditación se convierte en una forma de volver a uno mismo."',
        }),
        mindfulnessImage: fields.image({
          label: "Mindfulness — Imagen",
          directory: "public/images",
          publicPath: "/images/",
        }),
      },
    }),

    aboutPage: singleton({
      label: "👤 Página Sobre Mí",
      path: "src/content/singletons/about",
      schema: {
        heroLabel: fields.text({
          label: "Etiqueta superior",
          defaultValue: "Sobre mí",
        }),
        heroTitle: fields.text({
          label: "Título principal (H1)",
          defaultValue: "Maria Eleonora Corallo",
        }),
        heroSubtitle: fields.text({
          label: "Subtítulo / tagline",
          multiline: true,
          defaultValue: "Terapeuta Transpersonal · Guía de Meditación · PNL",
        }),
        profileImage: fields.image({
          label: "Foto de perfil principal",
          directory: "public/images",
          publicPath: "/images/",
        }),
        bioIntro: fields.text({
          label: "Introducción biográfica",
          multiline: true,
        }),
        bioBody: fields.document({
          label: "Texto biográfico completo",
          formatting: true,
        }),
        manifestoTitle: fields.text({
          label: "Manifiesto — Título",
          defaultValue: "Mi manifiesto",
        }),
        manifestoText: fields.text({
          label: "Manifiesto — Texto",
          multiline: true,
        }),
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
        ctaTitle: fields.text({
          label: "CTA — Título",
          defaultValue: "¿Lista para comenzar?",
        }),
        ctaBody: fields.text({
          label: "CTA — Cuerpo",
          multiline: true,
          defaultValue:
            "Si algo de lo que has leído resuena contigo, me encantaría acompañarte en tu proceso.",
        }),
        ctaButtonText: fields.text({
          label: "CTA — Texto del botón",
          defaultValue: "Agenda una sesión",
        }),
      },
    }),

    sessionesPage: singleton({
      label: "✨ Página Sesiones — Cabecera",
      path: "src/content/singletons/sesiones-page",
      schema: {
        heroLabel: fields.text({
          label: "Etiqueta superior",
          defaultValue: "Sesiones",
        }),
        heroTitle: fields.text({
          label: "Título (H1)",
          defaultValue: "Estoy aquí para ti.",
        }),
        heroSubtitle: fields.text({
          label: "Subtítulo",
          multiline: true,
          defaultValue:
            "Cada sesión está diseñada como un espacio seguro para que puedas volver a ti.",
        }),
        heroImage: fields.image({
          label: "Imagen de cabecera",
          directory: "public/images",
          publicPath: "/images/",
        }),
        ctaTitle: fields.text({
          label: "CTA final — Título",
          defaultValue: "¿No sabes por dónde empezar?",
        }),
        ctaBody: fields.text({
          label: "CTA final — Texto",
          multiline: true,
          defaultValue:
            "Escríbeme y hablamos. Juntas encontramos el punto de partida.",
        }),
      },
    }),

    workshopPage: singleton({
      label: "🏢 Página Workshop para Empresas",
      path: "src/content/singletons/workshop",
      schema: {
        heroLabel: fields.text({
          label: "Etiqueta superior",
          defaultValue: "Workshop para empresas",
        }),
        heroTitle: fields.text({
          label: "Título principal (H1)",
          defaultValue: "Pienso, luego medito.",
        }),
        heroSubtitle: fields.text({
          label: "Subtítulo",
          multiline: true,
          defaultValue:
            "Una experiencia de mindfulness y meditación diseñada para equipos y organizaciones.",
        }),
        heroImage: fields.image({
          label: "Imagen de cabecera",
          directory: "public/images",
          publicPath: "/images/",
        }),
        introTitle: fields.text({ label: "Sección intro — Título" }),
        introBody: fields.document({
          label: "Sección intro — Cuerpo",
          formatting: true,
        }),
        benefitsTitle: fields.text({
          label: "Beneficios — Título",
          defaultValue: "¿Qué se llevan los equipos?",
        }),
        benefits: fields.array(
          fields.object({
            title: fields.text({ label: "Título del beneficio" }),
            description: fields.text({ label: "Descripción", multiline: true }),
          }),
          { label: "Lista de beneficios", itemLabel: () => "Beneficio" },
        ),
        formatsTitle: fields.text({
          label: "Formatos — Título",
          defaultValue: "Formatos disponibles",
        }),
        formats: fields.array(
          fields.object({
            name: fields.text({ label: "Nombre del formato" }),
            duration: fields.text({ label: "Duración" }),
            description: fields.text({ label: "Descripción", multiline: true }),
          }),
          { label: "Formatos del Workshop", itemLabel: () => "Formato" },
        ),
        ctaTitle: fields.text({
          label: "CTA — Título",
          defaultValue: "¿Hablamos para tu empresa?",
        }),
        ctaBody: fields.text({ label: "CTA — Texto", multiline: true }),
        ctaButtonText: fields.text({
          label: "CTA — Texto del botón",
          defaultValue: "Solicitar información",
        }),
      },
    }),

    contactoPage: singleton({
      label: "📬 Página Contacto",
      path: "src/content/singletons/contacto",
      schema: {
        heroTitle: fields.text({
          label: "Título principal",
          defaultValue: "Hablemos.",
        }),
        heroSubtitle: fields.text({
          label: "Subtítulo",
          multiline: true,
          defaultValue:
            "Estoy aquí para escucharte y acompañarte en el primer paso.",
        }),
        processTitle: fields.text({
          label: "Panel de proceso — Título",
          defaultValue: "¿Cómo funciona?",
        }),
        processSteps: fields.array(
          fields.object({
            step: fields.text({ label: "Número o icono" }),
            title: fields.text({ label: "Título del paso" }),
            description: fields.text({ label: "Descripción", multiline: true }),
          }),
          { label: "Pasos del proceso", itemLabel: () => "Paso" },
        ),
      },
    }),
  },

  // ============================================================
  // COLLECTIONS — Conjuntos de entradas editables
  // ============================================================
  collections: {
    sesiones: collection({
      label: "💆 Sesiones & Servicios",
      path: "src/content/sesiones/*",
      slugField: "title",
      schema: {
        title: fields.slug({ name: { label: "Nombre de la sesión" } }),
        order: fields.integer({ label: "Orden de aparición", defaultValue: 1 }),
        featured: fields.checkbox({
          label: "¿Destacar en página de inicio?",
          defaultValue: false,
        }),
        tagline: fields.text({
          label: "Tagline corto",
          description: "Una frase breve que aparece sobre el título",
        }),
        description: fields.document({
          label: "Descripción completa",
          formatting: true,
        }),
        duration: fields.text({ label: "Duración", defaultValue: "60 min" }),
        modality: fields.select({
          label: "Modalidad",
          options: [
            { label: "Online", value: "online" },
            { label: "Presencial", value: "presencial" },
            { label: "Online y Presencial", value: "ambas" },
          ],
          defaultValue: "ambas",
        }),
        price: fields.text({
          label: "Precio",
          description: "Ej: 75€ / consultar",
        }),
        image: fields.image({
          label: "Imagen de la sesión",
          directory: "public/images/sesiones",
          publicPath: "/images/sesiones/",
        }),
        bookingUrl: fields.url({
          label: "URL de reserva directa",
          defaultValue: "https://cal.eu/eleahora/sesiones",
        }),
        seoTitle: fields.text({ label: "SEO — Título (opcional)" }),
        seoDescription: fields.text({
          label: "SEO — Description (opcional)",
          multiline: true,
        }),
      },
    }),

    testimonios: collection({
      label: "💬 Testimonios",
      path: "src/content/testimonios/*",
      slugField: "name",
      schema: {
        name: fields.slug({ name: { label: "Nombre del cliente" } }),
        quote: fields.text({ label: "Testimonio", multiline: true }),
        service: fields.text({
          label: "Servicio recibido",
          description: "Ej: Sesión de Terapia con PNL",
        }),
        photo: fields.image({
          label: "Foto (opcional)",
          directory: "public/images/testimonios",
          publicPath: "/images/testimonios/",
        }),
        featured: fields.checkbox({
          label: "¿Mostrar en página de inicio?",
          defaultValue: true,
        }),
        order: fields.integer({ label: "Orden de aparición", defaultValue: 1 }),
      },
    }),

    legalPages: collection({
      label: "📜 Páginas Legales",
      path: "src/content/legal/*",
      slugField: "title",
      schema: {
        title: fields.slug({ name: { label: "Título de la página" } }),
        metaDescription: fields.text({
          label: "Meta description (SEO)",
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
