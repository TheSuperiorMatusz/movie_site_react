import  React from 'react';
import Chairman from  './services/Chairman'
import {Button} from "@mui/material";
import axios from "axios";




class ChairmanCompo extends React.Component{
 constructor(props) {
     super(props);
     this.state={
         chairman:[],
         upname:"",
         upsurname:"",
         personalIdNum:""
         }
         this.multiInput=this.multiInput.bind(this)
         this.newUpdate=this.newUpdate.bind(this);
     }

 componentDidMount() {
     Chairman.getChairman().then((response) =>{
         this.setState({chairman:response.data})
     });
 }
 handleRemove=personalIdNum=>{
     let object=this.state.chairman.find(function (chairmen){
         if(chairmen.personalIdNum===personalIdNum) return chairmen;
     });
     let arrAfterDel=this.state.chairman.filter(function (chairmen){
         return chairmen.personalIdNum !==personalIdNum
     });
     this.setState({chairman:arrAfterDel},()=>axios
         .delete(`http://localhost:8086/moviesite/api/chairman/${personalIdNum}`,object));
 }
    multiInput = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }
    newUpdate=(personalIdNum,name,surname)=>{
        let arrAfterUpdat=this.state.chairman.map(function (chairmen){
            if(chairmen.personalIdNum===personalIdNum){
                if(name.length!=0)
                {
                    chairmen.name = name;
                }
                if(surname.length!=0)
                {
                    chairmen.surname = surname;
                }
            }
            return chairmen;
        });
        let object =arrAfterUpdat.find(function (chairmen){
            if(chairmen.personalIdNum===personalIdNum)return chairmen;
        });
        this.setState(prevState=>({upname:"",upsurname:""}));
        this.setState({chairman:arrAfterUpdat},()=> axios.put(`http://localhost:8086/moviesite/api/chairman`,object));
        console.log(arrAfterUpdat);
     }
    handleSubmit=event=>{
     event.preventDefault();
     let newelement={personalIdNum: this.state.personalIdNum,name:this.state.upname,surname:this.state.upsurname};
     this.setState(prevState =>({
        chairman:[...prevState.chairman,newelement],upname:"",upsurname:""
     }),()=> axios.post(`http://localhost:8086/moviesite/api/chairman`,newelement));
    }

 render() {

     return(
         <div>
            <h1 className="text-center"> </h1>
             <table className="table table-striped">
                 <thead>
                    <tr>
                        <td> Chairman Id</td>
                        <td>Name</td>
                        <td>Surname</td>
                        <td>Options</td>
                    </tr>
                 </thead>
                 <tbody>
                 {
                     this.state.chairman.map(
                         chairman =>
                             <tr key={chairman.personalIdNum}>
                                 <td>{chairman.personalIdNum}</td>
                                 <td>{chairman.name}</td>
                                 <td>{chairman.surname}</td>
                                 <td>
                                     <Button onClick={()=>this.handleRemove(chairman.personalIdNum)}>Delete</Button>
                                         <label>Chairman new name:
                                             <input type="text" name="upname" onChange={this.multiInput}/>
                                         </label>
                                         <label>
                                             Chairman new surname:
                                             <input type="text" name="upsurname" onChange={this.multiInput}/>
                                         </label>
                                         <Button onClick={()=>this.newUpdate(chairman.personalIdNum,this.state.upname,this.state.upsurname)}>Update</Button>
                                 </td>
                             </tr>
                     )
                 }
                 </tbody>
             </table>
             <form onSubmit={this.handleSubmit}>
                 <label>New chairman id:
                     <input type="text" name="personalIdNum" maxLength={11} minLength={11}  onChange={this.multiInput}/>
                 </label>
                 <label>New chairman:name
                     <input type="text" name="upname" onChange={this.multiInput}/>
                 </label>
                 <label>
                     New chairman surname:
                     <input type="text" name="upsurname" onChange={this.multiInput}/>
                 </label>
                 <Button type="submit">SUBMIT</Button>
             </form>
         </div>

     )
 }


}
export default ChairmanCompo;