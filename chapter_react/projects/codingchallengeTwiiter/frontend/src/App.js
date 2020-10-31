import React, { useEffect, useState } from "react";
import Twiiter from "./Twiiter";
import * as api from "./apiService";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const getTweets = async () => {
      const tweets = await api.getAllTweets();
      setTweets(tweets);
    };
    getTweets();
  }, []);

  const handleOnDelete = (tweetToDelete) => {
    const deletedTweetIndex = tweets.findIndex(
      (tweet) => tweet.id === tweetToDelete.id
    );
    const newTweets = Object.assign([], tweets);
    newTweets.splice(deletedTweetIndex, 1);
    setTweets(newTweets);
    api.deleteTweet(tweetToDelete);
  };

  const handleOnPersist = (newTweetText) => {
    const tweetToPersist = {
      id: uuidv4(),
      value: newTweetText,
    };

    const newTweets = Object.assign([], tweets);
    newTweets.push(tweetToPersist);
    setTweets(newTweets);
    api.insertTweet(tweetToPersist);
  };

  return (
    <div className="container">
      <h3 style={{ textAlign: "center" }}>React Twitter</h3>
      <Twiiter
        onPersist={handleOnPersist}
        onDelete={handleOnDelete}
        tweets={tweets}
      ></Twiiter>
    </div>
  );
}
