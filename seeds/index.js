const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("Database connected");
});

const sample = array=> array[Math.floor(Math.random() * array.length)];


const seedDB = async ()=> {
    await Campground.deleteMany({});
    for(let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '60de18c6a1955c1259f803f6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            name: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, dolore cupiditate. Praesentium dolore tenetur dignissimos dicta, dolorem ratione dolores eum fugit, tempora consectetur architecto! Fuga eveniet numquam neque quasi minus. Id quibusdam, itaque libero reiciendis aperiam eligendi, dolore assumenda eaque hic repellat blanditiis eos deleniti, molestiae necessitatibus eius quaerat possimus pariatur fugiat mollitia reprehenderit enim. Quae ab esse repudiandae necessitatibus?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dw0rkoozx/image/upload/v1625151568/YelpCamp/vtjiotlo4qjjzhvmjqbu.jpg',
                    filename: 'YelpCamp/vtjiotlo4qjjzhvmjqbu'
                  },
                  {
                    url: 'https://res.cloudinary.com/dw0rkoozx/image/upload/v1625013528/YelpCamp/ybdqll7pdugpzdsslsmq.jpg',
                    filename: 'YelpCamp/ybdqll7pdugpzdsslsmq'
                  }
              ]
        })
        await camp.save();
    }
}

seedDB().then(()=> {
    mongoose.connection.close()
});