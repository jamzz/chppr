import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import RaisedButton from 'material-ui/lib/raised-button';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import Checkbox from 'material-ui/lib/checkbox';
import ActionFavorite from 'material-ui/lib/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import AuthPanel from "./AuthPanel";
import AddCard from "./AddCard";
import {styles} from '../inlineStyles'

export default class Navbar extends React.Component {

  handleCategory(event, index, value) {
    this.props.categorySelect(value);
  }

  // YES, this setTimeout looks janky but it was the only way I found that displays the checked boxes after selecting them
  handleToggle(e) {
    const toggleFilter = e.target.value;
    window.setTimeout(
      function(){
      this.props.stateToggle(toggleFilter)}.bind(this),
      0
    );
  }

  handleShowAdd() {
    this.props.stateToggle('showAdd');
  }

  render(){
    return (
      <Toolbar style={styles.toolbar}>
        <ToolbarTitle style={styles.title} text="YumSnap!" />
        <ToolbarGroup firstChild={true} float="left">
          <DropDownMenu style={styles.dropdown} value={this.props.category} onChange={this.handleCategory.bind(this)}>
              <MenuItem value={null} primaryText="All"/>
              <MenuItem value={1} primaryText="Mexican"/>
              <MenuItem value={2} primaryText="American"/>
              <MenuItem value={3} primaryText="Asian"/>
              <MenuItem value={4} primaryText="Italian"/>
              <MenuItem value={5} primaryText="BBQ"/>
              <MenuItem value={6} primaryText="Greek"/>
              <MenuItem value={7} primaryText="Beverages"/>
              <MenuItem value={8} primaryText="Desserts"/>
          </DropDownMenu>
          <Checkbox
            value="veg"
            onClick={this.handleToggle.bind(this)}
            label="Vegetarian"
            style={styles.checkbox}
          />
          <Checkbox
            value="gf"
            label="Gluten-free"
            onClick={this.handleToggle.bind(this)}
            style={styles.checkbox}
          />
          <Checkbox
            value="noSpice"
            label="Not-Spicy"
            onClick={this.handleToggle.bind(this)}
            style={styles.checkbox}
          />
          <Checkbox
            value="bev"
            label="Beverages"
            onClick={this.handleToggle.bind(this)}
            styles={styles.checkbox}
          />
          <Checkbox
            value="des"
            label="Desserts"
            onClick={this.handleToggle.bind(this)}
            styles={styles.checkbox}
          />
        </ToolbarGroup>
        <ToolbarGroup float="right">
          <RaisedButton onClick={this.handleShowAdd.bind(this)} label={!this.props.showAdd ? "ADD DISH" : "CANCEL"} default={true} style={styles.button} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
/*
  In case we want to filter by favorites later:

  <Checkbox
    value="showFavs"
    onClick={this.handleToggle.bind(this)}
    checkedIcon={<ActionFavorite/>}
    uncheckedIcon={<ActionFavoriteBorder/>}
    label="Favorites"
    style={styles.checkbox}
  />
*/
