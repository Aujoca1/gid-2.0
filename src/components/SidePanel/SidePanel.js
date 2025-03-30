import React from 'react';
import PropTypes from 'prop-types';
import './sidePanel.scss';

const SidePanel = ({ isOpen, onClose, isLoggedIn, onLogin, onLogout }) => {
  return (
    <>
      <div className={`side-panel-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}></div>
      <div className={`side-panel ${isOpen ? 'open' : ''}`}>
        <div className="side-panel-header">
          <button className="close-btn" onClick={onClose}></button>
          {isLoggedIn ? (
            <div className="user-profile">
              <img src="/media/img/avatar1.jpg" alt="Профиль"/>
              <h3>Иван Петров</h3>
              <p>@ivanpetrov</p>
            </div>
          ) : (
            <h2>Меню</h2>
          )}
        </div>

        <nav className="side-panel-nav">
          <ul>
            <li><button onClick={() => alert('Переход на главную')}>Главная</button></li>
            <li><button onClick={() => alert('Переход в места')}>Места</button></li>
            <li><button onClick={() => alert('Переход в гиды')}>Гиды</button></li>
            <li><button onClick={() => alert('Переход в избранное')}>Избранное</button></li>
          </ul>
        </nav>

        <div className="side-panel-footer">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={onLogout}>Выйти</button>
          ) : (
            <button className="login-btn" onClick={onLogin}>Войти</button>
          )}
        </div>
      </div>
    </>
  );
};

SidePanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default SidePanel;