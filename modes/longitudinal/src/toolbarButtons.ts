// TODO: torn, can either bake this here; or have to create a whole new button type
// Only ways that you can pass in a custom React component for render :l
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
      icon: 'close',
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
  // Custom text Tool
  {
    id: 'Text',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Text',
      commands: [
        {
          // commandName: 'getCustomMsg',
          commandName:'getTextMsg',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },

  // Custom ViewTrueSizeImage
  {
    id: 'ViewTrueSizeImage',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'mm-image-mensuration',
      label: 'View true size of image',
      commands: [
        {
          commandName: 'getViewTrueSizeImageMsg',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Crop
  {
    id: 'Crop',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'mm-crop',
      label: 'Crop',
      commands: [
        {
          commandName: 'getCrop',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Triangulation
  {
    id: 'Triangulation',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Triangulation',
      commands: [
        {
          commandName: 'getTriangulation',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom LocalizerAllTool
  {
    id: 'LocalizerAll',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'LocalizerAll',
      commands: [
        {
          commandName: 'getLocalizerAll',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom LocalizerAllTool
  {
    id: 'LocalizerFirstToLast',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'LocalizerFirstToLast',
      commands: [
        {
          commandName: 'getLocalizerFirstToLast',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom LocalizerCurrentTool
  {
    id: 'LocalizerCurrent',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Localizer Current Tool',
      commands: [
        {
          commandName: 'getLocalizerCurrent',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Quality
  {
    id: 'Quality',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Quality  Tool',
      commands: [
        {
          commandName: 'getQuality',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Image Sort
  {
    id: 'ImageSort',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'sorting',
      label: 'Image Sort',
      commands: [
        {
          commandName: 'getImageSort',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Synchronizer
  {
    id: 'Synchronizer',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'mm-link',
      label: 'Synchronizer',
      commands: [
        {
          commandName: 'getSynchronizer',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Synchronizer
  {
    id: 'Curve',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'mm-curve-arrow-right',
      label: 'Curve',
      commands: [
        {
          commandName: 'getCurve',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom general setting
  {
    id: 'GeneralSetting',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'settings',
      label: 'General Settings',
      commands: [
        {
          commandName: 'getGeneralSetting',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Add Photo
  {
    id: 'AddPhoto',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'mm-add-media',
      label: 'Add Photo',
      commands: [
        {
          commandName: 'getAddPhoto',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Image Copy
  {
    id: 'CopyImage',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'mm-copy-image',
      label: 'Copy Image to Clipboard',
      commands: [
        {
          commandName: 'getCopyImage',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Send Data
  {
    id: 'SendData',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'mm-transfer-data',
      label: 'Send Data',
      commands: [
        {
          commandName: 'getSendData',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Bookmark
  {
    id: 'Bookmark',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'mm-bookmark',
      label: 'Bookmark',
      commands: [
        {
          commandName: 'getBookmark',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Print
  {
    id: 'Print',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'mm-print',
      label: 'Print',
      commands: [
        {
          commandName: 'getPrint',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Print
  {
    id: 'Save',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'mm-save',
      label: 'Save',
      commands: [
        {
          commandName: 'getSave',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Print
  {
    id: 'Delete',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'icon-delete',
      label: 'Delete',
      commands: [
        {
          commandName: 'getDelete',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Close
  {
    id: 'Close',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Close',
      commands: [
        {
          commandName: 'getClose',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom Report
  {
    id: 'Report',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Report',
      commands: [
        {
          commandName: 'getReportfn',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Custom PreviousImageTool
  {
    id: 'PreviousImage',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Previous Image Tool',
      commands: [
        {
          commandName: 'getPreviousImage',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },// Custom ViewNextImageTool
  {
    id: 'ViewNextImage',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'View Next Image Tool',
      commands: [
        {
          commandName: 'getViewNextImage',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },// Custom Report
  {
    id: 'ViewCurrentImage',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'View Current ImageTool',
      commands: [
        {
          commandName: 'getViewCurrentImage',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'ToggleOverlay',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Toggle Overlay Tool',
      commands: [
        {
          commandName: 'getToggleOverlay',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'SelectDisselectAllSeries',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Select Disselect All Series tool',
      commands: [
        {
          commandName: 'getSelectDisselectAllSeries',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'SelectDisselectAllImagesSeries',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Select Disselect All Images Series tool',
      commands: [
        {
          commandName: 'getSelectDisselectAllImagesSeries',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'ConvertImages',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Convert Images Tool',
      commands: [
        {
          commandName: 'getConvertImages',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'ExportToPowerpoint',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Export To Powerpoint Tool',
      commands: [
        {
          commandName: 'getExportToPowerpoint',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'AssignKeywordToImages',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Assign Keyword To Images tool',
      commands: [
        {
          commandName: 'getAssignKeywordToImages',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },

  {
    id: 'HounceFieldUnit',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Hounce Field Unit tool',
      commands: [
        {
          commandName: 'getHounceFieldUnit',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'CardioThoraricRotation',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Cardio Thoraric Rotation tool',
      commands: [
        {
          commandName: 'getCardioThoraricRotation',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'ProfileText',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Profile Text tool',
      commands: [
        {
          commandName: 'getProfileText',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'History',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'History  tool',
      commands: [
        {
          commandName: 'getHistory',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Pointer',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Pointer tool',
      commands: [
        {
          commandName: 'getPointer',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'TextPointer',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'TextPointer tool',
      commands: [
        {
          commandName: 'getTextPointer',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'Orientation',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'close',
      label: 'Orientation tool',
      commands: [
        {
          commandName: 'getOrientation',
          commandOptions: {},
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  // Changes sreerag
  {
    id: 'PlanarFreehandROITool',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-probe',
      label: 'PlanarFreehandROITool',
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

  {
    id: 'VolumeRotateMouseWheel',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-probe',
      label: 'VolumeRotateMouseWheelTool',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'VolumeRotateMouseWheel',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'ScaleOverlay',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-probe',
      label: 'ScaleOverlay',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'ScaleOverlay',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },
  {
    id: 'MIPJumpToClick',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-probe',
      label: 'MIPJumpToClick',
      commands: [
        {
          commandName: 'setToolActive',
          commandOptions: {
            toolName: 'MIPJumpToClick',
          },
          context: 'CORNERSTONE',
        },
      ],
    },
  },

  {
    id: 'Circle',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-circle',
      label: 'Circle ROI',
      commands: [
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
    },
  },
  {
    id: 'Ellipse',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-elipse',
      label: 'Ellipse',
      commands: [
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
    },
  },
  {
    id: 'Length',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-length',
      label: 'Length',
      commands: [
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
    },
  },

  {
    id: 'ArrowAnnotate',
    type: 'ohif.action',
    props: {
      type: 'action',
      icon: 'tool-annotate',
      label: 'ArrowAnnotate',
      commands: [
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
    },
  },
  // More...
];

export default toolbarButtons;

