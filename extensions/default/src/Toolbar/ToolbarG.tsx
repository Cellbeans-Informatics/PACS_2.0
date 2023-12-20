// This is my code
import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { useViewportGrid } from '@ohif/ui';
import { id } from '../id';

const SectionsOfToolbar = ({ toolbarButtons, txt, title, onInteraction, servicesManager }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '400px' }}>
      <div style={{ color: 'black' }}>
        <div
          style={{
            backgroundColor: 'black',
            height: '40px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {toolbarButtons.map(toolDef => {
            const { id, Component, componentProps } = toolDef;
            console.log(id, 'id from toolbar');
            return (
              // The margin for separating the tools on the toolbar should go here and NOT in each individual component (button) item.
              // This allows for the individual items to be included in other UI components where perhaps alternative margins are desired.
              <div
                key={id}
                className={classnames('mr-1')}
              >
                <Component
                  id={id}
                  {...componentProps}
                  onInteraction={onInteraction}
                  servicesManager={servicesManager}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ color: 'black', marginTop: '2px' }}>
        <div style={{ backgroundColor: 'black', height: '40px' }}>{txt}</div>
      </div>
      <div style={{ color: 'black' }}>
        <div
          style={{
            backgroundColor: 'black',
            borderTop: '1px solid grey',
            height: '15px',
            textAlign: 'center',
            color: 'white',
            fontSize: '11px',
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
};

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

  return (
    <div style={{ display: 'flex', width: '100%', justifyContent: 'normal' }}>
      {/* <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '3px', width: '400px' }}>
        <div style={{ color: 'black' }}>
          <div
            style={{
              backgroundColor: 'black',
              height: '40px',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {toolbarButtons.map(toolDef => {
              const { id, Component, componentProps } = toolDef;
              console.log(id, 'id from toolbar');
              return (
                // The margin for separating the tools on the toolbar should go here and NOT in each individual component (button) item.
                // This allows for the individual items to be included in other UI components where perhaps alternative margins are desired.
                <div
                  key={id}
                  className={classnames('mr-1')}
                >
                  <Component
                    id={id}
                    {...componentProps}
                    onInteraction={onInteraction}
                    servicesManager={servicesManager}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ color: 'black', marginTop: '2px' }}>
          <div style={{ backgroundColor: 'black', height: '40px' }}>tool</div>
        </div>
        <div style={{ color: 'black' }}>
          <div
            style={{
              backgroundColor: 'black',
              borderTop: '1px solid grey',
              height: '15px',
              textAlign: 'center',
              color: 'white',
              fontSize: '11px',
            }}
          >
            Favorites
          </div>
        </div>
      </div> */}
      <SectionsOfToolbar
        toolbarButtons={toolbarButtons}
        txt="Tool"
        title="fav"
        onInteraction={onInteraction}
        servicesManager={servicesManager}
      />
    </div>
  );
}
