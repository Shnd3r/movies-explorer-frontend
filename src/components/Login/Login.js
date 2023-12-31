import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import useValidation from '../../hooks/useValidation';

import './Login.css';

import Logo from '../Logo/Logo';

function Login({ handleSignIn, serverError, isInputsDisabled }) {

  const {
    inputValues,
    errorMessages,
    isValidForm,
    handleChangeValidation,
    resetValidation
  } = useValidation();

  // Очистка валидации
  useEffect(() => {
    resetValidation();
  }, [resetValidation]);

  // Обработчик кнопки "войти"
  function handleLoginSubmit(evt) {
    evt.preventDefault();
    handleSignIn(inputValues.email, inputValues.password);
  }

  return (
    <main className='login'>
      <div className='login__container'>
        <div className='login__box'>
          <Logo />
          <h2 className='login__title'>Рады видеть!</h2>
        </div>
        <form className='login__form' onSubmit={handleLoginSubmit} noValidate>
          <fieldset className='login__fieldset'>
            <label className='login__label'>
              <span className='login__placeholder'>E-mail</span>
              <input
                className='login__input'
                name='email'
                type='email'
                required
                pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
                disabled={isInputsDisabled}
                value={inputValues.email || ''}
                onChange={handleChangeValidation}>
              </input>
              <span
                className={`login__input-error ${!isValidForm && 'login__input-error_active'}`}>
                {errorMessages.email}
              </span>
            </label>
            <label className='login__label'>
              <span className='login__placeholder'>Пароль</span>
              <input
                className='login__input'
                name='password'
                type='password'
                required
                minLength='6'
                disabled={isInputsDisabled}
                value={inputValues.password || ''}
                onChange={handleChangeValidation}>
              </input>
              <span
                className={`login__input-error ${!isValidForm && 'login__input-error_active'}`}>
                {errorMessages.password}
              </span>
            </label>
          </fieldset>
          <div className='login__button-container'>
            <p className='login__error'>{serverError}</p>
            <button
              className={`login__signin-button`}
              type='submit'
              disabled={!isValidForm || isInputsDisabled}>
              Войти
            </button>
          </div>
          <div className='login__signup'>
            <span className='login__signup-signature'>Ещё не зарегистрированы?</span>
            <Link
              to='/signup'
              className={`login__signup-button ${isInputsDisabled && 'login__signup-button_disabled'}`}>
              Регистрация
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login;

