import  React from 'react';
import {Button} from "@mui/material";
import axios from "axios";
import {Label} from "@mui/icons-material";
class Studio extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            studio:[],
            upname:"",
            upadress:"",
            chairman:""
        }
    }

    componentDidMount() {
       axios.get('http://localhost:8086/moviesite/api/studio').then((response) =>{this.setState({studio:response.data})});
    }
   delete=name=>{
        let object=this.state.studio.find(function (studio){
            if(studio.name===name) return studio;
        });
        let arrAfterDel=this.state.studio.filter(function (studio){
            return studio.name !==name
        });
        this.setState({studio:arrAfterDel},()=>axios
            .delete(`http://localhost:8086/moviesite/api/studio/${name}`,object));
    }

    multiInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    newUpdate=(name,address,chairman)=>{
        let arrAfterUpdat=this.state.studio.map(function (studio){
            if(studio.name===name){
                if(address.length!=0) {
                    studio.address = address;
                }
                if(chairman.length!=0)
                {
                    studio.chairmanNum = chairman;
                }
                console.log(address);
            }
            return studio;
        });
        let object =arrAfterUpdat.find(function (studio){
            if(studio.name===name)return studio;
        });
        this.setState(prevState=>({upaddress:"",chairman:""}));
        this.setState({studio:arrAfterUpdat},()=> axios.put(`http://localhost:8086/moviesite/api/studio`,object));
        console.log(arrAfterUpdat);
    }


    handleSubmit=event=>{
        event.preventDefault();
        let newelement={name: this.state.upname,address:this.state.upadress,chairmanNum:this.state.chairman};
        this.setState(prevState =>({
            studio:[...prevState.studio,newelement],upname:"",upsurname:""
        }),()=> axios.post(`http://localhost:8086/moviesite/api/studio`,newelement));
    }

    render() {

        return(
            <div>
                <h1 className="text-center"> </h1>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td> Studio name</td>
                        <td>Address</td>
                        <td>Chairman</td>
                        <td>Options</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.studio.map(
                            studio =>
                                <tr key={studio.name}>
                                    <td>{studio.name}</td>
                                    <td>{studio.address}</td>
                                    <td>{studio.chairmanNum}</td>
                                    <td>
                                        <Button onClick={()=>this.delete(studio.name)}>Delete</Button>
                                        <label>Studio new address:
                                            <input type="text" name="upadress" onChange={this.multiInput}/>
                                        </label>
                                        <label>
                                         Studio new  chairman:
                                            <input type="text" name="chairman" onChange={this.multiInput}/>
                                        </label>
                                        <Button onClick={()=>this.newUpdate(studio.name,this.state.upadress,this.state.chairman)}>Update</Button>
                                    </td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
                <form onSubmit={this.handleSubmit}>
                    <label>New studio name:
                        <input type="text" name="upname"   onChange={this.multiInput}/>
                    </label>
                    <label>New studio address
                        <input type="text" name="upadress" onChange={this.multiInput}/>
                    </label>
                    <label>
                        Chairman id:
                        <input type="text" name="chairman" onChange={this.multiInput}/>
                    </label>
                    <Button type="submit">SUBMIT</Button>
                </form>
            </div>

        )
    }

}
export default Studio;