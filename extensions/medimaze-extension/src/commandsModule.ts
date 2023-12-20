import { Types as OhifTypes } from '@ohif/core';
import { CornerstoneServices } from '@ohif/extension-cornerstone';

function commandsModule({servicesManager, commandsManager,}: OhifTypes.Extensions.ExtensionParams): OhifTypes.Extensions.CommandsModule {

  const {
    measurementService,
  } = servicesManager.services as CornerstoneServices;

  const { measurementServiceSource } = this;

  const actions = {
    /**
     * Generates the selector props for the context menu, specific to
     * the cornerstone viewport, and then runs the context menu.
     **/

    // Our Custom functions

    getCustomMsg() {
      alert('Custom functionality called');
    },

    getCustomShowNew() {
      alert('Custom functionality New called');
    },

    getTextMsg() {
      alert('Text custom functionality called from medimaze!');
    },

    getHounceFieldUnit() {
      alert('Hounce Field Unit custom functionality called');
    },

    getViewTrueSizeImage() {
      alert('ViewTrueSizeImage Custom functionality called');
    },

    getCrop() {
      alert('Crop Custom functionality called');
    },

    getImageSort() {
      alert('ImageSort Custom functionality called');
    },

    getSynchronizer() {
      alert('Synchronizer Custom functionality called');
    },

    getCurve() {
      alert('Curve Custom functionality called');
    },

    getGeneralSetting() {
      alert('GeneralSetting Custom functionality called');
    },

    getAddPhoto() {
      const modalContainer = document.createElement('div');
      modalContainer.style.position = 'fixed';
      modalContainer.style.top = '0';
      modalContainer.style.left = '0';
      modalContainer.style.width = '100%';
      modalContainer.style.height = '100%';
      modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      modalContainer.style.display = 'flex';
      modalContainer.style.justifyContent = 'center';
      modalContainer.style.alignItems = 'center';

      const modalContent = document.createElement('div');
      modalContent.style.background = 'white';
      modalContent.style.padding = '20px';
      modalContent.style.borderRadius = '8px';
      modalContainer.appendChild(modalContent);

      const input = document.createElement('input');
      input.type = 'file';
      input.placeholder = 'Enter the image name';
      input.style.marginBottom = '10px';
      modalContent.appendChild(input);

      const saveButton = document.createElement('button');
      saveButton.textContent = 'Save';
      saveButton.style.color = '#ffffff';

      saveButton.style.borderRadius = '5px';
      saveButton.style.padding = '3px';
      saveButton.style.backgroundColor = '#313131';
      saveButton.style.marginRight = '10px';
      saveButton.addEventListener('click', () => {
        const imageName = input.value;
        console.log('Image name:', imageName);
        closeModal();
      });
      modalContent.appendChild(saveButton);

      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.style.backgroundColor = '#313131';
      cancelButton.style.borderRadius = '5px';
      cancelButton.style.padding = '3px';
      cancelButton.style.color = '#ffffff';
      cancelButton.addEventListener('click', () => {
        console.log('User canceled the operation');
        closeModal();
      });
      modalContent.appendChild(cancelButton);

      document.body.appendChild(modalContainer);

      const closeModal = () => {
        document.body.removeChild(modalContainer);
      };
    },

    getCopyImage() {
      alert('Copy Image Custom functionality called');
    },

    getSendData() {
      // alert(' SendData Custom functionality called');
      // window.open('https://google.com');
      window.open('https://www.google.com/', 'mozillaWindow', 'popup');
    },

    getBookmark() {
      alert('Bookmark Custom functionality called');
    },

    getPrint() {
      alert('Print Custom functionality called');
    },

    getDelete() {
      alert('Delete Custom functionality called');
    },

    getSave() {
      alert('Save Custom functionality called');
    },

    getClose() {
      const ans = confirm(
        'The webpage you are viewing is trying to close the tab.\nDo you want to close this tab?'
      );
      if (ans) {
        window.close();
      }
    },

    getReportfn() {
      window.open('https://google.com');
    },

    getViewNextImage() {
      alert('ViewNextImage Custom functionality called');
    },

    getViewCurrentImage() {
      alert('ViewCurrentImage Custom functionality called');
    },

    getPreviousImage() {
      alert('PreviousImage Custom functionality called');
    },

    getToggleOverlay() {
      alert('ToggleOverlay Custom functionality called');
    },

    getSelectDisselectAllSeries() {
      alert('SelectDisselectAllSeries Custom functionality called');
    },

    getSelectDisselectAllImagesSeries() {
      alert('SelectDisselectAllImagesSeries Custom functionality called');
    },

    getConvertImages() {
      alert('ConvertImages Custom functionality called');
    },

    getExportToPowerpoint() {
      alert('ExportToPowerpoint Custom functionality called');
    },

    getAssignKeywordToImages() {
      alert('AssignKeywordToImages Custom functionality called');
    },

    getCardioThoraricRotation() {
      alert('CardioThoraricRotation Custom functionality called');
    },

    getProfileText() {
      // alert('ProfileText Custom functionality called');
    },

    getPointer() {
      alert('Pointer Custom functionality called');
    },

    getHistory() {
      alert('History Custom functionality called');
    },

    getOrientation() {
      alert('Orientation Custom functionality called');
    },

    getTextPointer() {
      alert('TextPointer custom functionality called');
    },

    getViewTrueSizeImageMsg() {
      alert('ViewTrueSizeImageMsg custom functionality called!');
    },

    getTriangulation() {
      alert('Triangulation custom functionality called!');
    },

    getLocalizerAll() {
      alert('LocalizerAllTool custom functionality called!');
    },

    getLocalizerFirstToLast() {
      alert('LocalizerFirstToLast custom functionality called');
    },

    getLocalizerCurrent() {
      alert('LocalizerCurrent custom functionality called!');
    },

    getQuality() {
      alert('Quality custom functionality called!');
    },

    resetAll() {
      measurementService.clearMeasurements();
      console.log('reset all called');
    },

  };

  const definitions = {
    // The command here is to show the viewer context menu, as being the

    // Our custom message
    getTextMsg: {
      commandFn: actions.getTextMsg,
    },
    // Our custom message
    getHounceFieldUnit: {
      commandFn: actions.getHounceFieldUnit,
    },
    // Our custom message
    getViewTrueSizeImage: {
      commandFn: actions.getViewTrueSizeImage,
    },
    // Our custom message
    getCrop: {
      commandFn: actions.getCrop,
    },
    // Our custom message
    getImageSort: {
      commandFn: actions.getImageSort,
    },
    // Our custom message
    getSynchronizer: {
      commandFn: actions.getSynchronizer,
    },
    // Our custom message
    getCurve: {
      commandFn: actions.getCurve,
    },
    // Our custom message
    getGeneralSetting: {
      commandFn: actions.getGeneralSetting,
    },
    // Our custom message
    getAddPhoto: {
      commandFn: actions.getAddPhoto,
    },
    // Our custom message
    getCopyImage: {
      commandFn: actions.getCopyImage,
    },
    // Our custom message
    getSendData: {
      commandFn: actions.getSendData,
    },
    // Our custom message
    getBookmark: {
      commandFn: actions.getBookmark,
    },
    // Our custom message
    getPrint: {
      commandFn: actions.getPrint,
    },
    // Our custom message
    getDelete: {
      commandFn: actions.getDelete,
    },
    // Our custom message
    getSave: {
      commandFn: actions.getSave,
    },
    // Our custom message
    getClose: {
      commandFn: actions.getClose,
    },
    // Our custom message
    getReportfn: {
      commandFn: actions.getReportfn,
    },
    // Our custom message
    getViewNextImage: {
      commandFn: actions.getViewNextImage,
    },

    // Our custom message
    getViewCurrentImage: {
      commandFn: actions.getViewCurrentImage,
    },

    // Our custom message
    getPreviousImage: {
      commandFn: actions.getPreviousImage,
    },

    // Our custom message
    getToggleOverlay: {
      commandFn: actions.getToggleOverlay,
    },

    // Our custom message
    getSelectDisselectAllSeries: {
      commandFn: actions.getSelectDisselectAllSeries,
    },

    // Our custom message
    getSelectDisselectAllImagesSeries: {
      commandFn: actions.getSelectDisselectAllImagesSeries,
    },

    // Our custom message
    getConvertImages: {
      commandFn: actions.getConvertImages,
    },

    // Our custom message
    getExportToPowerpoint: {
      commandFn: actions.getExportToPowerpoint,
    },
    // Our custom message
    getAssignKeywordToImages: {
      commandFn: actions.getAssignKeywordToImages,
    },
    // Our custom message
    getCardioThoraricRotation: {
      commandFn: actions.getCardioThoraricRotation,
    },
    // Our custom message
    getProfileText: {
      commandFn: actions.getProfileText,
    },

    // Our history msg
    getHistory: {
      commandFn: actions.getHistory,
    },

    getTextPointer: {
      commandFn: actions.getTextPointer,
    },

    getPointer: {
      commandFn: actions.getPointer,
    },

    getOrientation: {
      commandFn: actions.getOrientation,
    },

    getViewTrueSizeImageMsg: {
      commandFn: actions.getViewTrueSizeImageMsg,
    },

    getTriangulation: {
      commandFn: actions.getTriangulation,
    },

    getLocalizerAll: {
      commandFn: actions.getLocalizerAll,
    },

    getLocalizerFirstToLast: {
      commandFn: actions.getLocalizerFirstToLast,
    },

    getLocalizerCurrent: {
      commandFn: actions.getLocalizerCurrent,
    },

    getQuality: {
      commandFn: actions.getQuality,
    },

    resetAll: {
      commandFn: actions.resetAll,
    },

    // Our custom message
    getCustomMsg: {
      commandFn: actions.getCustomMsg,
    },

    getCustomShowNew: {
      commandFn: actions.getCustomShowNew,
    },
  };

  return {
    actions,
    definitions,
    defaultContext: 'CORNERSTONE',
  };
}

export default commandsModule;
