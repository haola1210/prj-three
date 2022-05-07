import { createContext, MutableRefObject, useRef } from 'react';
import { IMatchPrimary } from '@/types';
const MatchContext = createContext<MutableRefObject<IMatchPrimary | null>>(
  {} as MutableRefObject<IMatchPrimary | null>
)

export default MatchContext