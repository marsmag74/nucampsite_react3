import React, {Component} from React;


class CampsiteInfo extends Component {


    render(){

        if (this.props.campsite) {
            return (
               <div className="row">

               </div>
            );
           
        }

        return <div />;


}
}

export default CampsiteInfo;

