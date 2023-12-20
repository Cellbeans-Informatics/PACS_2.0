import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { useViewportGrid } from '@ohif/ui';
import Svg from '../../../../platform/ui/src/components/Svg';
interface ToolbarSectionProps {
  title: string;
  buttons: any[]; // Update this to the actual type of buttons
  servicesManager: Types.Extensions.ExtensionParams;
  onInteraction: (args: any) => any;
  sectionWidth?: string; // Make sectionWidth optional
}

// const toolbarSectionStyle = {
//   color: 'black',
//   display: 'flex',
//   flexDirection: 'column',
//   marginLeft: '3px',
//   width: '400px', // Default width
// };

const sectionHeaderStyle = {
  backgroundColor: '#383838',
  height: '40px',
  display: 'flex',
  flexDirection: 'row',
  paddingRight: '94px',
};

const subsectionHeaderStyle = {
  backgroundColor: '#313131',
  borderTop: '1px solid grey',
  height: '17px',
  textAlign: 'center',
  // color: 'white',
  color: '#7F7F7F',
  fontSize: '11px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// ... (previous imports)

const ToolbarSection: React.FC<ToolbarSectionProps> = ({
  title,
  buttons,
  servicesManager,
  onInteraction,
  sectionWidth,
}) => {
  const upperSectionButtons = buttons.slice(0, 6);
  const lowerSectionButtons = buttons.slice(6);

  return (
    <div style={{ flex: '1', minWidth: '0', width: sectionWidth || '100%' }}>
      <div style={subsectionHeaderStyle}>
        <span className={classnames('mr-1')}>{title}</span>
      </div>
      <div style={sectionHeaderStyle}>
        {upperSectionButtons.map(toolDef => (
          <div
            key={toolDef.id}
            className={classnames('mr-1')}
          >
            <toolDef.Component
              id={toolDef.id}
              {...toolDef.componentProps}
              onInteraction={onInteraction}
              servicesManager={servicesManager}
            />
          </div>
        ))}
      </div>
      <div style={{ ...sectionHeaderStyle }}>
        {lowerSectionButtons.map(toolDef => (
          <div
            key={toolDef.id}
            className={classnames('mr-1')}
          >
            <toolDef.Component
              id={toolDef.id}
              {...toolDef.componentProps}
              onInteraction={onInteraction}
              servicesManager={servicesManager}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface NavbarProps {
  onNavbarButtonClick: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavbarButtonClick }) => {
  // const [submenus, setSubmenus] = useState({
  //   File: ['New', 'Open', 'Save', 'Exit'],
  //   Edit: ['Cut', 'Copy', 'Paste', 'Undo', 'Redo'],
  //   View: ['Zoom In', 'Zoom Out', 'Fit to Screen'],
  //   Object: ['Insert', 'Delete', 'Modify'],
  //   Tool: ['Select', 'Draw', 'Measure'],
  //   Window: ['Tile', 'Cascade', 'Minimize All'],
  //   Help: ['About', 'Documentation', 'Support'],
  // });

  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const handleSubmenuClick = (section: string) => {
    setActiveSubmenu(activeSubmenu === section ? null : section);
  };

  const handleSubmenuItem = (submenuItem: string) => {
    // Handle submenu item click
    console.log(`Clicked on ${submenuItem} submenu item`);
    // Add additional logic or actions as needed
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#313131',
        color: '#ffffff',
        padding: '10px',
        fontSize: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            {' '}
            <Svg name="logo-navbar" />
          </div>

          {/* Main menu items with submenus */}
          {/* {Object.keys(submenus).map(section => (
            <div
              key={section}
              style={{ position: 'relative', display: 'inline-block', marginLeft: '20px' }}
            >
              <button onClick={() => onNavbarButtonClick(section)}>{section}</button>
              {activeSubmenu === section && (
                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: '#313131',
                    color: '#ffffff',
                    top: '100%',
                    left: 10,
                    minWidth: '150px',
                    padding: '10px',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '10px',
                  }}
                >
                  {submenus[section].map(submenuItem => (
                    <button
                      key={submenuItem}
                      onClick={() => handleSubmenuItem(submenuItem)}
                    >
                      {submenuItem}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};
// ... (rest of the code)

const VerticalLine = () => (
  <div
    style={{
      borderLeft: '1px solid black',
      height: '100%',
      margin: '0 1px', // Adjust margin as needed
    }}
  />
);
export default function Toolbar({
  servicesManager,
}: Types.Extensions.ExtensionParams): React.ReactElement {
  const { toolbarService } = servicesManager.services;
  const [viewportGrid, viewportGridService] = useViewportGrid();
  const [toolbarButtons, setToolbarButtons] = useState([]);

  useEffect(() => {
    const updateToolbar = () => {
      const toolGroupId =
        viewportGridService.getActiveViewportOptionByKey('toolGroupId') ?? 'default';
      setToolbarButtons(toolbarService.getButtonSection(toolGroupId));
    };

    const { unsubscribe } = toolbarService.subscribe(
      toolbarService.EVENTS.TOOL_BAR_MODIFIED,
      updateToolbar
    );

    updateToolbar();

    return () => {
      unsubscribe();
    };
  }, [toolbarService, viewportGrid]);

  const onInteraction = useCallback(
    args => toolbarService.recordInteraction(args),
    [toolbarService]
  );

  const filteredFavButtons = toolbarButtons.filter(toolDef =>
    [
      'Length',
      'Magnify',
      'Invert',
      // 'WindowLevel',
      // 'Zoom',
      'MeasurementTools',
      'Angle',
      // 'Text',
      'Circle',
      'Ellipse',
      'HounceFieldUnit',
      // 'History',
      'Cine',
      'Capture',
      // 'Quality',
    ].includes(toolDef.id)
  );

  const uniquefilteredFavButtons = filteredFavButtons.filter(
    (toolDef, index, self) => index === self.findIndex(t => t.id === toolDef.id)
  );

  const filteredToolButtons = toolbarButtons.filter(toolDef =>
    [
      // 'WindowLevel',
      // 'ViewTrueSizeImage',

      // 'LocalizerFirstToLast',

      // 'Quality',
      // 'Triangulation',
      'Invert',
      'Pan',
      // 'Orientation',
      'Probe',
      'Zoom',
      'MPR',
      // 'WindowLevel',
      'RotateRight',
      'FlipHorizontal',
      // 'TextMarkerTool',
      'StackScroll',
      // 'Crop',
      // 'ImageSort',
    ].includes(toolDef.id)
  );

  const uniquefilteredToolButtons = filteredToolButtons.filter(
    (toolDef, index, self) => index === self.findIndex(t => t.id === toolDef.id)
  );

  const filteredMeasurementButtons = toolbarButtons.filter(toolDef =>
    [
      'WindowLevel',
      'MeasurementTools',
      'Angle',
      'CardioThoraricRotation',
      // 'Text',
      // 'LocalizerCurrent',
      'HounceFieldUnit',
      // 'Pointer',
      // 'PlanarFreehandROI',
      // 'AreaFreehand',
      // 'TextPointer',
      // 'ProfileText',
      'Angle',
      // 'Length',
      // 'Curve',
      'MeasureMoreTools',
      // 'CobbAngle',
      'Quality',
    ].includes(toolDef.id)
  );

  const uniqueFilteredMeasurementButtons = filteredMeasurementButtons.filter(
    (toolDef, index, self) => index === self.findIndex(t => t.id === toolDef.id)
  );

  const filteredOthersButtons = toolbarButtons.filter(toolDef =>
    [
      'Reset',
      'TagBrowser',
      'Layout',
      'GeneralSetting',
      'AddPhoto',
      'ToggleOverlay',
      // 'SelectDisselectAllSeries',
      // 'SelectDisselectAllImagesSeries',
      // 'ConvertImages',
      // 'ExportToPowerpoint',
      // 'AssignKeywordToImages',
      // 'SplitStudy',
      // 'SplitSeries',
      'EdgeDetection',
      'ImageFilter',
      'CopyImage',
      'SendData',
    ].includes(toolDef.id)
  );

  const uniqueFilteredOthersButtons = filteredOthersButtons.filter(
    (toolDef, index, self) => index === self.findIndex(t => t.id === toolDef.id)
  );

  // TODO: There are some diff buttons
  const filterInvariableOptions = toolbarButtons.filter(toolDef =>
    [
      // 'LocalizerAll',
      // 'Bookmark',
      // 'Print',
      // 'Report',
      'Save',
      'Close',
      'PreviousImage',
      'ViewNextImage',
      'ReferenceLines',
      'ArrowAnnotate',
      // 'TextMarker',
      // 'ViewCurrentImage',
    ].includes(toolDef.id)
  );
  const filterAddMore = toolbarButtons.filter(toolDef => [].includes(toolDef.id));
  const uniqueFilteredInvariableButtons = filterInvariableOptions.filter(
    (toolDef, index, self) => index === self.findIndex(t => t.id === toolDef.id)
  );

  const handleNavbarButtonClick = (section: string) => {
    // Handle the click event for navbar buttons if needed
    // You can perform specific actions or navigate to different sections
    console.log(`Clicked on ${section}     clicke button`);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'normal' }}>
        <ToolbarSection
          title="Frequently Used"
          buttons={uniquefilteredFavButtons}
          servicesManager={servicesManager}
          onInteraction={onInteraction}
        />
        <VerticalLine />
        <ToolbarSection
          title="Tools"
          buttons={uniquefilteredToolButtons}
          servicesManager={servicesManager}
          onInteraction={onInteraction}
          sectionWidth="35%"
        />
        <VerticalLine />
        <ToolbarSection
          title="Measurements & Annotations"
          buttons={uniqueFilteredMeasurementButtons}
          servicesManager={servicesManager}
          onInteraction={onInteraction}
          sectionWidth="25%"
        />
        <VerticalLine />
        <ToolbarSection
          title="Others"
          buttons={uniqueFilteredOthersButtons}
          servicesManager={servicesManager}
          onInteraction={onInteraction}
          sectionWidth="25%"
        />
        <VerticalLine />
        <ToolbarSection
          title="Invariable Options"
          buttons={uniqueFilteredInvariableButtons}
          servicesManager={servicesManager}
          onInteraction={onInteraction}
          sectionWidth="25%"
        />
        <VerticalLine />
        {/* <ToolbarSection
          title=""
          buttons={filterAddMore}
          servicesManager={servicesManager}
          onInteraction={onInteraction}
          sectionWidth="25%"
        /> */}
      </div>
    </div>
  );
}
