import React from 'react'
import Layout from '../../components/layout/Layout'
import Cursole from '../../components/cursole/Cursole'
import Catagory from '../../components/catagory/CatagoryAll'
import Product from '../../components/products/Product'

function Landing() {
  return (
    <Layout >
            <Cursole />
              <Catagory />
                <Product />
        
        </Layout>
  )
}

export default Landing