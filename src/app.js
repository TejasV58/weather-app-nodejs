const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for epress config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views to use
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Tejas"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Tejas"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        message:"For any help contact me at ....",
        name:'Tejas'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address) {
        return res.send({
            error:'Please Provide address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error) {
          return res.send({
              error
          })
        }
    
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return  res.send({ error })
            }
            res.send({
                location,
                forecast:forecastData,
                address:req.query.address
            })
        })
    })    
})

app.get('/products',(req,res)=>{
    if(!req.query.search) {
        return res.send({
            error:'Please enter search term!'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tejas',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Tejas',
        errorMessage: 'Page not found.'
    })
})

app.listen(port,()=>{
    console.log("Server is running at port "+port)
})