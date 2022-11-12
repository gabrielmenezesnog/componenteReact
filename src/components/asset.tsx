import { Box, Grid, Typography } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import { assetModel, CloseButton } from '../models/asset';
import React from 'react';

export const Asset = () => {
  const [asset, setAsset] = React.useState<assetModel[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        const api = await fetch('data.json'),
          res = await api.json();
        setAsset(res);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  function percentage(currentPrice: number, predictedPrice: number) {
    if (currentPrice < predictedPrice) {
      return '(+' + ((predictedPrice / currentPrice - 1) * 100).toFixed(2) + '%)';
    } else {
      const reduction = currentPrice - predictedPrice;
      return '(-' + ((reduction / currentPrice) * 100).toFixed(2) + '%)';
    }
  }

  // componentes alterados
  const Img = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '0px',
  });

  // temas
  const theme = createTheme({
    typography: {
      fontFamily: ['Helvetica Neue', 'Roboto', 'sans-serif', '-apple-system'].join(','),
    },
    palette: {
      primary: {
        main: '#3f3c3c',
      },
    },
  });

  return (
    <>
      {asset.map((item) => {
        return (
          <Box
            key={item.asset_ticker}
            margin={1}
            sx={{
              width: '436px',
              height: '92px',
              borderRadius: '10px',
              color: theme.palette.primary.main,
              background:
                item.current_price > item.predicted_price
                  ? 'linear-gradient(270deg, #f0c0c0 20%, #cf9393 80%)'
                  : 'linear-gradient(270deg,  #c1dec1 20%, #b2cfb3 80%)',
              border: '0.5px solid #dfdfdf',
              position: 'relative',
            }}
          >
            <Grid
              container
              direction={'row'}
              sx={{
                alignItems: 'center',
                padding: '12px',
                height: '100%',
                opacity: '1',
              }}
            >
              <Grid item md={2}>
                <Img
                  alt="Apple logo"
                  src={item.asset_logo_url}
                  sx={{ width: 48, height: 48, background: '#fff', borderRadius: 3 }}
                />
              </Grid>

              <Grid container item direction={'row'} md={10}>
                <Grid item md={12}>
                  <Typography fontWeight={500}>
                    {item.asset_name} ({item.asset_ticker})
                  </Typography>
                </Grid>
                <Grid container item direction={'column'} md={6}>
                  <Typography>Current price</Typography>
                  <Typography fontWeight={500}>{item.current_price}</Typography>
                </Grid>
                <Grid container item direction={'column'} md={6}>
                  <Typography sx={{ textAlign: 'left' }}>Predicted price + 1 day</Typography>
                  <Typography
                    fontWeight={500}
                    sx={{
                      color: item.current_price > item.predicted_price ? '#ce1112' : '#148e20',
                    }}
                  >
                    {item.predicted_price} {percentage(item.current_price, item.predicted_price)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <CloseButton
              onCloseClick={() => {
                console.log(item);
              }}
              current_price={item.current_price}
              predicted_price={item.predicted_price}
              asset_name={item.asset_name}
              asset_ticker={item.asset_ticker}
              asset_logo_url={item.asset_logo_url}
            />
          </Box>
        );
      })}
    </>
  );
};
