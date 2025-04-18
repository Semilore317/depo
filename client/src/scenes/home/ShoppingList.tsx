import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Item from '@/components/Item';
import { setItems } from '@/state';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('all');
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery('(min-width:600px)');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function fetchItems() {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:1337/api/items?populate=image', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const dataJson = await response.json();
      console.log('Raw Strapi response:', dataJson);
      dispatch(setItems(dataJson.data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredItems = () => {
    switch (value) {
      case 'newArrivals':
        return items.filter((item) => item.category === 'newArrivals');
      case 'bestSellers':
        return items.filter((item) => item.category === 'bestSellers');
      case 'topRated':
        return items.filter((item) => item.category === 'topRated');
      default:
        return items;
    }
  };

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center" mb="30px">
        Our Featured <b>Products</b>
      </Typography>
      
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ style: { background: '#000' } }}
        textColor="primary"
      >
        <Tab label="ALL" value="all" />
        <Tab label="NEW ARRIVALS" value="newArrivals" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>

      {loading ? (
        <Typography textAlign="center" mt="20px">
          Loading...
        </Typography>
      ) : error ? (
        <Typography color="error" textAlign="center" mt="20px">
          Error: {error}
        </Typography>
      ) : (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns={
            isNonMobile ? 'repeat(4, 1fr)' : 'repeat(2, 1fr)'
          }
          gap="20px"
        >
          {filteredItems().map((item) => (
            <Item key={item.id} item={item} width="100%" />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ShoppingList;