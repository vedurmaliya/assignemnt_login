import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  ListItemIcon,
  Checkbox,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  department: string;
  sub_departments: string[];
}

const initialData: Department[] = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
];

const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<number[]>([]);
  const [selected, setSelected] = useState<{ [key: string]: { [key: string]: boolean } }>({});

  const handleExpand = (index: number) => {
    setExpanded((prevExpanded) =>
      prevExpanded.includes(index)
        ? prevExpanded.filter((item) => item !== index)
        : [...prevExpanded, index]
    );
  };

  const handleSelect = (name: string, subDepartments: string[]) => {
    setSelected((prevSelected) => {
      const newSelected = { ...prevSelected };

      if (!newSelected[name]) {
        newSelected[name] = {};
      }

      // Toggle select/unselect all sub-departments and department itself
      const allSubDeptsSelected = subDepartments.every(
        (subDept) => newSelected[name][subDept]
      );

      subDepartments.forEach((subDept) => {
        newSelected[name][subDept] = !allSubDeptsSelected;
      });
      newSelected[name][name] = !allSubDeptsSelected;

      return newSelected;
    });
  };

  const handleSubDeptSelect = (name: string, subDept: string) => {
    setSelected((prevSelected) => {
      const newSelected = { ...prevSelected };

      if (!newSelected[name]) {
        newSelected[name] = {};
      }

      newSelected[name][subDept] = !newSelected[name][subDept];

      // Check if all sub-departments are selected, update the "Select All" state
      const allSubDeptsSelected = initialData.find(
        (item) => item.department === name
      )?.sub_departments.every((subDept) => newSelected[name][subDept]);

      newSelected[name][name] = allSubDeptsSelected || false;

      return newSelected;
    });
  };

  return (
    <List>
      {initialData.map((item, index) => {
        const isItemExpanded = expanded.includes(index);
        const isItemSelected = Object.values(selected[item.department] || {}).every(
          (isSelected) => isSelected
        );

        return (
          <div key={index}>
            <ListItem button onClick={() => handleExpand(index)}>
              <ListItemText primary={item.department} />
              {isItemExpanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={isItemExpanded}>
              <List>
                <ListItem
                  button
                  onClick={() => handleSelect(item.department, item.sub_departments)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isItemSelected}
                    />
                  </ListItemIcon>
                  <ListItemText primary="Select All" />
                </ListItem>
                {item.sub_departments.map((subDept, subIndex) => (
                  <ListItem
                    button
                    key={subIndex}
                    onClick={() => handleSubDeptSelect(item.department, subDept)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selected[item.department]?.[subDept] || false}
                      />
                    </ListItemIcon>
                    <ListItemText primary={subDept} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        );
      })}
    </List>
  );
};

export default DepartmentList;
