import React from 'react';
import { AiOutlineLoading } from "react-icons/ai"

import "./Loading.scss"
function Loading() {
  return (
    <span className='loader'>
      <AiOutlineLoading />
    </span>
  );
}

export default Loading;