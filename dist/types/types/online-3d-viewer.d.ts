// online-3d-viewer ships no type declarations. These cover only the part of its public API that
// wpp-media-viewer uses (see components/wpp-media-viewer/model-renderer.ts).
declare module 'online-3d-viewer' {
  export class Coord3D {
    constructor(x: number, y: number, z: number)
    x: number
    y: number
    z: number
    Clone(): Coord3D
    Length(): number
    Normalize(): Coord3D
    Offset(direction: Coord3D, distance: number): Coord3D
    Rotate(axis: Coord3D, angle: number, origo: Coord3D): Coord3D
  }

  export function SubCoord3D(a: Coord3D, b: Coord3D): Coord3D
  export function AddCoord3D(a: Coord3D, b: Coord3D): Coord3D
  export function CrossVector3D(a: Coord3D, b: Coord3D): Coord3D
  export function VectorAngle3D(a: Coord3D, b: Coord3D): number
  export function CoordDistance3D(a: Coord3D, b: Coord3D): number

  export class Camera {
    eye: Coord3D
    center: Coord3D
    up: Coord3D
    fov: number
    Clone(): Camera
  }

  export class RGBAColor {
    constructor(r: number, g: number, b: number, a: number)
  }

  export const NavigationMode: { FixedUpVector: number; FreeOrbit: number }
  export const Direction: { X: number; Y: number; Z: number }
  export const ImportErrorCode: {
    NoImportableFile: number
    FailedToLoadFile: number
    ImportFailed: number
    UnknownError: number
  }

  export interface ImportError {
    code: number
    mainFile: string | null
    message: string | null
  }

  export interface ImportModel {
    MeshCount(): number
    TriangleCount(): number
  }

  export interface ImportResult {
    model: ImportModel
    mainFile: string
    usedFiles: string[]
  }

  export interface BoundingSphere {
    center: { x: number; y: number; z: number }
    radius: number
  }

  export class InputFile {}
  export function InputFilesFromUrls(urls: string[]): InputFile[]
  export function InputFilesFromFileObjects(files: File[]): InputFile[]
  export function TransformFileHostUrls(urls: string[]): void

  export class ImportSettings {}

  export interface LoadCallbacks {
    onLoadStart: () => void
    onFileListProgress: (current: number, total: number) => void
    onFileLoadProgress: (current: number, total: number) => void
    onImportStart: () => void
    onVisualizationStart: () => void
    onModelFinished: (importResult: ImportResult, threeObject: object) => void
    onTextureLoaded: () => void
    onLoadError: (importError: ImportError) => void
  }

  export class ThreeModelLoader {
    LoadModel(inputFiles: InputFile[], settings: ImportSettings, callbacks: LoadCallbacks): void
    RevokeObjectUrls(): void
  }

  export class Viewer {
    settings: { animationSteps: number }
    /** The three.js renderer, once Init has run. */
    renderer: { resetState(): void }
    Init(canvas: HTMLCanvasElement): void
    Resize(width: number, height: number): void
    SetBackgroundColor(color: RGBAColor): void
    SetNavigationMode(navigationMode: number): void
    SetUpVector(upDirection: number, animate: boolean): void
    GetCamera(): Camera
    SetCamera(camera: Camera): void
    GetCanvas(): HTMLCanvasElement
    SetMainObject(object: object): void
    GetBoundingSphere(needToProcess: (meshUserData: unknown) => boolean): BoundingSphere | null
    AdjustClippingPlanesToSphere(boundingSphere: BoundingSphere): void
    FitSphereToWindow(boundingSphere: BoundingSphere | null, animation: boolean): void
    Clear(): void
    Render(): void
    Destroy(): void
  }

  export function DisposeThreeObjects(object: object): void

  /**
   * The engine's GPU driver check: draws a test pixel on a WebGL context. Runs once per page (patched). Given a canvas,
   * it draws on that canvas and leaves its context alive (patched); otherwise on a canvas of its own, then released.
   */
  export function HasHighpDriverIssue(canvas?: HTMLCanvasElement): boolean
}
