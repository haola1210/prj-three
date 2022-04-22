import React from 'react';
import { ErrorBoundaryProps } from './types'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorFallback';

const myErrorHandler = (error: Error, info: {componentStack: string}) => {
  console.log("logger:", error)
  console.log(info)
}

function ErrorLogger({ children } : ErrorBoundaryProps) {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onError={myErrorHandler}
    >
      { children }
    </ErrorBoundary>
  );
}

export default ErrorLogger;