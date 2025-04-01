import Aura from '@primeuix/themes/aura';


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'slide-right', mode: 'out-in' },
    layoutTransition: { name: 'slide-right', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'pt-BR'
      },
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@nuxtjs/critters',
    'nuxt-vitalizer',
    'nuxt-lazy-hydrate',
    'nuxt-delay-hydration',
    'nuxt-mailer',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-fonts',
    'nuxt-security',
    '@pinia/nuxt',
    '@primevue/nuxt-module'
  ],

  googleFonts: {
    display: 'swap',
    download: false,
    inject: true,
    preconnect: true,
    families: {
      "Noto Sans Georgian": [100,200,300,400,500,600,700,800,900]
    }
  },

  sitemap: {
    sources: ['/api/__sitemap__/urls'],
  },

  site: {
    indexable: true
  },

  robots: {
    UserAgent: '*',
    allow: [
      '/',
      '/:username/:code'
    ],
    disallow: [
      '/profile/edit/:id',
      '/auth',
      '/create-account',
      '/forgot-password',
      '/confirm/:email'
    ],
  },

  css: ['primeicons/primeicons.css'],

  primevue: {
    options: { 
      unstyled: false,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: 'none'
        }
      }
    },
  },

  nitro: {
    compressPublicAssets: {
      brotli: true,
      gzip: true
    },
    minify: true,
  },

  imports: {
    dirs: [
      "./composables/useServices",
    ]
  },

  runtimeConfig: {
    mailerUser: process.env.NUXT_MAILER_USER,
    mailerPass: process.env.NUXT_MAILER_PASS,
    mailerLog: process.env.NUXT_MAILER_LOG,
    mailerDriver: process.env.NUXT_MAILER_DRIVER,
    mailerHost: process.env.NUXT_MAILER_HOST,
    mailerPort: process.env.NUXT_MAILER_PORT,
    mailerSmtpTls: process.env.NUXT_MAILER_SMTP_TLS,
    mailerFromAddress: process.env.NUXT_MAILER_FROM_ADDRESS,
    mailerToAddress: process.env.NUXT_MAILER_TO_ADDRESS,    

    public: {
      siteUrl: process.env.SITE_URL,
      nodeEnv: process.env.NODE_ENV,
      apiUrl: `${process.env.API_URL}/api/v1`
    }
  },

  security: {
    corsHandler: {
      origin: ['*', process.env.API_URL],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
      maxAge: '86400'
    },
    headers: {
      contentSecurityPolicy: {
        "default-src": ["'self'"],
        "script-src": ["'self'", "'unsafe-inline'"],
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com"
        ],
        "font-src": [
          "'self'",
          "https://fonts.gstatic.com",
          "data:"
        ],
        "img-src": [
          "'self'", 
          "data:",
          "blob:",
          "https://pub-be4ba7f6a3be445f836c00d73541349e.r2.dev", 
          "https://pub-5547c6a4a74148ceb84aa54189b62a3e.r2.dev",
          process.env.API_URL
        ],
        "connect-src": [
          "'self'", 
          "blob:",
          process.env.API_URL
        ],
        "object-src": ["'self'"],
        "frame-ancestors": ["'self'"]
      },
      xFrameOptions: "DENY",
      xContentTypeOptions: "nosniff",
      crossOriginResourcePolicy: "same-site",
      crossOriginOpenerPolicy: "same-origin-allow-popups"
    }
  },

  typescript: {
    strict: false
  },

  components: [
    { path: '@/modules/posts/components', pathPrefix: false },
    '~/components'
  ],

  compatibilityDate: '2024-08-17',

  builder: 'vite',

  vite: {
    build: {
      chunkSizeWarningLimit: 1000,
      cssMinify: true,
      minify: 'terser',
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    server: {
      headers: {
        "cache-control": 'no-transform'
      }
    }
  },

  image: {
    provider: 'none'
  },

  sourcemap: {
    server: true,
    client: true
  },

  experimental: {
    componentIslands: true,
    renderJsonPayloads: false
  },

  /*routeRules: {
    '/posts': { prerender: true, isr: true },
    '/:username/:code': { prerender: true, isr: true },
    '/': { prerender: true, isr: true },
  },*/

  hooks: {
    'build:manifest': (manifest) => {
      const css = manifest['node_modules/nuxt/dist/app/entry.js']?.css

      if (css) {

        for (let i = css.length - 1; i >= 0; i--) {

          if (css[i].startsWith('entry')) css.splice(i, 1)
        }
      }
    },
  },

  plugins: [
    '~/plugins/axios/axios'
  ]
})