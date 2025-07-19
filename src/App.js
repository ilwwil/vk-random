import {
  View,
  Panel,
  PanelHeader,
  Group,
  DisplayTitle,
  Tabs,
  TabsItem,
  Div,
  Cell,
  Avatar,
  CardGrid,
  Card,
  Header,
  Tappable,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { RangeTab } from './Tabs/RangeTab';
import { CoinTab } from './Tabs/CoinTab';
import { WheelTab } from './Tabs/WheelTab';
import { presets } from './presets';

export const App = () => {
  const [activeTab, setActiveTab] = useState('range');
  const [result, setResult] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [rangeInfo, setRangeInfo] = useState({ from: '', to: '' });
  const [wheelItems, setWheelItems] = useState(['Мишка', 'Зайчик']);
  const [popout, setPopout] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    bridge.send('VKWebAppInit');

    const fetchUser = async () => {
      try {
        const userData = await bridge.send('VKWebAppGetUserInfo');
        setUser(userData);
      } catch (err) {
        console.error('Ошибка получения данных пользователя:', err);
      }
    };

    fetchUser();
  }, []);

  const handleResult = (value, meta = {}) => {
    setResult(value);
    setTimestamp(formatDate(new Date()));
    if (meta.from && meta.to) {
      setRangeInfo({ from: meta.from, to: meta.to });
    } else {
      setRangeInfo({ from: '', to: '' });
    }
  };

  const formatDate = (date) => {
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setResult('');
    setTimestamp('');
    setRangeInfo({ from: '', to: '' });
  };

  const openPreset = (items) => {
    setWheelItems(items);
    switchTab('wheel');
  };

  return (
    <View activePanel="main" popout={popout}>
      <Panel id="main">
        <PanelHeader>VK Рандом</PanelHeader>
        <Group>
          <Div style={{ textAlign: 'center', marginTop: 32, marginBottom: 32 }}>
            <DisplayTitle
              level="1"
              style={{
                fontFamily: '"VK Sans Display", sans-serif',
                fontSize: 48,
                color: 'var(--vkui--color_text_accent)',
                marginBottom: 32,
              }}
            >
              {result || 'VK Рандом'}
            </DisplayTitle>

            {result && (
              <div style={{ marginBottom: 8, fontSize: 16, color: '#666' }}>
                {activeTab === 'range' && rangeInfo.from && rangeInfo.to
                  ? `Диапазон: от ${rangeInfo.from} до ${rangeInfo.to}`
                  : activeTab === 'coin'
                    ? 'Режим: Монетка'
                    : activeTab === 'wheel'
                      ? 'Режим: Колесо'
                      : ''}
              </div>
            )}

            {timestamp && (
              <div style={{ marginBottom: 4, color: '#888' }}>
                Получено: {timestamp}
              </div>
            )}

            {result && user && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <Cell
                  style={{ maxWidth: 280 }}
                  before={<Avatar src={user.photo_200} />}
                >
                  {user.first_name} {user.last_name}
                </Cell>
              </div>
            )}

            <Tabs>
              <TabsItem
                selected={activeTab === 'range'}
                onClick={() => switchTab('range')}
              >
                Диапазон
              </TabsItem>
              <TabsItem
                selected={activeTab === 'coin'}
                onClick={() => switchTab('coin')}
              >
                Монетка
              </TabsItem>
              <TabsItem
                selected={activeTab === 'wheel'}
                onClick={() => switchTab('wheel')}
              >
                Колесо
              </TabsItem>
            </Tabs>

            {activeTab === 'range' && <RangeTab onResult={handleResult} />}
            {activeTab === 'coin' && <CoinTab onResult={handleResult} />}
            {activeTab === 'wheel' && (
              <WheelTab
                onResult={handleResult}
                items={wheelItems}
                setItems={setWheelItems}
              />
            )}
          </Div>
        </Group>

        <Group>
          <Header>Пресеты</Header>
          <CardGrid size="m">
            {presets.map((preset, index) => (
              <Card key={index} mode="shadow" appearance="neutral" rounded>
                <Tappable
                  Component="div"
                  onClick={() => openPreset(preset.items)}
                  hoverMode="opacity"
                  activeMode="opacity"
                  style={{ padding: 16, textAlign: 'center' }}
                >
                  {preset.title}
                </Tappable>
              </Card>
            ))}
          </CardGrid>
        </Group>
      </Panel>
    </View>
  );
};
