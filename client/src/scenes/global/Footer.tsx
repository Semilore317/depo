import { useTheme, Typography, Box } from '@mui/material';
import { shades } from "@/theme"

const Footer = () => {
    const { palette: {
        neutral
    } } = useTheme();
    return (
        <Box
            mt="70px"
            p="40px 0"
            backgroundColor={neutral.light}
        >
            <Box
                width="80%"
                margin="auto"
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                rowGap="30px"
                columnGap="clamp(20px, 30px, 40px)"
            >
                <Box width="clamp(20%, 30%, 40%)">
                    <Typography variant='h4' fontWeight="bold" mb="30px" color={shades.secondary[500]}>
                        Nuvanté
                    </Typography>
                    <div>
                        Discover timeless elegance with Nuvanté. Stay connected for exclusive updates and offers.
                        <br />
                        © 2025 Nuvanté. All rights reserved.
                    </div>
                </Box>

                <Box>
                    <Typography variant='h4' fontWeight="bold" mb="30px">
                        About Us
                    </Typography>
                    <Typography mb="30px"> Careers </Typography>
                    <Typography mb="30px"> Our Stores </Typography>
                    <Typography mb="30px"> Terms & Conditions </Typography>
                    <Typography mb="30px"> Privacy Policy </Typography>
                </Box>

                <Box>
                    <Typography variant='h4' fontWeight="bold" mb="30px">
                        Customer Care
                    </Typography>
                    <Typography mb="30px"> Help Center </Typography>
                    <Typography mb="30px"> Track Your Order </Typography>
                    <Typography mb="30px"> Bulk Purchase </Typography>
                    <Typography mb="30px"> Return Policy </Typography>
                </Box>

                <Box>
                    <Typography variant='h4' fontWeight="bold" mb="30px">
                        Contact Us
                    </Typography>
                    <Typography mb="30px"> 1420 Crescent Lane, Aurora Heights, Vienna, VA 22182, USA </Typography>
                    <Typography mb="30px"> nuvantéapparels@nuvanté.com </Typography>
                    <Typography mb="30px"> 111-222-333 </Typography>
                </Box>
            </Box>

        </Box>
    )
}

export default Footer