import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "@/theme";

// Define the type for the imported images
interface HeroTextureImports {
  [key: string]: { default: string };
}

// Import all images from assets folder
export const heroTextureImports: HeroTextureImports = import.meta.glob(
  '../../assets/*.{png,jpg,jpeg,svg}',
  { eager: true }
) as HeroTextureImports;

const TopCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      renderArrowPrev={(onClickHandler: () => void, hasPrev: boolean, labelPrev: string) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: 10,
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler: () => void, hasNext: boolean, labelNext: string) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: 10,
          }}
        >
          <NavigateNextIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      )}
    >
      {Object.entries(heroTextureImports).map(([path, module], index) => (
        <Box
          key={`carousel-image-${index}`}
          width="100%"
          height={isNonMobile ? "600px" : "400px"}
          sx={{
            backgroundColor: shades.primary[500],
            backgroundImage: module.default ? `url(${module.default})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            color="white"
            padding="20px"
            borderRadius="1px"
            textAlign="center"
            backgroundColor="rgba(0,0,0,0.5)"
            position="absolute"
            top="46%"
            left={isNonMobile ? "10%" : "0%"}
            right={isNonMobile ? undefined : "0%"}
            margin={isNonMobile ? undefined : "0 auto"}
            maxWidth={isNonMobile ? undefined : "240px"}
          >
            <Typography color={shades.secondary[200]}>NEW ITEMS</Typography>
            <Typography variant="h1">Summer Sale</Typography>
            <Typography
              fontWeight="bold"
              color={shades.secondary[300]}
              sx={{ textDecoration: "underline" }}
            >
              Discover More
            </Typography>
          </Box>
        </Box>
      ))}
    </Carousel>
  );
};

export default TopCarousel;