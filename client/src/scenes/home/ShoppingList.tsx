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
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
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
          display="flex"
          flexWrap="wrap"
          gap="20px"
          justifyContent="center"
        >
          {filteredItems().map((item) => (
            <Box
              key={item.id}
              minWidth="250px"
              flex="1 1 250px"
              maxWidth="300px"
            >
              <Item item={item} width="100%" />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ShoppingList;