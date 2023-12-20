import type { RunCommand } from '@ohif/core/types';
import { EVENTS } from '@cornerstonejs/core';
import { ToolbarService } from '@ohif/core';
import {
  WindowLevelMenuItem,
} from '@ohif/ui';
const ReferenceLinesCommands: RunCommand = [
  {
    commandName: 'setSourceViewportForReferenceLinesTool',
    context: 'CORNERSTONE',
  },
  {
    commandName: 'setToolActive',
    commandOptions: {
      toolName: 'ReferenceLines',
    },
    context: 'CORNERSTONE',
  },
];

function _createWwwcPreset(preset, title,  getCommandName, getCommandOptions) {
  return {
    id: preset.toString(),
    title,
    type: 'action',
    commands: [
      {
        commandName: getCommandName,
        commandOptions: getCommandOptions,
        context: 'CORNERSTONE',
      },
    ],
  };
}

const moreTools = [
  {
    id: 'MoreTools',
    type: 'ohif.splitButton',
    props: {
      isRadio: true, // ?
      groupId: 'MoreTools',
      primary: ToolbarService._createActionButton(
        'Reset',
        'tool-reset',
        'Reset View',
        [
          {
            commandName: 'resetViewport',
            commandOptions: {},
            context: 'CORNERSTONE',
          },
        ],
        'Reset'
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: 'More Tools',
      },
      items: [
        ToolbarService._createActionButton(
          'Reset',
          'tool-reset',
          'Reset View',
          [
            {
              commandName: 'resetViewport',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Reset'
        ),

        ToolbarService._createActionButton(
          'flip-horizontal',
          'tool-flip-horizontal',
          'Flip Horizontally',
          [
            {
              commandName: 'flipViewportHorizontal',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Flip Horizontal'
        ),
        // Changes

        ToolbarService._createToggleButton(
          'StackImageSync',
          'link',
          'Stack Image Sync',
          [
            {
              commandName: 'toggleStackImageSync',
            },
          ],
          'Enable position synchronization on stack viewports',
          {
            listeners: {
              [EVENTS.STACK_VIEWPORT_NEW_STACK]: {
                commandName: 'toggleStackImageSync',
                commandOptions: { toggledState: true },
              },
            },
          }
        ),
        ToolbarService._createToggleButton(
          'ReferenceLines',
          'tool-referenceLines', // change this with the new icon
          'Reference Lines',
          ReferenceLinesCommands,
          'Show Reference Lines',
          {
            listeners: {
              [EVENTS.STACK_VIEWPORT_NEW_STACK]: ReferenceLinesCommands,
              [EVENTS.ACTIVE_VIEWPORT_ID_CHANGED]: ReferenceLinesCommands,
            },
          }
        ),
        ToolbarService._createToggleButton(
          'ImageOverlayViewer',
          'toggle-dicom-overlay',
          'Image Overlay',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ImageOverlayViewer',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Image Overlay',
          { isActive: true }
        ),
        ToolbarService._createToolButton(
          'StackScroll',
          'tool-stack-scroll',
          'Stack Scroll',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'StackScroll',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Stack Scroll'
        ),
        ToolbarService._createActionButton(
          'invert',
          'tool-invert',
          'Invert',
          [
            {
              commandName: 'invertViewport',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Invert Colors'
        ),
        ToolbarService._createToolButton(
          'Probe',
          'tool-probe',
          'Probe',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'DragProbe',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Probe'
        ),
        ToolbarService._createToggleButton(
          'cine',
          'tool-cine',
          'Cine',
          [
            {
              commandName: 'toggleCine',
              context: 'CORNERSTONE',
            },
          ],
          'Cine'
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

        // Next two tools can be added once icons are added
        ToolbarService._createToolButton(
          'Cobb Angle',
          'tool-cobb-angle',
          'Cobb Angle',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'CobbAngle',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Cobb Angle'
        ),
        ToolbarService._createToolButton(
          'Planar Freehand ROI',
          'tool-freehand',
          'PlanarFreehandROI',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'PlanarFreehandROI',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Planar Freehand ROI'
        ),
        ToolbarService._createToolButton(
          'Magnify',
          'tool-magnify',
          'Magnify',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'Magnify',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Magnify'
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
          'CalibrationLine',
          'tool-calibration',
          'Calibration',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'CalibrationLine',
              },
              context: 'CORNERSTONE',
            },
          ],
          'Calibration Line'
        ),
        ToolbarService._createActionButton(
          'TagBrowser',
          'list-bullets',
          'Dicom Tag Browser',
          [
            {
              commandName: 'openDICOMTagViewer',
              commandOptions: {},
              context: 'DEFAULT',
            },
          ],
          'Dicom Tag Browser'
        ),
        //  Flip Vertical
        ToolbarService._createActionButton(
          'flip-vertical',
          'tool-flip-vertical',
          'Flip Vertically',
          [
            {
              commandName: 'flipViewportVertical',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Flip Vertical'
        ),
      ],
    },
  },
  {
    id: 'NewTools',
    type: 'ohif.splitButton',
    props: {
      isRadio: true,
      groupId: 'NewTools',
      primary: ToolbarService._createActionButton(
        'FlipVertical',
        'tool-flip-vertical',
        'Flip Vertical',
        [
          {
            commandName: 'flipViewportVertical',
            commandOptions: {
              toolName: 'tool-flip-vertical',
            },
            context: 'CORNERSTONE',
          },
        ]
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: 'More Tools',
      },
      items: [
        ToolbarService._createActionButton('FlipVertical', 'tool-flip-vertical', 'Flip Vertical', [
          {
            commandName: 'flipViewportVertical',
            commandOptions: {
              toolName: 'tool-flip-vertical',
            },
            context: 'CORNERSTONE',
          },
        ]),
        ToolbarService._createActionButton('CobbAngle', 'tool-cobb-angle', 'Cobb Angle', [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'CobbAngle',
            },
            context: 'CORNERSTONE',
          },
        ]),
        ToolbarService._createActionButton(
          'PlanarRotateTool',
          'tool-planar-rotate',
          'Planar Rotate',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'PlanarRotate',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        ToolbarService._createActionButton(
          'AdvancedMagnifyTool',
          'tool-advanced-magnify',
          'Advanced Magnify',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'AdvancedMagnify',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        // TrackballRotate Tool is not working yet
        ToolbarService._createActionButton(
          'TrackballRotateTool',
          'tool-trackball-rotate',
          'Trackball Rotate',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'TrackballRotateTool',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        ToolbarService._createActionButton(
          'MIPJumpToClickTool',
          'tool-MIPJumpTo-Click',
          'MIP Jump To Click',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'MIPJumpToClickTool',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        ToolbarService._createActionButton(
          'ScaleOverlayTool',
          'tool-Scale-Overlay',
          'Scale Overlay Tool',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ScaleOverlayTool',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        // Chnages to be made in action
        ToolbarService._createActionButton('BrushTool', 'tool-Scale-Overlay', 'Brush Tool', [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'ScaleOverlayTool',
            },
            context: 'CORNERSTONE',
          },
        ]),
        ToolbarService._createActionButton('KeyImageTool', 'tool-Scale-Overlay', 'Key Image Tool', [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'ScaleOverlayTool',
            },
            context: 'CORNERSTONE',
          },
        ]),
        ToolbarService._createActionButton(
          'OrientationMarkerTool',
          'tool-Scale-Overlay',
          'Orientation Marker Tool',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ScaleOverlayTool',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        ToolbarService._createActionButton(
          'OverlayGridTool',
          'tool-Scale-Overlay',
          'Orientation Grid Tool',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ScaleOverlayTool',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        ToolbarService._createActionButton('PaintFillTool', 'tool-paint-fill', 'Paint Fill Tool', [
          {
            commandName: 'setToolActive',
            commandOptions: {
              toolName: 'ScaleOverlayTool',
            },
            context: 'CORNERSTONE',
          },
        ]),
        ToolbarService._createActionButton(
          'RectangleROIStartEndThresholdTool',
          'tool-Scale-Overlay',
          'RectangleROI StartEnd Threshold Tool',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ScaleOverlayTool',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        ToolbarService._createActionButton(
          'RectangleROIThresholdTool',
          'tool-Scale-Overlay',
          'RectangleROI Threshold Tool',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ScaleOverlayTool',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        ToolbarService._createActionButton(
          'ReferenceCursors',
          'tool-Scale-Overlay',
          'Reference Cursors',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ScaleOverlayTool',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        ToolbarService._createActionButton(
          'SegmentationIntersectionTool',
          'tool-Scale-Overlay',
          'Segmentation Intersection Tool',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ScaleOverlayTool',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        ToolbarService._createActionButton(
          'Synchronizer',
          'tool-Scale-Overlay',
          'Synchronizer Tool',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ScaleOverlayTool',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
        ToolbarService._createActionButton(
          'VideoRedactionTool',
          'tool-Scale-Overlay',
          'Video Redaction Tool',
          [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'ScaleOverlayTool',
              },
              context: 'CORNERSTONE',
            },
          ]
        ),
      ],
    },
  },
  {
    id: 'ImageFilter',
    type: 'ohif.splitButton',
    props: {
      isRadio: true, // ?
      groupId: 'ImageFilter',
      primary: ToolbarService._createActionButton(
          'Magnitude',
          'mm-more',
          'Magnitude',
          [
            {
              commandName: 'getCustomMsg',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Magnitude'
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: 'Image Filter',
      },
      isAction: true,
      renderer: WindowLevelMenuItem,
      items: [
        _createWwwcPreset(
            1,
            'Magnitude',
            'getCustomMsg',
            {}
        ),
        _createWwwcPreset(
              2,
              'Sharpening',
              'getCustomMsg',
              {}
          ),
        _createWwwcPreset(
            3,
            'Smoothing',
            'getCustomMsg',
            {}
        ),
      ]
    }
  },
  {
    id: 'MeasureMoreTools',
    type: 'ohif.splitButton',
    props: {
      isRadio: true, // ?
      groupId: 'MeasureMoreTools',
      primary: ToolbarService._createActionButton(
          'Magnitude',
          'mm-more',
          'Magnitude',
          [
            {
              commandName: 'resetViewport',
              commandOptions: {},
              context: 'CORNERSTONE',
            },
          ],
          'Magnitude'
      ),
      secondary: {
        icon: 'chevron-down',
        label: '',
        isActive: true,
        tooltip: 'More',
      },
      isAction: true,
      renderer: WindowLevelMenuItem,
      items: [
        _createWwwcPreset(
            1,
            'Profile Text',
            'getProfileText',
            {},
        ),
        _createWwwcPreset(
            2,
            "Cobb's Angle",
            'setToolActive',
            {toolName: 'CobbAngle'},
        ),
        _createWwwcPreset(
            3,
            'FreeHand',
            'setToolActive',
        {toolName: 'PlanarFreehandROI'}
        ),
        _createWwwcPreset(
            4,
            'Area FreeHand',
            'setToolActive',
            {toolName: 'PlanarFreehandROI'}
        ),
        _createWwwcPreset(
            5,
            'Curve',
            'getCustomMsg',
            {}
        ),
        _createWwwcPreset(
            6,
            'Reset All',
            'resetAll',
            {}
        ),
      ]
    }
  },
];

export default moreTools;
