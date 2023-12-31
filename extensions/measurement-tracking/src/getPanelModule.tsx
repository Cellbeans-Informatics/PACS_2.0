import { Types } from '@ohif/core';
import { PanelMeasurementTableTracking, PanelStudyBrowserTracking } from './panels';

// TODO:
// - No loading UI exists yet
// - cancel promises when component is destroyed
// - show errors in UI for thumbnails if promise fails
function getPanelModule({ commandsManager, extensionManager, servicesManager }): Types.Panel[] {
  return [
    {
      name: 'seriesList',
      iconName: 'tab-studies',
      iconLabel: 'Studies',
      // label: 'Studies',
      label: '',
      component: PanelStudyBrowserTracking.bind(null, {
        commandsManager,
        extensionManager,
        servicesManager,
      }),
    },

    {
      name: 'trackedMeasurements',
      iconName: 'tab-linear',
      iconLabel: 'Measure',
      label: 'Measurements',
      component: PanelMeasurementTableTracking.bind(null, {
        commandsManager,
        extensionManager,
        servicesManager,
      }),
    },
  ];
}

export default getPanelModule;
