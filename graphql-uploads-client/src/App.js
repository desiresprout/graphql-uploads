import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Upload from './Upload';


/*const uploadFileMutation = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file)
  }
`; */

/*
  const UPLOAD_MUTATION = gql`
  mutation PostMutation($title : String! $content : String! $price : String! $file: [Upload!] ) {
    uploadFile(file: $file)
  }
`;


/*export default () => (
  <Mutation mutation={uploadFileMutation}>
    {mutate => (
      <input type="file" accept="image/*" multiple onchange="fileinfo(this.files)"/>
      <Dropzone onDrop={([file]) => mutate({ variables: { file } })}>
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
    )}
  </Mutation>
);*/


const UPLOAD_MUTATION = gql`
  mutation PostMutation($title : String! $content : String! $price : String! $files: [Upload!]! ) {
    PostMutation(title : $title content : $content price : $price files: $files)
  }
`;


export default class App extends Component {
  

  _onSave = (title, content, price, files) => {
    console.log(files);       
    if (title !== "" && content !== "" && price) {
      this.PostMutation({ variables: { title, content, price, files } });
      
    }
  };

  render() { 

      return (            
          <Mutation mutation={UPLOAD_MUTATION}>
          {PostMutation => {
            this.PostMutation = PostMutation;
            return (
              <Upload                
                onSave={this._onSave}
              />
            );
          }}
        </Mutation>     
      
      );
  }
}

  