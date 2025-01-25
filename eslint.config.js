import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
    js.configs.recommended,
    prettierConfig,
    {
        files: ['**/*.{js,jsx,ts,tsx,vue}'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
            parser: vueParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                parser: tsParser,
                extraFileExtensions: ['.vue'],
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            vue: vuePlugin,
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'error',
            'vue/multi-word-component-names': 'off',
            'vue/no-multiple-template-root': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
        },
    },
];
