import React from 'react';

import Header from '../header';
import Main from '../main';
import Footer from '../footer';

import './app.css';

import PhotoService from '../../photo-service/photo-service'

export default class App extends React.Component {

  photoServise = new PhotoService();

  render() {
    return (
      <div > 
        <Header />
        <Main />
        <Footer />
      </div>
    );
  };
};