module.exports = {
  content: ['./*.hbs', "./partials/*.hbs", "./partials/*.hbs"],
  theme: {
    fontFamily: {
      system: 'var(--font-system)',
      headings: 'var(--font-headings)',
      body: 'var(--font-body)',
    },
    extend: {
      colors: {
        // brand: 'var(--ghost-accent-color)',
        brand: ({ opacityVariable, opacityValue }) => {
          if (opacityValue !== undefined) {
            return `hsla(var(--color-brand-hsl) / ${opacityValue})`
          }
          if (opacityVariable !== undefined) {
            return `hsla(var(--color-brand-hsl) / var(${opacityVariable}, 1))`
          }
          return `hsl(var(--color-brand-hsl))`
        },
        'brand-contrast': 'var(--color-brand-contrast)',
        accent: 'var(--color-accent)',
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',
        error: '#fc365e',
        success: '#48c774',
        typogr: 'var(--color-typography)',
        'typogr-tone': 'var(--color-typography-tone)',
        backgr: 'var(--color-background)',
        'backgr-tone': 'var(--color-background-tone)',
        border: 'var(--color-border)',
      },
      maxWidth: {
        container: 'var(--container-width)',
        content: 'var(--content-width)',
        'content-wide': 'var(--content-width-wide)',
        wide: 'var(--wide-width)'
      },
      backgroundImage: {
        'brand-gradient': `linear-gradient(to right, var(--color-brand), var(--color-brand-low) 20%, var(--color-brand-low) 80%, var(--color-brand))`,
      },
      borderRadius: {
        'theme': 'var(--radius)',
        'theme-xs': 'var(--radius-xs)',
        'theme-sm': 'var(--radius-sm)',
        'theme-md': 'var(--radius-md)',
        'theme-lg': 'var(--radius-lg)',
      },
      typography: ({ theme }) => ({
        theme: {
          css: {
            '--tw-prose-body': 'var(--color-typography-content)',
            '--tw-prose-headings': 'var(--color-typography)',
            '--tw-prose-lead': 'var(--color-typography-content)',
            '--tw-prose-links': 'var(--ghost-accent-color)',
            '--tw-prose-bold': 'var(--color-typography-content)',
            '--tw-prose-counters': 'var(--color-typography-content)',
            '--tw-prose-bullets': 'var(--color-typography-content)',
            '--tw-prose-hr': 'var(--color-border)',
            '--tw-prose-quotes': 'var(--color-typography-content)',
            '--tw-prose-quote-borders': 'var(--ghost-accent-color)',
            '--tw-prose-captions': 'var(--color-typography-content)',
            '--tw-prose-code': 'var(--color-typography-content)',
            '--tw-prose-pre-code': 'var(--color-typography-reverse)',
            '--tw-prose-pre-bg': 'var(--color-typography)',
            '--tw-prose-th-borders': 'var(--color-border)',
            '--tw-prose-td-borders': 'var(--color-border)',
            '--tw-prose-invert-body': 'var(--color-typography-reverse)',
            '--tw-prose-invert-headings': 'var(--color-typography-reverse)',
            '--tw-prose-invert-lead': 'var(--color-typography-reverse)',
            '--tw-prose-invert-links': 'var(--ghost-accent-color)',
            '--tw-prose-invert-bold': 'var(--color-typography-reverse)',
            '--tw-prose-invert-counters': 'var(--color-typography-reverse)',
            '--tw-prose-invert-bullets': 'var(--color-typography-reverse)',
            '--tw-prose-invert-hr': 'var(--color-border-reverse)',
            '--tw-prose-invert-quotes': 'var(--color-typography-reverse)',
            '--tw-prose-invert-quote-borders': 'var(--color-border-reverse)',
            '--tw-prose-invert-captions': 'var(--color-typography-reverse)',
            '--tw-prose-invert-code': 'var(--color-typography-reverse)',
            '--tw-prose-invert-pre-code': 'var(--color-typography-content)',
            '--tw-prose-invert-pre-bg': 'var(--color-typography-reverse)',
            '--tw-prose-invert-th-borders': 'var(--color-border-reverse)',
            '--tw-prose-invert-td-borders': 'var(--color-border-reverse)',
          },
        },
      }),
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}