import { init, addTool } from '@cornerstonejs/tools';

import {
  TextTool,
  ViewTrueSizeImageTool,
  CropTool,
  ImageSortTool,
  LocalizerAllTool,
  LocalizerFirstToLastTool,
  LocalizerCurrentTool,
  SynchronizerTool,
  CurveTool,
  GeneralSettingsTool,
  AddPhotoTool,
  SelectDisselectAllSeriesTool,
  SelectDisselectImagesSeriesTool,
  CopyImageTool,
  BookmarkTool,
  PrintTool,
  SaveTool,
  DeleteTool,
  CloseTool,
  HounceFieldUnitTool,
  TriangulationTool,
  QualityTool,
  CardioThoraricRotationTool,
  EditAnnotationTool,
  ProfileTextTool,
  ExportToPowerpointTool,
  AssignKeywordToImagesTool,
  SplitStudyTool,
  SplitSeriesTool,
  EdgeDetectionTool,
  ImageFilterTool,
  ReportTool,
  PreviousImageTool,
  ViewNextImageTool,
  ViewCurrentImageTool,
  ToggleOverlayTool,
  ConvertImagesTool,
  HistoryTool,
  PointerTool,
  TextPointerTool,
  OrientationTool,
} from './mmTools';

import { CrosshairsTool, ReferenceLinesTool } from '@cornerstonejs/tools';

export default function initMedimazeTools(configuration = {}) {
  CrosshairsTool.isAnnotation = true;
  ReferenceLinesTool.isAnnotation = true;
  init(configuration);
  addTool(TextTool);
  addTool(ViewTrueSizeImageTool);
  addTool(CropTool);
  addTool(ImageSortTool);
  addTool(SynchronizerTool);
  addTool(GeneralSettingsTool);
  addTool(AddPhotoTool);
  addTool(CopyImageTool);
  addTool(BookmarkTool);
  addTool(PrintTool);
  addTool(SaveTool);
  addTool(DeleteTool);
  addTool(CloseTool);
  addTool(HounceFieldUnitTool);
  addTool(TriangulationTool);
  addTool(LocalizerAllTool);
  addTool(LocalizerFirstToLastTool);
  addTool(LocalizerCurrentTool);
  addTool(QualityTool);
  addTool(CardioThoraricRotationTool);
  addTool(EditAnnotationTool);
  addTool(ProfileTextTool);
  addTool(SelectDisselectAllSeriesTool);
  addTool(SelectDisselectImagesSeriesTool);
  addTool(ExportToPowerpointTool);
  addTool(AssignKeywordToImagesTool);
  addTool(SplitStudyTool);
  addTool(SplitSeriesTool);
  addTool(EdgeDetectionTool);
  addTool(ImageFilterTool);
  addTool(ReportTool);
  addTool(PreviousImageTool);
  addTool(ViewNextImageTool);
  addTool(ViewCurrentImageTool);
  addTool(ToggleOverlayTool);
  addTool(ConvertImagesTool);
  addTool(HistoryTool);
  addTool(PointerTool);
  addTool(TextPointerTool);
  addTool(OrientationTool);
  addTool(ReferenceLinesTool);
}

const toolNames = {
  TextTool: TextTool.toolName,
  ViewTrueSizeImageTool: ViewTrueSizeImageTool.toolName,
  CropTool: CropTool.toolName,
  ImageSortTool: ImageSortTool.toolName,
  SynchronizerTool: SynchronizerTool.toolName,
  CurveTool: CurveTool.toolName,
  GeneralSettingsTool: GeneralSettingsTool.toolName,
  AddPhotoTool: AddPhotoTool.toolName,
  CopyImageTool: CopyImageTool.toolName,
  BookmarkTool: BookmarkTool.toolName,
  PrintTool: PrintTool.toolName,
  SaveTool: SaveTool.toolName,
  DeleteTool: DeleteTool.toolName,
  CloseTool: CloseTool.toolName,
  HounceFieldUnitTool: HounceFieldUnitTool.toolName,
  TriangulationTool: TriangulationTool.toolName,
  LocalizerAllTool: LocalizerAllTool.toolName,
  LocalizerFirstToLastTool: LocalizerFirstToLastTool.toolName,
  LocalizerCurrentTool: LocalizerCurrentTool.toolName,
  QualityTool: QualityTool.toolName,
  CardioThoraricRotationTool: CardioThoraricRotationTool.toolName,
  EditAnnotationTool: EditAnnotationTool.toolName,
  ProfileTextTool: ProfileTextTool.toolName,
  SelectDisselectAllSeriesTool: SelectDisselectAllSeriesTool.toolName,
  SelectDisselectImagesSeriesTool: SelectDisselectImagesSeriesTool.toolName,
  ExportToPowerpointTool: ExportToPowerpointTool.toolName,
  AssignKeywordToImagesTool: AssignKeywordToImagesTool.toolName,
  SplitStudyTool: SplitStudyTool.toolName,
  SplitSeriesTool: SplitSeriesTool.toolName,
  EdgeDetectionTool: EdgeDetectionTool.toolName,
  ImageFilterTool: ImageFilterTool.toolName,
  ReportTool: ReportTool.toolName,
  PreviousImageTool: PreviousImageTool.toolName,
  ViewNextImageTool: ViewNextImageTool.toolName,
  ViewCurrentImageTool: ViewCurrentImageTool.toolName,
  ToggleOverlayTool: ToggleOverlayTool.toolName,
  ConvertImagesTool: ConvertImagesTool.toolName,
  HistoryTool: HistoryTool.toolName,
  PointerTool: PointerTool.toolName,
  TextPointerTool: TextPointerTool.toolName,
  OrientationTool: OrientationTool.toolName,
  ReferenceLines: ReferenceLinesTool.toolName,
};

export { toolNames };
