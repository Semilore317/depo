import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { shades } from "@/theme";
import { addToCart } from "@/state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  // Destructure with fallback values, ensure item exists
  const { 
    category: rawCategory = "Unknown", 
    price = 0, 
    name = "Unknown Item",
    image = null 
  } = item || {};

  // Handle null or undefined category explicitly
  const category = rawCategory || "Unknown";

  // Safely access image URL
  const imageUrl = image?.url
    ? `http://localhost:1337${image.url}`
    : "/placeholder-image.jpg";

  // Log item for debugging
  console.log("Item in Item component:", item);

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        <img
          alt={name}
          width="300px"
          height="400px"
          src={imageUrl}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{ cursor: "pointer", borderRadius: "0.5rem" }}
        />
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          zIndex={1}
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" height="100%">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="0.5rem"
              padding="0 10px"
            >
              <IconButton
                aria-label="Decrease item quantity"
                onClick={() => setCount(Math.max(count - 1, 1))}
              >
                <Remove />
              </IconButton>
              <Typography color={shades.primary[300]} sx={{ mx: 2 }}>
                {count}
              </Typography>
              <IconButton
                aria-label="Increase item quantity"
                onClick={() => setCount(count + 1)}
              >
                <Add />
              </IconButton>
            </Box>

            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
                setCount(1);
              }}
              sx={{
                backgroundColor: shades.primary[300],
                color: "white",
                borderRadius: "0.5rem",
                padding: "10px 20px",
              }}
            >
              Add To Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" marginTop="3px">
        <Typography variant="subtitle2" fontWeight="bold" color={neutral.dark}>
          {category
            ? category
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
            : "Unknown"}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight="bold" color={neutral.dark}>
          ${price.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
};

export default Item;