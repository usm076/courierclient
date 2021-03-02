import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
      const token = localStorage.getItem('auth-token');
      console.log(token);
      if(token != undefined)
      {
    fetch('https://guarded-citadel-19841.herokuapp.com/checkToken', {
      method: 'GET',
     
      headers: { 'x-auth-token': token },
  })
      .then(res => {
        if (res.status === 200) {
          this.setState({ loading: false });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });
  }
  else
  {
      this.setState({ loading: false, redirect: true });
  }
  }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}