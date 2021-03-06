import React,{Component} from 'react'
import './AddBus.css'
import axios from 'axios';
import { MsgBox } from '../../../Utility/MsgBox';

class addBus extends Component {
    state={
        cities:[],
        name:'',
        description:'',
        fromCity:'',
        toCity:'',
        fromCityTime:'',
        toCityTime:'',
        duration:0,
        totalSeats:0,
        price:0,
        msgProps: { 
            bool : false, 
            msg: "", 
            type: "",
            className: ""
        }
    }
    componentDidMount(){
        axios.get('http://localhost:8080/city/viewCity')
            .then(response => {
                
                this.setState({cities:response.data.cities})
            })
			.catch(error => {throw error})
    }
    handleUserInput(e){
        const name = e.target.name;
        let value = e.target.value;
        if(name==="totalSeats"){
            value=value*5;
        }
        this.setState({[name]: value});
    }
    addBus=()=>{
        const { name,description,fromCity,toCity,fromCityTime,toCityTime,duration,totalSeats,price } = this.state;
        // console.log(this.state.description)
        let seatStatus=[]
        let row =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        for(let i=0;i<totalSeats/5;i++){
            let seat={
                row:row[i],
                status:['unbooked','unbooked','unbooked','unbooked','unbooked'] 
                }
                seatStatus.push(seat)
        }
        axios.post("http://localhost:8080/bus/addBus", {
            name:name, 
            description: description,
            fromCity:fromCity,
            toCity:toCity,
            fromCityTime:fromCityTime,
            toCityTime:toCityTime,
            duration:duration,
            totalSeats:totalSeats,
            price:price,
            seatStatus:seatStatus
        })
        .then(response => {
            this.setState({msgProps : { bool : true, msg: "Bus Added", type: "Success", className: "alert alert-success"}});
            this.clearCache();
        })
        .catch(error => {
            this.setState({msgProps: { bool : true, msg: "Error", type: "Warning", className: "alert alert-warning"}});
            this.clearCache();
            throw(error);
        });
    }
    clearCache(){
        this.setState({
            
            name:'',
            description:'',
            fromCity:'',
            toCity:'',
            fromCityTime:'',
            toCityTime:'',
            duration:0,
            totalSeats:0,
            price:0,               
        });
    }
    
    render(){
        let cities = this.state.cities.map((city)=>{
            console.log(city)
            return(<option value={city.cityName} key={city._id}>{city.cityName}</option>)
        });
        return (
            <div className="Addbus">
                <label htmlFor="fromCity">From City:</label>
                <select  name="fromCity" 
                onChange={(event) => this.handleUserInput(event)}>
                <option value="" selected></option>
                {cities}</select>
                <label htmlFor="toCity">To City:</label>
                <select  name="toCity" onChange={(event) => this.handleUserInput(event)} >
                <option value="" selected></option>
                {cities}</select><br/>
                <label htmlFor="name">Bus Name:</label>
                <input type="text" 
                onChange={(event) => this.handleUserInput(event)} value={this.state.name}
                name="name" placeholder="Name"/>
                <label htmlFor="duration">Duration:</label>
                <input type="number" 
                onChange={(event) => this.handleUserInput(event)} value={this.state.duration}
                name="duration" placeholder="Duration Time"/><br/>
                <textarea onChange={(event) => this.handleUserInput(event)}
                value={this.state.description} placeholder="Description"
                className="form-control" rows="5" id="comment" name="description"></textarea>
                <label htmlFor="fromCityTime">Source Time:</label>
                <input type="text" 
                onChange={(event) => this.handleUserInput(event)} value={this.state.fromCityTime}
                name="fromCityTime" placeholder="Source Time"/>
                <label htmlFor="toCityTime">Destination Time:</label>
                <input type="text" 
                onChange={(event) => this.handleUserInput(event)} value={this.state.toCityTime}
                name="toCityTime" placeholder="Destination Time"/><br/>
                <label htmlFor="price">Price:</label>
                <input type="number" 
                onChange={(event) => this.handleUserInput(event)} value={this.state.price}
                name="price" placeholder="Price"/>
                <label htmlFor="totalSeats">Total row of seats in Bus:</label>
                <input type="number" 
                onChange={(event) => this.handleUserInput(event)} 
                name="totalSeats" placeholder="Total row of seats in Bus"/><br/><br/>
                <button className="btn btn-primary" onClick={this.addBus} style={{margin:"10px"}}>Add Bus</button>
                { this.state.msgProps.bool  == true ?
                                <MsgBox {...this.state.msgProps}></MsgBox>     
                            : null }
            </div>
            
    
        )
    }

}

export default addBus;