import React, { useState } from 'react';
import {
    Group,
    Input,
    Button,
    Div,
    SimpleCell,
} from '@vkontakte/vkui';
import { Icon24Cancel } from '@vkontakte/icons';

export const WheelTab = ({ onResult, items, setItems }) => {
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
        if (newItem.trim() !== '') {
            setItems([...items, newItem.trim()]);
            setNewItem('');
        }
    };

    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const spin = () => {
        if (items.length > 0) {
            const randomIndex = Math.floor(Math.random() * items.length);
            const res = items[randomIndex];
            onResult(res);
        }
    };

    return (
        <Group>
            {items.map((item, index) => (
                <SimpleCell
                    key={index}
                    after={<Icon24Cancel onClick={() => removeItem(index)} />}
                >
                    {item}
                </SimpleCell>
            ))}

            <Div>
                <Input 
                    placeholder="Добавить вариант"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <Button size="l" stretched onClick={addItem} mode='outline' style={{ marginTop: 8,}}>
                    Добавить
                </Button>
            </Div>



            <Div>
                <Button size="l" stretched onClick={spin}>
                    Крутить колесо
                </Button>
            </Div>
        </Group>
    );
};
