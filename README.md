# Stack-with-an-attitude


this is our documentation for the ACL project 2021/2022 done by team **Stack-with-an-attitude**.


# notes for when using files from my branch

please run ```node npm i ``` after cloning or pulling and it will install all the modules you dont have to do them one by one


# Connection

to connect to the data base you should use this sample driver code:

```javascript 

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://dbUser:<password>@ourcluster.djjyo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

```


Replace **password** with the password for the dbUser user. Replace **myFirstDatabase** with the name of the database ( **sample_ProjectDb**) that connections will use by default.

a sample collection is available in the DB with the name **sample_collection**

