import React from 'react';
import './App.css';
import axios from 'axios';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todoList:[],
      activeItem:{
        id:null, 
        title:'',
        completed:false,
      },
      editing:false,
    }
    this.fetchTasks = this.fetchTasks.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getCookie = this.getCookie.bind(this)
    this.startEdit = this.startEdit.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.strikeUnstrike = this.strikeUnstrike.bind(this)
    this.accessToken = sessionStorage.getItem('authToken')
    if(process.env.REACT_APP_ENV === 'production'){
      this.baseUrl = process.env.REACT_APP_PROD_URL;
    }
    if(process.env.REACT_APP_ENV === 'development'){
      this.baseUrl = process.env.REACT_APP_DEV_URL;
    }
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }

  async componentDidMount(){
    await this.fetchTasks()
  }

  async fetchTasks(){

    try {
      const response = await axios.get(`${this.baseUrl}/v1/task-list/`, { headers:{ 'Authorization': `Bearer ${this.accessToken}` }});
      this.setState({ todoList: response.data })
    } catch(error) {
      this.handleReqErrors(error);
    }

    // fetch('http://127.0.0.1:8000/api/v1/task-list/', {
    //   method:'GET',
    //   headers:{ 'Authorization': `Bearer ${this.accessToken}` }
    // }).then(response => response.json())
    // .then(data => {
    //   this.setState({
    //     todoList:data
    //   })
    // }).catch(error => {})
  }

  handleReqErrors = (error) => {
    if(error.response){
      if(error.response.status === 401){
        const msg = 'Session expired\nKindly login again';
        alert(msg);
        sessionStorage.removeItem('authToken');
        this.props.sessionExpired()
      }else{
        alert('Server Error');     
      }
    }else{
      alert('Server Error');         
    }
  }

  handleChange(e){
    var value = e.target.value

    this.setState({
      activeItem:{
        ...this.state.activeItem,
        title:value
      }
    })
  }

  async handleSubmit(e){
    e.preventDefault()

    var csrftoken = this.getCookie('csrftoken')

    var url = `${this.baseUrl}/v1/task-create/`

    if(this.state.editing === true){
      url = `${this.baseUrl}/v1/task-update/${ this.state.activeItem.id}/`
      this.setState({
        editing:false
      })
    }

    const config = {
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
        'Authorization': `Bearer ${this.accessToken}`
      },
    }

    try {
      const response = await axios.post(url, this.state.activeItem, config);
      await this.fetchTasks();
      this.setState({
        activeItem:{
          id:null, 
          title:'',
          completed:false,
        }
      });
    } catch(error) {
      this.handleReqErrors(error);
    }

    // fetch(url, {
    //   method:'POST',
    //   headers:{
    //     'Content-type':'application/json',
    //     'X-CSRFToken':csrftoken,
    //     'Authorization': `Bearer ${this.accessToken}`
    //   },
    //   body:JSON.stringify(this.state.activeItem)
    // }).then((response)  => {
    //     this.fetchTasks()
    //     this.setState({
    //        activeItem:{
    //       id:null, 
    //       title:'',
    //       completed:false,
    //     }
    //     })
    // }).catch(function(error){
    //   console.log('ERROR:', error)
    // })

  }

  startEdit(task){
    this.setState({
      activeItem:task,
      editing:true,
    })
  }


  async deleteItem(task){
    var csrftoken = this.getCookie('csrftoken')

    const config = {
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
        'Authorization': `Bearer ${this.accessToken}`
      },
    }

    try {
      const response = await axios.delete(`${this.baseUrl}/v1/task-delete/${task.id}/`, config);
      await this.fetchTasks();
    } catch(error) {
      this.handleReqErrors(error);
    }

    // fetch(`${this.baseUrl}/v1/task-delete/${task.id}/`, {
    //   method:'DELETE',
    //   headers:{
    //     'Content-type':'application/json',
    //     'X-CSRFToken':csrftoken,
    //     'Authorization': `Bearer ${this.accessToken}`,
    //   },
    // }).then((response) =>{

    //   this.fetchTasks()
    // })
  }


  async strikeUnstrike(task){

    task.completed = !task.completed
    var csrftoken = this.getCookie('csrftoken')
    var url = `${this.baseUrl}/v1/task-update/${task.id}/`;

    const config = {
      headers:{
        'Content-type':'application/json',
        'X-CSRFToken':csrftoken,
        'Authorization': `Bearer ${this.accessToken}`
      },
    }

    try {
      const body = {'completed': task.completed, 'title':task.title};
      const response = await axios.post(url, body, config);
      await this.fetchTasks();
    } catch(error) {
      this.handleReqErrors(error);
    }


      // fetch(url, {
      //   method:'POST',
      //   headers:{
      //     'Content-type':'application/json',
      //     'X-CSRFToken':csrftoken,
      //     'Authorization': `Bearer ${this.accessToken}`,
      //   },
      //   body:JSON.stringify({'completed': task.completed, 'title':task.title})
      // }).then(() => {
      //   this.fetchTasks()
      // })

  }


  render(){
    var tasks = this.state.todoList
    var self = this
    return(
        <div className="container">

          <div id="task-container">
              <div  id="form-wrapper">
                 <form onSubmit={this.handleSubmit}  id="form">
                    <div className="flex-wrapper">
                        <div style={{flex: 6}}>
                            <input onChange={this.handleChange} className="form-control" id="title" value={this.state.activeItem.title} type="text" name="title" placeholder="Add task.." />
                         </div>

                         <div >
                            <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                          </div>
                      </div>
                </form>
             
              </div>

              <div  id="list-wrapper">         
                    { tasks != null && tasks.length !== 0 && tasks.map(function(task, index){
                      return(
                          <div key={index} className="task-wrapper flex-wrapper">

                            <div onClick={() => self.strikeUnstrike(task)} style={{flex:7}}>

                                {task.completed === false ? (
                                    <span>{task.title}</span>

                                  ) : (

                                    <strike>{task.title}</strike>
                                  )}
  
                            </div>

                            <div style={{flex:1}}>
                                <button onClick={() => self.startEdit(task)} className="btn btn-sm btn-outline-info">Edit</button>
                            </div>

                            <div style={{flex:1}}>
                                <button onClick={() => self.deleteItem(task)} className="btn btn-sm btn-outline-dark delete">-</button>
                            </div>

                          </div>
                        )
                    })}
              </div>
          </div>
          
        </div>
      )
  }
}



export default App;
