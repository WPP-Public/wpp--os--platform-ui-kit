// Must rely on return type inference due to bizarre Parchment typings (right?)
export function createFormats(Quill) {
  const parchment = Quill.import('parchment');
  const Float = new parchment.Attributor.Class('float', 'ql-float', {
    scope: parchment.Scope.INLINE_BLOT,
    whitelist: ['left', 'right'],
  });
  const Height = new parchment.Attributor.Attribute('height', 'height', {
    scope: parchment.Scope.INLINE_BLOT,
  });
  const Width = new parchment.Attributor.Attribute('width', 'width', {
    scope: parchment.Scope.INLINE_BLOT,
  });
  return { Float, Height, Width };
}
