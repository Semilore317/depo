import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from '@/theme';
import {
    decreaseCount,
    increaseCount,
    removeFromCart,
    setIsCartOpen,
    RootState,
} from "../../state/index";
import { useNavigate } from 'react-router-dom';

// Styled components
const FlexBox = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

interface CartModalProps {
    isOpen: boolean;
}

const CartModal = styled(Box)<CartModalProps>(({ isOpen }) => ({
    position: "fixed",
    top: 0,
    right: 0,
    height: "100%",
    width: "clamp(300px, 30%, 500px)",
    backgroundColor: "#fff",
    padding: "20px",
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    zIndex: 11, // Above overlay
}));

const CartMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.cart);
    const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
    console.log('isCartOpen:', isCartOpen);

    const totalPrice = cart.reduce((total, item) => {
        return total + (item.count * (item.attributes?.price || 0));
    }, 0);

    return (
        <Box
            sx={{
                visibility: isCartOpen ? "visible" : "hidden",
                opacity: isCartOpen ? 1 : 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                position: "fixed",
                zIndex: 10,
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                overflow: "hidden",
                transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
            }}
            onClick={() => dispatch(setIsCartOpen(false))}
        >
            <CartModal
                isOpen={isCartOpen}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                <Box padding="30px" height="100%" display="flex" flexDirection="column">
                    {/* Header */}
                    <FlexBox mb="15px">
                        <Typography variant="h3">
                            SHOPPING CART ({cart.length})
                        </Typography>
                        <IconButton
                            aria-label="Close cart"
                            onClick={() => dispatch(setIsCartOpen(false))}
                        >
                            <CloseIcon />
                        </IconButton>
                    </FlexBox>

                    {/* Products */}
                    <Box flex="1 1 auto" overflow="auto">
                        {cart.length === 0 ? (
                            <Typography>Your cart is empty</Typography>
                        ) : (
                            cart.map((item) => (
                                <Box key={`${item.attributes?.name || 'item'}-${item.id}`}>
                                    <FlexBox p="15px 0">
                                        <Box flex="1 1 40%">
                                            <img
                                                alt={item.attributes?.name || "Item"}
                                                width="123px"
                                                height="164px"
                                                src={
                                                    item.attributes?.image?.data?.attributes?.formats?.medium?.url
                                                        ? `http://localhost:1337${item.attributes.image.data.attributes.formats.medium.url}`
                                                        : "path/to/fallback-image.jpg"
                                                }
                                            />
                                        </Box>
                                        <Box flex="1 1 60%">
                                            <FlexBox mb="5px">
                                                <Typography fontWeight="bold">
                                                    {item.attributes?.name || "Unknown Item"}
                                                </Typography>
                                                <IconButton
                                                    aria-label="Remove item from cart"
                                                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                                                >
                                                    <CloseIcon />
                                                </IconButton>
                                            </FlexBox>
                                            <Typography>
                                                {item.attributes?.shortDescription || "No description"}
                                            </Typography>
                                            <FlexBox m="15px 0">
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    border={`1.5px solid ${shades.neutral[500]}`}
                                                >
                                                    <IconButton
                                                        aria-label="Decrease item quantity"
                                                        onClick={() => dispatch(decreaseCount({ id: item.id }))}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>
                                                    <Typography>{item.count}</Typography>
                                                    <IconButton
                                                        aria-label="Increase item quantity"
                                                        onClick={() => dispatch(increaseCount({ id: item.id }))}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                                <Typography fontWeight="bold">
                                                    ${((item.attributes?.price || 0) * item.count).toFixed(2)}
                                                </Typography>
                                            </FlexBox>
                                        </Box>
                                    </FlexBox>
                                    <Divider />
                                </Box>
                            ))
                        )}
                    </Box>

                    {/* Subtotal, Price, and Checkout */}
                    <Box m="20px 0">
                        <FlexBox m="20px 0">
                            <Typography fontWeight="bold">SUBTOTAL</Typography>
                            <Typography fontWeight="bold">${totalPrice.toFixed(2)}</Typography>
                        </FlexBox>
                        <Button
                            sx={{
                                backgroundColor: shades.primary[500],
                                color: "white",
                                borderRadius: "0px",
                                minWidth: "100%",
                                padding: "15px 40px",
                                m: "20px 0",
                            }}
                            onClick={() => {
                                navigate("/checkout");
                                dispatch(setIsCartOpen(false));
                            }}
                        >
                            CHECKOUT
                        </Button>
                    </Box>
                </Box>
            </CartModal>
        </Box>
    );
};

export default CartMenu;