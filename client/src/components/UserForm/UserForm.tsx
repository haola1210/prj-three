import React from 'react';

import "./UserForm.scss"
function UserForm() {
  return (
    <div className='form'>
      <h3 className='form__title'>Type your name</h3>
      <input type="text" className='form__input' />
      <span></span>
      <button className='form__button'>Go</button>      
    </div>
  );
}

export default UserForm;