import { DownloadIcon, Search2Icon } from '@chakra-ui/icons';
import { Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useBackend } from '../../contexts/BackendContext';
import styles from './AdoptionLogNavbar.module.css';

const AdoptionLogNavbar = ({
  view,
  setView,
  setFilter,
  filter,
  setFacilityFilter,
  facilityFilter,
  setSearchDog,
  searchDog,
  checkedDogs,
}) => {
  const [search, setSearch] = useState('');
  // const [filter, setFilter] = useState(false);
  const [facilities, setFacilities] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  // console.log(JSON.parse('[' + checkedDogs.join(', ') + ']'));
  function handleViewToggle(viewType) {
    setView(viewType);
    return viewType;
  }

  const { backend } = useBackend();
  const getFacilities = async () => {
    const { data } = await backend.get('/facility');
    setFacilities(data);
  };

  useEffect(() => {
    getFacilities();
  }, []);

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.subnavbar}>
        <div className={styles['mobile-container']}>
          <div className="view" width="10%">
            <Button
              variant={view === 'card' ? 'solid' : 'outline'}
              colorScheme={view === 'card' ? 'facebook' : 'grey'}
              size="md"
              onClick={() => handleViewToggle('card')}
            >
              Card View
            </Button>

            <Button
              variant={view === 'table' ? 'solid' : 'outline'}
              colorScheme={view === 'table' ? 'facebook' : 'grey'}
              size="md"
              onClick={() => handleViewToggle('table')}
            >
              Table View
            </Button>
          </div>
        </div>
        <div className={styles['mobile-search-container']}>
          <InputGroup size="sm">
            <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.300" />} />
            <Input
              type="text"
              placeholder="Search"
              size="sm"
              value={searchDog}
              onChange={e => setSearchDog(e.target.value)}
              className={styles.customSelectInput}
            />
          </InputGroup>
        </div>
        <select
          value={filter}
          border="1px solid black"
          onChange={e => setFilter(e.target.value)}
          className={styles.customSelectInput}
        >
          <option value="">Filter by...</option>
          <option value="all">All</option>
          <option value="service">Service</option>
          <option value="therapy">Therapy</option>
          <option value="specialNeeds">Special Needs</option>
          <option value="staffAdoption">Staff Adoption</option>
          <option value="deceased">Deceased</option>
          <option value="allMales">All Males</option>
          <option value="allFemales">All Females</option>
        </select>
        <div className={styles['mobile-container']}>
          <label className={styles.label}>
            Facility:
            <select
              value={facilityFilter}
              onChange={e => setFacilityFilter(e.target.value)}
              className={styles.customSelectInput}
            >
              <option value="">All</option>
              {facilities ? (
                facilities.map(facility => (
                  <option key={facility.name} value={facility.name}>
                    {facility.name}
                  </option>
                ))
              ) : (
                <option disabled>All</option>
              )}
            </select>
          </label>
          <Button size="md" onClick={() => setSelectAll(true)} style={{ marginRight: '10px' }}>
            Select All
          </Button>
          {
            <Button size="md" aria-label="Export" rightIcon={<DownloadIcon />}>
              <CSVLink
                data={JSON.parse('[' + checkedDogs.join(', ') + ']')}
                filename="Cell_Dogs_Adoption_Log.csv"
              >
                Export
              </CSVLink>
            </Button>
          }
        </div>
      </div>
    </div>
  );
};

export default AdoptionLogNavbar;
