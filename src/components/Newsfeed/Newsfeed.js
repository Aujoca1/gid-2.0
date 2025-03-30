import React, { useState } from "react";
import PropTypes from 'prop-types';
import GalleryPosts from "../GalleryPosts/GalleryPosts";
import "./newsFeed.scss";

const Newsfeed = ({ posts = [], onAddReview }) => {
  const [activeGalleryPosts, setActiveGalleryPosts] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);

  const handleOpenGallery = (images, post) => {
    setActiveGalleryPosts(images);
    setCurrentPost(post);
  };

  const handleCloseGallery = () => {
    setActiveGalleryPosts(null);
    setCurrentPost(null);
  };

  return (
    <div className="newsfeed">
      {posts.map((post) => (
        <div key={post.id} className="newsfeed-item">
          <div className="newsfeed-header">
            <img 
              src={post.author.avatar || "default-avatar.png"} 
              alt="Аватар" 
              className="newsfeed-avatar" 
            />
            <div>
              <h3 className="newsfeed-author">{post.author.name || "Аноним"}</h3>
              <p className="newsfeed-date">{post.date || "Неизвестная дата"}</p>
            </div>
          </div>

          <div className="post-content-wrapper">
            <h3 className="newsfeed-title">{post.title || "Без заголовка"}</h3>
            <p className="newsfeed-description">{post.description || "Нет описания"}</p>

            <div className="newsfeed-images">
              {post.images?.slice(0, 4).map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`Фото ${index + 1}`} 
                  className="newsfeed-image"
                  onClick={() => handleOpenGallery(post.images || [], post)}
                />
              ))}
              {(post.images?.length || 0) > 4 && (
                <div 
                  className="newsfeed-image-overlay" 
                  onClick={() => handleOpenGallery(post.images || [], post)}
                >
                  +{(post.images?.length || 0) - 4}
                </div>
              )}
            </div>

            <div className="reviews-preview">
              <div className="rating-summary">
                ⭐ {post.rating?.toFixed(1) || '0.0'} 
                <span>({post.reviews?.length || 0} отзывов)</span>
              </div>
              {post.reviews?.length > 0 ? (
                post.reviews.slice(0, 2).map((review, index) => (
                  <div key={index} className="review-preview">
                    <div className="review-author">{review.author}</div>
                    <div className="review-text">{review.text}</div>
                  </div>
                ))
              ) : (
                <div className="no-reviews">Пока нет отзывов</div>
              )}
            </div>
          </div>

          <div className="newsfeed-footer">
            <button className="newsfeed-review-button">Оставить отзыв</button>
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
      images: PropTypes.arrayOf(PropTypes.string),
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

export default Newsfeed;