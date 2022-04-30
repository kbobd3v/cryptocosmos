import React, { useState } from 'react';
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import { Col, Row, Typography, Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
import LineChart from './LineChart'

const { Title, Text } = Typography;
const { Option } = Select;


const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState('7d');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timePeriod });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return 'Cargando...'

  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Precio en USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rango', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: 'Volumen de 24h', value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`, icon: <ThunderboltOutlined /> },
    { title: 'Capital de Mercado', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'Valor maximo (prom. diario)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Numero de Mercados', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Numero de Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Cantidad aprobada', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Cantidad total', value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon: <ExclamationCircleOutlined /> },
    { title: 'Cantidad circulante', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin-detail-container'>
      <Col className='coin-heading-container'>
        <Title level={2} className='coin-name'>
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Precio
        </Title>
        <p>
          Precio de {cryptoDetails?.name} en Dolares US. Ver estadisticas, capital de mercado y cantidades
        </p>
      </Col>
      <Select defaultValue="7d" className='select-timeperiod' placeholder="Selecciona el periodo de tiempo" onChange={(value) => setTimePeriod(value)}>
        {time.map((date) => <Option key={date}>{date}</Option>)} 
      </Select>
      <LineChart coinHistory={coinHistory} currentPrice={cryptoDetails?.price} coinName={cryptoDetails?.name} />
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
            Estadisticas de Valor para {cryptoDetails?.name} 
            </Title>
            <p>
                Vista general de las estadisticas del activo {cryptoDetails?.name}
            </p>
          </Col>
          {stats.map(({icon, title, value}) => {
            return (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>  
                <Text className='stats'>{value}</Text>
              </Col>
            )
          })}
        </Col>
        <Col className='other-stats-info'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
            Otras Estadisticas
            </Title>
            <p>
                Vista general de todas las Cryptomonedas
            </p>
          </Col>
          {genericStats.map(({icon, title, value}) => {
            return (
              <Col className='coin-stats'>
                <Col className='coin-stats-name'>
                  <Text>{icon}</Text>
                  <Text>{title}</Text>
                </Col>  
                <Text className='stats'>{value}</Text>
              </Col>
            )
          })}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            Que es {cryptoDetails?.name}?
            {HTMLReactParser(''+ cryptoDetails?.description)}
          </Title>
        </Row>
        <Col className='coin-links'>
          <Title level={3} className='coin-details-heading'>
            {cryptoDetails?.name} Links
          </Title>
          {cryptoDetails?.links.map((link) => {
            return (
              <Row className='coin-link' key={link.name}>
                <Title level={5} className='link-name'>
                  {link.type}
                </Title>
                <a href={link.url} target='_blank' rel='noreferrer'>
                  {link.name}
                </a>
              </Row>
            )
          })}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails