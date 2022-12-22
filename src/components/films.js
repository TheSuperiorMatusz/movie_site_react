import React from "react";
import axios from "axios";
import {Button} from "@mui/material";
class Films extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            films:[],
            idFilm:"",
            title:"",
            year:"",
            length:"",
            genre:"",
            studioName:""
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8086/moviesite/api/films').then((response) =>{this.setState({films:response.data})});
    }
    delete=idFilm=>{
        let object=this.state.films.find(function (Film){
            if(Film.idFilm===idFilm) return Film;
        });
        let arrAfterDel=this.state.films.filter(function (Film){
            return Film.idFilm !==idFilm
        });
        this.setState({films:arrAfterDel},()=>axios
            .delete(`http://localhost:8086/moviesite/api/Films/${idFilm}`,object));
    }

    multiInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    newUpdate=(idFilm,title,year,length,genre,studioName)=>{
        let arrAfterUpdat=this.state.films.map(function (Film){
            if(Film.idFilm===idFilm){
                if(title.length!=0) {
                    Film.title = title;
                }
                if(year.length!=0)
                {
                    Film.year = year;
                }
                if(length.length!=0)
                {
                    Film.length = length;
                }
                if(genre.length!=0)
                {
                    Film.Genre = genre;
                }
                if(studioName.length!=0)
                {
                    Film.studioName = studioName;
                }
            }
            return Film;
        });
        let object =arrAfterUpdat.find(function (Film){
            if(Film.idFilm===idFilm)return Film;
        });
        this.setState(prevState=>({  title:"", length:"", genre:"", horror:"", fav:"", studioName:""}));
        this.setState({films:arrAfterUpdat},()=> axios.put(`http://localhost:8086/moviesite/api/films`,object));
        console.log(arrAfterUpdat);
    }


    handleSubmit=event=>{
        event.preventDefault();
        let newelement={idFilm:this.state.idFilm,title:this.state.title,year:this.state.year,length:this.state.length,genre:this.state.genre,studioName:this.state.studioName};
        this.setState(prevState=>({films:[...prevState.films,newelement],idFilm:"", title:"", year:"", length:"", genre:"", studioName:""}),
            ()=>axios.post(`http://localhost:8086/moviesite/api/films`,newelement));
    }

    render() {

        return(
            <div>
                <h1 className="text-center"> </h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td> idFilm</td>
                        <td>Title</td>
                        <td>Year</td>
                        <td>Length</td>
                        <td>Genre</td>
                        <td>Studio Name</td>
                        <td>Options</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.films.map(
                            Film =>
                                <tr key={Film.idFilm}>
                                    <td>{Film.idFilm}</td>
                                    <td>{Film.title}</td>
                                    <td>{Film.year}</td>
                                    <td>{Film.length}</td>
                                    <td>{Film.genre}</td>
                                    <td>{Film.studioName}</td>
                                    <td>
                                        <Button onClick={()=>this.delete(Film.idFilm)}>DELETE</Button>
                                        <label>
                                            Film new title:
                                            <input type="text" name="title" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                            Film new year:
                                            <input type="text" name="year" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                            Film new Length:
                                            <input type="text" name="length" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                            Film new genre:
                                            <input type="text" name="genre" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                            Film new redaction:
                                            <input type="text" name="studioName" onChange={this.multiInput}/>
                                        </label>
                                        <Button onClick={()=>this.newUpdate(Film.idFilm,this.state.title,this.state.year,this.state.length,this.state.genre,this.state.studioName)}>Update</Button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <form onSubmit={this.handleSubmit} >
                    <label>
                        <label>
                            Film id:
                            <input type="text" name="idFilm" onChange={this.multiInput}/>
                        </label>
                        <label>
                            Film title:
                            <input type="text" name="title" onChange={this.multiInput}/>
                        </label>
                        <label>
                            Film  year:
                            <input type="text" name="year" onChange={this.multiInput}/>
                        </label>
                        <label>
                            Film  length:
                            <input type="text" name="length" onChange={this.multiInput}/>
                        </label>
                        <label>
                         Film genre:
                            <input type="text" name="genre" onChange={this.multiInput}/>
                        </label>
                        <label>
                            Film studio:
                            <input type="text" name="studioName" onChange={this.multiInput}/>
                        </label>
                    </label>
                    <button type="submit">SUBMIT</button>
                </form>
            </div>

        )
    }

}
export default Films;