// Opens the "What is a good photo" guide modal.
// The trigger link (#good-photo-modal) is injected by an app/plugin, so we
// attach behaviour by ID rather than expecting the link to wrap the modal.
(function () {
  const modal = document.getElementById('GoodPhotoModal');
  if (!modal) return;

  const TRIGGER_ID = 'good-photo-modal';
  let lastFocused = null;

  function open(event) {
    if (event) event.preventDefault();
    lastFocused = document.activeElement;
    modal.setAttribute('open', '');
    document.body.classList.add('overflow-hidden');
    // Focus the dialog container itself (not the close button) so the
    // button's focus ring isn't shown on open; keyboard users can Tab to it.
    if (typeof trapFocus === 'function') {
      trapFocus(modal, modal);
    } else {
      modal.focus();
    }
  }

  function close() {
    modal.removeAttribute('open');
    document.body.classList.remove('overflow-hidden');
    if (typeof removeTrapFocus === 'function') {
      removeTrapFocus(lastFocused);
    } else if (lastFocused && lastFocused.focus) {
      lastFocused.focus();
    }
  }

  // Event delegation: works even though the trigger is rendered by a plugin
  // and may be added to the DOM after this script runs.
  document.addEventListener('click', function (event) {
    const trigger = event.target.closest('#' + TRIGGER_ID);
    if (trigger) {
      open(event);
      return;
    }
    if (event.target.closest('[data-good-photo-close]')) {
      close();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal.hasAttribute('open')) close();
  });
})();
