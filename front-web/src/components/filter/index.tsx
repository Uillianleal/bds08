import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { FilterData, Store } from '../../types';
import { makeRequest } from '../../utils/request';
import './styles.css';

type Props = {
  onFilterChange: (filter: FilterData) => void;
};

function Filter({ onFilterChange }: Props) {
  const [selectStore, setSelectStore] = useState<Store[]>([]);
  const { handleSubmit, setValue, getValues, control } = useForm<FilterData>();

  const onSubmit = (formData: FilterData) => {
    onFilterChange(formData);
  };

  const onChangeStore = (value: Store) => {
    setValue('store', value);

    const obj: FilterData = {
      store: getValues('store')
    };

    onFilterChange(obj);
  };

  useEffect(() => {
    makeRequest.get('/stores').then((response) => {
      setSelectStore(response.data);
    });
  });

  return (
    <div className="filter-container base-card">
      <form className="form-content-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="filter-select-container">
          <Controller
            name="store"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectStore}
                isClearable
                placeholder="Loja"
                classNamePrefix="store-filter-select"
                onChange={(value) => onChangeStore(value as Store)}
                getOptionLabel={(store: Store) => store.name}
                getOptionValue={(store: Store) => String(store.id)}
              />
            )}
          />
        </div>
      </form>
    </div>
  );
}

export default Filter;
