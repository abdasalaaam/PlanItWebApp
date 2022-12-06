/*const mongoURL = "mongodb+srv://abudsalem:ab7da2sa5@cluster0.rnt5syv.mongodb.net/?retryWrites=true&w=majority"
import {MongoClient} from 'mongodb'


const connectionString = "mongodb+srv://abudsalem:ab7da2sa5@cluster0.rnt5syv.mongodb.net/Users?retryWrites=true&w=majority"

export const getStaticProps = async (context) => {
  const mongoClient = new MongoClient(connectionString)
  const data = await mongoClient.db().collection('Users').find().toArray()
  console.log(data)
}*/