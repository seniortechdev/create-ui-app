import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty, isEqual } from 'lodash';
import * as auth from '../api/auth';

export default function Signup() {
  const nav = useNavigate();
  const [formData, setFormData] = useState<any>({});
  const [, setFormStates] = useState(['pristine']);
  const [formErrors, setFormErrors] = useState<any>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: undefined });
  };

  const validateForm = (formData: any) => {
    const errors: any = {};
    if (isEmpty(formData.username)) {
      errors.username = "Username can't be blank";
    }
    if (isEmpty(formData.password)) {
      errors.password = "Password can't be blank";
    }
    if (isEmpty(formData.confirm_password)) {
      errors.confirm_password = "Password Confirmation can't be blank";
    } else if (!isEqual(formData.password, formData.confirm_password)) {
      errors.confirm_password = 'Password and confirmation does not match';
    }

    if (isEmpty(errors)) {
      return undefined;
    } else {
      return errors;
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (errors) {
      setFormStates(['submited, invalid']);
      setFormErrors(errors);
    } else {
      setFormStates(['submited, valid']);
      setFormErrors({});
      try {
        await auth.register(formData.username, formData.password);
        nav('/login');
      } catch (e) {}
    }
  };

  return (
    <div className='form signup-form-container'>
      <form onSubmit={handleSignup}>
        <p>
          <label>Username</label>
          <br />
          <input type='text' name='username' className={`${formErrors.username ? 'field-invalid' : ''}`} onChange={handleInputChange} />
          <br />
          {formErrors.username && <span className='error-message'>{formErrors.username}</span>}
        </p>
        <p>
          <label>Password</label>
          <br />
          <input type='password' name='password' className={`${formErrors.password ? 'field-invalid' : ''}`} onChange={handleInputChange} />
          <br />
          {formErrors.password && <span className='error-message'>{formErrors.password}</span>}
        </p>
        <p>
          <label>Confirm Password</label>
          <br />
          <input type='password' name='confirm_password' className={`${formErrors.confirm_password ? 'field-invalid' : ''}`} onChange={handleInputChange} />
          <br />
          {formErrors.confirm_password && <span className='error-message'>{formErrors.confirm_password}</span>}
        </p>
        <p>
          <button id='sub_btn' type='submit'>
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}
