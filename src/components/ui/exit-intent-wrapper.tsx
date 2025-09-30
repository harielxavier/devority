'use client';

import { ExitIntentPopup, useExitIntent } from './exit-intent-popup';

export function ExitIntentWrapper() {
  const { showExitIntent, closeExitIntent } = useExitIntent();

  return (
    <ExitIntentPopup 
      isOpen={showExitIntent} 
      onClose={closeExitIntent} 
    />
  );
}
