import { BaseTool } from '@cornerstonejs/tools';
import { EventTypes, PublicToolProps, ToolProps } from '@cornerstonejs/tools/src/types';
import { getEnabledElement, Types } from '@cornerstonejs/core';
import { MouseClickEventType } from "@cornerstonejs/tools/src/types/EventTypes";

class TextTool extends BaseTool {
  static toolName;
  constructor(
    toolProps: PublicToolProps = {},
    defaultToolProps: ToolProps = {
      supportedInteractionTypes: ['Mouse', 'Touch'],
    }
  ) {
    super(toolProps, defaultToolProps);
  }

  touchDragCallback(evt: EventTypes.InteractionEventType) {
    this._dragCallback(evt);
  }

  mouseDragCallback(evt: EventTypes.InteractionEventType) {
    this._dragCallback(evt);
  }

  mouseClickCallback(evt: EventTypes.MouseClickEventType) {
    // alert(`Clicked on Text tool`);
    // console.log('Clicked on Text Tool');
    this._mouseClickCallback(evt);
  }

  _mouseClickCallback() {
    alert("Clicked!!");
  }

  _dragCallback(evt: EventTypes.InteractionEventType) {
    const { element, deltaPoints } = evt.detail;
    const enabledElement = getEnabledElement(element);

    const deltaPointsWorld = deltaPoints.world;
    const camera = enabledElement.viewport.getCamera();
    const { focalPoint, position } = camera;

    const updatedPosition = [
      position[0] - deltaPointsWorld[0],
      position[1] - deltaPointsWorld[1],
      position[2] - deltaPointsWorld[2],
    ] as Types.Point3;

    const updatedFocalPoint = [
      focalPoint[0] - deltaPointsWorld[0],
      focalPoint[1] - deltaPointsWorld[1],
      focalPoint[2] - deltaPointsWorld[2],
    ] as Types.Point3;

    enabledElement.viewport.setCamera({
      focalPoint: updatedFocalPoint,
      position: updatedPosition,
    });
    enabledElement.viewport.render();
  }
}
TextTool.toolName = 'Text';
export default TextTool;
