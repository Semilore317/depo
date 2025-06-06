import {
    useDispatch,
    useSelector
} from 'react-redux';
import {
    Badge,
    Box,
    IconButton,
    Typography
} from '@mui/material';
import {
    PersonOutline,
    ShoppingBagOutlined,
    MenuOutlined,
    SearchOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme';
import { setIsCartOpen } from '@/state';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    return (
        <Box
            display="flex"
            alignItems="center"
            width="100%"
            height="80px"
            backgroundColor={shades.primary[500]}
            color="white"
            top="0"
            left="0"
            zIndex="1"
        >
            <Box display="flex" justifyContent="space-between" backgroundColor={shades.primary[500]} width="80%" margin='auto'>

                <IconButton onClick={() => navigate('/')} sx={{ color: 'white' }}>
                    <Typography variant="h4" fontWeight="bold">Nuvanté</Typography>
                </IconButton>

                <Box display="flex" gap="2rem">
                    <IconButton onClick={() => navigate('/search')} sx={{ color: 'white' }}>
                        <SearchOutlined />
                    </IconButton>

                    <Badge
                      badgeContent={cart.length}  
                      color="secondary"
                      invisible={cart.length === 0}
                      sx={{
                        "&.MuiBadge-badge": {
                            right: 5,
                            top: 5,
                            padding: "0 4px",
                            height: "14px",
                            minWidth: "13px",
                        }
                      }}
                    > {/* floating red number */}
                        <IconButton onClick={() => dispatch(setIsCartOpen({}))} sx={{ color: 'white' }}>
                            <Badge badgeContent={0} color="secondary">
                                <ShoppingBagOutlined />
                            </Badge>
                        </IconButton>
                    </Badge>


                    <IconButton onClick={() => navigate('/login')} sx={{ color: 'white' }}>
                        <PersonOutline />
                    </IconButton>
                </Box>

            </Box>
        </Box>
    )
}

export default Navbar;