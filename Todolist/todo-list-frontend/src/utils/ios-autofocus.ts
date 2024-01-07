export default function iosAutoFocus() {
  document.addEventListener('DOMContentLoaded', () => {
    Array.prototype.slice
      .call(document.querySelectorAll('input'))
      .filter(el => el.hasAttribute('autofocus'))[0]
      .focus();
  });
}
