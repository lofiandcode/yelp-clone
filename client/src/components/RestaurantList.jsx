import React, { useEffect, useContext } from 'react';
import restaurantFinder from '../apis/restaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = () => {

    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await restaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants);
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    },[]);

  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className="bg-primary">
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>McDonald's</td>
                    <td>New York</td>
                    <td>$$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList