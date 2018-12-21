import React, { Component, Fragment } from 'react';


export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: props.title || "",
        content: props.content || "",
        price: props.id || "",
        files : [],
      };
    }
  
    handleChange= ({ target: { name, value } }) => {
      this.setState({ [name]: value });    
  
    }

    handleChangeImage = ({ target : {files}}) =>{

        //files.length check 1<git init
        //console.log(files.length);
        
        
        //files - object
        //console.log(files);
        const changes = Array.from(files);
        //console.log(changes); // array
        this.setState({
            files: changes.map(change => Object.assign(change, {
                preview: URL.createObjectURL(change)
            }))
        });
    }

    _onSave = () => {
        const { onSave } = this.props;
        const { title, content, price, files } = this.state;
        
        onSave(title, content, price, files);
      };
  
    render() {
        const { title, content, price } = this.state;
           
  
        return(

                <Fragment>  
                <input
                    type="text"
                    name="title"
                    placeholder="title"
                    value={title}
                    onChange={this.handleChange}
                />
  
                <input
                    type="text"
                    name="content"
                    placeholder="content"
                    value={content}
                    onChange={this.handleChange}
                />
  
                 <input
                    type="text"
                    name="price"
                    placeholder="price"
                    value={price}
                    onChange={this.handleChange}
                />
  
                <input
                    type="file"
                    name="files"
                    placeholder="image" 
                    accept="image/*"          
                    multiple required
                    value = {this.state.image}
                    onChange={this.handleChangeImage}
                />                
                                  
                <button onClick={this._onSave}>Submit</button> 
                </Fragment>              
        
      );
    }
  }