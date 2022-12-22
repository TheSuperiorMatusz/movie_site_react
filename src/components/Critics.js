import React from "react";
import axios from "axios";
import {Button} from "@mui/material";

class Critics extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            critic:[],
            id:"",
            upname:"",
            upsurname:"",
            age:"",
            fav:"",
            redaction:""
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8086/moviesite/api/critic').then((response) =>{this.setState({critic:response.data})});
    }
    delete=idCritic=>{
        let object=this.state.critic.find(function (Critic){
            if(Critic.idCritic===idCritic) return Critic;
        });
        let arrAfterDel=this.state.critic.filter(function (Critic){
            return Critic.idCritic !==idCritic
        });
        this.setState({critic:arrAfterDel},()=>axios
            .delete(`http://localhost:8086/moviesite/api/critic/${idCritic}`,object));
    }

    multiInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    newUpdate=(idCritic,name,surname,age,fav,redaction)=>{
        let arrAfterUpdat=this.state.critic.map(function (Critic){
            if(Critic.idCritic===idCritic){
                if(name.length!=0) {
                    Critic.name = name;
                }
                if(surname.length!=0)
                {
                    Critic.surname = surname;
                }
                if(age.length!=0)
                {
                    Critic.age = age;
                }
                if(fav.length!=0)
                {
                    Critic.favGenre = fav;
                }
                if(redaction.length!=0)
                {
                    Critic.red = redaction;
                }
            }
            return Critic;
        });
        let object =arrAfterUpdat.find(function (Critic){
            if(Critic.idCritic===idCritic)return Critic;
        });
        this.setState(prevState=>({upname:"",age:"",upsurname:"",fav:"",redaction:""}));
        this.setState({critic:arrAfterUpdat},()=> axios.put(`http://localhost:8086/moviesite/api/critic`,object));
        console.log(arrAfterUpdat);
    }


        handleSubmit=event=>{
            event.preventDefault();
            let newelement={idCritic:this.state.id,name:this.state.upname,surname:this.state.upsurname,age:this.state.age,favGenre:this.state.fav,red:this.state.redaction};
            this.setState(prevState=>({critic:[...prevState.critic,newelement],id:"", upname:"", upsurname:"", age:"", fav:"", redaction:""}),
                ()=>axios.post(`http://localhost:8086/moviesite/api/critic`,newelement));
        }

    render() {

        return(
            <div>
                <h1 className="text-center"> </h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td> Id Critic</td>
                        <td>Name</td>
                        <td>Surname</td>
                        <td>Age</td>
                        <td>Fav type</td>
                        <td> Redaction </td>
                        <td>Options</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.critic.map(
                            Critic =>
                                <tr key={Critic.idCritic}>
                                    <td>{Critic.idCritic}</td>
                                    <td>{Critic.name}</td>
                                    <td>{Critic.surname}</td>
                                    <td>{Critic.age}</td>
                                    <td>{Critic.favGenre}</td>
                                    <td>{Critic.red}</td>
                                    <td>
                                        <Button onClick={()=>this.delete(Critic.idCritic)}>DELETE</Button>
                                        <label>
                                            Critic new name:
                                            <input type="text" name="upname" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                            Critic new surname:
                                            <input type="text" name="upsurname" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                           Critic new age:
                                            <input type="text" name="age" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                            Critic new favourite type movie:
                                            <input type="text" name="fav" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                            Critic new redaction:
                                            <input type="text" name="redaction" onChange={this.multiInput}/>
                                        </label>
                                        <Button onClick={()=>this.newUpdate(Critic.idCritic,this.state.upname,this.state.upsurname,this.state.age,this.state.fav,this.state.redaction)}>Update</Button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <form onSubmit={this.handleSubmit} >
                    <label>
                        <label>
                            Critic id:
                            <input type="text" name="id" onChange={this.multiInput}/>
                        </label>
                        <label>
                            Critic name:
                            <input type="text" name="upname" onChange={this.multiInput}/>
                        </label>
                        <label>
                            Critic  surname:
                            <input type="text" name="upsurname" onChange={this.multiInput}/>
                        </label>
                        <label>
                            Critic  age:
                            <input type="text" name="age" onChange={this.multiInput}/>
                        </label>
                        <label>
                            Critic favourite type movie:
                            <input type="text" name="fav" onChange={this.multiInput}/>
                        </label>
                        <label>
                            Critic redaction:
                            <input type="text" name="redaction" onChange={this.multiInput}/>
                        </label>
                    </label>
                    <button type="submit">SUBMIT</button>
                </form>
            </div>

        )
    }

}
export default Critics;