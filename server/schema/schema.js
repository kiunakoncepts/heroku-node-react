const graphql = require("graphql"); //use graphql package
const _ = require("lodash");

const Artist = require('../models/artist');
const Songs = require('../models/songs');


/*Getting GraphQLObjectType function from 'graphql' to define the (dataType) 
 structure of our queries and their model type.
*/
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType
} = graphql;

//Defining ArtistType with its fields.
const ArtistType = new GraphQLObjectType({
  name: "Artist",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    region: { type: GraphQLString },
    genius_id: { type: GraphQLInt },
    image: { type: GraphQLString },
    bg_image: { type: GraphQLString },
    tidal_id: { type: GraphQLInt },
    bio: {type: GraphQLString },
    songs : {  // Supporting list of cars query in Owner type
        type : new GraphQLList(SongType),
        resolve(parent,args){
            return Songs.find({artist_id:parent.id});
        }
    }
  })
});

const SongType = new GraphQLObjectType({
    name: "Song",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        artist: {
            type: ArtistType,
            resolve(parent,args){
                return Artist.findById(parent.artist_id)
            }
        }
    })
})
//Defining RootQuery
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        artist: {
            type: ArtistType, 
            args: { id: { type: GraphQLID } },  
            resolve(parent, args) {
                //return _.find(ArtistData, { id: args.id });

                return Artist.findById(args.id)
            } 
        },
        song: {
            type: SongType,
            args: { id: {type: GraphQLID } },
            resolve(parent, args) {
                return Songs.findById(args.id)
            }
        },
        artists: {
            type: new GraphQLList(ArtistType),
            resolve(parent,args){
                return Artist.find({});
            }
        },
        songs: {
            type: new GraphQLList(SongType),
            resolve(parent, args){
                return Songs.find({});
            }
        }
    } 
});


  //exporting 'GraphQLSchema with RootQuery' for GraphqlHTTP middleware.
  module.exports = new GraphQLSchema({
    query: RootQuery,
    //mutation: Mutation
  });