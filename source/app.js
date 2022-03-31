const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const request = require ('request')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

// Defining paths for Express Configurations
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up handlebars engine and views location 
//templates are where our dynamic website code we made with handbars are stored

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// .use = a way to customize your server
// Setup static directory to serve  
app.use(express.static(publicDirectoryPath))


//Setting up Webpages 
//app.com
app.get('',(req,res) => {
    res.render('index', {
        title:'Weather',
        name:'Efe Bodwalk'
    })
})
//app.com/aboout
app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About Me',
        name:'Efe Bodwalk'
    })
})
//app.com/help
app.get('/help',(req,res)=> {
    res.render('help', {
        title : 'Help',
        body:'This is how to go about things',
        name:'Efe Bodwalk'
    })
})
//app.com/weather

app.get('/weather', (req,res)=>{

    if(!req.query.address){
      return  res.send({
            error: 'Address must be provided'
        })
    }
    geocode(req.query.address,(error,{lat,lon,location}= {})=>{
        if (error) {
          return res.send({error})
        }
        
         forecast(lat,lon, (error, forecastData) => {
           if(error) {
             return res.send({error})
           } 
           res.send({
            forecast: forecastData,
            location: location,
            address: req.query.address
        })
        })
      })


    })

//Error page for incase user enters wrong url 
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Efe Bodwalk',
        errorMessage:'Help article not found!'
    })
})

app.get('*',(req,res)=>{
res.render('error', {
    title: '404',
    name: 'Efe Bodwalk',
    errorMessage: 'Page not found.'
})
})


// To start the server 
app.listen(3000, ()=> {
    console.log('Server is up and running')
}) 

