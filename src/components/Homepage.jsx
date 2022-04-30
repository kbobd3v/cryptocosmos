import React from 'react'
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { Routes, Route, Link } from "react-router-dom"
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '.';

const  { Title } = Typography;

const Homepage = () => {

  const { data, isFetching } = useGetCryptosQuery(10);

  const globalStats = data?.data?.stats;
  if (isFetching) return "Loading..."
  return (
      <>
        <title level={2} className="heading">Estadisticas totales - Cryptomonedas</title>
        <Row>
            <Col span={12}><Statistic title="Total de Cryptos" value={globalStats.total} /></Col>
            <Col span={12}><Statistic title="Total de Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
            <Col span={12}><Statistic title="Capital de Mercado total" value={millify(globalStats.totalMarketCap)} /></Col>
            <Col span={12}><Statistic title="Volumen total para 24h" value={millify(globalStats.total24hVolume)}  /></Col>
            <Col span={12}><Statistic title="Total Mercados" value={millify(globalStats.totalMarkets)} /></Col>
        </Row>
        <div className='home-heading-container'>
          <Title level={2} className="home-title">Top 10 Cryptomonedas a nivel mundial</Title>
          <Title level={3} className="show-more"><Link to="/cryptocurrencies">Ver mas</Link></Title>
        </div>
        <Cryptocurrencies simplified />
        <div className='home-heading-container'>
          <Title level={2} className="home-title">Ultimas Noticias Crypto</Title>
          <Title level={3} className="show-more"><Link to="/news">Ver mas</Link></Title>
        </div>
        <News simplified />
      </>
  )
}

export default Homepage