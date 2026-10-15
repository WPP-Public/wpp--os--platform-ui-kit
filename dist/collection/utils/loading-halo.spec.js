import { execFileSync } from 'child_process';
import { dirname, join } from 'path';
const MIXIN_PATH = join(__dirname, '..', 'global', 'loadingHalo.scss');
const SASS_CLI_PATH = join(dirname(require.resolve('sass')), 'sass.js');
// Compiles a snippet with the mixin file injected, the same way Stencil's `injectGlobalPaths` does.
// Sass runs in a separate process, as it does not run against the mocked DOM globals of the spec environment.
const compile = (scss) => execFileSync(process.execPath, [SASS_CLI_PATH, '--stdin', '--no-source-map'], {
  input: `@import '${MIXIN_PATH}';\n${scss}`,
  encoding: 'utf8',
});
// Returns the declarations of the first rule matching the given selector.
const getRule = (css, selector) => {
  const start = css.indexOf(`${selector} {`);
  return start === -1 ? '' : css.slice(start, css.indexOf('}', start) + 1);
};
describe('registerLoadingHaloAngle', () => {
  let registerProperty;
  let cssGetter;
  let registerLoadingHaloAngle;
  beforeEach(() => {
    registerProperty = jest.fn();
    // The mocked window only exposes `CSS` through a getter.
    cssGetter = jest.spyOn(globalThis, 'CSS', 'get').mockReturnValue({ registerProperty });
    // The registration flag is module-level, so each test gets a fresh module.
    jest.isolateModules(() => {
      registerLoadingHaloAngle = jest.requireActual('./loading-halo').registerLoadingHaloAngle;
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should register the halo angle as a non-inherited <angle> custom property', () => {
    registerLoadingHaloAngle();
    expect(registerProperty).toHaveBeenCalledWith({
      name: '--wpp-loading-halo-angle',
      syntax: '<angle>',
      initialValue: '0deg',
      inherits: false,
    });
  });
  it('should register the property only once across calls', () => {
    registerLoadingHaloAngle();
    registerLoadingHaloAngle();
    expect(registerProperty).toHaveBeenCalledTimes(1);
  });
  it('should not throw when the property is already registered', () => {
    registerProperty.mockImplementation(() => {
      throw new Error('InvalidModificationError');
    });
    expect(() => registerLoadingHaloAngle()).not.toThrow();
  });
  it('should do nothing when CSS.registerProperty is not supported', () => {
    cssGetter.mockReturnValue({});
    expect(() => registerLoadingHaloAngle()).not.toThrow();
  });
});
describe('loadingHalo mixin', () => {
  it('should not output any CSS when the file is only injected', () => {
    expect(compile('').trim()).toBe('');
  });
  it('should draw the ring right outside the element and the glow past it, using the radius', () => {
    const css = compile('.target { @include loadingHalo(12px); }');
    const ring = getRule(css, '.target::after');
    const glow = getRule(css, '.target::before');
    expect(ring).toContain('inset: calc(-1 * (0px + 2px));');
    expect(ring).toContain('border-radius: calc(12px + 2px);');
    expect(glow).toContain('inset: calc(-1 * (0px + 2px + 13px));');
    expect(glow).toContain('filter: blur(10px);');
    expect(glow).toContain('border-radius: calc(12px + 2px + 6px);');
  });
  it('should rotate the ring and the glow in sync', () => {
    const css = compile('.target { @include loadingHalo(12px); }');
    expect(getRule(css, '.target::after')).toContain('animation: wpp-loading-halo-rotate 2s linear infinite;');
    expect(getRule(css, '.target::before')).toContain('animation: wpp-loading-halo-rotate 2s linear infinite;');
    expect(css).toMatch(/@keyframes wpp-loading-halo-rotate \{\s*to \{\s*--wpp-loading-halo-angle: 360deg;/);
  });
  it('should apply the ring width, offset and z-index parameters', () => {
    const css = compile('.target { @include loadingHalo(var(--radius), 3px, 1px, -1); }');
    const ring = getRule(css, '.target::after');
    expect(ring).toContain('z-index: -1;');
    expect(ring).toContain('inset: calc(-1 * (1px + 3px));');
    expect(ring).toContain('border-radius: calc(var(--radius) + 3px);');
    expect(getRule(css, '.target::before')).toContain('z-index: -1;');
  });
  it('should replace the animation with a static border when reduced motion is requested', () => {
    const css = compile('.target { @include loadingHalo(12px); }');
    const reducedMotion = css.slice(css.indexOf('@media (prefers-reduced-motion: reduce)'));
    expect(getRule(reducedMotion, '.target::before')).toContain('display: none;');
    expect(getRule(reducedMotion, '.target::after')).toContain('animation: none;');
    expect(getRule(reducedMotion, '.target::after')).toContain('background: var(--wpp-loading-halo-base-color, var(--wpp-dataviz-color-seq-brand-900));');
  });
  it('should recolor the halo through loadingHaloColors', () => {
    const css = compile('.target { @include loadingHaloColors(red, green, blue); }');
    expect(getRule(css, '.target')).toContain('--wpp-loading-halo-base-color: red;');
    expect(getRule(css, '.target')).toContain('--wpp-loading-halo-highlight-color: green;');
    expect(getRule(css, '.target')).toContain('--wpp-loading-halo-glow-color: blue;');
  });
  it('should match the snapshot of the compiled styles', () => {
    expect(compile('.target { @include loadingHalo(12px); }')).toMatchSnapshot();
  });
});
