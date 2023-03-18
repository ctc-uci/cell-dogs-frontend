/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
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
// import { DropDownList } from "@progress/kendo-react-dropdowns";

const AdoptionLog = () => {
  return <div>Adoption Log</div>;
};

//   setViewTypeCard = ()  => {
//     this.setState({view: "card"})
//   }

// setViewTypeTable = ()  => {
//   this.setState({view: "table"})
// }

// dropdownOn = () => {
//   this.setState({dropdown: "yes"})
// }

// dropdownOff = () => {
//   this.setState({dropdown: "no"})
// }

// filterServices = () => {
//   this.setState({filter: "services"})
// }

// filterTherapy = () => {
//   this.setState({filter: "therapy"})
// }

// filterSpecial = () => {
//   this.setState({filter: "special needs"})
// }

// filterStaff = () => {
//   this.setState({filter: "staff adoption"})
// }

// filterDeceased = () => {
//   this.setState({filter: "deceased"})
// }

// filterMale = () => {
//   this.setState({filter: "all male"})
// }

// filterFemale = () => {
//   this.setState({filter: "all female"})
// }

const AdoptionLogNavbar = () => {
  const [view, setView] = useState('card');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(false);
  const [service, setService] = useState(false);
  const [therapy, setTherapy] = useState(false);
  const [specialNeeds, setSpecialNeeds] = useState(false);
  const [staffAdoption, setStaffAdoption] = useState(false);
  const [deceased, setDeceased] = useState(false);
  const [allMales, setAllMales] = useState(false);
  const [allFemales, setAllFemales] = useState(false);
  const [facility, setFacility] = useState('');
  const [selectAll, setSelectAll] = useState(false);
  const [exportData, setExportData] = useState(null);

  function handleViewToggle() {
    if (view === 0) {
      setView(1);
    } else {
      setView(0);
    }
  }
  return (
    <div
      className="subnavbar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      <div className="view" width="10%">
        <Button
          variant="solid"
          colorScheme="gray"
          size="md"
          className={view === 0 ? 'active' : ''}
          onClick={handleViewToggle}
        >
          Card View
        </Button>

        <Button
          variant="solid"
          colorScheme="facebook"
          size="md"
          className={view === 1 ? 'active' : ''}
          onClick={handleViewToggle}
        >
          Table View
        </Button>
      </div>
      <InputGroup size="sm" width="40%">
        <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.300" />} />
        <Input
          type="text"
          placeholder="Search"
          size="sm"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </InputGroup>
      <div width="50%">
        <select
          value={filter}
          border="1px solid black"
          onChange={e => setFilter(e.target.value)}
          style={{ marginRight: '10px' }}
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
        <label style={{ marginBottom: '10px', fontWeight: 'bold', marginRight: '10px' }}>
          Facility:
          <select value={facility} onChange={e => setFacility(e.target.value)}>
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
  );
};

export default AdoptionLogNavbar;
