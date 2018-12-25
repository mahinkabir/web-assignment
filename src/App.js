import React, { Component } from 'react';
import './App.css';
import './style.css';

class Item {
    constructor(name,type,restaurant,location,price){
        this.name = name;
        this.type = type;
        this.restaurant = restaurant;
        this.location = location;
        this.price = price;
    }
}

class Form extends Component {
    constructor(){
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault();
        const item = new Item(e.target.elements.name.value
            ,e.target.elements.type.value
            ,e.target.elements.restaurant.value
            ,e.target.elements.location.value
            ,e.target.elements.price.value
        );
        e.target.elements.name.value = '';
        e.target.elements.type.value = '';
        e.target.elements.restaurant.value = '';
        e.target.elements.location.value = '';
        e.target.elements.price.value = '';
        this.props.addItem(item);
    }
    render() {
        return(
            <div class="row">
                <form onSubmit={this.onSubmit} className="input-field">
                  <div className="input-field">
                    <input  id="name" type="text"/>
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="input-field">
                    <input  id="type" type="text"/>
                    <label htmlFor="type">Type</label>
                  </div>
                  <div className="input-field">
                    <input id="restaurant" type="text"/>
                    <label htmlFor="restaurant">Restaurant</label>
                  </div>
                  <div className="input-field">
                    <input  id="location" type="text"/>
                    <label htmlFor="location">Location</label>
                  </div>
                  <div className="input-field">
                    <input id="price" type="text"/>
                    <label htmlFor="price">Price</label>
                  </div>
                  <button className="btn waves-effect waves-light dark-green">Add This Item</button>
                </form>
            </div>
            
        )
    }
}

class ItemView extends Component{
    constructor(props){
        super(props);
        this.state={
            vote: 0,
        }
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
        
    }
    upVote(){
        this.setState(()=>{
            return{
                vote: this.state.vote + 1,
            }
        });
    }
    downVote(){
        if(this.state.vote >0)
            this.setState(()=>{
                return{
                    vote: this.state.vote - 1,
                }
            });
    }
    render(){
        return(
            <div>
            <p> {this.props.item.name} </p>
            <p> ({this.props.item.type}) </p>
            <p>At {this.props.item.restaurant},{this.props.item.location} </p>
            <input value = {"+" + this.state.vote.toString() + " Votes"}  type="text"/>
            <button onClick={this.upVote}>+</button>
            <button onClick={this.downVote}>-</button>
            <hr/>

            </div>
        );
    }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: 0,
      buttonLabel: 'Show Form',
      itemList : [],

    }
    this.addItem = this.addItem.bind(this);
  }
  addItem(item){
    this.state.itemList.push(item);
    this.setState(()=>{
      return{
        itemList: this.state.itemList,
      }
    })
  }
  render() {
    return (
      <div className="App">
        <Form addItem = {this.addItem}/>
        <hr/>
        {this.state.itemList.map((item)=> <ItemView key = {item} item = {item}/>)}
      </div>
    );
  }
}

export default App;
