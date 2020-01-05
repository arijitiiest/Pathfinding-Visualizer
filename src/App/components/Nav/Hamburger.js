import React from "react";
import { stack as Menu } from "react-burger-menu";

import routes from "../../data/routes";

const Hamburger = () => {
  const links = routes.map((data, idx) => (
    <a href={data.path} key={idx}>
      {data.label}
    </a>
  ));
  return (
    <Menu right width={"280px"} disableAutoFocus>
      {links}
    </Menu>
  );
};

export default Hamburger;