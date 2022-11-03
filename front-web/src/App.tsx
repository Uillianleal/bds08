import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filter from './components/filter';
import Header from './components/header';
import PieChartCard from './components/pie-chart-card';
import { buildSalesByStoreChart } from './helpers';
import SalesByStoreComponent from './sales-by-store';
import { FilterData, PieChartConfig, SalesByGender } from './types';
import { buildFilterParams, makeRequest } from './utils/request';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();

  const [salesByStore, setSalesByStore] = useState<PieChartConfig>();

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  };

  useEffect(() => {
    makeRequest
      .get<SalesByGender[]>('/sales/by-gender', { params })
      .then((response) => {
        const newSalesByStore = buildSalesByStoreChart(response.data);
        setSalesByStore(newSalesByStore);
      })
      .catch(() => {
        console.error('Error to fetch sales by store');
      });
  }, [params]);
  return (
    <>
      <Header />
      <div className="app-container">
        <Filter onFilterChange={onFilterChange} />
        <div className="sales-overview-container base-card">
          <div className="total_vendas">
            <SalesByStoreComponent filterData={filterData} />
          </div>
          <div className="grafico">
            <PieChartCard name="" labels={salesByStore?.labels} series={salesByStore?.series} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
