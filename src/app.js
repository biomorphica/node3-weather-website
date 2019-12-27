const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars and views configuration
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name:'Thomas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText:"We are here to help you.",
        title: 'Help',
        name: 'Thomas Williams'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        aboutText:"Created by Thomas Williams.",
        title: 'About Me',
        name: 'Thomas Williams'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })        
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // console.log('weather.address: '+ req.query.address)

    geocode( req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({error})
            }
           
            // console.log('location: ' +location)
            // console.log("forecastData: "+ forecastData)

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })

   
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name: "Thomas Williams",
        errorMessage: "Help Page Not Found"
    })
})

app.get('*', (req, res) => {
    // res.send('My 404 page')
    res.render('404', {
        title:'404',
        name: "Thomas Williams",
        errorMessage: "Page Not Found"
    })
})


app.listen(port, () => {
    console.log('Server is up on port '+ port)
})