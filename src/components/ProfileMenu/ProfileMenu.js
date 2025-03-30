import React from 'react';
import PropTypes from 'prop-types';
import './profileMenu.scss';

const ProfileMenu = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <div className="profile-menu">
      {isLoggedIn ? (
        <>
          <button className="profile-menu-item" onClick={() => alert('Переход в профиль')}>
            <img src="/media/img/profile-icon.png" alt="Профиль"/>
            <span>Профиль</span>
          </button>
          <button className="profile-menu-item" onClick={() => alert('Переход в настройки')}>
            <img src="/media/img/settings-icon.png" alt="Настройки"/>
            <span>Настройки</span>
          </button>
          <button className="profile-menu-item" onClick={onLogout}>
            <img src="/media/img/logout-icon.png" alt="Выйти"/>
            <span>Выйти</span>
          </button>
        </>
      ) : (
        <button className="profile-menu-item login-btn" onClick={onLogin}>
          <img src="/media/img/login-icon.png" alt="Войти"/>
          <span>Войти</span>
        </button>
      )}
    </div>
  );
};

ProfileMenu.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default ProfileMenu;