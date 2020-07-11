import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import { Switch, Route, Redirect} from 'react-router-dom';
import CampsiteInfo from './CampSiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS } from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campsites: CAMPSITES,
            comments: COMMENTS,
            partners: PARTNERS,
            promotions: PROMOTIONS

        };
    }

//campsite => campsite.featured)[0]the 0 is to pull it out of the array
//+ is to change a string to a number ex +"40" the type of is number
    render() {
        const HomePage = () => {
            return(
                <Home
                campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
                promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
                partner={this.state.partners.filter(partner => partner.featured)[0]}
            />
            )
        };

        const CampsiteWithId = ({match}) => {
            return (
                <CampsiteInfo 
                    campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
                    comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
                />
            );
        };  

        return (
            <div>
              <Header />
            <Switch>
                <Route path='/home' component= {HomePage} />
                <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites}/>} />
                <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                <Route exact path= '/contactus' component = {Contact} />
        <Route exact path= '/aboutus' render={() => <About partners={this.state.partners}/>} />
                <Redirect to= '/home' />
                </Switch>
            <Footer />
            </div>
        );
    };
}

export default Main;
/*
<Route exact path='/directory' render={() => <Directory campsites={this.state.campsites}/>} />
this is you have a state that needs to be passed on
<Route exact path= '/contactus' component = {Contact} />
this is whitout state
'directory/:campsiteId' after the : is telling the router that after the : is a parameter and whatever it is, it takes it and put it here
{match} is a react component
*/