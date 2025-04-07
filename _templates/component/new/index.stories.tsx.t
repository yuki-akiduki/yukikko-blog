---
to: <%= targetDir %>/<%= h.changeCase.pascal(name) %>.stories.tsx
---

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { <%= h.changeCase.pascal(name) %> } from './<%= h.changeCase.pascal(name) %>';

export default {
    title: '<%= targetDir.split("/").map(h.changeCase.pascal).join("/") %>/<%= h.changeCase.pascal(name) %>',
    component: <%= h.changeCase.pascal(name) %>,
    tags: ['autodocs'],
    argTypes: {
        // children: { control: 'text' }, など、必要に応じて追加
    }

} as Meta<typeof <%= h.changeCase.pascal(name) %>>;

export const Default: Story = {
    args: {
        children: 'Default <%= h.changeCase.pascal(name) %>',
    },
};
