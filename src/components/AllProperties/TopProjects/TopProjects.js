import React from 'react'
import Section from '../Section'
import ProductCard from '../ProductCard'
import PropertyCard from './Card'

const TopProjects = ({ data, title, subTitle, bgc }) => {
    return (
        <div>
            <Section title={title} subTitle={subTitle} bgc={bgc} >
                <div style={{ display: 'flex', gap: "5%", justifyContent: "center" }}>

                    <PropertyCard image="https://housing-images.n7net.in/4f2250e8/e12746f6564d5818895cc6371c1d775a/v0/medium/natural_aqua_waves-newtown-kolkata-natural_group.jpeg" title="Unique Flats" price1="24" price2="1.1" loc="Salt lake,Kolkata" />
                    <PropertyCard image="https://housing-images.n7net.in/4f2250e8/e687fe1000a9de6344cf555dba459aff/v0/medium/urban_vista-rajarhat-kolkata-ajna_commercial_pvt_ltd.jpeg" title="Kolkata Best Flats" price1="54" price2="1.4" loc="New Town,Kolkata" />

                </div>
            </Section>
        </div>
    )
}

export default TopProjects