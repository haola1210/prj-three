import { IMatchPrimary } from '@/types';
import React, { ReactChild, useRef } from 'react';
import MatchContext from './MatchContext';
function MatchContextProvider({ children } : { children : ReactChild }) {
  const match = useRef<IMatchPrimary | null>(null)
  return (
    <MatchContext.Provider value={match}>
      {children}
    </MatchContext.Provider>
  );
}

export default MatchContextProvider;