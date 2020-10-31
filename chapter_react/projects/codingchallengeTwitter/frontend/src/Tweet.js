import React from "react";
import css from "./tweet.module.css";

export default function Tweet({ tweet, onDelete }) {
  const handleClick = () => {
    onDelete(tweet);
  };

  return (
    <div className={css.tweetContainer}>
      <div>
        <span>{tweet.value}</span>
      </div>
      <div className={css.delete}>
        <span
          onClick={handleClick}
          style={{ cursor: "pointer" }}
          className="material-icons"
        >
          delete
        </span>
      </div>
    </div>
  );
}
