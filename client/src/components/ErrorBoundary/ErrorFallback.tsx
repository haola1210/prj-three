import { BiError } from 'react-icons/bi'

function ErrorFallback() {
  return (
    <div className='error'>
      <BiError /> Something went wrong!
    </div>
  );
}

export default ErrorFallback;