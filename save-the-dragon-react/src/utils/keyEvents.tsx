export function isNumberKeyEvent(event: KeyboardEvent) {
  return event.code.startsWith('Digit') || event.code.startsWith('Numpad')
}