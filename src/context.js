import React, { Component } from "react";
import axios from "axios";
const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? (contact = action.payload)
            : contact
        )
      };
    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => {
      // dispatch is a function that is called that takes in a json object called action {type:'',payload:''}
      this.setState(state => {
        return reducer(state, action);
      }); // when setstate called, a function called reducer is called that takes in current state and action json object. Reducer will then return a updated state based on action.type and setState will update the current state based the state Reducer return.
    }
  };
  async componentDidMount() {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({ contacts: res.data });
  }
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
export const Consumer = Context.Consumer;
