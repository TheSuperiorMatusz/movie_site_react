import  React from 'react';
import {Button} from "@mui/material";
import axios from "axios";
import {red} from "@mui/material/colors";
import Moment from 'moment';
class Reviews extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            reviews:[],
            idReview:"",
            idCritic:"",
            filmId:"",
            review:"",
            date_publication:""


        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8086/moviesite/api/review').then((response) =>{this.setState({reviews:response.data})});
    }

    delete=idReview=>{
        let object=this.state.reviews.find(function (reviews){
            if(reviews.idReview===idReview) return reviews;
        });
        let arrAfterDel=this.state.reviews.filter(function (reviews){
            return reviews.idReview !==idReview
        });
        this.setState({reviews:arrAfterDel},()=>axios
            .delete(`http://localhost:8086/moviesite/api/review/${idReview}`,object));
    }

    multiInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    newUpdate=(idReview,idCritic,filmId,review,data_p)=>{
        let arrAfterUpdat=this.state.reviews.map(function (reviews){
            if(reviews.idReview===idReview){
                if(idCritic.length!=0) {
                    reviews.idCritic = idCritic;
                }
                if(filmId.length!=0) {
                    reviews.filmId = filmId;
                }
                if(review.length!=0) {
                    reviews.review = review;
                }
                if(data_p.length!=0) {
                    reviews.data_publication = Moment(data_p).format('YYYY-MM-DD');
                }
            }
            return reviews;
        });
        let object =arrAfterUpdat.find(function (reviews){
            if(reviews.idReview===idReview)return reviews;
        });
        this.setState(prevState=>({idReview:"", idCritic:"", filmId:"", review:"", date_publication:""}));
        this.setState({reviews:arrAfterUpdat},()=> axios.put(`http://localhost:8086/moviesite/api/review`,object));
    }

    handleSubmit=event => {
        event.preventDefault();
        let newelement = {idReview: this.state.idReview,idCritic:this.state.idCritic,filmId:this.state.filmId,review:this.state.review,data_publication:this.state.date_publication};
        console.log(newelement);
        this.setState(prevState=>({reviews:[...prevState.reviews,newelement],idReview:"",
                idCritic:"",
                filmId:"",
                review:"",
                date_publication:""})
            ,()=>axios.post(`http://localhost:8086/moviesite/api/review`, newelement));
    }

    render() {

        return(
            <div>
                <h1 className="text-center"> </h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td> Id review</td>
                        <td>Id critic</td>
                        <td>Id film</td>
                        <td>review</td>
                        <td>Date of publication</td>
                        <td>Options</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.reviews.map(
                            reviews =>
                                <tr key={reviews.idReview}>
                                    <td>{reviews.idReview}</td>
                                    <td>{reviews.idCritic}</td>
                                    <td>{reviews.filmId}</td>
                                    <td>{reviews.review}</td>
                                    <td>{Moment(reviews.data_publication).format('DD-MM-YYYY')}</td>
                                    <td>
                                        <Button onClick={()=>this.delete(reviews.idReview)}>DELETE</Button>
                                        <label>
                                            Review new critic:
                                            <input type="number" name="idCritic" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                            Review new idfilm:
                                            <input type="number" name="filmId" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                            Review new text:
                                            <input type="text" name="review" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                            Review new date:
                                            <input type="date" name="date_publication" onChange={this.multiInput}/>
                                        </label>
                                        <Button onClick={()=>this.newUpdate(reviews.idReview,this.state.idCritic,this.state.filmId,this.state.review,this.state.date_publication)}>Update</Button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Review id:
                        <input type="number" name="idReview" onChange={this.multiInput}/>
                    </label>
                <label>
                    Review  critic:
                    <input type="number" name="idCritic" onChange={this.multiInput}/>
                </label>
                <label>
                    Review  idfilm:
                    <input type="number" name="filmId" onChange={this.multiInput}/>
                </label>
                <label>
                    Review  text:
                    <input type="text" name="review" onChange={this.multiInput}/>
                </label>
                <label>
                    Review date:
                    <input type="date" name="date_publication" onChange={this.multiInput}/>
                </label>
                    <button type="submit">SUBMIT</button>
                </form>

            </div>

        )
    }

}
export default Reviews;