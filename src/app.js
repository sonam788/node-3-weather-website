const path = require('path');
const express = require('express')
const hbs  = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app= express()


//Define path for Express config
const publicDirectory= path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templets/views');
const partialPath = path.join(__dirname,'../templets/partials');


//Setup static directory to serve
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('/about',(req, res)=>{
    res.render('about',{
         title:"about",
         name:"AboutSonam"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help',
        name:'AboutSonam'
    })
})

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'AboutSonam'
    })  //allow as to view
})





// app.get('',(req,res)=>{
//     res.send('Hello express');
// })
// app.get('/help',(req,res)=>{
//      res.send({
//          name:'sona',
//          age:20
//      })})
// app.get('/about',(req,res)=>{
//     res.send('<h1>about page</h1>')
// })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error:'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     forecast:'it is showing',
    //     location: 'Boston',
    //     address:req.query.address
    // })
})

//app.com
//app.com/help
//app.com/about
app.get('/products',(req,res)=>{
    if(!req.query.search){
    return res.send({
         error:'you must provide a search term'
     })
    }
    console.log(req.query);
    console.log(req.query.search);
    res.send({
        products:[]
    })
})


// create 404 page
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'404',
        name:'Aboutsonam',
        errorMessage:'help article not found'
    }) 
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aboutsonam',
        errorMessage:'page not found'
    }) //* this is wildcard character and it can match everything
})

app.listen(3000, ()=>{
    console.log('server is up on 3000 port');
})