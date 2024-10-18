import React from 'react';
import { TextField, Button, Slider, Grid2, Input, Box } from '@mui/material';

const Controls = ({ gameState, player, onPlayerAction }) => {
  const handleAction = (action) => {
    onPlayerAction(action);
  };

  const sliderMin = Math.max(
    Math.min(
      player?.chips,
      gameState.maxChipsOnTable - player?.chipsOnTable + 10
    ),
    0
  );

  const sliderMax = player?.chips;

  const [raiseAmount, setRaiseAmount] = React.useState(0);

  React.useEffect(() => {
    setRaiseAmount(sliderMin);
  }, [sliderMin]);

  const [inputName, setInputName] = React.useState('player');

  const handleSliderChange = (event, newValue) => {
    setRaiseAmount(newValue);
  };

  const handleInputChange = (event) => {
    setRaiseAmount(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (raiseAmount < sliderMin) {
      setRaiseAmount(sliderMin);
    } else if (raiseAmount > sliderMax) {
      setRaiseAmount(sliderMax);
    }
  };

  // disable raise if player has no chips or if all other players have no chips
  const disableRaise =
    player.chips <= sliderMin ||
    gameState.players
      .filter((p) => p.id !== player.id)
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0) === 0;

  return (
    <div className='controls'>
      {!gameState.started && (
        <div className='controls-sub'>
          <TextField
            id='outlined-basic'
            label='Input Name'
            variant='outlined'
            defaultValue={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
          <Button
            onClick={() => handleAction({ type: 'ready', value: inputName })}
          >
            Ready
          </Button>
        </div>
      )}
      {gameState.started && (
        <div className='controls-sub'>
          <Button onClick={() => handleAction({ type: 'fold' })}>Fold</Button>

          {gameState.maxChipsOnTable === player.chipsOnTable && (
            <Button onClick={() => handleAction({ type: 'check' })}>
              Check
            </Button>
          )}

          {gameState.maxChipsOnTable > player.chipsOnTable && (
            <Button onClick={() => handleAction({ type: 'call' })}>Call</Button>
          )}

          <div>
            <Box
              style={{
                display: 'flex',
                gap: '10px',
                position: 'relative',
                top: '15px',
              }}
            >
              <Grid2 item>
                <Slider
                  disabled={disableRaise}
                  value={raiseAmount}
                  style={{ width: '100px' }}
                  onChange={handleSliderChange}
                  aria-labelledby='input-slider'
                  step={10}
                  min={sliderMin}
                  max={sliderMax}
                />
              </Grid2>
              <Grid2 item>
                <Input
                  disabled={disableRaise}
                  value={raiseAmount}
                  size='small'
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 10,
                    min: sliderMin,
                    max: sliderMax,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid2>
            </Box>
            <Button
              disabled={disableRaise}
              onClick={() =>
                handleAction({ type: 'raise', value: raiseAmount })
              }
            >
              Raise
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Controls;
