import Aura from '@primeuix/themes/aura';
import tailwindcss from "@tailwindcss/vite";
import { definePreset } from '@primeuix/themes'


const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#F0F7FF',
      100: '#E0EEFE',
      200: '#BADCFD',
      300: '#7DC0FC',
      400: '#38A0F8',
      500: '#0E84E9',
      600: '#0267C7',
      700: '#0353A4',
      800: '#074685',
      900: '#0C3B6E',
      950: '#082549'
    },
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '#f4f7fa',
          100: '#eaeff5',
          200: '#d3deea',
          300: '#b4c8dc',
          400: '#90acca',
          500: '#7592bc',
          600: '#637cad',
          700: '#576c9e',
          800: '#4b5982',
          900: '#404b68',
          950: '#2a3041',
        }
      },
      dark: {
        surface: {
          0: '#ffffff',
          50: '#f4f7fa',
          100: '#eaeff5',
          200: '#d3deea',
          300: '#b4c8dc',
          400: '#90acca',
          500: '#7592bc',
          600: '#637cad',
          700: '#576c9e',
          800: '#4b5982',
          900: '#404b68',
          950: '#2a3041',
        }
      }
    }
}
});

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

  pinia: {
    storesDirs: ['./stores/**'],
  },

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

  css: [
    'primeicons/primeicons.css',
    '~/assets/css/tailwind.css'  
  ],

  primevue: {
    options: { 
      unstyled: false,
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: 'none',
          cssLayer: false
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
      minify: 'esbuild',
      cssCodeSplit: true
    },
    esbuild: {
      drop: ['console', 'debugger'],
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
    },
    plugins: [
      tailwindcss(),
    ],
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