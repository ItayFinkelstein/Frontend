import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Post() {
    return (
        <Card sx={{maxWidth: 445}}>
            <CardHeader
                title="Gil tries Minecraft"
                subheader="February 28, 2025"
            />
            <CardMedia
                component="img"
                height="194"
                image="\src\assets\minecraft.jpg"
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                The best game in the world of 2010. The game taught us important life lessons about 
                building a better world through hard work, resources and friendship.
                </Typography>
            </CardContent>
        </Card>
    )
}