import js from '@eslint/js'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import vueParser from 'vue-eslint-parser'
import vuePlugin from 'eslint-plugin-vue'
import prettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx,ts,tsx,vue}'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                extraFileExtensions: ['.vue']
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
                ImportMetaEnv: 'readonly'
            }
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            vue: vuePlugin,
            'eslint-plugin-prettier': prettierPlugin,
            'eslint-config-prettier': prettier
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            'vue/no-multiple-template-root': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'no-useless-catch': 'off'
        }
    }
]