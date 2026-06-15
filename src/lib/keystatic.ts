import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

type SessionEntry = {
  title: string;
  order: number;
  featured: boolean;
  tagline: string;
  pill: string;
  descriptionText: string;
  details: string[];
  meta: string[];
  duration: string;
  modality: string;
  price: string;
  bookingUrl: string;
  ctaText: string;
};

type TestimonialEntry = {
  name: string;
  quote: string;
  service: string;
  accentColor: string;
  featured: boolean;
  order: number;
};

type LegalPageData = {
  metaDescription: string;
  lastUpdated: string;
};

type ContentRecord = Record<string, any>;

const STATIC_SESIONES: Array<{ slug: string; entry: SessionEntry }> = [
  {
    slug: 'acompanamiento-terapeutico',
    entry: {
      title: 'Acompañamiento Terapéutico (Meditación + PNL)',
      order: 1,
      featured: true,
      tagline: '01',
      pill: 'Proceso profundo',
      descriptionText:
        'Este acompañamiento nace para sostenerte en los procesos que estás atravesando, especialmente cuando necesitas claridad, calma y una nueva manera de habitar lo que estás viviendo.',
      details: [
        '<strong>¿En qué consiste?</strong> Combinamos conversación terapéutica, meditación guiada y técnicas de PNL para revisar tu diálogo interno y permitir que nuevas perspectivas emerjan en ti. Cada sesión es única. No hay fórmulas rígidas, sino una escucha atenta y un acompañamiento presente, respetuoso y humano.',
        '<strong>Sesiones:</strong> 4 (acompañamiento mensual)',
        '<strong>Duración:</strong> 1h cada sesión',
        '<strong>Modalidad:</strong> Videollamada',
        '<strong>Intercambio mensual:</strong> 180€',
      ],
      meta: ['Incluye plan de integración', 'Acompañamiento mensual'],
      duration: '1h cada sesión',
      modality: 'online',
      price: '180€',
      bookingUrl: 'https://scheduler.zoom.us/maria-eleonora-051exv/30-min-con-eleahora',
      ctaText: 'Agendar llamada de descubrimiento (30min)',
    },
  },
  {
    slug: 'terapia-angelical',
    entry: {
      title: 'Terapia Angelical',
      order: 2,
      featured: false,
      tagline: '02',
      pill: 'Canalización',
      descriptionText:
        'Sesión de conexión con tus ángeles y seres de luz. Iniciamos con una meditación de sanación para elevar tu vibración. Luego canalizamos sus mensajes a través de oráculos angelicales, donde podrás hacer entre 6 y 8 preguntas para recibir guía y claridad.',
      details: [
        '<strong>Sesiones:</strong> 1',
        '<strong>Duración:</strong> 1h - 1h30 máx',
        '<strong>Modalidad:</strong> Videollamada o Presencial en Madrid',
        '<strong>Intercambio:</strong> 55€',
      ],
      meta: ['Sanación + mensaje', 'Oráculos especiales'],
      duration: '1h - 1h30 máx',
      modality: 'ambas',
      price: '55€',
      bookingUrl: 'https://scheduler.zoom.us/maria-eleonora-051exv/sesi-n-eleahora',
      ctaText: 'Agendar Terapia',
    },
  },
  {
    slug: 'perlas-de-eleahora',
    entry: {
      title: 'Perlas de Eleahora',
      order: 3,
      featured: false,
      tagline: '03',
      pill: 'Canal íntimo',
      descriptionText:
        'Sesión íntima, canalizada y reveladora. A través de una metodología única que combina preguntas poderosas, oráculos y dinámicas de escritura consciente, iremos explorando los temas que hoy tienes "sobre la mesa".\n\nEs un espacio que une coaching y espiritualidad. Trabajamos con la voz de tu niñ@ interior, tu sabiduría y tu visión hacia lo que quieres.\n\nIdeal para vaciar la mente, poner orden en lo interno y salir con más dirección.',
      details: [
        '<strong>Sesiones:</strong> 1',
        '<strong>Duración:</strong> 1h - 1h30 máx',
        '<strong>Modalidad:</strong> Presencial en Madrid',
        '<strong>Intercambio:</strong> 70€',
      ],
      meta: ['Exploración emocional', 'Escritura consciente'],
      duration: '1h - 1h30 máx',
      modality: 'presencial',
      price: '70€',
      bookingUrl: 'https://scheduler.zoom.us/maria-eleonora-051exv/sesi-n-eleahora',
      ctaText: 'Quiero mis perlas',
    },
  },
  {
    slug: 'clase-de-meditacion',
    entry: {
      title: 'Clase de Meditación',
      order: 4,
      featured: false,
      tagline: '04',
      pill: 'Base práctica',
      descriptionText:
        'Clase teórico-práctica para comprender cómo funciona tu sistema nervioso y cómo regularlo puede ayudarte a volver al presente.\n\nAprenderás herramientas concretas de neurorregulación que podrás aplicar en tu día a día, y terminaremos con una meditación guiada que te permitirá experimentar la diferencia entre cómo llegaste y cómo te vas.\n\nMi intención con esta sesión es que te lleves la práctica y lo aprendido a tu cotidianidad.',
      details: [
        '<strong>Sesiones:</strong> 1',
        '<strong>Duración:</strong> 1h - 1h30 máx',
        '<strong>Modalidad:</strong> Videollamada',
        '<strong>Intercambio:</strong> 40€',
      ],
      meta: ['Enfoque mente-cuerpo', 'Herramientas aplicables'],
      duration: '1h - 1h30 máx',
      modality: 'online',
      price: '40€',
      bookingUrl: 'https://scheduler.zoom.us/maria-eleonora-051exv/sesi-n-eleahora',
      ctaText: 'Quiero aprender a meditar',
    },
  },
  {
    slug: 'sesion-energetica',
    entry: {
      title: 'Sesión Energética (Chakras)',
      order: 5,
      featured: false,
      tagline: '05',
      pill: 'Reset energético',
      descriptionText:
        'Revisaremos cómo se encuentran tus 7 centros energéticos, identificando cuáles necesitan más atención y nos centraremos en limpiarlos, alinearlos y activarlos. Me gusta definir esta sesión como un "reset energético".\n\nEs una de las herramientas más bonitas de autocuidado: un espacio para armonizar y revitalizar tu energía.',
      details: [
        '<strong>Sesiones:</strong> 1',
        '<strong>Duración:</strong> 1h30',
        '<strong>Modalidad:</strong> Videollamada o Presencial en Madrid',
        '<strong>Intercambio:</strong> 65€',
      ],
      meta: ['Armonización de chakras', 'Impulso de energía vital'],
      duration: '1h30',
      modality: 'ambas',
      price: '65€',
      bookingUrl: 'https://scheduler.zoom.us/maria-eleonora-051exv/sesi-n-eleahora',
      ctaText: 'Agendar Sesión',
    },
  },
];

const STATIC_TESTIMONIOS: Array<{ slug: string; entry: TestimonialEntry }> = [];

const LEGAL_PAGE_DATA: Record<string, LegalPageData> = {
  'aviso-legal': {
    metaDescription:
      'Aviso legal de Eleahora. Información del titular, propiedad intelectual, condiciones de uso, responsabilidades y legislación aplicable del sitio web eleahora.com. Terapia transpersonal y meditación.',
    lastUpdated: '2026-05-23',
  },
  'politica-de-privacidad': {
    metaDescription:
      'Política de privacidad de Eleahora. Conoce cómo recopilamos, usamos, almacenamos y protegemos tus datos personales conforme al RGPD y la LOPDGDD. Tus derechos, medidas de seguridad y contacto.',
    lastUpdated: '2026-05-23',
  },
  'politica-de-cookies': {
    metaDescription:
      'Política de cookies de Eleahora. Información completa sobre los tipos de cookies utilizadas, su finalidad, duración y cómo gestionar tus preferencias de privacidad.',
    lastUpdated: '2026-05-23',
  },
};

const LEGAL_SLUGS = Object.keys(LEGAL_PAGE_DATA);

export async function getSiteConfig(): Promise<ContentRecord | null> {
  return null;
}

export async function getGlobalContent(): Promise<ContentRecord | null> {
  return null;
}

export async function getHomePage(): Promise<ContentRecord | null> {
  return null;
}

export async function getAboutPage(): Promise<ContentRecord | null> {
  return null;
}

export async function getSessionesPage(): Promise<ContentRecord | null> {
  return null;
}

export async function getWorkshopPage(): Promise<ContentRecord | null> {
  return null;
}

export async function getPiensoLuegoMeditoLanding(): Promise<ContentRecord | null> {
  return null;
}

export async function getContactoPage(): Promise<ContentRecord | null> {
  return null;
}

export async function getAllSesiones(): Promise<Array<{ slug: string; entry: ContentRecord }>> {
  return STATIC_SESIONES.map((session) => ({
    slug: session.slug,
    entry: { ...session.entry },
  }));
}

export async function getSesion(slug: string): Promise<ContentRecord | null> {
  const session = STATIC_SESIONES.find((item) => item.slug === slug);
  if (!session) return null;
  return {
    slug: session.slug,
    ...session.entry,
    descriptionHtml: '',
  };
}

export async function getAllTestimonios(
  onlyFeatured = false,
): Promise<Array<{ slug: string; entry: ContentRecord }>> {
  return STATIC_TESTIMONIOS.filter((item) => (onlyFeatured ? item.entry.featured : true));
}

export async function getAllLegalPages(): Promise<Array<{ slug: string }>> {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

export async function getLegalPage(slug: string): Promise<ContentRecord | null> {
  const pageData = LEGAL_PAGE_DATA[slug];
  if (!pageData) return null;

  const filePath = join(process.cwd(), 'src', 'content', 'legal', `${slug}.yaml`);
  if (!existsSync(filePath)) return null;

  return {
    title: slug,
    metaDescription: pageData.metaDescription,
    lastUpdated: pageData.lastUpdated,
    contentHtml: readLegalContentYaml(filePath),
  };
}

function readLegalContentYaml(filePath: string): string {
  try {
    const raw = readFileSync(filePath, 'utf-8');
    const match = raw.match(/^content:\s*(?:\|-\s*|>-\s*)\n((?:  .*\n?)*)/m);
    if (!match) return '';

    return match[1]
      .split('\n')
      .map((line) => line.replace(/^  /, ''))
      .join('\n')
      .trim();
  } catch {
    return '';
  }
}
