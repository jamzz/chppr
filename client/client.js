import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import injectTapEventPlugin from 'react-tap-event-plugin';
import request from 'superagent';

import Navbar from "./components/Navbar";
import AddCard from "./components/AddCard";
import CardFeed from "./components/CardFeed";


injectTapEventPlugin();

class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      auth: false,
      veg: false,
      gf: false,
      bev: false,
      des: false,
      noSpice: false,
      category: null,
      cardData: [],
      showAdd: false,
      showFavs: false,
      dishName: '',
      restaurantName: '',
      dishDescription: '',
      dishPrice: '',
      dishRating: '',
      vegClick: false,
      gfClick: false,
      spicyClick: false,
      bevClick: false,
      dessertClick: false, 
      photo: null,
      photoUrl: null,
      photoFile: null,
      dishCat: 999
    };

    this.getCardData();
  }

  stateToggle(event) {
    this.setState({[event]: !this.state[event]});
  }

  categorySelect(category) {
    this.setState({category});
  }
  dishNameInput(dishName) {
    this.setState({dishName: dishName});
  }
  restaurantNameInput(restaurantName) {
    this.setState({restaurantName: restaurantName});
  }
  dishDescriptionInput(dishDescription) {
    this.setState({dishDescription: dishDescription});
  }
  dishPriceInput(dishPrice) {
    this.setState({dishPrice: dishPrice});
  }
  dishRatingInput(dishRating) {
    this.setState({dishRating: dishRating});
  }
  vegInput() {
    this.setState({vegClick: !this.state.vegClick});
  }
  gfInput() {
    this.setState({gfClick: !this.state.gfClick});
  }
  spicyInput() {
    this.setState({spicyClick: !this.state.spicyClick});
  }
  // bevInput() {
  //   this.setState({bevClick: !this.state.bevClick});
  // }
  // dessertInput() {
  //   this.setState({dessertClick: !this.state.dessertClick});
  // }
  catAdd(category) {
    this.setState({dishCat: category});
  }
  photoAdd(url) {
    this.setState({photo: url});
  }
  photoInput(file) {
    var that = this;
    var photo = new FormData();
    photo.append('photo', file[0]);

    this.setState({photo: null});
    this.setState({photoFile: file[0]});

    request.post('/upload')
      .send(photo)
      .end(function(err, response) {
        if (err) { console.error(err); }
        that.setState({photoUrl: './pictures/' + response.text});
        console.log("Upload successful");
      });
  }
  addCardSubmit() {
    var that = this;
    var newDish = {
      // TODO - figure out categories and users
      "user_id": 5,
      "category": this.state.dishCat,
      "timestamp": "01:30:00",
      "dish_name": this.state.dishName,
      "rest_name": this.state.restaurantName,
      "price": Number(this.state.dishPrice),
      "picture_path": this.state.photoUrl || this.state.photo,
      "veggie": this.state.vegClick,
      "gluten_free": this.state.gfClick,
      "spicy": this.state.spicyClick,
      "dish_description": this.state.dishDescription,
      "rating": this.state.dishRating
      // "bev": this.state.bevClick,
      // "dessert": this.state.dessertClick,
    };

    if (this.state.dishRating && this.state.dishName && this.state.dishCat) {
      request.post('/feed')
        .send(newDish)
        .end(function(err, response) {
          if (err) { console.error( "Failed to upload dish", err); }
          console.log("New Dish Successful");
          that.state.cardData.unshift(newDish);
          that.setState({showAdd: false});
          that.setState({
            dishName: '',
            restaurantName: '',
            dishDescription: '',
            dishPrice: '',
            dishRating: '',
            vegClick: false,
            gfClick: false,
            spicyClick: false,
            // bevClick: false,
            // dessertClick: false,
            photo: null,
            photoUrl: null,
            photoFile: null,
            dishCat: null
          });
        });
    }
  }
  getCardData(){
    var that = this;

    request.get('/feed')
      .end(function(err, res) {
        if (err) { console.error( "Error:", err); }
        that.setState({cardData: res.body});
      });
  }

  render() {
    // console.log("client.js state:", this.state);
    return (
      <div>
        {/* Pass methods & state vars to Toolbar Component through props */}
        <Navbar
          auth={this.state.auth}
          veg={this.state.veg}
          gf={this.state.gf}
          noSpice={this.state.noSpice}
          showAdd={this.state.showAdd}
          showFavs={this.state.showFavs}
          category={this.state.category}
          categorySelect={this.categorySelect.bind(this)}
          stateToggle={this.stateToggle.bind(this)}
        />
        <br/>
        { this.state.showAdd ? <AddCard
          dishNameInput={this.dishNameInput.bind(this)}
          restaurantNameInput={this.restaurantNameInput.bind(this)}
          dishDescriptionInput={this.dishDescriptionInput.bind(this)}
          dishPriceInput={this.dishPriceInput.bind(this)}
          dishRatingInput={this.dishRatingInput.bind(this)}
          vegInput={this.vegInput.bind(this)}
          gfInput={this.gfInput.bind(this)}
          spicyInput={this.spicyInput.bind(this)}

          addCardSubmit={this.addCardSubmit.bind(this)}
          photoAdd={this.photoAdd.bind(this)}
          photoInput={this.photoInput.bind(this)}
          photo={this.state.photoFile ? this.state.photoFile.preview : null}
          showAdd={this.state.showAdd}
          catAdd={this.catAdd.bind(this)}
          dishCat={this.state.dishCat}
          /> : null }
        <CardFeed
          boolVeg={this.state.veg}
          boolGF={this.state.gf}
          boolNoSpice={this.state.noSpice}
          cardData={this.state.cardData}
          category={this.state.category}
        />
      </div>
    );
  }
}

const app = document.getElementById('app');

ReactDOM.render(<Layout/>, app);
