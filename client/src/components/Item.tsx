import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import { AddIcon } from '@mui/icons-material/Add';
import { RemoveIcon } from '@mui/icons-material/Remove';
import { shades } from "@/theme";
import { addToCart } from "@/state";
import { useNavigate } from "react-router-dom";

const Item = ({ item, width }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [count, setCount] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const {
        palette: { neutral }
    } = useTheme();

    const { category, price, title, image } = item.attributes;
    const {
        data: { attributes: {
            formats: {
                medium: { url },
            }
        }
        }
    } = image;

    return (
        <Box width={width}>
            <Box position="relative" onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
                <img alt={item.name} width="300px" height="400px" src={`https://localhost:1337${url}`}
                    onClick={() => navigate(`/item/${item.id}`)}
                    style={{ cursor: "pointer", borderRadius: "0.5rem" }}
                />
                <Box display={isHovered ? "block" : "none"} position="absolute" top="0" left="0" width="100%" height="100%" zIndex={1} padding="0 5%">
                    <Box display="flex" justifyContent="space-between">

                        //same as amount section in CartMenu, should have probably made it a separate component.... oh well
                        <Box display="flex" justifyContent="space-between" alignItems="center" height="100%" backgroundColor={shades.neutral[100]} borderRadius="0.5rem">
                            <IconButton
                                aria-label="Decrease item quantity"
                                onClick={() => setCount(Math.max(count - 1, 1))}
                            >
                                <RemoveIcon />
                            </IconButton>
                            <Typography color={shades.primary[300]}>{count}</Typography>
                            <IconButton
                                aria-label="Increase item quantity"
                                onClick={() => setCount(count + 1)}
                            >
                                <AddIcon />
                            </IconButton>
                        </Box>

                        //Button
                        <Button onClick={() => {
                            dispatch(addToCart({ item: { ...item, count } }));
                            setCount(1);
                        }}
                            sx={{ backgroundColor: shades.primary[300], color: "white", borderRadius: "0.5rem", padding: "10px 20px" }}>
                            Add To Cart
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box display="flex" justifyContent="space-between" marginTop="3px">
                <Typography variant="subtitle2" fontWeight="bold" color={neutral.dark}>
                    //UGHHH REGEX!!!!!!!!!!!
                    // ts is the code to change the category name to a readable format, didnt want to use an entirely new string
                    {category
                        .replace(/([A-Z])/g, ' $1') //basically just adding a space before capital letters
                        .replace(/^./, (str) => str.toUpperCase()) //capitalizing first letter
                    }
                </Typography>
                <Typography>{item.name}</Typography>
                <Typography fontWeight="bold" color={neutral.dark}>
                    ${price.toFixed(2)} //price in two decimal places
                </Typography>
            </Box>
        </Box>
    )
}

export default Item;