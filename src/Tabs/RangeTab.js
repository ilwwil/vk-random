import React, { useState } from 'react';
import { Group, Input, Button, Div } from '@vkontakte/vkui';

export const RangeTab = ({ onResult }) => {
    const [from, setFrom] = useState('1');
    const [to, setTo] = useState('100');
    const [result, setResult] = useState(null);

    const generate = () => {
        const min = parseInt(from, 10);
        const max = parseInt(to, 10);
        if (!isNaN(min) && !isNaN(max) && min <= max) {
            const rand = Math.floor(Math.random() * (max - min + 1)) + min;
            onResult(rand.toString(), { from, to });
        }
    };

    return (
        <Group>
            <Div style={{ display: 'flex', gap: 8 }}>
                <Input
                    type="number"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="От"
                />
                <Input
                    type="number"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="До"
                />
            </Div>
            <Div>
                <Button size="l" stretched onClick={generate}>
                    Сгенерировать число
                </Button>
            </Div>
            {result !== null && (
                <Div style={{ textAlign: 'center', fontSize: 24 }}>{result}</Div>
            )}
        </Group>
    );
};
