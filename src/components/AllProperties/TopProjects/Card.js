import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
const PropertyCard = ({ image, title, price1, price2, loc }) => {
    return (
        <Card sx={{ maxWidth: 345, minWidth: 200 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                />
                <CardContent>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <p style={{ fontSize: "16px" }}>{title}</p>
                        <div>
                            <p style={{ fontSize: "16px" }}>₹{price1}L - {price2}Cr</p>
                        </div>
                    </div>
                    <p style={{ fontSize: "8px" }}>{loc}</p>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PropertyCard