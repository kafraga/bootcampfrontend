import axios from "axios";
const API_URL = "http://localhost:3001/tweets/";

async function getAllTweets() {
  const res = await axios.get(API_URL);
  return res.data;
}

async function deleteTweet(tweet) {
  const res = await axios.delete(`${API_URL}/${tweet.id}`);
  return res.data;
}

async function insertTweet(tweet) {
  const res = await axios.post(API_URL, tweet);
  return res.data.id;
}

export { getAllTweets, deleteTweet, insertTweet };
