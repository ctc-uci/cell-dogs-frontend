/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
} from '@chakra-ui/react';
import { Search2Icon, DownloadIcon } from '@chakra-ui/icons';
import styles from './AdoptionLogNavbar.module.css';

const AdoptionLogNavbar = ({ view, setView }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false);
  const [facility, setFacility] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [exportData, setExportData] = useState(null);

  function handleViewToggle(viewType) {
    setView(viewType);
    return viewType;
  }

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
              value={search}
              onChange={e => setSearch(e.target.value)}
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
          <option value="special-needs">Special Needs</option>
          <option value="staff-adoption">Staff Adoption</option>
          <option value="deceased">Deceased</option>
          <option value="all-males">All Males</option>
          <option value="all-females">All Females</option>
        </select>
        <div className={styles['mobile-container']}>
          <label className={styles.label}>
            Facility:
            <select
              value={facility}
              onChange={e => setFacility(e.target.value)}
              className={styles.customSelectInput}
            >
              <option value="">All</option>
              <option value="facility-1">OC Probation</option>
              <option value="facility-2">Theo Lacy Facility</option>
              <option value="facility-3">OC Sheriffs Department</option>
            </select>
          </label>
          <Button size="md" onClick={() => setSelectAll(true)} style={{ marginRight: '10px' }}>
            Select All
          </Button>
          <Button
            size="md"
            aria-label="Export"
            rightIcon={<DownloadIcon />}
            onClick={() => setExportData()}
          >
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionLogNavbar;
