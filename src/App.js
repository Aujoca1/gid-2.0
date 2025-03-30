import React, { useState, useEffect } from 'react';
import Newsfeed from './components/Newsfeed/Newsfeed';
import SidePanel from './components/SidePanel/SidePanel';
import ProfileMenu from './components/ProfileMenu/ProfileMenu';
import './index.scss';

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const posts = [
    {
      id: 1,
      author: {
        name: "Иван Петров",
        avatar: "/media/img/avatar1.jpg",
      },
      date: " 28 марта 2025",
      title: "Красивый парк в центре",
      description: "Нашел отличный парк для прогулок! Рекомендую.",
      images: [
        "/media/img/place1.jpg",
        "/media/img/place2.jpg",
        "/media/img/place3.jpg",
        "/media/img/priroda1.jpg",
        "/media/img/priroda2.jpg",
      ],
      rating: 4.7,
      reviews: [
        { user: "Анна", text: "Очень красивое место!" },
        { user: "Максим", text: "Был там, понравилось!" },
      ],
    },
    {
      id: 2,
      author: {
        name: "Мария Сидорова",
        avatar: "/img/avatar2.jpg",
      },
      date: "27 марта 2025",
      title: "Лучший ресторан города",
      description: "Ресторан с потрясающим видом и вкусной едой!",
      images: [
        "/media/img/priroda1.jpg",
        "/media/img/priroda2.jpg",
        "/media/img/priroda1.jpg",
      ],
      rating: 4.9,
      reviews: [
        { user: "Олег", text: "Шикарная кухня!" },
        { user: "Светлана", text: "Рекомендую!" },
      ],
    },
  ];

  return (
    <div className="wrapper">
      {/* Боковая панель для мобильных */}
      <SidePanel
        isOpen={isSidePanelOpen}
        onClose={() => setIsSidePanelOpen(false)}
        isLoggedIn={isLoggedIn}
        onLogin={() => {
          setIsLoggedIn(true);
          setIsSidePanelOpen(false);
        }}
        onLogout={() => {
          setIsLoggedIn(false);
          setIsSidePanelOpen(false);
        }}
      />

      {/* Шапка */}
      <header className="header">
        {isMobile && (
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsSidePanelOpen(true)}
          >
            ☰
          </button>
        )}

        <div className="logo-container">
          <img width={70} height={70} src="/media/img/logo.png" alt="Ленивый Гид"/>
          <div className="logo-text">
            <h3>Ленивый Гид</h3>
            <p>Сервис для поиска интересных мест</p>
          </div>
        </div>

        {!isMobile && (
          <nav className="main-nav">
            <ul>
              <li><a href="#">Главная</a></li>
              <li><a href="#">Места</a></li>
              <li><a href="#">Гиды</a></li>
              <li><a href="#">О нас</a></li>
            </ul>
          </nav>
        )}

        <div className={`search-container ${isMobile ? 'mobile' : ''}`}>
          <input type="text" placeholder="Поиск..." className="search-input"/>
          <img src="/media/img/search.png" alt="Поиск" className="search-icon"/>
        </div>

        {!isMobile && (
          <div 
            className="profile-icon"
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <img 
              src={isLoggedIn ? "/media/img/avatar1.jpg" : "/img/icon.png"} 
              alt="Профиль"
            />
            {isProfileMenuOpen && (
              <ProfileMenu
                isLoggedIn={isLoggedIn}
                onLogin={() => setIsLoggedIn(true)}
                onLogout={() => setIsLoggedIn(false)}
              />
            )}
          </div>
        )}
      </header>

      {/* Основное содержимое */}
      <main className="content">
        <Newsfeed posts={posts}/>
      </main>

      {/* Подвал */}  
        <footer className="new_footer_top">
          <div className="footer_bg">
            <div className="footer_bg_des"></div>
            <div className="footer_bg_one"></div>
            <div className="footer_bg_two"></div>
          </div>
        </footer>
    </div>
  );
}

export default App;