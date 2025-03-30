import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./galleryPosts.scss";

const GalleryPosts = ({ images, onClose, post, onAddReview }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rating, setRating] = useState(post?.rating || 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReview, setNewReview] = useState("");

  const showPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  const showNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim()) {
      onAddReview(post.id, newReview);
      setNewReview("");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") showPrev();
      else if (event.key === "ArrowRight") showNext();
      else if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, images]);

  return (
    <div className="gallery-overlay" onClick={onClose}>
      <div className="gallery-container" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-main">
          <button className="close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>

          <div className="clickable-area left" onClick={showPrev}></div>
          <div className="clickable-area right" onClick={showNext}></div>

          <div className="main-image-container">
            <img 
              src={images[currentIndex]} 
              alt={`Изображение ${currentIndex + 1} из ${images.length}`}
              className="gallery-image"
            />
          </div>

          <div className="thumbnails-container">
            {images.map((img, index) => (
              <div 
                key={index}
                className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              >
                <img src={img} alt={`Миниатюра ${index + 1}`}/>
              </div>
            ))}
          </div>
        </div>

        <div className="gallery-sidebar">
          <div className="sidebar-content">
            <div className="rating-section">
              <h3>Оцените место</h3>
              <div className="stars-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= (hoverRating || rating) ? 'active' : ''}`}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {star <= (hoverRating || rating) ? '★' : '☆'}
                  </span>
                ))}
                <span className="rating-value">{rating.toFixed(1)}</span>
              </div>
              <p className="rating-count">{post?.reviews?.length || 0} отзывов</p>
            </div>

            <div className="reviews-section">
              <h3>Отзывы</h3>
              <div className="reviews-list">
                {post?.reviews?.length > 0 ? (
                  post.reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <span className="review-author">{review.author}</span>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <p className="review-text">{review.text}</p>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews-message">
                    Напишите отзыв первым!
                  </div>
                )}
              </div>

              <form onSubmit={handleReviewSubmit} className="add-review-form">
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Поделитесь впечатлениями..."
                  rows="3"
                />
                <button type="submit" disabled={!newReview.trim()}>
                  Опубликовать
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

GalleryPosts.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    rating: PropTypes.number,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        author: PropTypes.string,
        text: PropTypes.string,
        date: PropTypes.string,
      })
    ),
    author: PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    }),
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
  onAddReview: PropTypes.func.isRequired,
};

GalleryPosts.defaultProps = {
  post: {
    rating: 0,
    reviews: [],
    author: {
      name: 'Аноним',
      avatar: '',
    },
    title: '',
    description: '',
    date: '',
  },
};

export default GalleryPosts;