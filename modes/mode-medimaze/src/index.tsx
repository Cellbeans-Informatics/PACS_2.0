import { hotkeys } from '@ohif/core';
import { id } from './id';
import initToolGroups from './initToolGroups';
import toolbarButtons from './toolbarButtons';
import moreTools from './moreTools';
import moreToolsMpr from './moreToolsMpr';

const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  hangingProtocol: '@ohif/extension-default.hangingProtocolModule.default',
  leftPanel: '@ohif/extension-cornerstone-dicom-seg.panelModule.panelSegmentation',
  rightPanel: '@ohif/extension-default.panelModule.measure',
};
const tracked = {
  measurements: '@ohif/extension-measurement-tracking.panelModule.trackedMeasurements',
  thumbnailList: '@ohif/extension-measurement-tracking.panelModule.seriesList',
  viewport: '@ohif/extension-measurement-tracking.viewportModule.cornerstone-tracked',
};

const cornerstone = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone',
};
const DEFAULT_TOOL_GROUP_ID = 'default';
const MPR_TOOL_GROUP_ID = 'mpr';
/**
 * Just two dependencies to be able to render a viewport with panels in order
 * to make sure that the mode is working.
 */
const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-measurement-tracking': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-sr': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-seg': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-rt': '^3.0.0',
  '@ohif/extension-dicom-pdf': '^3.0.1',
  '@ohif/extension-dicom-video': '^3.0.1',
  'medimaze-extension': '^0.0.1',
};

function modeFactory({ modeConfiguration }) {
  return {
    /**
     * Mode ID, which should be unique among modes used by the viewer. This ID
     * is used to identify the mode in the viewer's state.
     */
    id,
    routeName: 'template',
    /**
     * Mode name, which is displayed in the viewer's UI in the workList, for the
     * user to select the mode.
     */
    displayName: 'Medimaze Mode',
    /**
     * Runs when the Mode Route is mounted to the DOM. Usually used to initialize
     * Services and other resources.
     */
    onModeEnter: ({ servicesManager, extensionManager, commandsManager }) => {
      const { measurementService, toolbarService, toolGroupService } = servicesManager.services;

      measurementService.clearMeasurements();

      // Init Default and SR ToolGroups
      initToolGroups(extensionManager, toolGroupService, commandsManager);

      let unsubscribe;

      const activateTool = () => {
        toolbarService.recordInteraction({
          groupId: 'WindowLevel',
          interactionType: 'tool',
          commands: [
            {
              commandName: 'setToolActive',
              commandOptions: {
                toolName: 'WindowLevel',
              },
              context: 'CORNERSTONE',
            },
          ],
        });

        // We don't need to reset the active tool whenever a viewport is getting
        // added to the toolGroup.
        unsubscribe();
      };

      // Since we only have one viewport for the basic cs3d mode and it has
      // only one hanging protocol, we can just use the first viewport
      ({ unsubscribe } = toolGroupService.subscribe(
        toolGroupService.EVENTS.VIEWPORT_ADDED,
        activateTool
      ));

      // toolbarService.init(extensionManager);
      // toolbarService.addButtons(toolbarButtons);
      toolbarService.init(extensionManager);
      toolbarService.addButtons([...toolbarButtons, ...moreTools, ...moreToolsMpr]);
      toolbarService.createButtonSection(DEFAULT_TOOL_GROUP_ID, [
        // 'MeasurementTools',
        'Zoom',
        'WindowLevel',
        'Pan',
        'Capture',
        'Layout',
        'MPR',
        // 'MoreTools',
        'FlipHorizontal',
        'RotateRight',
        'ReferenceLines',
        'StackImageSync',
        'ImageOverlayViewer',
        'StackScroll',
        'Invert',
        'Cine',
        'Probe',
        'Angle',
        'Magnify',
        // 'Rectangle',
        'Calibration',
        'TagBrowser',
        // Changes
        'FlipVertical',
        'CobbAngle',
        'PlanarFreehandROI',
        'PlanarRotateTool',
        // 'Text',
        'AdvancedMagnifyTool',
        'Reset',
        // 'NewTools',
        'Text',
        'ViewTrueSizeImage',
        'Crop',
        'ImageSort',
        'Synchronizer',
        'Curve',
        'GeneralSetting',
        'AddPhoto',
        'CopyImage',
        'SendData',
        'Bookmark',
        'Print',
        'Save',
        'Close',
        'Report',
        'PreviousImage',
        'ViewNextImage',
        'ViewCurrentImage',
        'ToggleOverlay',
        'SelectDisselectAllSeries',
        'SelectDisselectAllImagesSeries',
        'ConvertImages',
        'ExportToPowerpoint',
        'AssignKeywordToImages',
        'ImageFilter',
        'CardioThoraricRotation',
        'ProfileText',
        'History',
        'Pointer',
        'TextPointer',
        'Orientation',
        'Triangulation',
        'LocalizerAll',
        'LocalizerFirstToLast',
        'LocalizerCurrent',
        'Quality',
        'Cine',
        'MeasureMoreTools',
        //   changes made by Sreerag
        'PlanarFreehandROI',
        'AreaFreehand',
        'VolumeRotateMouseWheel',
        'ScaleOverlay',
        'MIPJumpToClick',
        'Circle',
        'Ellipse',
        'Layout',
        'Length',
        'ArrowAnnotate',
        'Reset',
        'Synchronizer',
        'TextMarker',
      ]);
      toolbarService.createButtonSection(MPR_TOOL_GROUP_ID, [
        // 'MeasurementTools',
        'Zoom',
        'WindowLevel',
        'Pan',
        'Capture',
        'Layout',
        'MPR',
        'Crosshairs',
        'MoreToolsMpr',
        'FlipHorizontal',
        'RotateRight',
        'StackImageSync',
        'ImageOverlayViewer',
        'ReferenceLines',
        'StackScroll',
        'Invert',
        'Cine',
        'Probe',
        // 'Angle',
        'Magnify',
        // 'Rectangle',
        'Calibration',
        'TagBrowser',
        // Changes
        'FlipVertical',
        'CobbAngle',
        'PlanarFreehandROI',
        'PlanarRotateTool',
        'AdvancedMagnifyTool',
        // Drop down
        // 'NewTools',
        //new tools test
        'Zoom',
        'WindowLevel',
        'Pan',
        'Capture',
        'Layout',
        'MPR',
        'MoreTools',
        'FlipHorizontal',
        'RotateRight',
        'ReferenceLines',
        'StackImageSync',
        'ImageOverlayViewer',
        'StackScroll',
        'Invert',
        'Cine',
        'Probe',
        'Angle',
        'Magnify',
        // 'Rectangle',
        'Calibration',
        'TagBrowser',
        // Changes
        'FlipVertical',
        'CobbAngle',
        'PlanarFreehandROI',
        'PlanarRotateTool',
        // 'Text',
        'AdvancedMagnifyTool',
        'Reset',
        'NewTools',
        'Text',
        'ViewTrueSizeImage',
        'Crop',
        'ImageSort',
        'Synchronizer',
        'Curve',
        'GeneralSetting',
        'AddPhoto',
        'CopyImage',
        'SendData',
        'Bookmark',
        'Print',
        'Save',
        'Close',
        'Report',
        'PreviousImage',
        'ViewNextImage',
        'ViewCurrentImage',
        'ToggleOverlay',
        'SelectDisselectAllSeries',
        'SelectDisselectAllImagesSeries',
        'ConvertImages',
        'ExportToPowerpoint',
        'AssignKeywordToImages',
        'ImageFilter',
        'CardioThoraricRotation',
        'ProfileText',
        'History',
        'Pointer',
        'TextPointer',
        'Orientation',
        'Triangulation',
        'LocalizerAll',
        'LocalizerFirstToLast',
        'LocalizerCurrent',
        'Quality',
        'Cine',
        'MeasureMoreTools',
        //   changes made by Sreerag
        'PlanarFreehandROI',
        'AreaFreehand',
        'VolumeRotateMouseWheel',
        'ScaleOverlay',
        'MIPJumpToClick',
        'Circle',
        'Ellipse',
        'Layout',
        'Length',
        'ArrowAnnotate',
        'Reset',
        'Synchronizer',
        'TextMarker',
      ]);
    },
    onModeExit: ({ servicesManager }) => {
      const {
        toolGroupService,
        syncGroupService,
        toolbarService,
        segmentationService,
        cornerstoneViewportService,
      } = servicesManager.services;

      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    /** */
    validationTags: {
      study: [],
      series: [],
    },
    /**
     * A boolean return value that indicates whether the mode is valid for the
     * modalities of the selected studies. For instance a PET/CT mode should be
     */
    isValidMode: ({ modalities }) => true,
    /**
     * Mode Routes are used to define the mode's behavior. A list of Mode Route
     * that includes the mode's path and the layout to be used. The layout will
     * include the components that are used in the layout. For instance, if the
     * default layoutTemplate is used (id: '@ohif/extension-default.layoutTemplateModule.viewerLayout')
     * it will include the leftPanels, rightPanels, and viewports. However, if
     * you define another layoutTemplate that includes a Footer for instance,
     * you should provide the Footer component here too. Note: We use Strings
     * to reference the component's ID as they are registered in the internal
     * ExtensionManager. The template for the string is:
     * `${extensionId}.{moduleType}.${componentId}`.
     */
    routes: [
      {
        path: 'template',
        layoutTemplate: ({ location, servicesManager }) => {
          return {
            id: ohif.layout,
            props: {
              leftPanels: [tracked.thumbnailList],
              rightPanels: [ohif.rightPanel],
              viewports: [
                {
                  namespace: cornerstone.viewport,
                  displaySetsToDisplay: [ohif.sopClassHandler],
                },
              ],
            },
          };
        },
      },
    ],
    /** List of extensions that are used by the mode */
    extensions: extensionDependencies,
    /** HangingProtocol used by the mode */
    // hangingProtocol: [''],
    /** SopClassHandlers used by the mode */
    sopClassHandlers: [ohif.sopClassHandler],
    /** hotkeys for mode */
    hotkeys: [...hotkeys.defaults.hotkeyBindings],
  };
}

const mode = {
  id,
  modeFactory,
  extensionDependencies,
};

export default mode;
