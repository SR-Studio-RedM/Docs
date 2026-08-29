import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "data",
  title: "SR Studio Docs",
  appearance: 'force-dark',
  description: "Documentation and resources for SR Studio RedM products",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'SR Mail', link: '/sr-mail/' }
    ],

    sidebar: {
      '/sr-mail/': [
        {
          text: 'SR Mail',
          items: [
            { text: 'Overview', link: '/sr-mail/' },
            { text: 'Installation', link: '/sr-mail/installation' },
            { text: 'Configuration', link: '/sr-mail/configuration' },
            { text: 'Commands', link: '/sr-mail/commands' },
            { text: 'Exports & Integration', link: '/sr-mail/exports' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/SR-Studio-RedM' },
      { icon: 'discord', link: 'https://discord.gg/JApHNmE8K5' }
    ]
  }
})
