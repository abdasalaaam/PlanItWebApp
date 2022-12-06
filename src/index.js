import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {MongoClient} from 'mongodb'


const connectionString = "mongodb+srv://abudsalem:ab7da2sa5@cluster0.rnt5syv.mongodb.net/Users?retryWrites=true&w=majority"

export const getStaticProps = async (context) => {
  const mongoClient = new MongoClient(connectionString)
  const data = await mongoClient.db().collection('Users').find().toArray()
  console.log(data)
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
