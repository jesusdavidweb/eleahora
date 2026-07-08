/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

type Env = {
  RESEND_API_KEY?: string;
};

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
