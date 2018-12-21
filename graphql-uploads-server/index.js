const { GraphQLServer } = require("graphql-yoga");
const { createWriteStream } = require("fs");

const typeDefs = `
  scalar Upload
  
  type Mutation {
    uploadFile(file: Upload!): Boolean
    PostMutation(title : String! content : String! price : String! files: [Upload!]! ) : Response! 
  }
  
  type Query {
    hello: String
  }

  type Response{
    ok : Boolean
  }
`;

/*const storeUpload = ({ stream, filename }) =>
  new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(filename))
      .on("finish", () => resolve())
      .on("error", reject)
  );
 */
const resolvers = {
  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { stream, filename } = await file;
      await storeUpload({ stream, filename });
      return true;  
     
    },
    PostMutation : async(parent, { title, content, price, files}) => {
        console.log(title);
        console.log(files);
        return {
          ok: true
        }
    },
  },
  Query: {
    hello: () => "hi"
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));



/*
  Mutation: {
    uploadFile: async (parent, { file }) => {
      const { stream, filename } = await file;
      console.log(stream);
      await storeUpload({ stream, filename });
      return true;
    }
  },
*/