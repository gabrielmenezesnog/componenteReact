import { Button } from '@mui/material';

export type assetModel = {
  current_price: number;
  predicted_price: number;
  asset_name: string;
  asset_ticker: string;
  asset_logo_url: string;
  onCloseClick: () => void;
};

export const CloseButton = (props: assetModel) => {
  return (
    <Button
      onClick={props.onCloseClick}
      variant="outlined"
      sx={{
        border: props.current_price > props.predicted_price ? '1px solid #cf9393' : '1px solid #b2cfb3',
        borderRadius: '50%',
        color: '#000',
        background: '#fff',
        padding: '1',
        margin: '0',
        minWidth: 'fit-content',
        position: 'absolute',
        top: '-12px',
        right: '-12px',
        '&.MuiButtonBase-root:hover': {
          bgcolor: '#fff',
          border: props.current_price > props.predicted_price ? '1px solid #cf9393' : '1px solid #b2cfb3',
        },
      }}
    >
      x
    </Button>
  );
};
