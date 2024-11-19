import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import Avatar from '@material-ui/core/Avatar'
import auth from '../lib/auth-helper'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import { makeStyles } from '@material-ui/core/styles'
import {read, update} from './api-shop.js'
import { Navigate, useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    textAlign: 'center',
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  subheading: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle
  },
error: {
        verticalAlign: 'middle'
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 400
      },
      submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
      },
      bigAvatar: {
        width: 60,
        height: 60,
        margin: 'auto'
      },
      input: {
        display: 'none'
      },
    filename:{
            marginLeft:'10px'
          }
        }))
        export default function EditShop () {
          const params = useParams()
          const classes = useStyles()
          const [values, setValues] = useState({
              name: '',
              description: '',
              image: '',
              redirect: false,
              error: '',
              id: ''
          })
          const jwt = auth.isAuthenticated()
          useEffect(() => {
            const abortController = new AbortController()
            const signal = abortController.signal
           
        read({
                  shopId: params.shopId
                }, signal).then((data) => {
                  if (data.error) {
                    setValues({...values, error: data.error})
                  } else {
                    setValues({...values, id: data._id, name: data.name, description: data.description, owner: data.owner.name})
                  }
                })
                return function cleanup(){
                  abortController.abort()
                }
              }, [])
              const clickSubmit = () => {
                let shopData = new FormData()
                values.name && shopData.append('name', values.name)
                values.description && shopData.append('description', values.description)
                values.image && shopData.append('image', values.image)
               
            update({
                      shopId: params.shopId
                    }, {
                      t: jwt.token
                    }, shopData).then((data) => {
                      if (data.error) {
                        setValues({...values, error: data.error})
                      } else {
                        setValues({...values, 'redirect': true})
                      }
                    })
                  }
                  const handleChange = name => event => {
                    const value = name === 'image'
                      ? event.target.files[0]
                      : event.target.value
                    setValues({...values,  [name]: value })
                  }
                    const logoUrl = values.id
                          ? `/api/shops/logo/${values.id}?${new Date().getTime()}`
                          : '/api/shops/defaultphoto'
                    if (values.redirect) {
                     
                    return (<Navigate to={'/seller/shops'}/>)
                    }
                    return (<div className={classes.root}>
                      <Grid container spacing={8}>
                        <Grid item xs={6} sm={6}>
                          <Card className={classes.card}>
                            <CardContent>
                              <Typography type="headline" component="h2" className={classes.title}>
                                Edit Shop
                              </Typography>
                              <br/>
                              <Avatar src={logoUrl} className={classes.bigAvatar}/><br/>
                              <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
                              <label htmlFor="icon-button-file">
                                <Button variant="contained" color="default" component="span">
                                  Change Logo
                                  <FileUpload/>
                                </Button>
                             
                                                        