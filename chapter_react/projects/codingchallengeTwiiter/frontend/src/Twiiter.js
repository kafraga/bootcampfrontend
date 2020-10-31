import React, { useEffect, useState } from "react";
import Tweet from "./Tweet";
import css from "./twiiter.module.css";

export default function Twiiter({ tweets, onDelete, onPersist }) {
  const [newTweet, setNewTweet] = useState("");

  useEffect(() => {
    document.querySelector("textarea").focus();
  }, [tweets]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onPersist(newTweet);
    setNewTweet("");
  };

  const handleInputChange = (event) => {
    setNewTweet(event.target.value);
  };

  const handleOnKeyUp = (event) => {
    if (newTweet.length <= 280 && newTweet.length !== 0) {
      if (event.ctrlKey && event.key === "Enter") {
        onPersist(newTweet);
        setNewTweet("");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <span>Escreva Aqui</span>
          <textarea
            id="textarea1"
            onChange={handleInputChange}
            onKeyUp={handleOnKeyUp}
            value={newTweet}
          ></textarea>
        </div>
        <div className={css.infoTweet}>
          <div className={css.spanCaracteres}>
            <span
              className={
                newTweet.length < 280
                  ? css.green
                  : newTweet.length === 280
                  ? css.yellow
                  : css.red
              }
            >
              {280 - newTweet.length} caracter(es) restante(s)
            </span>
          </div>
          <div className={css.buttonCaracteres}>
            <button
              className={
                " waves-effect waves light btn #40c4ff light-blue accent-2"
              }
              disabled={newTweet.length > 280 || newTweet.length === 0}
            >
              TWITTAR
            </button>
          </div>
        </div>
      </form>
      <div>
        {tweets.map((tweet) => {
          return (
            <Tweet key={tweet.id} tweet={tweet} onDelete={onDelete}></Tweet>
          );
        })}
      </div>
    </div>
  );
}
