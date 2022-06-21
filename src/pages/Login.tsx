import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty, isEqual } from 'lodash';
import * as auth from '../api/auth';

export default function Login() {
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
    if (isEmpty(errors)) {
      return undefined;
    } else {
      return errors;
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (errors) {
      setFormStates(['submited, invalid']);
      setFormErrors(errors);
    } else {
      setFormStates(['submited, valid']);
      setFormErrors({});
      try {
        await auth.login(formData.username, formData.password);
        nav('/');
      } catch (e) {
        setFormErrors({ backend: 'Incorrect username or password' });
      }
    }
  };

  return (
    <div className='form login-form-container'>
      <form onSubmit={handleLogin}>
        <p>
          <label>Username</label>
          <br />
          <input type='text' name='username' className={`${formErrors.username ? 'field-invalid' : ''}`} onChange={handleInputChange} />
          {formErrors.username && <span className='error-message'>{formErrors.username}</span>}
        </p>
        <p>
          <label>Password</label>
          <br />
          <input type='password' name='password' className={`${formErrors.password ? 'field-invalid' : ''}`} onChange={handleInputChange} />
          {formErrors.password && <span className='error-message'>{formErrors.password}</span>}
          {formErrors.backend && <span className='error-message'>{formErrors.backend}</span>}
        </p>
        <p>
          <button id='sub_btn' type='submit'>
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
