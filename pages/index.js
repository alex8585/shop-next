import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { makeStyles } from "@material-ui/styles"
import { getProducts } from "../actions/productActions"
import { wrapper } from "../store"

import Head from "next/head"
import Image from "next/image"

import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { Container } from "@material-ui/core"
import { Pagination } from "@material-ui/core"
import Card from "@material-ui/core/Card"

const perPage = 6

const useStyles = makeStyles(() => ({
  container: {
    padding: "20px 0px 5px",
    maxWidth: "960px",
  },
  card: {
    margin: "0 auto",
    maxWidth: 345,
  },
  image: {
    cursor: "pointer",
  },
  name: {
    minHeight: "50px",
  },
  price: {
    color: "rgb(52,65,80)",
    marginTop: "7px",
    fontSize: "20px",
    fontWeight: "600",
  },

  paginatorContainer: {
    display: "flex",
    marginTop: 10,
  },
  pagination: {
    margin: "0 auto",
    "& ul": {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
    },
  },
}))

const Index = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { data, page, lastPage, loading } = useSelector(
    (state) => state.products
  )

  const handleChangePage = (event, newPage) => {
    dispatch(getProducts(newPage, perPage))
  }

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="description" content="Shop page description"></meta>
      </Head>

      <Container maxWidth="md" component="main" className={classes.container}>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Shop
        </Typography>
        <Grid container spacing={5} alignItems="flex-end">
          {data.map((item, i) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <Image
                  className={classes.image}
                  src={item.base_image.path}
                  alt={item.name}
                  width={256}
                  height={256}
                ></Image>
                <CardContent>
                  <Typography className={classes.name}> {item.name}</Typography>
                  <Typography className={classes.price}>
                    {item.price.formatted}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className={classes.paginatorContainer}>
          <Pagination
            page={parseInt(page)}
            count={parseInt(lastPage)}
            onChange={handleChangePage}
            className={classes.pagination}
          />
        </div>
      </Container>
    </>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(getProducts(1, perPage))
  return { revalidate: 1 }
})

export default Index
