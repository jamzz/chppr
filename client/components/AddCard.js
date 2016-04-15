import React from "react";
import RaisedButton from 'material-ui/lib/raised-button';
import Dropzone from "react-dropzone";
import TextField from 'material-ui/lib/text-field';
import Checkbox from 'material-ui/lib/checkbox';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import StarRatingComponent from 'react-star-rating-component';

export default class AddCard extends React.Component {

  onDrop (files) {
    this.props.photoInput(files);
  }
  handleDishName(e) {
    this.props.dishNameInput(e.target.value);
  }
  handleRestaurantName(e) {
    this.props.restaurantNameInput(e.target.value);
  }
  // handleDishDescription(e) {
  //   this.props.dishDescriptionInput(e.target.value);
  // }
  handleDishPrice(e) {
    this.props.dishPriceInput(e.target.value);
  }
  handleDishRating(e) {
    console.log("rating arguments", e);
    this.props.dishRatingInput(e);
  }
  handleVegClick() {
    window.setTimeout(this.props.vegInput, 0);
  }
  handleGFClick() {
    window.setTimeout(this.props.gfInput, 0);
  }
  handleSpicyClick() {
    window.setTimeout(this.props.spicyInput, 0);
  }
  handleSubmit() {
    this.props.addCardSubmit();
  }
  handlePhoto(e) {
    this.props.photoAdd(e.target.value);
  }
  handleCatSelect(event, index, value) {
    console.log(value);
    this.props.catAdd(value);
  }

  render() {

    const styles = {
      checkbox: {
        display: 'inline-block',
        textAlign: 'left',
        width: '150px',
        marginTop: 16
      },
      dropzone: {
        width: '200px',
        textAlign: 'center',
        margin: '0 auto'
      },
      block: {
        textAlign: 'center',
        width: '450px',
        margin: '0 auto',
        marginBottom: '50px'
      },
      text: {
        // padding: '5px',
        width: '100px',
        margin: '0 auto'
      },
      dropdown: {
        width: '200px',
        border: '2px solid gray'
      },
      button: {
        margin: '20px 0'
      }
    };



    return (
      <div style={styles.block}>
        {!this.props.photo ? 
        <TextField
          onChange={this.handlePhoto.bind(this)}
          floatingLabelText="Enter URL for your photo"
        /> : null}

        <div style={styles.dropzone}>
          {!this.props.photo ? 
          <Dropzone multiple={false} accept={'image/*'} onDrop={this.onDrop.bind(this)}>
            <div style={styles.text}>Drag your photo here, or click to select a file to upload. 
              <br/><br/>Note: This overwrites the URL option.</div>
          </Dropzone> : null}

          {this.props.photo ? <div><br/>Image Preview: <br/><img width='250' src={this.props.photo} /></div> : null}
        </div>
        <TextField
          onChange={this.handleDishName.bind(this)}
          floatingLabelText="Enter Name of Dish"
        /><br/>
        <TextField
          onChange={this.handleRestaurantName.bind(this)}
          floatingLabelText="Enter Name of Restaurant"
        /><br/>
        <TextField
          onChange={this.handleDishPrice.bind(this)}
          floatingLabelText="Enter Price of Dish"
        /><br/>
        <h4>Rate the Dish</h4>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={0}
          onStarClick={this.handleDishRating.bind(this)}
        />
              <br/>
        <DropDownMenu style={styles.dropdown} value={this.props.dishCat} onChange={this.handleCatSelect.bind(this)}>
            <MenuItem value={999} primaryText="Category"/>
            <MenuItem value={null} primaryText="All"/>
            <MenuItem value={1} primaryText="Mexican"/>
            <MenuItem value={2} primaryText="American"/>
            <MenuItem value={3} primaryText="Asian"/>
            <MenuItem value={4} primaryText="Italian"/>
            <MenuItem value={5} primaryText="Brunch"/>
            <MenuItem value={6} primaryText="Greek"/>
            <MenuItem value={7} primaryText="German"/>
            <MenuItem value={8} primaryText="Brazilian"/>
            <MenuItem value={9} primaryText="BBQ"/>
            <MenuItem value={10} primaryText="Cuban"/>
            <MenuItem value={11} primaryText="Cajun"/>
            <MenuItem value={12} primaryText="Southern"/>
            <MenuItem value={13} primaryText="Non-Alcoholic"/>
            <MenuItem value={14} primaryText="Alcoholic"/>
            <MenuItem value={15} primaryText="Desserts"/>
        </DropDownMenu><br/>

          <Checkbox
            onClick={this.handleVegClick.bind(this)}
            label="Vegetarian"
            style={styles.checkbox}
          />
          <Checkbox
            label="Gluten-free"
            onClick={this.handleGFClick.bind(this)}
            style={styles.checkbox}
          />
          <Checkbox
            label="Spicy"
            onClick={this.handleSpicyClick.bind(this)}
            style={styles.checkbox}
          /><br/>
        <RaisedButton style={styles.button} onClick={this.handleSubmit.bind(this)} label="Submit" default={true} />
      </div>
    );
  }
} 
          /*<TextField
            onChange={this.handleDishDescription.bind(this)}
            floatingLabelText="Enter Description of Dish"
          /><br/>*/

        // <div style={styles.dropzone}>
        //   <Dropzone multiple={false} accept={'image/*'} onDrop={this.onDrop.bind(this)}>
        //     <div style={styles.text}>Drag your photo here, or click to select a file to upload.</div>
        //   </Dropzone>

        //   {this.props.photo ? <div><br/>Image Preview: <br/><img width='250' src={this.props.photo} /></div> : null}
        // </div>
