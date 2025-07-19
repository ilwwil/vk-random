import React, { useState } from 'react';
import { Group, Button, Div } from '@vkontakte/vkui';

export const CoinTab = ({ onResult }) => {
    const [result, setResult] = useState(null);

    const flipCoin = () => {
        const outcomes = ['Орёл', 'Решка'];
        const randomIndex = Math.floor(Math.random() * outcomes.length);
        const res = outcomes[randomIndex];
        onResult(res);
    };

    return (
        <Group>
            <Div>
                <Button size="l" stretched onClick={flipCoin}>
                    Подкинуть
                </Button>
            </Div>
            {result && (
                <Div style={{ textAlign: 'center', fontSize: 24 }}>{result}</Div>
            )}
        </Group>
    );
};
