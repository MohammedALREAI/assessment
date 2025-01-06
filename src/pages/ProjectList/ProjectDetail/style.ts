import { Paper } from "@mui/material";
import { Box, Stack, styled } from "@mui/system";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(4),
  padding: theme.spacing(4),
  width: "100%",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export const StyledGridInputWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column", 
  [theme.breakpoints.up("md")]: {
    width: "75%", 
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%", 
  },
}));

export const StyledStackInputs = styled(Stack)(({ theme }) => ({
  flex: "0 70%", 
  "& .MuiFormControl-root": {
    width: "80%",
  },
  [theme.breakpoints.down("sm")]: {
    flex: "1", 
    "& .MuiFormControl-root": {
      width: "100%", 
    },
  },
}));

export const StyledGridInputWrapperRow = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "row", 
  [theme.breakpoints.up("md")]: {
    width: "100%", 
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column", 
  },
}));

export const StyledPaperWithoutShadow = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  gap: theme.spacing(4),
  flexDirection: "row",
  padding: theme.spacing(4),
  width: "100%",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column", 
    padding: theme.spacing(2), 
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: "grid",
  width: "100%",
  gridTemplateColumns: "1fr 1fr", 
  gap: theme.spacing(4),
  padding: theme.spacing(4, 5),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr", 
    gap: theme.spacing(2), 
    padding: theme.spacing(2, 2), 
  },
}));
