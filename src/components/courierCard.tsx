import { Box, Typography, Chip } from "@mui/material";
import type { Courier } from "../types";
import { useQuote } from "../hooks/useQuotes";

interface Props {
  courier: Courier;
  cheapest?: boolean;
  fastest?: boolean;
}

export const CourierCard = ({ courier, cheapest, fastest }: Props) => {
  const { weight, destination } = useQuote();

  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        mb: 2,
        width: {
          xs: "100%",
          md: "calc((100% - 48px) / 3)",
        },
      }}
    >
      <Typography variant="h6">{courier.name}</Typography>
      <Typography>Price: ${courier.price}</Typography>
      <Typography>Days: {courier.estimatedDays}</Typography>
      <Typography>Weight: {weight} kg</Typography>
      <Typography>
        Destination: {destination.city}, {destination.country}
      </Typography>
      {cheapest && <Chip label="Cheapest" color="success" sx={{ mr: 1 }} />}
      {fastest && <Chip label="Fastest" color="info" />}
    </Box>
  );
};
