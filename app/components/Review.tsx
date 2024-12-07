import React from 'react';

interface ReviewProps {
  stars: number;
  profileImage: string;
  title: string;
  review: string;
}

interface ReviewsProps {
  reviews: ReviewProps[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '20px',
            alignItems: 'center',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '10px',
          }}
        >
          <img
            src={review.profileImage || "public/build/_assets/default.jpg"}
            alt="Profile"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <div>
            <h3 style={{ margin: 0, fontSize: '18px' }}>{review.title}</h3>
            <p style={{ margin: '5px 0', fontSize: '14px', color: '#555' }}>{review.review}</p>
            <div>
              {'⭐'.repeat(review.stars)}
              {'☆'.repeat(5 - review.stars)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
