const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//get request
app.get('',(req,res) => {
    res.render('index',{
        title:'Weather',
        name: 'Gatij Taranekar'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name: 'Gatij Taranekar '
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        helptext:'Some helpful text',
        title:'Help',
        name:'Gatij Taranekar'
    })
})


app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a location."
        })
    }
    
    geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})



app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Gatij Taranekar',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Gatij Taranekar',
        errorMessage:'Page not found'
    })
})


//app.com
//app.com/help
//app.com/about


app.listen(port, () => {
    console.log('Server is up on port' + port)
})    //listen function starts up the server
 
