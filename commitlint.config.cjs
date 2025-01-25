// 检查代码提交信息的规范
module.exports = {
    // 代码提交信息的规范集。
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',     // 新功能（feature）
                'fix',      // 修复 bug
                'docs',     // 文档更新
                'style',    // 代码格式（不影响代码运行的变动）
                'refactor', // 重构（既不是新增功能，也不是修改 bug 的代码变动）
                'perf',     // 性能优化
                'test',     // 增加测试
                'build',    // 构建过程或辅助工具的变动
                'ci',       // 持续集成相关的改动
                'chore',    // 其他改动（不修改 src 或测试文件）
                'revert'    // 回滚到上一个版本
            ]
        ],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never']
    }
};