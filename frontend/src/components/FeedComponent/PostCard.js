import React from 'react';
import './PostCard.css';
import Card from 'react-bootstrap/Card';

export default function PostCard() {
  return (
    <div className='root_postcard'>
      {/* image */}
      <Card style={{width: '30vw', marginBottom: '2rem'}}>
      <Card.Body>
        <Card.Title>
          <div className='card-headingg'>
          <span className='profile_image_activity'></span>
           FName LName
          </div>
        </Card.Title>
        <Card.Text className='post_card_text'>
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
        </Card.Text>
      </Card.Body>
      <Card.Img className='post_image' src="https://img.freepik.com/free-vector/flat-boho-instagram-posts-collection-with-photo_23-2149052792.jpg?w=2000" />
      </Card>
      {/* text */}

      <Card style={{ width: '30vw' }}>
      <Card.Body>
        <Card.Title>
          <div className='card-headingg'>
          <span className='profile_image_activity'></span>
          FName LName
          </div>
        </Card.Title>
        <Card.Text className='post_card_text'>
        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
        </Card.Text>
        </Card.Body>
      </Card>
      {/* pdf */}
    </div>
  )
}
