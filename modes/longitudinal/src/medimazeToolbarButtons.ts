// Medimaze tools
// TODO: torn, can either bake this here; or have to create a whole new button type
// Only ways that you can pass in a custom React component for render :l
// Magnify - Y
// Invert - Y
// Window level - Y
// Zoom - Y
// Linear measurement - Y
// Draw angle - Y
// Text - N
// Circle ROI
// Area ellipse
// HU - Hounce Field Unit
// Technician to doctor attachment
// History

import {
  // ExpandableToolbarButton,
  // ListMenu,
  WindowLevelMenuItem,
} from '@ohif/ui';
import { defaults, ToolbarService } from '@ohif/core';
import type { Button } from '@ohif/core/types';

const { windowLevelPresets } = defaults;

/**
 *
 * @param {*} preset - preset number (from above import)
 * @param {*} title
 * @param {*} subtitle
 */
function _createWwwcPreset(preset, title, subtitle) {
  return {
    id: preset.toString(),
    title,
    subtitle,
    type: 'action',
    commands: [
      {
        commandName: 'setWindowLevel',
        commandOptions: {
          ...windowLevelPresets[preset],
        },
        context: 'CORNERSTONE',
      },
    ],
  };
}

const toolGroupIds = ['default', 'mpr', 'SRToolGroup'];

/**
 * Creates an array of 'setToolActive' commands for the given toolName - one for
 * each toolGroupId specified in toolGroupIds.
 * @param {string} toolName
 * @returns {Array} an array of 'setToolActive' commands
 */
function _createSetToolActiveCommands(toolName) {
  const temp = toolGroupIds.map(toolGroupId => ({
    commandName: 'setToolActive',
    commandOptions: {
      toolGroupId,
      toolName,
    },
    context: 'CORNERSTONE',
  }));
  return temp;
}

const toolbarButtons: Button[] = [
  // Measurement
  {
    id: 'MeasurementTools',
    type: 'ohif.splitButton',
    props: {
      groupId: 'MeasurementTools',
      isRadio: true, // ?
      // Switch?
      primary: ToolbarService._createToolButton(
        'Length',
        'tool-length',
        'Length',
        [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'Length',
            },
            context: 'CORNERSTONE',
          },
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'SRLength',
              toolGroupId: 'SRToolGroup',
            },
            // we can use the setToolActive command for this from Cornerstone commandsModule
            context: 'CORNERSTONE',
          },
        ],
        'Length'
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: 'More Measure Tools',
      },
      items: [
        ToolbarService._createToolButton(
          'Length',
          'tool-length',
          'Length',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Length',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRLength',
                toolGroupId: 'SRToolGroup',
              },
              // we can use the setToolActive command for this from Cornerstone commandsModule
              context: 'CORNERSTONE',
            },
          ],
          'Length Tool'
        ),
        ToolbarService._createToolButton(
          'Bidirectional',
          'tool-bidirectional',
          'Bidirectional',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Bidirectional',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRBidirectional',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Bidirectional Tool'
        ),

        ToolbarService._createToolButton(
          'ArrowAnnotate',
          'tool-annotate',
          'Annotation',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ArrowAnnotate',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRArrowAnnotate',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Arrow Annotate'
        ),
        ToolbarService._createToolButton(
          'Rectangle',
          'tool-rectangle',
          'Rectangle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'RectangleROI',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Rectangle'
        ),
        ToolbarService._createToolButton(
          'Angle',
          'tool-angle',
          'Angle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Angle',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Angle'
        ),

        ToolbarService._createToolButton(
          'EllipticalROI',
          'tool-elipse',
          'Ellipse',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'EllipticalROI',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SREllipticalROI',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Ellipse Tool'
        ),
        ToolbarService._createToolButton(
          'CircleROI',
          'tool-circle',
          'Circle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'CircleROI',
              },
              context: 'CORNERSTONE',
            },
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'SRCircleROI',
                toolGroupId: 'SRToolGroup',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Circle Tool'
        ),
      ],
    },
  },
  // Zoom..
  {
    id: 'Zoom',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-zoom',
      label: 'Zoom',
      commands: _createSetToolActiveCommands('Zoom'),
    },
  },
  // Window Level + Presets...
  {
    id: 'WindowLevel',
    type: 'ohif.splitButton',
    props: {
      groupId: 'WindowLevel',
      primary: ToolbarService._createToolButton(
        'WindowLevel',
        'tool-window-level',
        'Window Level',
        [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'WindowLevel',
            },
            context: 'CORNERSTONE',
          },
        ],
        'Window Level'
      ),
      secondary: {
        icon: 'chevron-down',
        label: 'W/L Manual',
        isActive: true,
        tooltip: 'W/L Presets',
      },
      isAction: true, // ?
      renderer: WindowLevelMenuItem,
      items: [
        _createWwwcPreset(1, 'Soft tissue', '400 / 40'),
        _createWwwcPreset(2, 'Lung', '1500 / -600'),
        _createWwwcPreset(3, 'Liver', '150 / 90'),
        _createWwwcPreset(4, 'Bone', '2500 / 480'),
        _createWwwcPreset(5, 'Brain', '80 / 40'),
      ],
    },
  },
  // Pan...
  {
    id: 'Pan',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-move',
      label: 'Pan',
      commands: _createSetToolActiveCommands('Pan'),
    },
  },
  {
    id: 'Capture',
    type: 'ohif.action',
    props: {
      icon: 'tool-capture',
      label: 'Capture',
      type: 'action',
      commands: [
        {
          commandName: 'showDownloadViewportModal',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Layout',
    type: 'ohif.layoutSelector',
    props: {
      rows: 3,
      columns: 3,
    },
  },
  {
    id: 'MPR',
    type: 'ohif.action',
    props: {
      type: 'toggle',
      icon: 'icon-mpr',
      label: 'MPR',
      commands: [
        {
          commandName: 'toggleHangingProtocol',
          commandOptions: {
            protocolId: 'mpr',
          },
          context: 'DEFAULT',
        },
      ],
    },
  },
  {
    id: 'Crosshairs',
    type: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-crosshair',
      label: 'Crosshairs',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Crosshairs',
            toolGroupId: 'mpr',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },

  {
    id: 'TagBrowser',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'list-bullets',
      label: 'Dicom Tag Browser',

      commands: [
        {
          commandName: 'openDICOMTagViewer',
          commandOptions: {},
          context: 'DEFAULT',
        },
        'Dicom Tag Browser',
      ],
    },
  },
  {
    id: 'Calibration',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-calibration',
      label: 'Calibration',

      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'CalibrationLine',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Rectangle',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-rectangle',
      label: 'Rectangle',

      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'RectangleROI',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Magnify',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-magnify',
      label: 'Magnify',

      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            // toolName: 'StackScroll',
            toolName: 'Magnify',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Angle',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-angle',
      label: 'Angle',

      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            // toolName: 'StackScroll',
            toolName: 'Angle',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Cine',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-cine',
      label: 'Cine',

      commands: [
        {
          commandName: 'toggleCine',
          commandOptions: {
            // toolName: 'StackScroll',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Invert',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-invert',
      label: 'Invert',

      commands: [
        {
          commandName: 'invertViewport',
          commandOptions: {
            // toolName: 'StackScroll',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'StackScroll',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-stack-scroll',
      label: 'Stack Scroll',

      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'StackScroll',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'ImageOverlayViewer',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'toggle-dicom-overlay',
      label: 'Image Overlay',

      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'ImageOverlayViewer',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },

  {
    id: 'ReferenceLines',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-referenceLines',
      label: 'Reference Lines',

      commands: [
        {
          commandName: 'ReferenceLinesCommands',
          commandOptions: {
            // toolName: 'StackImageSync',
            toggledState: true,
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'StackImageSync',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'link',
      label: 'Stack Image Sync',
      commands: [
        {
          commandName: 'toggleStackImageSync',
          commandOptions: {
            // toolName: 'StackImageSync',
            toggledState: true,
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'FlipHorizontal',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-flip-horizontal',
      label: 'Flip Horizontal',
      commands: [
        {
          commandName: 'flipViewportHorizontal',
          commandOptions: {
            toolName: 'tool-flip-horizontal',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'RotateRight',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-rotate-right',
      label: 'Rotate Right',
      commands: [
        {
          commandName: 'rotateViewportCW',
          commandOptions: {
            toolName: 'tool-rotate-right',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Probe',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-probe',
      label: 'Probe',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'DragProbe',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'PlanarFreehandROI',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-freehand',
      label: 'PlanarFreehandROI',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'PlanarFreehandROI',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Flip Vertical
  {
    id: 'FlipVertical',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-flip-vertical',
      label: 'Flip Vertical',
      commands: [
        {
          commandName: 'flipViewportVertical',
          commandOptions: {
            toolName: 'tool-flip-vertical',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Cobb Angle
  {
    id: 'CobbAngle',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-cobb-angle',
      label: 'Cobb Angle',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'CobbAngle',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Planar Rotate
  {
    id: 'PlanarRotateTool',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-planar-rotate',
      label: 'Planar Rotate',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'PlanarRotate',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Advanced Magnify Tool
  {
    id: 'AdvancedMagnifyTool',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-advanced-magnify',
      label: 'Advanced Magnify',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'AdvancedMagnify',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // More...
  // TODO : Missing tools need to create functions for them

  {
    id: 'Text',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'icon-tool-missing',
      label: 'Text',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'Text',
          },
          context: 'DEFAULT',
        },
      ],
    },
  },
];

export default toolbarButtons;
