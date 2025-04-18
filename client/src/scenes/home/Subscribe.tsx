import { Box, InputBase, Divider, Typography, IconButton, Button } from "@mui/material";
import { MarkEmailReadOutlined } from "@mui/icons-material";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter an email address", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    // Placeholder for API call to subscribe
    console.log("Subscribing with email:", email);
    // Example: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
    toast.success("Subscribed successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
    setEmail(""); // Clear input after submission
  };

  return (
    <Box width="80%" margin="80px auto" textAlign="center">
      <ToastContainer />
      <IconButton>
        <MarkEmailReadOutlined fontSize="large" />
      </IconButton>
      <Typography variant="h3" mb="15px">
        Subscribe to Nuvanté's Newsletter
      </Typography>

      {/* Custom Input */}
      <Box
        p="2px 4px"
        m="15px auto"
        display="flex"
        alignItems="center"
        width="75%"
        maxWidth="500px"
        height="50px"
        backgroundColor="#f4f4f4"
        borderRadius="4px"
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
        />
        <Divider
          sx={{ height: "30px", m: 0.5 }}
          orientation="vertical"
        />
        <Button
          sx={{ p: "10px", textTransform: "none" }}
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

export default Subscribe;