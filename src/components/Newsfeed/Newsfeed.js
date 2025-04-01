import React, { useState } from "react";
import PropTypes from 'prop-types';
import GalleryPosts from "../GalleryPosts/GalleryPosts";
import "./newsFeed.scss";

const Newsfeed = ({ posts = [], onAddReview }) => {
  const [activeGalleryPosts, setActiveGalleryPosts] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);

  const handleOpenGallery = (images, post) => {
    if (images && images.length > 0) {
      setActiveGalleryPosts(images);
      setCurrentPost(post);
    }
  };

  const handleCloseGallery = () => {
    setActiveGalleryPosts(null);
    setCurrentPost(null);
  };

  const renderImages = (post) => {
    const images = post.images || [];
    const imageCount = images.length;
    const showOverlay = imageCount > 4;
    const imagesToShow = showOverlay ? images.slice(0, 4) : images;
    const remainingCount = imageCount - 4;

    if (imageCount === 0) return null;

    return (
      <div className="newsfeed-images" data-count={imageCount}>
        {imagesToShow.map((image, index) => (
          <div
            key={`${post.id}-${index}`}
            className={`newsfeed-image ${index === 0 ? 'first-image' : ''}`}
            onClick={() => handleOpenGallery(images, post)}
          >
            <img
              src={image}
              alt={`Пост ${post.id}, фото ${index + 1}`}
              className="newsfeed-image-content"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            {showOverlay && index === 3 && (
              <div className="newsfeed-image-overlay">
                +{remainingCount}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="newsfeed">
      {posts.map((post) => (
        <div key={post.id} className="newsfeed-item">
          <div className="newsfeed-header">
            <img 
              src={post.author?.avatar || "/default-avatar.png"} 
              alt="Аватар автора" 
              className="newsfeed-avatar" 
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            <div className="newsfeed-header-info">
              <h3 className="newsfeed-author">
                {post.author?.name || "Анонимный пользователь"}
              </h3>
              <p className="newsfeed-date">
                {post.date || "Дата не указана"}
              </p>
            </div>
          </div>

          <div className="post-content-wrapper">
            {post.title && (
              <h3 className="newsfeed-title">{post.title}</h3>
            )}
            {post.description && (
              <p className="newsfeed-description">{post.description}</p>
            )}

            {renderImages(post)}

            <div className="reviews-preview">
              <div className="rating-summary">
                <span className="rating-stars">⭐</span>
                <span className="rating-value">
                  {post.rating?.toFixed(1) || '0.0'}
                </span>
                <span className="reviews-count">
                  ({post.reviews?.length || 0} отзывов)
                </span>
              </div>

              {post.reviews?.length > 0 ? (
                post.reviews.slice(0, 2).map((review, i) => (
                  <div key={`review-${post.id}-${i}`} className="review-preview">
                    <div className="review-author">
                      {review.author || "Аноним"}
                    </div>
                    <div className="review-text">
                      {review.text || "Без текста"}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-reviews">Пока нет отзывов</div>
              )}
            </div>
          </div>

          <div className="newsfeed-footer">
            <button
              type="button"
              className="newsfeed-review-button"
              onClick={() => handleOpenGallery(post.images || [], post)}
            >
              Оставить отзыв
            </button>
          </div>
        </div>
      ))}

      {activeGalleryPosts && (
        <GalleryPosts
          images={activeGalleryPosts}
          onClose={handleCloseGallery}
          post={currentPost}
          onAddReview={onAddReview}
        />
      )}
    </div>
  );
};

Newsfeed.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      author: PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
      images: PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            url: PropTypes.string,
            alt: PropTypes.string,
          })
        ])
      ),
      title: PropTypes.string,
      description: PropTypes.string,
      rating: PropTypes.number,
      reviews: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          author: PropTypes.string,
          text: PropTypes.string,
          date: PropTypes.string,
        })
      ),
      date: PropTypes.string,
    })
  ).isRequired,
  onAddReview: PropTypes.func.isRequired,
};

Newsfeed.defaultProps = {
  posts: [],
};

export default Newsfeed;