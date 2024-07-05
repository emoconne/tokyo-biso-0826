import * as React from 'react';
import { FC } from "react";
interface Prop {}
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const ChatPrompt : FC<Prop> = (props) => {
  const [open, setOpen] = React.useState(true);
  const [open_personal, setOpen_personal] = React.useState(true);
  const handleClick_company_all = () => {
    setOpen(!open);
  };
  const handleClick_personal_all = () => {
    setOpen_personal(!open);
  };
  const listClick = () => {
    
    const yesDelete = confirm(
      "プロンプトを編集しますか？"
    );    
  };

  return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav" 
      >
        <ListItemButton　onClick={handleClick_company_all}>
          <ListItemText primary="会社全体" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="取引先にメールする" onClick={listClick}/>
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={handleClick_personal_all}>
          <ListItemText primary="個人" />
          {open_personal ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open_personal} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="文章を要約する" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    )
};