import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import CampsiteInfo from './CampSiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';


const mapStateToProps = state => {
    return {
        campsites: state.campsites,
        comments: state.comments,
        partners: state.partners,
        promotions: state.promotions
    };
}

class Main extends Component {


//campsite => campsite.featured)[0]the 0 is to pull it out of the array
//+ is to change a string to a number ex +"40" the type of is number
    render() {
        const HomePage = () => {
            return(
                <Home
                campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
                promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
                partner={this.props.partners.filter(partner => partner.featured)[0]}
            />
            )
        };

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                />
            );
        };  

        return (
            <div>
              <Header />
            <Switch>
                <Route path='/home' component= {HomePage} />
                <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites}/>} />
                <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                <Route exact path= '/contactus' component = {Contact} />
        <Route exact path= '/aboutus' render={() => <About partners={this.props.partners}/>} />
                <Redirect to= '/home' />
                </Switch>
            <Footer />
            </div>
        );
    };
}

export default withRouter(connect(mapStateToProps)(Main));
/*
CHANGE WITH REDUX
<Route exact path='/directory' render={() => <Directory campsites={this.state.campsites}/>} />
this is you have a state that needs to be passed on
<Route exact path= '/contactus' component = {Contact} />
this is whitout state
'directory/:campsiteId' after the : is telling the router that after the : is a parameter and whatever it is, it takes it and put it here
{match} is a react component
*/