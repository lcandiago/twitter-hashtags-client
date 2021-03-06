import React from 'react';
import { formatRelative } from 'date-fns';

import './styles.css';

export default function Tweet({ tweet }) {
  const date = formatRelative(new Date(tweet.created_at), new Date());

  return (
    <li className="tweet">
      <div className="tweet__image-container">
        <img
          src={tweet.user.profile_image_url_https}
          alt={`Avatar of ${tweet.user.name}`}
          className="tweet__image"
        />
      </div>
      <div className="tweet__body">
        <div className="tweet__infos">
          <strong className="tweet__username">{tweet.user.name}</strong>
          <span className="tweet__screenname">{`@${tweet.user.screen_name}`}</span>
          <span className="tweet__date">{date}</span>
        </div>
        <div className="tweet__text">{tweet.full_text}</div>
      </div>
    </li>
  );
}
