
import styles from './PropertyCard2.module.css';
import { useNavigate } from 'react-router-dom';
const PropertyCard2 = ({ data }) => {
    const navigator = useNavigate();
    // console.log(data)
    return (
        <div className={styles.card}>
            <div
                className={styles.imageBackground}
                style={{ backgroundImage: `url(${data.image_files[0]})` }}
                onClick={() => navigator("/properties/single-property", {
                    state: { propertyData: data }
                })}
            >
                <div className={styles.content}>
                    <h3 className={styles.title}>{data.description}</h3>
                    <p className={styles.marketer}>Mktd. by Parik </p>
                    {/* <p className={styles.apartmentType}>{data.apartmentType}</p>
                    <p className={styles.location}>{data.location}</p>
                    <p className={styles.priceRange}>{data.priceRange}</p>  */}
                </div>
            </div>
        </div>
    );
};

export default PropertyCard2;
