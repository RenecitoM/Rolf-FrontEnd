import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as RiIcons from 'react-icons/ri';
import * as FcIcons from 'react-icons/fc';
import * as MdIcons from 'react-icons/md';



export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Boards',
    path: '/boards',
    icon: <BsIcons.BsKanbanFill />,
    cName: 'nav-text'
  },
  {
    title: 'Proyectos',
    path: '/CardsProyects',
    icon: <BsIcons.BsCardChecklist />,
    cName: 'nav-text'
  },
  {
    title: 'Gestion-proyecto',
    path: '/proyecto',
    icon: <FaIcons.FaClipboardList />,
    cName: 'nav-text'
  },
  {
    title: 'Gestion-equipo',
    path: '/equipo',
    icon: <RiIcons.RiTeamFill />,
    cName: 'nav-text'
  },
  {
    title: 'Gestion-usuario',
    path: '/usuario',
    icon: <MdIcons.MdAccountCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Estadisticas',
    path: '/estadistica',
    icon: <FcIcons.FcStatistics />,
    cName: 'nav-text'
  },

];
