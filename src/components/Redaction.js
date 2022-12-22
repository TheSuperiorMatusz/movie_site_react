import  React from 'react';
import {Button} from "@mui/material";
import axios from "axios";
import {red} from "@mui/material/colors";
class Redaction extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            redaction:[],
            redid:"",
            upname:"",
            years:"",
            country:""
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8086/moviesite/api/redaction').then((response) =>{this.setState({redaction:response.data})});
    }
    delete=idRedaction=>{
        let object=this.state.redaction.find(function (redaction){
            if(redaction.idRedaction===idRedaction) return redaction;
        });
        let arrAfterDel=this.state.redaction.filter(function (redaction){
            return redaction.idRedaction !==idRedaction
        });
        this.setState({redaction:arrAfterDel},()=>axios
            .delete(`http://localhost:8086/moviesite/api/redaction/${idRedaction}`,object));
    }

    multiInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

        newUpdate=(idRedaction,name,years,country)=>{
        let year=parseInt(years,10)
            let arrAfterUpdat=this.state.redaction.map(function (redaction){
                if(redaction.idRedaction===idRedaction){
                    if(year.length!=0) {
                        redaction.years = years;
                    }
                    if(name.length!=0)
                    {
                        redaction.name = name;
                    }
                    if(country.length!=0)
                    {
                        redaction.country = country;
                    }
                    console.log(years);
                }
                return redaction;
            });
            let object =arrAfterUpdat.find(function (redaction){
                if(redaction.idRedaction===idRedaction)return redaction;
            });
            this.setState(prevState=>({upname:"",years:"",country:""}));
            this.setState({redaction:arrAfterUpdat},()=> axios.put(`http://localhost:8086/moviesite/api/redaction`,object));
            console.log(arrAfterUpdat);
        }


            handleSubmit=event => {
                event.preventDefault();
                let year = parseInt(this.state.years, 10)
                let newelement = {idRedaction:this.state.redid,name: this.state.upname, years: year, country: this.state.country};
                this.setState(prevState=>({redaction:[...prevState.redaction,newelement],redid:"", upname:"", years:"", country:""})
                    ,()=>axios.post(`http://localhost:8086/moviesite/api/redaction`, newelement));
            }

    render() {

        return(
            <div>
                <h1 className="text-center"> </h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td> Id redaction</td>
                        <td>Name</td>
                        <td>Year</td>
                        <td>Country</td>
                        <td>Options</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.redaction.map(
                            redaction =>
                                <tr key={redaction.idRedaction}>
                                    <td>{redaction.idRedaction}</td>
                                    <td>{redaction.name}</td>
                                    <td>{redaction.years}</td>
                                    <td>{redaction.country}</td>
                                    <td>
                                        <Button onClick={()=>this.delete(redaction.idRedaction)}>DELETE</Button>
                                        <label>
                                       Redaction new name:
                                        <input type="text" name="upname" onChange={this.multiInput}/>
                                    </label>
                                    <label>
                                        Redaction new year:
                                        <input type="text" name="years" onChange={this.multiInput}/>
                                    </label>
                                    <label>
                                            Redaction new country:
                                            <input type="text" name="country" onChange={this.multiInput}/>
                                    </label>
                                    <Button onClick={()=>this.newUpdate(redaction.idRedaction,this.state.upname,this.state.years,this.state.country)}>Update</Button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <form onSubmit={this.handleSubmit}>
                    <label>Redaction id:
                        <input type="text" name="redid"  onChange={this.multiInput}/>
                    </label>
                    <label> Redaction name:
                        <input type="text" name="upname"  onChange={this.multiInput}/>
                    </label>
                    <label> Redaction year:
                        <input type="text" name="years" onChange={this.multiInput}/>
                    </label>
                    <label>
                         Redaction country:
                        <input type="text" name="country" onChange={this.multiInput}/>
                    </label>
                    <Button type="submit">SUBMIT</Button>
                </form>
            </div>

        )
    }

}
export default Redaction;