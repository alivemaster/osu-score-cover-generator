import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import stylistic from '@stylistic/eslint-plugin'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
    {
        name: 'app/files-to-lint',
        files: ['**/*.{ts,mts,tsx,vue}']
    },

    {
        name: 'app/files-to-ignore',
        ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
    },

    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    {
        rules: {
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-explicit-any': 'off'
        }
    },

    {
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            '@stylistic/array-bracket-spacing': ['error'],
            '@stylistic/arrow-parens': ['error'],
            '@stylistic/arrow-spacing': ['error'],
            '@stylistic/brace-style': ['error'],
            '@stylistic/comma-dangle': ['error'],
            '@stylistic/comma-spacing': ['error'],
            '@stylistic/comma-style': ['error'],
            '@stylistic/curly-newline': ['error', 'always'],
            '@stylistic/indent': ['error', 4],
            '@stylistic/indent-binary-ops': ['error', 'tab'],
            '@stylistic/key-spacing': ['error'],
            '@stylistic/lines-between-class-members': ['error'],
            '@stylistic/no-multi-spaces': ['error'],
            '@stylistic/quotes': ['error', 'single', { 'avoidEscape': true }],
            '@stylistic/semi': ['error', 'never'],
            '@stylistic/space-infix-ops': ['error']
        }
    }
)
