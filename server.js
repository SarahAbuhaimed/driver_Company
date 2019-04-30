require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT
const Company = require('./models/company');
const Car = require('./models/car');
const Driver = require('./models/driver');
const ejs = require('ejs');
const methodOverride = require('method-override')
const mongoose = require('mongoose')

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');


//Company INDEX
app.get('/companies', (req, res) => {
  Company.find()
  .then((companies)=>{
    res.render('index', { companies })
  }).catch(err => console.log(err))

})
//Driver INDEX
app.get('/drivers', (req, res) => {
  Driver.find()
  .then((drivers)=>{
    res.render('index', { drivers })
  }).catch(err => console.log(err))

})
//Car INDEX
app.get('/cars', (req, res) => {
  Car.find()
  .then((cars)=>{
    res.render('index', { cars })
  }).catch(err => console.log(err))

})

//Company NEW
app.get('/companies/new', (req, res) => {
 Car.find().then(cars => {
   Driver.find().then(drivers =>{
      res.render('companies/new', { cars ,drivers })
    })
  })
})
//driver NEW
app.get('/drivers/new', (req, res) => {
  Car.find()
    .then(cars => {
      res.render('drivers/new', { cars })
    })
})

//Car New
app.get('/cars/new', (req, res) => {
  res.render('new')
})

//Company POST
app.post('/companies', (req, res) => {
  let newCompany = new Company(req.body)
  req.body.companyCarsArray.forEach(car => {
    newCompany.cars.push(car)
  })
  req.body.companyDriversArray.forEach(driver => {
    newCompany.drivers.push(driver)
  })
  company.save()
  .then(()=> {
    res.redirect('/companies')
  }).catch(err => console.log(err))
})

//car Post
app.post('/cars', (req, res) => {
  let data = {
    name: req.body.carName,
    model: req.body.carModel,
    year:req.body.carYear,
    image: req.body.carImage
  }
  let car = new Car(data)
  car.save()
  .then(()=> {
    res.redirect('/cars')
  }).catch(err => console.log(err))
})

//Driver POST
app.post('/drivers', (req, res) => {
  let newDriver = new Driver(req.body)
  req.body.driverCarsArray.forEach(car => {
    newDriver.cars.push(car)
  })
  newDriver.save() 
  res.redirect('/drivers');
})

//Company SHOW
app.get('/companies/:indexOfCompaniesArray', (req, response) => {
  Company.findById(req.params.indexOfCompaniesArray).populate('cars','drivers')
  .then((company) => {
      response.render('show', {
          company: company
      })
  }).catch((err) => {
      console.log(err);
  })
})

//Car SHOW
app.get('/cars/:indexOfCarsArray', (req, response) => {
  Car.findById(req.params.indexOfCarsArray)
  .then((car) => {
      response.render('cars/show', {
          car: car
      })
  }).catch((err) => {
      console.log(err);
  })
})

//Driver SHOW
app.get('/drivers/:indexOfDriversArray', (req, response) => {
  Driver.findById(req.params.indexOfDriversArray).populate('cars')
  .then((driver) => {
      response.render('drivers/show', {
          driver: driver
      })
  }).catch((err) => {
      console.log(err);
  })
})

//Company EDIT
app.get('/companies/:indexOfCompaniesArray/edit', (req, res) => {
  Company.findById(req.params.indexOfCompaniesArray).then(company => {
    Car.find().then(cars => {
      driver.find().then(drivers => {
  res.render('companies/edit', {company, cars ,drivers})
      })
})  
  }) 

//Car Edit
app.get('/cars/:indexOfCarsArray/edit', (req, res) => {
  Car.findById(req.params.indexOfCarsArray)
  .then(car => {
    res.render('cars/edit', { car })
  })
})
})
//Driver EDIT
app.get('/drivers/:indexOfDriversArray/edit', (req, res) => {
  Driver.findById(req.params.indexOfDriversArray).then(driver => {
      Car.find().then(cars => {
    res.render('drivers/edit', {driver, cars })
  })  
 })
})

//DELETE
app.delete('/companies/:indexOfCompaniesArray', (req, res) => {
  companies.splice(req.params.indexOfCompaniesArray, 1);
  res.redirect('/companies');
})

//PUT
app.put('/companies/:indexOfCompaniesArray', (req, res) => {
  companies[req.params.indexOfCompaniesArray] = req.body;
  res.redirect('/companies');
})

mongoose.connect('mongodb://localhost/companies', {useNewUrlParser : true})
.then(()=> {console.log("mongodb is running")},(err) => console.log(err))

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})