module.exports = {
    modules: [
      '@nuxtjs/bulma',
    ],
    css: [
      '@/assets/font.css',
      'bulma-tooltip',
      'bulma-pageloader',
      'bulma-toast',
    ],
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/earlyaccess/nicomoji.css' },
      ],
    }
}