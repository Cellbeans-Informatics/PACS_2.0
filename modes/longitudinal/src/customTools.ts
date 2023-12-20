import type { RunCommand } from '@ohif/core/types';
import { EVENTS } from '@cornerstonejs/core';
import { ToolbarService } from '@ohif/core';

const customTools = [
  {
    id: 'Reset',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-reset',
      label: 'Reset View',
      commands: [
        {
          commandName: 'resetViewport',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },

]