import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";

interface IViewMode {
    name: string;
    value: string | number;
}

export const ViewMode = ({ name, value }: IViewMode) => {

return (
        <Stack direction="row" spacing={2} alignItems="center">
            <Box display="flex" alignItems="center">
                <Typography
                    variant="body1"
                    sx={{ fontWeight: 'bold', minWidth: '180px' }}
                >
                    {name}  :
                </Typography>
                </Box>
                <Box display="flex" alignItems="center" >
                <Typography
                    variant="body2"
                    color={value ? 'textPrimary' : 'text.disabled'}
                    sx={{
                        fontSize: '1rem',
                        fontWeight: value ? 'medium' : 'light',
                        color: value ? '#333' : '#888'
                    }}
                >
                    {value ? value : '-----'}                    
                </Typography>

            </Box>
        </Stack>

    )
}