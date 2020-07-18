import React from 'react';
import { Component } from 'react';
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Label
} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


function RenderCampsite({ campsite }) {


    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>

                    <CardText>
                        {campsite.description}
                    </CardText>
                </CardBody>

            </Card>
        </div>
    )
}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {
                    comments.map(comment => {
                        return (
                            <div key={comments.id}>
                                <p>{comment.text} <br />
                      --{comment.author
                                    },{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </div>
                        );
                    })
                }
                <CommentForm />
            </div>

        );
    }
    return <div />;
}

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {

            isModelOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModelOpen
        });
    }
    handleSubmit(values) {
        console.log('Current state is: ' + JSON.stringify(values));
        alert('Current state is: ' + JSON.stringify(values));

    }
    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil"></i> {' '}
                Submit Comment
            </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            {/*RATINGS */}
                            <div className='form-group'>
                                <Label htmlFor="rating">Rating</Label>

                                <Control.select
                                    model=".rating"
                                    id="rating"
                                    name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>



                                </Control.select>


                            </div>
                            {/*YOUR NAME */}
                            <div className='form-group'>
                                <Label htmlFor="author">Your Name</Label>

                                <Control.text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                    className="form-group"
                                    validators={{

                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />


                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{

                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />


                            </div>
                            {/*YOUR NAME */}
                            <div className='form-group'>
                                <Label htmlFor="author">Your Name</Label>

                                <Control.text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Your Name"
                                    className="form-group" />

                            </div>

                            {/*COMMENT */}
                            <div className='form-group'>
                                <Label htmlFor="text">Comment</Label>

                                <Control.textarea
                                    model=".text"
                                    id="text"
                                    name="text"
                                    rows="6"
                                    className="form-control" />

                            </div>

                            <Button type="submit" color="primary">Submit</Button>

                        </LocalForm>

                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }

}


function CampsiteInfo(props) {

    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }

    return <div />;


}


export default CampsiteInfo;

